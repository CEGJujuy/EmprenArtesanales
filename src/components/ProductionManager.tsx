import React, { useState, useEffect } from 'react';
import { Factory, Plus, Play, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { getBatches, addBatch, updateBatch, completeBatch, getRecipes, getInputs, getProducts } from '../lib/dataService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Batch, Recipe, Input, Product } from '../lib/types';

export default function ProductionManager() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [inputs, setInputs] = useState<Input[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipe_id: '',
    quantity: 1,
    notes: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBatches(getBatches());
    setRecipes(getRecipes());
    setInputs(getInputs());
    setProducts(getProducts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBatch({
      ...formData,
      status: 'planned'
    });
    
    resetForm();
    loadData();
    showMessage('success', 'Lote creado exitosamente');
  };

  const handleStartBatch = (batchId: string) => {
    updateBatch(batchId, { 
      status: 'in_progress',
      start_date: new Date().toISOString()
    });
    loadData();
    showMessage('success', 'Lote iniciado');
  };

  const handleCompleteBatch = (batchId: string) => {
    const result = completeBatch(batchId);
    if (result.success) {
      loadData();
      showMessage('success', result.message);
    } else {
      showMessage('error', result.message);
    }
  };

  const handleCancelBatch = (batchId: string) => {
    if (confirm('¿Estás seguro de que quieres cancelar este lote?')) {
      updateBatch(batchId, { status: 'cancelled' });
      loadData();
      showMessage('success', 'Lote cancelado');
    }
  };

  const resetForm = () => {
    setFormData({
      recipe_id: '',
      quantity: 1,
      notes: ''
    });
    setShowForm(false);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const getStatusIcon = (status: Batch['status']) => {
    switch (status) {
      case 'planned':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'in_progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Batch['status']) => {
    switch (status) {
      case 'planned':
        return 'Planificado';
      case 'in_progress':
        return 'En Proceso';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
    }
  };

  const getStatusColor = (status: Batch['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const checkStockAvailability = (recipeId: string, quantity: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return { available: false, missing: [] };

    const missing = [];
    for (const ingredient of recipe.ingredients) {
      const input = inputs.find(i => i.id === ingredient.input_id);
      if (!input) continue;
      
      const requiredQuantity = ingredient.quantity * quantity;
      if (input.stock < requiredQuantity) {
        missing.push({
          name: input.name,
          required: requiredQuantity,
          available: input.stock,
          unit: input.unit
        });
      }
    }

    return { available: missing.length === 0, missing };
  };

  const activeBatches = batches.filter(b => b.status === 'planned' || b.status === 'in_progress');
  const completedBatches = batches.filter(b => b.status === 'completed');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <div className="bg-orange-100 p-3 rounded-xl mr-4">
              <Factory className="h-10 w-10 text-orange-600" />
            </div>
            Gestión de Producción
          </h1>
          <p className="text-lg text-gray-600 mt-2">Planifica y controla tus lotes de producción</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all duration-200 flex items-center font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Lote
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lotes Activos</p>
              <p className="text-2xl font-bold text-gray-900">{activeBatches.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lotes Completados</p>
              <p className="text-2xl font-bold text-gray-900">{completedBatches.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lotes</p>
              <p className="text-2xl font-bold text-gray-900">{batches.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Factory className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Nuevo Lote de Producción</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receta</label>
                <select
                  value={formData.recipe_id}
                  onChange={(e) => setFormData({ ...formData, recipe_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  required
                >
                  <option value="">Seleccionar receta</option>
                  {recipes.map(recipe => (
                    <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad de Lotes</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas (opcional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Observaciones sobre este lote..."
                />
              </div>

              {/* Stock Check */}
              {formData.recipe_id && formData.quantity > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Verificación de Stock:</h4>
                  {(() => {
                    const stockCheck = checkStockAvailability(formData.recipe_id, formData.quantity);
                    return stockCheck.available ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Stock suficiente para producir</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Stock insuficiente:</span>
                        </div>
                        {stockCheck.missing.map((item, index) => (
                          <div key={index} className="text-xs text-red-600 ml-6 p-2 bg-red-50 rounded">
                            <strong>{item.name}:</strong> necesario {item.required}{item.unit}, disponible {item.available}{item.unit}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Crear Lote
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batches List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lotes de Producción</h2>
        </div>
        <div className="p-6">
          {batches.length > 0 ? (
            <div className="space-y-6">
              {batches
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((batch) => {
                  const recipe = recipes.find(r => r.id === batch.recipe_id);
                  const product = products.find(p => p.id === recipe?.product_id);
                  const stockCheck = checkStockAvailability(batch.recipe_id, batch.quantity);
                  
                  return (
                    <div key={batch.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            {getStatusIcon(batch.status)}
                            <h3 className="text-xl font-semibold text-gray-900 ml-3">{recipe?.name || 'Receta eliminada'}</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="text-gray-600 block mb-1">Producto:</span>
                              <p className="font-medium text-gray-900">{product?.name || 'No asignado'}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="text-gray-600 block mb-1">Cantidad:</span>
                              <p className="font-medium text-gray-900">{batch.quantity} lotes</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="text-gray-600 block mb-1">Lote #:</span>
                              <p className="font-medium text-gray-900 text-xs">{batch.batch_number}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="text-gray-600 block mb-1">Estado:</span>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                                {getStatusText(batch.status)}
                              </span>
                            </div>
                          </div>

                          {batch.notes && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <span className="text-blue-800 text-sm font-medium">Notas:</span>
                              <p className="text-blue-700 text-sm mt-1">{batch.notes}</p>
                            </div>
                          )}

                          <div className="text-sm text-gray-600">
                            <p>Creado: {format(new Date(batch.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                            {batch.start_date && (
                              <p>Iniciado: {format(new Date(batch.start_date), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                            )}
                            {batch.completion_date && (
                              <p>Completado: {format(new Date(batch.completion_date), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          {batch.status === 'planned' && (
                            <>
                              <button
                                onClick={() => handleStartBatch(batch.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Iniciar
                              </button>
                              <button
                                onClick={() => handleCancelBatch(batch.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm font-medium"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancelar
                              </button>
                            </>
                          )}
                          {batch.status === 'in_progress' && (
                            <>
                              <button
                                onClick={() => handleCompleteBatch(batch.id)}
                                disabled={!stockCheck.available}
                                className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm font-medium ${
                                  stockCheck.available
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completar
                              </button>
                              <button
                                onClick={() => handleCancelBatch(batch.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm font-medium"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancelar
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Stock availability warning for in-progress batches */}
                      {batch.status === 'in_progress' && !stockCheck.available && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                          <div className="flex items-center text-red-800 mb-3">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Stock insuficiente para completar:</span>
                          </div>
                          <div className="space-y-2">
                            {stockCheck.missing.map((item, index) => (
                              <div key={index} className="text-sm text-red-700 p-2 bg-red-100 rounded">
                                <strong>{item.name}:</strong> necesario {item.required}{item.unit}, disponible {item.available}{item.unit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recipe ingredients preview */}
                      {recipe && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-3">Ingredientes necesarios (por lote):</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {recipe.ingredients.map((ingredient, index) => {
                              const input = inputs.find(i => i.id === ingredient.input_id);
                              const totalNeeded = ingredient.quantity * batch.quantity;
                              const hasEnough = input ? input.stock >= totalNeeded : false;
                              
                              return (
                                <div key={index} className={`p-3 rounded-lg text-sm ${hasEnough ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                  <p className="font-medium text-gray-900">{input?.name || 'Insumo eliminado'}</p>
                                  <p className={`text-xs ${hasEnough ? 'text-green-700' : 'text-red-700'}`}>
                                    {totalNeeded} {input?.unit} {hasEnough ? '✓' : '✗'}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Factory className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay lotes de producción registrados</h3>
              <p className="text-gray-500 mb-6">Comienza planificando tu primera producción</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Crear tu primer lote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}