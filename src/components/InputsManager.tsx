import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { getInputs, addInput, updateInput, deleteInput, adjustInputStock } from '../lib/dataService';
import type { Input } from '../lib/types';

export default function InputsManager() {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false);
  const [editingInput, setEditingInput] = useState<Input | null>(null);
  const [selectedInput, setSelectedInput] = useState<Input | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: '',
    stock: 0,
    min_stock: 0,
    cost_per_unit: 0,
    supplier: ''
  });
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: 0,
    notes: ''
  });

  useEffect(() => {
    loadInputs();
  }, []);

  const loadInputs = () => {
    setInputs(getInputs());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInput) {
      updateInput(editingInput.id, formData);
    } else {
      addInput(formData);
    }
    
    resetForm();
    loadInputs();
  };

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedInput && stockAdjustment.quantity !== 0) {
      adjustInputStock(selectedInput.id, stockAdjustment.quantity, stockAdjustment.notes);
      setShowStockForm(false);
      setSelectedInput(null);
      setStockAdjustment({ quantity: 0, notes: '' });
      loadInputs();
    }
  };

  const handleEdit = (input: Input) => {
    setEditingInput(input);
    setFormData({
      name: input.name,
      description: input.description || '',
      unit: input.unit,
      stock: input.stock,
      min_stock: input.min_stock,
      cost_per_unit: input.cost_per_unit,
      supplier: input.supplier || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este insumo?')) {
      deleteInput(id);
      loadInputs();
    }
  };

  const handleStockEdit = (input: Input) => {
    setSelectedInput(input);
    setShowStockForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      unit: '',
      stock: 0,
      min_stock: 0,
      cost_per_unit: 0,
      supplier: ''
    });
    setEditingInput(null);
    setShowForm(false);
  };

  const lowStockInputs = inputs.filter(input => input.stock <= input.min_stock);
  const totalValue = inputs.reduce((sum, input) => sum + (input.stock * input.cost_per_unit), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <div className="bg-indigo-100 p-3 rounded-xl mr-4">
              <Package className="h-10 w-10 text-indigo-600" />
            </div>
            Gestión de Insumos
          </h1>
          <p className="text-lg text-gray-600 mt-2">Controla tus materias primas e ingredientes</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 flex items-center font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Insumo
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Insumos</p>
              <p className="text-2xl font-bold text-gray-900">{inputs.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total Stock</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockInputs.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockInputs.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Insumos con Stock Bajo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockInputs.map(input => (
              <div key={input.id} className="bg-white p-4 rounded-lg border border-red-200">
                <p className="font-medium text-red-900">{input.name}</p>
                <p className="text-sm text-red-700">
                  Stock: {input.stock} {input.unit} (mínimo: {input.min_stock} {input.unit})
                </p>
                <button
                  onClick={() => handleStockEdit(input)}
                  className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Ajustar Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingInput ? 'Editar Insumo' : 'Nuevo Insumo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Descripción opcional del insumo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unidad</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Seleccionar unidad</option>
                  <option value="kg">Kilogramos (kg)</option>
                  <option value="g">Gramos (g)</option>
                  <option value="l">Litros (l)</option>
                  <option value="ml">Mililitros (ml)</option>
                  <option value="unidad">Unidades</option>
                  <option value="docena">Docenas</option>
                  <option value="paquete">Paquetes</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Actual</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Mínimo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.min_stock}
                    onChange={(e) => setFormData({ ...formData, min_stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Costo por Unidad ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_per_unit}
                  onChange={(e) => setFormData({ ...formData, cost_per_unit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Nombre del proveedor"
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  {editingInput ? 'Actualizar' : 'Crear'}
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

      {/* Stock Adjustment Modal */}
      {showStockForm && selectedInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ajustar Stock: {selectedInput.name}
            </h2>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Stock actual: <span className="font-medium">{selectedInput.stock} {selectedInput.unit}</span></p>
            </div>
            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad (+ para agregar, - para quitar)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={stockAdjustment.quantity}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea
                  value={stockAdjustment.notes}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Motivo del ajuste..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Ajustar Stock
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStockForm(false);
                    setSelectedInput(null);
                    setStockAdjustment({ quantity: 0, notes: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inputs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Insumos</h2>
        </div>
        <div className="p-6">
          {inputs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inputs.map((input) => (
                <div key={input.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{input.name}</h3>
                      {input.description && (
                        <p className="text-sm text-gray-600 mb-2">{input.description}</p>
                      )}
                      <p className="text-sm text-gray-500">Unidad: {input.unit}</p>
                      {input.supplier && (
                        <p className="text-sm text-gray-500">Proveedor: {input.supplier}</p>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleStockEdit(input)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Ajustar stock"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(input)}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(input.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Stock:</span>
                      <span className={`font-bold text-lg ${input.stock <= input.min_stock ? 'text-red-600' : 'text-gray-900'}`}>
                        {input.stock} {input.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mínimo:</span>
                      <span className="text-gray-900 font-medium">{input.min_stock} {input.unit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Costo:</span>
                      <span className="text-gray-900 font-medium">${input.cost_per_unit.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Valor Total:</span>
                      <span className="text-green-600 font-bold">${(input.stock * input.cost_per_unit).toFixed(2)}</span>
                    </div>
                    
                    {input.stock <= input.min_stock && (
                      <div className="flex items-center justify-center text-red-600 text-sm mt-3 p-2 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Stock Crítico
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay insumos registrados</h3>
              <p className="text-gray-500 mb-6">Comienza agregando tus materias primas e ingredientes</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Crear tu primer insumo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}