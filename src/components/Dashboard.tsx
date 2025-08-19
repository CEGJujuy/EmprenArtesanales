import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, ShoppingCart, ChefHat, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { getDashboardStats, getInputs, getProducts, getStockTransactions } from '../lib/dataService';
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
    const stockChartData = inputs.map(input => ({
      name: input.name,
      stock: input.stock,
      minStock: input.min_stock,
      status: input.stock <= input.min_stock ? 'Bajo' : 'Normal'
    }));
    setStockData(stockChartData);

    // Prepare recent transactions data
    const transactions = getStockTransactions();
    const recentTransactions = transactions
      .slice(-7)
      .map(transaction => ({
        date: format(new Date(transaction.created_at), 'dd/MM', { locale: es }),
        cantidad: Math.abs(transaction.quantity),
        tipo: transaction.type === 'production_consumption' ? 'Consumo' : 'Producción'
      }));
    setTransactionData(recentTransactions);
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
      textColor: 'text-blue-600'
    },
    {
      title: 'Productos',
      value: stats.totalProducts,
      icon: ShoppingCart,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Recetas',
      value: stats.totalRecipes,
      icon: ChefHat,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Lotes Activos',
      value: stats.activeBatches,
      icon: Activity,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Control</h1>
        <p className="text-gray-600">Resumen de tu producción artesanal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {stats.lowStockInputs > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800 font-medium">
              ¡Atención! {stats.lowStockInputs} insumo(s) con stock bajo
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock Levels Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
            Niveles de Stock
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3B82F6" name="Stock Actual" />
              <Bar dataKey="minStock" fill="#EF4444" name="Stock Mínimo" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-indigo-600" />
            Actividad Reciente
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#10B981" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Batches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChefHat className="h-5 w-5 mr-2 text-indigo-600" />
          Lotes Recientes
        </h3>
        {stats.recentBatches.length > 0 ? (
          <div className="space-y-3">
            {stats.recentBatches.map((batch) => {
              const recipe = getRecipes().find(r => r.id === batch.recipe_id);
              return (
                <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{recipe?.name || 'Receta desconocida'}</p>
                    <p className="text-sm text-gray-600">
                      Cantidad: {batch.quantity} | {format(new Date(batch.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    batch.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : batch.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
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
          <p className="text-gray-500 text-center py-8">No hay lotes registrados aún</p>
        )}
      </div>
    </div>
  );
}