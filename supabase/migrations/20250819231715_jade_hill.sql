/*
  # Sistema de Gestión de Producción Artesanal - Esquema Inicial

  1. Nuevas Tablas
    - `products` - Catálogo de productos terminados
      - `id` (uuid, clave primaria)
      - `name` (texto, nombre del producto)
      - `description` (texto, descripción opcional)
      - `unit` (texto, unidad de medida)
      - `current_stock` (numérico, stock actual)
      - `min_stock` (numérico, stock mínimo)
      - `cost_per_unit` (numérico, costo por unidad)
      - `created_at`, `updated_at` (timestamps)
      - `user_id` (uuid, referencia al usuario)

    - `inputs` - Inventario de materias primas e ingredientes
      - `id` (uuid, clave primaria)
      - `name` (texto, nombre del insumo)
      - `description` (texto, descripción opcional)
      - `unit` (texto, unidad de medida)
      - `current_stock` (numérico, stock actual)
      - `min_stock` (numérico, stock mínimo)
      - `cost_per_unit` (numérico, costo por unidad)
      - `supplier` (texto, proveedor opcional)
      - `created_at`, `updated_at` (timestamps)
      - `user_id` (uuid, referencia al usuario)

    - `recipes` - Fórmulas de producción
      - `id` (uuid, clave primaria)
      - `name` (texto, nombre de la receta)
      - `description` (texto, descripción opcional)
      - `yield_quantity` (numérico, cantidad que produce)
      - `yield_unit` (texto, unidad del rendimiento)
      - `instructions` (texto, instrucciones de preparación)
      - `preparation_time` (entero, tiempo en minutos)
      - `created_at`, `updated_at` (timestamps)
      - `user_id` (uuid, referencia al usuario)

    - `recipe_ingredients` - Ingredientes de cada receta
      - `id` (uuid, clave primaria)
      - `recipe_id` (uuid, referencia a receta)
      - `input_id` (uuid, referencia a insumo)
      - `quantity` (numérico, cantidad requerida)
      - `created_at` (timestamp)

    - `batches` - Lotes de producción
      - `id` (uuid, clave primaria)
      - `recipe_id` (uuid, referencia a receta)
      - `batch_number` (texto, número de lote único)
      - `quantity_produced` (numérico, cantidad producida)
      - `status` (enum: planned, in_progress, completed, cancelled)
      - `start_date`, `completion_date` (timestamps opcionales)
      - `notes` (texto, notas del lote)
      - `created_at`, `updated_at` (timestamps)
      - `user_id` (uuid, referencia al usuario)

    - `batch_transactions` - Transacciones de lotes
      - `id` (uuid, clave primaria)
      - `batch_id` (uuid, referencia al lote)
      - `input_id` (uuid, referencia al insumo)
      - `quantity_used` (numérico, cantidad utilizada)
      - `cost_per_unit` (numérico, costo por unidad)
      - `total_cost` (numérico, costo total)
      - `created_at` (timestamp)

    - `stock_transactions` - Historial de movimientos de stock
      - `id` (uuid, clave primaria)
      - `type` (enum: input_purchase, input_consumption, product_production, product_sale, adjustment)
      - `reference_id` (uuid, referencia opcional)
      - `input_id`, `product_id` (uuid, referencias opcionales)
      - `quantity` (numérico, cantidad del movimiento)
      - `unit_cost`, `total_cost` (numérico, costos opcionales)
      - `notes` (texto, notas opcionales)
      - `created_at` (timestamp)
      - `user_id` (uuid, referencia al usuario)

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para que usuarios solo accedan a sus propios datos
    - Políticas de lectura, inserción, actualización y eliminación

  3. Índices
    - Índices en claves foráneas para mejor rendimiento
    - Índices en campos de búsqueda frecuente
*/

-- Crear tabla de productos terminados
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  unit text NOT NULL,
  current_stock numeric DEFAULT 0,
  min_stock numeric DEFAULT 0,
  cost_per_unit numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Crear tabla de insumos
CREATE TABLE IF NOT EXISTS inputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  unit text NOT NULL,
  current_stock numeric DEFAULT 0,
  min_stock numeric DEFAULT 0,
  cost_per_unit numeric DEFAULT 0,
  supplier text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Crear tabla de recetas
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  yield_quantity numeric NOT NULL DEFAULT 1,
  yield_unit text NOT NULL,
  instructions text,
  preparation_time integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Crear tabla de ingredientes de recetas
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  input_id uuid NOT NULL REFERENCES inputs(id) ON DELETE CASCADE,
  quantity numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, input_id)
);

-- Crear tipo enum para estado de lotes
DO $$ BEGIN
  CREATE TYPE batch_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Crear tabla de lotes
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  batch_number text NOT NULL,
  quantity_produced numeric DEFAULT 0,
  status batch_status DEFAULT 'planned',
  start_date timestamptz,
  completion_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE(batch_number, user_id)
);

-- Crear tabla de transacciones de lotes
CREATE TABLE IF NOT EXISTS batch_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  input_id uuid NOT NULL REFERENCES inputs(id) ON DELETE CASCADE,
  quantity_used numeric NOT NULL,
  cost_per_unit numeric NOT NULL,
  total_cost numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Crear tipo enum para tipos de transacciones de stock
DO $$ BEGIN
  CREATE TYPE stock_transaction_type AS ENUM (
    'input_purchase', 
    'input_consumption', 
    'product_production', 
    'product_sale', 
    'adjustment'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Crear tabla de transacciones de stock
CREATE TABLE IF NOT EXISTS stock_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type stock_transaction_type NOT NULL,
  reference_id uuid,
  input_id uuid REFERENCES inputs(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity numeric NOT NULL,
  unit_cost numeric,
  total_cost numeric,
  notes text,
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Habilitar RLS en todas las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para productos
CREATE POLICY "Users can manage their own products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para insumos
CREATE POLICY "Users can manage their own inputs"
  ON inputs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para recetas
CREATE POLICY "Users can manage their own recipes"
  ON recipes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para ingredientes de recetas
CREATE POLICY "Users can manage recipe ingredients for their recipes"
  ON recipe_ingredients
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE recipes.id = recipe_ingredients.recipe_id 
      AND recipes.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recipes 
      WHERE recipes.id = recipe_ingredients.recipe_id 
      AND recipes.user_id = auth.uid()
    )
  );

-- Políticas para lotes
CREATE POLICY "Users can manage their own batches"
  ON batches
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para transacciones de lotes
CREATE POLICY "Users can view batch transactions for their batches"
  ON batch_transactions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM batches 
      WHERE batches.id = batch_transactions.batch_id 
      AND batches.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM batches 
      WHERE batches.id = batch_transactions.batch_id 
      AND batches.user_id = auth.uid()
    )
  );

-- Políticas para transacciones de stock
CREATE POLICY "Users can manage their own stock transactions"
  ON stock_transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_inputs_user_id ON inputs(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_input_id ON recipe_ingredients(input_id);
CREATE INDEX IF NOT EXISTS idx_batches_user_id ON batches(user_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
CREATE INDEX IF NOT EXISTS idx_batch_transactions_batch_id ON batch_transactions(batch_id);
CREATE INDEX IF NOT EXISTS idx_stock_transactions_user_id ON stock_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_stock_transactions_type ON stock_transactions(type);
CREATE INDEX IF NOT EXISTS idx_stock_transactions_created_at ON stock_transactions(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
DO $$ BEGIN
  CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_inputs_updated_at 
    BEFORE UPDATE ON inputs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_recipes_updated_at 
    BEFORE UPDATE ON recipes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_batches_updated_at 
    BEFORE UPDATE ON batches 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;