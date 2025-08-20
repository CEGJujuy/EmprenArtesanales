import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, ShoppingCart, ChefHat, Activity, AlertTriangle, TrendingUp, Plus } from 'lucide-react';
import { getDashboardStats, getInputs, getProducts, getStockTransactions, getRecipes } from '../lib/dataService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DashboardStats } from '../lib/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [stockData, setStockData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);

    // Prepare stock level data for chart
    const inputs = getInputs();
    const stockChartData = inputs.slice(0, 6).map(input => ({
      name: input.name.length > 10 ? input.name.substring(0, 10) + '...' : input.name,
      stock: input.stock,
      minStock: input.min_stock,
      status: input.stock <= input.min_stock ? 'Bajo' : 'Normal'
    }));
    setStockData(stockChartData);

    // Prepare recent transactions data
    const transactions = getStockTransactions();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return format(date, 'dd/MM', { locale: es });
    }).reverse();

    const transactionsByDay = last7Days.map(day => {
      const dayTransactions = transactions.filter(t => 
        format(new Date(t.created_at), 'dd/MM', { locale: es }) === day
      );
      
      const consumption = dayTransactions
        .filter(t => t.type === 'input_consumption')
        .reduce((sum, t) => sum + Math.abs(t.quantity), 0);
      
      const production = dayTransactions
        .filter(t => t.type === 'product_production')
        .reduce((sum, t) => sum + t.quantity, 0);

      return {
        date: day,
        consumo: consumption,
        produccion: production
      };
    });

    setTransactionData(transactionsByDay);
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Insumos',
      value: stats.totalInputs,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Productos',
      value: stats.totalProducts,
      icon: ShoppingCart,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Recetas',
      value: stats.totalRecipes,
      icon: ChefHat,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Lotes Activos',
      value: stats.activeBatches,
      icon: Activity,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Control</h1>
        <p className="text-lg text-gray-600">Resumen de tu producción artesanal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-4 rounded-xl`}>
                <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {stats.lowStockInputs > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-slide-up">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-lg mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-1">¡Atención! Stock Bajo</h3>
              <p className="text-red-700">
                {stats.lowStockInputs} insumo(s) necesitan reposición
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock Levels Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            Niveles de Stock
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="stock" fill="#3B82F6" name="Stock Actual" radius={[4, 4, 0, 0]} />
              <Bar dataKey="minStock" fill="#EF4444" name="Stock Mínimo" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            Actividad Últimos 7 Días
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="consumo" fill="#EF4444" name="Consumo" radius={[4, 4, 0, 0]} />
              <Bar dataKey="produccion" fill="#10B981" name="Producción" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Batches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <ChefHat className="h-6 w-6 text-purple-600" />
            </div>
            Lotes Recientes
          </h3>
        </div>
        {stats.recentBatches.length > 0 ? (
          <div className="space-y-4">
            {stats.recentBatches.map((batch) => {
              const recipe = getRecipes().find(r => r.id === batch.recipe_id);
              const product = getProducts().find(p => p.id === recipe?.product_id);
              
              return (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      batch.status === 'completed' ? 'bg-green-500' :
                      batch.status === 'in_progress' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-semibold text-gray-900">{recipe?.name || 'Receta eliminada'}</p>
                      <p className="text-sm text-gray-600">
                        {product?.name} • Cantidad: {batch.quantity} • {format(new Date(batch.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    batch.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : batch.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {batch.status === 'completed' ? 'Completado' : 
                     batch.status === 'in_progress' ? 'En Proceso' : 'Planificado'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No hay lotes registrados aún</p>
            <p className="text-sm text-gray-400">Comienza creando insumos y recetas para planificar tu primera producción</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Gestionar Insumos</h4>
              <p className="text-sm text-blue-700">Controla tus materias primas</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Crear Recetas</h4>
              <p className="text-sm text-purple-700">Define tus fórmulas de producción</p>
            </div>
            <ChefHat className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Planificar Producción</h4>
              <p className="text-sm text-green-700">Organiza tus lotes de trabajo</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}