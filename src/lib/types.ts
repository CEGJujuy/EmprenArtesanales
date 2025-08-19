export interface Input {
  id: string;
  name: string;
  unit: string;
  stock: number;
  min_stock: number;
  cost_per_unit: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  stock: number;
  price: number;
  created_at: string;
}

export interface Recipe {
  id: string;
  name: string;
  product_id: string;
  yield_quantity: number;
  instructions: string;
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
  quantity: number;
  status: 'planned' | 'in_progress' | 'completed';
  notes?: string;
  created_at: string;
  completed_at?: string;
}

export interface StockTransaction {
  id: string;
  type: 'input_adjustment' | 'production_consumption' | 'production_output';
  input_id?: string;
  product_id?: string;
  batch_id?: string;
  quantity: number;
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