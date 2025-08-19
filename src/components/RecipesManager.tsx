import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, Edit2, Trash2, DollarSign } from 'lucide-react';
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
    product_id: '',
    yield_quantity: 1,
    instructions: '',
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
      product_id: recipe.product_id,
      yield_quantity: recipe.yield_quantity,
      instructions: recipe.instructions,
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
      product_id: '',
      yield_quantity: 1,
      instructions: '',
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ChefHat className="h-8 w-8 mr-3 text-indigo-600" />
            Gestión de Recetas
          </h1>
          <p className="text-gray-600 mt-2">Crea y gestiona tus fórmulas de producción</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Receta
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingRecipe ? 'Editar Receta' : 'Nueva Receta'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Receta</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Producto Final</label>
                <select
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Seleccionar producto</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rendimiento (cantidad producida)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.yield_quantity}
                  onChange={(e) => setFormData({ ...formData, yield_quantity: parseFloat(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe el proceso de producción..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Ingredientes</label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    + Agregar Ingrediente
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex space-x-3 items-end">
                      <div className="flex-1">
                        <select
                          value={ingredient.input_id}
                          onChange={(e) => updateIngredient(index, 'input_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        >
                          <option value="">Seleccionar insumo</option>
                          {inputs.map(input => (
                            <option key={input.id} value={input.id}>{input.name} ({input.unit})</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          step="0.01"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                          placeholder="Cantidad"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  {editingRecipe ? 'Actualizar' : 'Crear'}
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
                
                return (
                  <div key={recipe.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
                        <p className="text-sm text-gray-600">Producto: {product?.name || 'No asignado'}</p>
                        <p className="text-sm text-gray-600">Rendimiento: {recipe.yield_quantity} unidades</p>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Ingredientes:</h4>
                      <div className="space-y-1">
                        {recipe.ingredients.map((ingredient, index) => {
                          const input = inputs.find(i => i.id === ingredient.input_id);
                          return (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{input?.name || 'Insumo eliminado'}</span>
                              <span className="text-gray-900">{ingredient.quantity} {input?.unit}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-medium">Costo: ${recipeCost.toFixed(2)}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Costo por unidad: ${(recipeCost / recipe.yield_quantity).toFixed(2)}
                      </span>
                    </div>

                    {recipe.instructions && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Instrucciones:</h4>
                        <p className="text-sm text-gray-600">{recipe.instructions}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay recetas registradas</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
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