import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { getInputs, addInput, updateInput, deleteInput } from '../lib/dataService';
import type { Input } from '../lib/types';

export default function InputsManager() {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInput, setEditingInput] = useState<Input | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    stock: 0,
    min_stock: 0,
    cost_per_unit: 0
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

  const handleEdit = (input: Input) => {
    setEditingInput(input);
    setFormData({
      name: input.name,
      unit: input.unit,
      stock: input.stock,
      min_stock: input.min_stock,
      cost_per_unit: input.cost_per_unit
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este insumo?')) {
      deleteInput(id);
      loadInputs();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      unit: '',
      stock: 0,
      min_stock: 0,
      cost_per_unit: 0
    });
    setEditingInput(null);
    setShowForm(false);
  };

  const lowStockInputs = inputs.filter(input => input.stock <= input.min_stock);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="h-8 w-8 mr-3 text-indigo-600" />
            Gestión de Insumos
          </h1>
          <p className="text-gray-600 mt-2">Controla tus materias primas e ingredientes</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Insumo
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockInputs.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-red-800 font-medium">Insumos con Stock Bajo</h3>
          </div>
          <div className="space-y-1">
            {lowStockInputs.map(input => (
              <p key={input.id} className="text-red-700 text-sm">
                {input.name}: {input.stock} {input.unit} (mínimo: {input.min_stock} {input.unit})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingInput ? 'Editar Insumo' : 'Nuevo Insumo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="kg, litros, unidades, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.min_stock}
                    onChange={(e) => setFormData({ ...formData, min_stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Costo por Unidad ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_per_unit}
                  onChange={(e) => setFormData({ ...formData, cost_per_unit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  {editingInput ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inputs.map((input) => (
                <div key={input.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{input.name}</h3>
                      <p className="text-sm text-gray-600">{input.unit}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(input)}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(input.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className={`font-medium ${input.stock <= input.min_stock ? 'text-red-600' : 'text-gray-900'}`}>
                        {input.stock} {input.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mínimo:</span>
                      <span className="text-gray-900">{input.min_stock} {input.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Costo:</span>
                      <span className="text-gray-900">${input.cost_per_unit.toFixed(2)}</span>
                    </div>
                    {input.stock <= input.min_stock && (
                      <div className="flex items-center text-red-600 text-xs mt-2">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Stock bajo
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay insumos registrados</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
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