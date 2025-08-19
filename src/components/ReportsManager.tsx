import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Calendar, TrendingDown, Package, DollarSign } from 'lucide-react';
import { getBatches, getStockTransactions, getInputs, getProducts, getRecipes, calculateRecipeCost } from '../lib/dataService';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ReportsManager() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [batchData, setBatchData] = useState<any[]>([]);
  const [consumptionData, setConsumptionData] = useState<any[]>([]);
  const [costData, setCostData] = useState<any[]>([]);
  const [productionSummary, setProductionSummary] = useState<any[]>([]);

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
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
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
      
      acc[day] = (acc[day] || 0) + producedQuantity;
      return acc;
    }, {} as Record<string, number>);

    setBatchData(
      Object.entries(batchesByDay).map(([day, quantity]) => ({
        day,
        cantidad: quantity
      }))
    );

    // Input consumption data
    const consumptionByInput = filteredTransactions
      .filter(t => t.type === 'production_consumption')
      .reduce((acc, transaction) => {
        const input = inputs.find(i => i.id === transaction.input_id);
        if (input) {
          acc[input.name] = (acc[input.name] || 0) + Math.abs(transaction.quantity);
        }
        return acc;
      }, {} as Record<string, number>);

    setConsumptionData(
      Object.entries(consumptionByInput).map(([name, quantity]) => ({
        name,
        cantidad: quantity
      }))
    );

    // Cost analysis by recipe
    const costByRecipe = filteredBatches.reduce((acc, batch) => {
      const recipe = recipes.find(r => r.id === batch.recipe_id);
      if (recipe) {
        const recipeCost = calculateRecipeCost(recipe);
        const totalCost = recipeCost * batch.quantity;
        acc[recipe.name] = (acc[recipe.name] || 0) + totalCost;
      }
      return acc;
    }, {} as Record<string, number>);

    setCostData(
      Object.entries(costByRecipe).map(([name, cost]) => ({
        name,
        costo: cost
      }))
    );

    // Production summary
    const productionByProduct = filteredBatches.reduce((acc, batch) => {
      const recipe = recipes.find(r => r.id === batch.recipe_id);
      const product = products.find(p => p.id === recipe?.product_id);
      if (product && recipe) {
        const producedQuantity = recipe.yield_quantity * batch.quantity;
        if (!acc[product.name]) {
          acc[product.name] = { quantity: 0, batches: 0 };
        }
        acc[product.name].quantity += producedQuantity;
        acc[product.name].batches += 1;
      }
      return acc;
    }, {} as Record<string, { quantity: number; batches: number }>);

    setProductionSummary(
      Object.entries(productionByProduct).map(([name, data]) => ({
        name,
        cantidad: data.quantity,
        lotes: data.batches
      }))
    );
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-indigo-600" />
            Reportes y Análisis
          </h1>
          <p className="text-gray-600 mt-2">Analiza tu producción y consumo de insumos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="week">Última Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Último Trimestre</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production by Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
            Producción por Día
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#3B82F6" name="Unidades Producidas" />
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#10B981" name="Cantidad Consumida" />
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

        {/* Production Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-indigo-600" />
            Resumen de Producción
          </h3>
          {productionSummary.length > 0 ? (
            <div className="space-y-4">
              {productionSummary.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.lotes} lotes producidos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{item.cantidad}</p>
                    <p className="text-xs text-gray-500">unidades</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No hay datos de producción para este período</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-2xl font-bold text-gray-900">
                ${costData.reduce((sum, item) => sum + item.costo, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos Únicos</p>
              <p className="text-2xl font-bold text-gray-900">{productionSummary.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}