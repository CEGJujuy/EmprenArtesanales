import { v4 as uuidv4 } from 'uuid';
import { getStorageData, setStorageData, STORAGE_KEYS } from './localStorage';
import type { Input, Product, Recipe, Batch, StockTransaction, DashboardStats } from './types';

// Inputs
export function getInputs(): Input[] {
  return getStorageData(STORAGE_KEYS.INPUTS, []);
}

export function addInput(input: Omit<Input, 'id' | 'created_at'>): Input {
  const inputs = getInputs();
  const newInput: Input = {
    ...input,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  inputs.push(newInput);
  setStorageData(STORAGE_KEYS.INPUTS, inputs);
  return newInput;
}

export function updateInput(id: string, updates: Partial<Input>): Input | null {
  const inputs = getInputs();
  const index = inputs.findIndex(input => input.id === id);
  if (index === -1) return null;
  
  inputs[index] = { ...inputs[index], ...updates };
  setStorageData(STORAGE_KEYS.INPUTS, inputs);
  return inputs[index];
}

export function deleteInput(id: string): boolean {
  const inputs = getInputs();
  const filteredInputs = inputs.filter(input => input.id !== id);
  if (filteredInputs.length === inputs.length) return false;
  
  setStorageData(STORAGE_KEYS.INPUTS, filteredInputs);
  return true;
}

// Products
export function getProducts(): Product[] {
  return getStorageData(STORAGE_KEYS.PRODUCTS, []);
}

export function addProduct(product: Omit<Product, 'id' | 'created_at'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  products.push(newProduct);
  setStorageData(STORAGE_KEYS.PRODUCTS, products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  setStorageData(STORAGE_KEYS.PRODUCTS, products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filteredProducts = products.filter(product => product.id !== id);
  if (filteredProducts.length === products.length) return false;
  
  setStorageData(STORAGE_KEYS.PRODUCTS, filteredProducts);
  return true;
}

// Recipes
export function getRecipes(): Recipe[] {
  return getStorageData(STORAGE_KEYS.RECIPES, []);
}

export function addRecipe(recipe: Omit<Recipe, 'id' | 'created_at'>): Recipe {
  const recipes = getRecipes();
  const newRecipe: Recipe = {
    ...recipe,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  recipes.push(newRecipe);
  setStorageData(STORAGE_KEYS.RECIPES, recipes);
  return newRecipe;
}

export function updateRecipe(id: string, updates: Partial<Recipe>): Recipe | null {
  const recipes = getRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index === -1) return null;
  
  recipes[index] = { ...recipes[index], ...updates };
  setStorageData(STORAGE_KEYS.RECIPES, recipes);
  return recipes[index];
}

export function deleteRecipe(id: string): boolean {
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
  if (filteredRecipes.length === recipes.length) return false;
  
  setStorageData(STORAGE_KEYS.RECIPES, filteredRecipes);
  return true;
}

// Batches
export function getBatches(): Batch[] {
  return getStorageData(STORAGE_KEYS.BATCHES, []);
}

export function addBatch(batch: Omit<Batch, 'id' | 'created_at'>): Batch {
  const batches = getBatches();
  const newBatch: Batch = {
    ...batch,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  batches.push(newBatch);
  setStorageData(STORAGE_KEYS.BATCHES, batches);
  return newBatch;
}

export function updateBatch(id: string, updates: Partial<Batch>): Batch | null {
  const batches = getBatches();
  const index = batches.findIndex(batch => batch.id === id);
  if (index === -1) return null;
  
  batches[index] = { ...batches[index], ...updates };
  setStorageData(STORAGE_KEYS.BATCHES, batches);
  return batches[index];
}

export function completeBatch(batchId: string): { success: boolean; message: string } {
  const batch = getBatches().find(b => b.id === batchId);
  if (!batch) return { success: false, message: 'Lote no encontrado' };
  
  const recipe = getRecipes().find(r => r.id === batch.recipe_id);
  if (!recipe) return { success: false, message: 'Receta no encontrada' };
  
  const inputs = getInputs();
  
  // Check if we have enough stock for all ingredients
  for (const ingredient of recipe.ingredients) {
    const input = inputs.find(i => i.id === ingredient.input_id);
    if (!input) continue;
    
    const requiredQuantity = ingredient.quantity * batch.quantity;
    if (input.stock < requiredQuantity) {
      return { 
        success: false, 
        message: `Stock insuficiente de ${input.name}. Necesario: ${requiredQuantity}${input.unit}, Disponible: ${input.stock}${input.unit}` 
      };
    }
  }
  
  // Update input stocks and create transactions
  const transactions: StockTransaction[] = [];
  
  for (const ingredient of recipe.ingredients) {
    const input = inputs.find(i => i.id === ingredient.input_id);
    if (!input) continue;
    
    const consumedQuantity = ingredient.quantity * batch.quantity;
    updateInput(input.id, { stock: input.stock - consumedQuantity });
    
    transactions.push({
      id: uuidv4(),
      type: 'production_consumption',
      input_id: input.id,
      batch_id: batchId,
      quantity: -consumedQuantity,
      notes: `Consumo para lote ${batch.id}`,
      created_at: new Date().toISOString()
    });
  }
  
  // Update product stock
  const product = getProducts().find(p => p.id === recipe.product_id);
  if (product) {
    const producedQuantity = recipe.yield_quantity * batch.quantity;
    updateProduct(product.id, { stock: product.stock + producedQuantity });
    
    transactions.push({
      id: uuidv4(),
      type: 'production_output',
      product_id: product.id,
      batch_id: batchId,
      quantity: producedQuantity,
      notes: `Producción de lote ${batch.id}`,
      created_at: new Date().toISOString()
    });
  }
  
  // Save transactions
  const existingTransactions = getStockTransactions();
  setStorageData(STORAGE_KEYS.STOCK_TRANSACTIONS, [...existingTransactions, ...transactions]);
  
  // Update batch status
  updateBatch(batchId, { 
    status: 'completed', 
    completed_at: new Date().toISOString() 
  });
  
  return { success: true, message: 'Lote completado exitosamente' };
}

// Stock Transactions
export function getStockTransactions(): StockTransaction[] {
  return getStorageData(STORAGE_KEYS.STOCK_TRANSACTIONS, []);
}

export function addStockTransaction(transaction: Omit<StockTransaction, 'id' | 'created_at'>): StockTransaction {
  const transactions = getStockTransactions();
  const newTransaction: StockTransaction = {
    ...transaction,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  transactions.push(newTransaction);
  setStorageData(STORAGE_KEYS.STOCK_TRANSACTIONS, transactions);
  return newTransaction;
}

// Dashboard Stats
export function getDashboardStats(): DashboardStats {
  const inputs = getInputs();
  const products = getProducts();
  const recipes = getRecipes();
  const batches = getBatches();
  
  const activeBatches = batches.filter(b => b.status !== 'completed').length;
  const lowStockInputs = inputs.filter(i => i.stock <= i.min_stock).length;
  const recentBatches = batches
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
  
  return {
    totalInputs: inputs.length,
    totalProducts: products.length,
    totalRecipes: recipes.length,
    activeBatches,
    lowStockInputs,
    recentBatches
  };
}

// Calculate recipe cost
export function calculateRecipeCost(recipe: Recipe): number {
  const inputs = getInputs();
  return recipe.ingredients.reduce((total, ingredient) => {
    const input = inputs.find(i => i.id === ingredient.input_id);
    return total + (input ? input.cost_per_unit * ingredient.quantity : 0);
  }, 0);
}