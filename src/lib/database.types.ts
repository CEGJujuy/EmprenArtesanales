export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          unit: string
          current_stock: number
          min_stock: number
          cost_per_unit: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          unit: string
          current_stock?: number
          min_stock?: number
          cost_per_unit?: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          unit?: string
          current_stock?: number
          min_stock?: number
          cost_per_unit?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      inputs: {
        Row: {
          id: string
          name: string
          description: string | null
          unit: string
          current_stock: number
          min_stock: number
          cost_per_unit: number
          supplier: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          unit: string
          current_stock?: number
          min_stock?: number
          cost_per_unit?: number
          supplier?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          unit?: string
          current_stock?: number
          min_stock?: number
          cost_per_unit?: number
          supplier?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      recipes: {
        Row: {
          id: string
          name: string
          description: string | null
          yield_quantity: number
          yield_unit: string
          instructions: string | null
          preparation_time: number | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          yield_quantity: number
          yield_unit: string
          instructions?: string | null
          preparation_time?: number | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          yield_quantity?: number
          yield_unit?: string
          instructions?: string | null
          preparation_time?: number | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      recipe_ingredients: {
        Row: {
          id: string
          recipe_id: string
          input_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          input_id: string
          quantity: number
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          input_id?: string
          quantity?: number
          created_at?: string
        }
      }
      batches: {
        Row: {
          id: string
          recipe_id: string
          batch_number: string
          quantity_produced: number
          status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          start_date: string | null
          completion_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          recipe_id: string
          batch_number: string
          quantity_produced?: number
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          start_date?: string | null
          completion_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          recipe_id?: string
          batch_number?: string
          quantity_produced?: number
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          start_date?: string | null
          completion_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      batch_transactions: {
        Row: {
          id: string
          batch_id: string
          input_id: string
          quantity_used: number
          cost_per_unit: number
          total_cost: number
          created_at: string
        }
        Insert: {
          id?: string
          batch_id: string
          input_id: string
          quantity_used: number
          cost_per_unit: number
          total_cost: number
          created_at?: string
        }
        Update: {
          id?: string
          batch_id?: string
          input_id?: string
          quantity_used?: number
          cost_per_unit?: number
          total_cost?: number
          created_at?: string
        }
      }
      stock_transactions: {
        Row: {
          id: string
          type: 'input_purchase' | 'input_consumption' | 'product_production' | 'product_sale' | 'adjustment'
          reference_id: string | null
          input_id: string | null
          product_id: string | null
          quantity: number
          unit_cost: number | null
          total_cost: number | null
          notes: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          type: 'input_purchase' | 'input_consumption' | 'product_production' | 'product_sale' | 'adjustment'
          reference_id?: string | null
          input_id?: string | null
          product_id?: string | null
          quantity: number
          unit_cost?: number | null
          total_cost?: number | null
          notes?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          type?: 'input_purchase' | 'input_consumption' | 'product_production' | 'product_sale' | 'adjustment'
          reference_id?: string | null
          input_id?: string | null
          product_id?: string | null
          quantity?: number
          unit_cost?: number | null
          total_cost?: number | null
          notes?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}