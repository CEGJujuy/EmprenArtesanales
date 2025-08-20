import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Edit2, Trash2, Package, DollarSign } from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct, adjustProductStock } from '../lib/dataService';
import type { Product } from '../lib/types';

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: '',
    stock: 0,
    min_stock: 0,
    cost_per_unit: 0
  });
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: 0,
    notes: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    
    resetForm();
    loadProducts();
  };

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProduct && stockAdjustment.quantity !== 0) {
      adjustProductStock(selectedProduct.id, stockAdjustment.quantity, stockAdjustment.notes);
      setShowStockForm(false);
      setSelectedProduct(null);
      setStockAdjustment({ quantity: 0, notes: '' });
      loadProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      unit: product.unit,
      stock: product.stock,
      min_stock: product.min_stock,
      cost_per_unit: product.cost_per_unit
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const handleStockEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowStockForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      unit: '',
      stock: 0,
      min_stock: 0,
      cost_per_unit: 0
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const totalValue = products.reduce((sum, product) => sum + (product.stock * product.cost_per_unit), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <ShoppingCart className="h-10 w-10 text-green-600" />
            </div>
            Gestión de Productos
          </h1>
          <p className="text-lg text-gray-600 mt-2">Controla tu inventario de productos terminados</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total Inventario</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Descripción del producto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unidad</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                >
                  <option value="">Seleccionar unidad</option>
                  <option value="unidad">Unidades</option>
                  <option value="docena">Docenas</option>
                  <option value="kg">Kilogramos (kg)</option>
                  <option value="g">Gramos (g)</option>
                  <option value="l">Litros (l)</option>
                  <option value="ml">Mililitros (ml)</option>
                  <option value="paquete">Paquetes</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Inicial</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {editingProduct ? 'Actualizar' : 'Crear'}
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
      {showStockForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ajustar Stock: {selectedProduct.name}
            </h2>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Stock actual: <span className="font-medium">{selectedProduct.stock} {selectedProduct.unit}</span></p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea
                  value={stockAdjustment.notes}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Motivo del ajuste..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Ajustar Stock
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStockForm(false);
                    setSelectedProduct(null);
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

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Productos</h2>
        </div>
        <div className="p-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      )}
                      <p className="text-sm text-gray-500">Unidad: {product.unit}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleStockEdit(product)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Ajustar stock"
                      >
                        <Package className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
                      <span className="font-bold text-lg text-gray-900">
                        {product.stock} {product.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mínimo:</span>
                      <span className="text-gray-900 font-medium">{product.min_stock} {product.unit}</span>
                    </div>
                    
                    {product.cost_per_unit > 0 && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Costo:</span>
                          <span className="text-gray-900 font-medium">${product.cost_per_unit.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Valor Total:</span>
                          <span className="text-green-600 font-bold">${(product.stock * product.cost_per_unit).toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos registrados</h3>
              <p className="text-gray-500 mb-6">Comienza agregando tus productos terminados</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Crear tu primer producto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}