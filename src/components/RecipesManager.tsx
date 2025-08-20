import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, Edit2, Trash2, DollarSign, Clock, Package } from 'lucide-react';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe, getInputs, getProducts, calculateRecipeCost } from '../lib/dataService';
import type { Recipe, Input, Product } from '../lib/types';

export default function RecipesManager() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [inputs, setInputs] = useState<Input[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_id: '',
    yield_quantity: 1,
    yield_unit: '',
    instructions: '',
    preparation_time: 0,
    ingredients: [{ input_id: '', quantity: 0 }]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRecipes(getRecipes());
    setInputs(getInputs());
    setProducts(getProducts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.input_id && ing.quantity > 0)
    };

    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
    } else {
      addRecipe(recipeData);
    }
    
    resetForm();
    loadData();
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      description: recipe.description || '',
      product_id: recipe.product_id,
      yield_quantity: recipe.yield_quantity,
      yield_unit: recipe.yield_unit,
      instructions: recipe.instructions || '',
      preparation_time: recipe.preparation_time || 0,
      ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [{ input_id: '', quantity: 0 }]
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      deleteRecipe(id);
      loadData();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      product_id: '',
      yield_quantity: 1,
      yield_unit: '',
      instructions: '',
      preparation_time: 0,
      ingredients: [{ input_id: '', quantity: 0 }]
    });
    setEditingRecipe(null);
    setShowForm(false);
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { input_id: '', quantity: 0 }]
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <ChefHat className="h-10 w-10 text-purple-600" />
            </div>
            Gestión de Recetas
          </h1>
          <p className="text-lg text-gray-600 mt-2">Crea y gestiona tus fórmulas de producción</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-200 flex items-center font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Receta
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingRecipe ? 'Editar Receta' : 'Nueva Receta'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Receta</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Producto Final</label>
                  <select
                    value={formData.product_id}
                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  >
                    <option value="">Seleccionar producto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Descripción de la receta"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rendimiento</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.yield_quantity}
                    onChange={(e) => setFormData({ ...formData, yield_quantity: parseFloat(e.target.value) || 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unidad</label>
                  <select
                    value={formData.yield_unit}
                    onChange={(e) => setFormData({ ...formData, yield_unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="unidad">Unidades</option>
                    <option value="docena">Docenas</option>
                    <option value="kg">Kilogramos</option>
                    <option value="l">Litros</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo (min)</label>
                  <input
                    type="number"
                    value={formData.preparation_time}
                    onChange={(e) => setFormData({ ...formData, preparation_time: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instrucciones</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Describe el proceso de producción paso a paso..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">Ingredientes</label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar Ingrediente
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex space-x-3 items-end p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Insumo</label>
                        <select
                          value={ingredient.input_id}
                          onChange={(e) => updateIngredient(index, 'input_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                          required
                        >
                          <option value="">Seleccionar insumo</option>
                          {inputs.map(input => (
                            <option key={input.id} value={input.id}>{input.name} ({input.unit})</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-32">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Cantidad</label>
                        <input
                          type="number"
                          step="0.01"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                          required
                        />
                      </div>
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {editingRecipe ? 'Actualizar' : 'Crear'}
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

      {/* Recipes List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Recetas</h2>
        </div>
        <div className="p-6">
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recipes.map((recipe) => {
                const product = products.find(p => p.id === recipe.product_id);
                const recipeCost = calculateRecipeCost(recipe);
                const costPerUnit = recipe.yield_quantity > 0 ? recipeCost / recipe.yield_quantity : 0;
                
                return (
                  <div key={recipe.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                        {recipe.description && (
                          <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-1" />
                            <span>{product?.name || 'Producto no asignado'}</span>
                          </div>
                          <div className="flex items-center">
                            <span>Rinde: {recipe.yield_quantity} {recipe.yield_unit}</span>
                          </div>
                          {recipe.preparation_time && recipe.preparation_time > 0 && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{recipe.preparation_time} min</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-3">Ingredientes:</h4>
                      <div className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => {
                          const input = inputs.find(i => i.id === ingredient.input_id);
                          const ingredientCost = input ? input.cost_per_unit * ingredient.quantity : 0;
                          return (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <span className="text-gray-900 font-medium">{input?.name || 'Insumo eliminado'}</span>
                                <p className="text-xs text-gray-500">${ingredientCost.toFixed(2)}</p>
                              </div>
                              <span className="text-gray-700 font-medium">{ingredient.quantity} {input?.unit}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center text-green-600 mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-medium">Costo Total</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">${recipeCost.toFixed(2)}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center text-blue-600 mb-1">
                          <span className="font-medium">Por Unidad</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">${costPerUnit.toFixed(2)}</p>
                      </div>
                    </div>

                    {recipe.instructions && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Instrucciones:</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{recipe.instructions}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChefHat className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recetas registradas</h3>
              <p className="text-gray-500 mb-6">Crea tus primeras fórmulas de producción</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Crear tu primera receta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}