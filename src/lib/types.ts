export interface Input {
  id: string;
  name: string;
  description?: string;
  unit: string;
  stock: number;
  min_stock: number;
  cost_per_unit: number;
  supplier?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  unit: string;
  stock: number;
  min_stock: number;
  cost_per_unit: number;
  created_at: string;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  product_id: string;
  yield_quantity: number;
  yield_unit: string;
  instructions?: string;
  preparation_time?: number;
  created_at: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  input_id: string;
  quantity: number;
}

export interface Batch {
  id: string;
  recipe_id: string;
  batch_number: string;
  quantity: number;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  start_date?: string;
  completion_date?: string;
  notes?: string;
  created_at: string;
}

export interface StockTransaction {
  id: string;
  type: 'input_purchase' | 'input_consumption' | 'product_production' | 'product_sale' | 'adjustment';
  reference_id?: string;
  input_id?: string;
  product_id?: string;
  quantity: number;
  unit_cost?: number;
  total_cost?: number;
  notes?: string;
  created_at: string;
}

export interface DashboardStats {
  totalInputs: number;
  totalProducts: number;
  totalRecipes: number;
  activeBatches: number;
  lowStockInputs: number;
  recentBatches: Batch[];
}