import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Calendar, TrendingDown, Package, DollarSign, Activity } from 'lucide-react';
import { getBatches, getStockTransactions, getInputs, getProducts, getRecipes, calculateRecipeCost } from '../lib/dataService';
import { format, startOfMonth, endOfMonth, isWithinInterval, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ReportsManager() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [batchData, setBatchData] = useState<any[]>([]);
  const [consumptionData, setConsumptionData] = useState<any[]>([]);
  const [costData, setCostData] = useState<any[]>([]);
  const [productionSummary, setProductionSummary] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    loadReportData();
  }, [selectedPeriod]);

  const loadReportData = () => {
    const batches = getBatches();
    const transactions = getStockTransactions();
    const inputs = getInputs();
    const products = getProducts();
    const recipes = getRecipes();

    // Filter data based on selected period
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (selectedPeriod) {
      case 'week':
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'quarter':
        startDate = subDays(now, 90);
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }

    const filteredBatches = batches.filter(batch => 
      isWithinInterval(new Date(batch.created_at), { start: startDate, end: endDate })
    );

    const filteredTransactions = transactions.filter(transaction => 
      isWithinInterval(new Date(transaction.created_at), { start: startDate, end: endDate })
    );

    // Batch production data by day
    const batchesByDay = filteredBatches.reduce((acc, batch) => {
      const day = format(new Date(batch.created_at), 'dd/MM');
      const recipe = recipes.find(r => r.id === batch.recipe_id);
      const producedQuantity = recipe ? recipe.yield_quantity * batch.quantity : 0;
      
      if (!acc[day]) {
        acc[day] = { day, cantidad: 0, lotes: 0 };
      }
      acc[day].cantidad += producedQuantity;
      acc[day].lotes += 1;
      return acc;
    }, {} as Record<string, any>);

    setBatchData(Object.values(batchesByDay));

    // Input consumption data
    const consumptionByInput = filteredTransactions
      .filter(t => t.type === 'input_consumption')
      .reduce((acc, transaction) => {
        const input = inputs.find(i => i.id === transaction.input_id);
        if (input) {
          if (!acc[input.name]) {
            acc[input.name] = { name: input.name, cantidad: 0, costo: 0 };
          }
          acc[input.name].cantidad += Math.abs(transaction.quantity);
          acc[input.name].costo += transaction.total_cost || 0;
        }
        return acc;
      }, {} as Record<string, any>);

    setConsumptionData(Object.values(consumptionByInput));

    // Cost analysis by recipe
    const costByRecipe = filteredBatches.reduce((acc, batch) => {
      const recipe = recipes.find(r => r.id === batch.recipe_id);
      if (recipe) {
        const recipeCost = calculateRecipeCost(recipe);
        const totalCost = recipeCost * batch.quantity;
        if (!acc[recipe.name]) {
          acc[recipe.name] = { name: recipe.name, costo: 0, lotes: 0 };
        }
        acc[recipe.name].costo += totalCost;
        acc[recipe.name].lotes += 1;
      }
      return acc;
    }, {} as Record<string, any>);

    setCostData(Object.values(costByRecipe));

    // Production summary
    const productionByProduct = filteredBatches.reduce((acc, batch) => {
      const recipe = recipes.find(r => r.id === batch.recipe_id);
      const product = products.find(p => p.id === recipe?.product_id);
      if (product && recipe && batch.status === 'completed') {
        const producedQuantity = recipe.yield_quantity * batch.quantity;
        if (!acc[product.name]) {
          acc[product.name] = { name: product.name, cantidad: 0, lotes: 0 };
        }
        acc[product.name].cantidad += producedQuantity;
        acc[product.name].lotes += 1;
      }
      return acc;
    }, {} as Record<string, any>);

    setProductionSummary(Object.values(productionByProduct));

    // Trend data for the last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(now, 29 - i);
      const dayKey = format(date, 'dd/MM');
      
      const dayBatches = batches.filter(batch => 
        format(new Date(batch.created_at), 'dd/MM') === dayKey
      );
      
      const dayTransactions = transactions.filter(transaction => 
        format(new Date(transaction.created_at), 'dd/MM') === dayKey
      );

      const production = dayTransactions
        .filter(t => t.type === 'product_production')
        .reduce((sum, t) => sum + t.quantity, 0);

      const consumption = dayTransactions
        .filter(t => t.type === 'input_consumption')
        .reduce((sum, t) => sum + Math.abs(t.quantity), 0);

      return {
        date: dayKey,
        produccion: production,
        consumo: consumption,
        lotes: dayBatches.length
      };
    });

    setTrendData(last30Days);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const totalCost = costData.reduce((sum, item) => sum + item.costo, 0);
  const totalProduction = productionSummary.reduce((sum, item) => sum + item.cantidad, 0);
  const totalConsumption = consumptionData.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <div className="bg-indigo-100 p-3 rounded-xl mr-4">
              <BarChart3 className="h-10 w-10 text-indigo-600" />
            </div>
            Reportes y Análisis
          </h1>
          <p className="text-lg text-gray-600 mt-2">Analiza tu producción y consumo de insumos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Último Trimestre</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lotes</p>
              <p className="text-2xl font-bold text-gray-900">
                {getBatches().filter(b => b.status === 'completed').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Costo Total</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unidades Producidas</p>
              <p className="text-2xl font-bold text-gray-900">{totalProduction}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Insumos Consumidos</p>
              <p className="text-2xl font-bold text-gray-900">{totalConsumption.toFixed(1)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-indigo-600" />
            Tendencia de Producción (30 días)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="produccion" stroke="#10B981" strokeWidth={3} name="Producción" />
              <Line type="monotone" dataKey="lotes" stroke="#3B82F6" strokeWidth={2} name="Lotes" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Production by Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
            Producción por Día
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="cantidad" fill="#3B82F6" name="Unidades Producidas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Input Consumption */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingDown className="h-5 w-5 mr-2 text-indigo-600" />
            Consumo de Insumos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumptionData}>
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
                formatter={(value: number, name: string) => [
                  name === 'cantidad' ? value.toFixed(2) : `$${value.toFixed(2)}`,
                  name === 'cantidad' ? 'Cantidad Consumida' : 'Costo'
                ]}
              />
              <Bar dataKey="cantidad" fill="#10B981" name="Cantidad Consumida" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
            Análisis de Costos por Receta
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="costo"
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Costo']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Production Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="h-5 w-5 mr-2 text-indigo-600" />
          Resumen de Producción
        </h3>
        {productionSummary.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Producto</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Cantidad Producida</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Lotes</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Promedio por Lote</th>
                </tr>
              </thead>
              <tbody>
                {productionSummary.map((item, index) => (
                  <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-indigo-600">{item.cantidad}</td>
                    <td className="text-center py-4 px-4 text-gray-700">{item.lotes}</td>
                    <td className="text-center py-4 px-4 text-gray-700">{(item.cantidad / item.lotes).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay datos de producción para este período</p>
          </div>
        )}
      </div>

      {/* Consumption Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingDown className="h-5 w-5 mr-2 text-indigo-600" />
          Detalle de Consumo de Insumos
        </h3>
        {consumptionData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consumptionData.map((item, index) => (
              <div key={item.name} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cantidad:</span>
                    <span className="font-medium text-gray-900">{item.cantidad.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Costo:</span>
                    <span className="font-medium text-green-600">${item.costo.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay datos de consumo para este período</p>
          </div>
        )}
      </div>
    </div>
  );
}