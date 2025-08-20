// Local storage utilities for data persistence
export const STORAGE_KEYS = {
  INPUTS: 'artisan_inputs',
  PRODUCTS: 'artisan_products', 
  RECIPES: 'artisan_recipes',
  BATCHES: 'artisan_batches',
  STOCK_TRANSACTIONS: 'artisan_stock_transactions',
  USER_DATA: 'artisan_user_data'
} as const;

export function getStorageData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
}

export function setStorageData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error);
  }
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Initialize with sample data if empty
export function initializeSampleData(): void {
  const inputs = getStorageData(STORAGE_KEYS.INPUTS, []);
  
  if (inputs.length === 0) {
    // Sample inputs
    const sampleInputs = [
      {
        id: '1',
        name: 'Harina de Trigo',
        description: 'Harina 000 para panificación',
        unit: 'kg',
        stock: 50,
        min_stock: 10,
        cost_per_unit: 2.5,
        supplier: 'Molino San José',
        created_at: new Date().toISOString()
      },
      {
        id: '2', 
        name: 'Azúcar',
        description: 'Azúcar blanca refinada',
        unit: 'kg',
        stock: 25,
        min_stock: 5,
        cost_per_unit: 3.0,
        supplier: 'Ingenio La Esperanza',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Huevos',
        description: 'Huevos frescos de granja',
        unit: 'unidad',
        stock: 100,
        min_stock: 20,
        cost_per_unit: 0.5,
        supplier: 'Granja Los Álamos',
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Manteca',
        description: 'Manteca sin sal',
        unit: 'kg',
        stock: 15,
        min_stock: 3,
        cost_per_unit: 8.0,
        supplier: 'Lácteos del Valle',
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Levadura',
        description: 'Levadura fresca de panadería',
        unit: 'kg',
        stock: 2,
        min_stock: 0.5,
        cost_per_unit: 12.0,
        supplier: 'Distribuidora Panadera',
        created_at: new Date().toISOString()
      }
    ];

    // Sample products
    const sampleProducts = [
      {
        id: '1',
        name: 'Pan Artesanal',
        description: 'Pan casero tradicional',
        unit: 'unidad',
        stock: 0,
        min_stock: 5,
        cost_per_unit: 0,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Torta de Chocolate',
        description: 'Torta húmeda de chocolate',
        unit: 'unidad', 
        stock: 0,
        min_stock: 2,
        cost_per_unit: 0,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Galletas de Manteca',
        description: 'Galletas caseras tradicionales',
        unit: 'docena',
        stock: 0,
        min_stock: 3,
        cost_per_unit: 0,
        created_at: new Date().toISOString()
      }
    ];

    // Sample recipes
    const sampleRecipes = [
      {
        id: '1',
        name: 'Pan Artesanal Tradicional',
        description: 'Receta clásica de pan casero',
        product_id: '1',
        yield_quantity: 10,
        yield_unit: 'unidad',
        instructions: '1. Mezclar harina con levadura\n2. Agregar agua tibia gradualmente\n3. Amasar durante 10 minutos\n4. Dejar fermentar 1 hora\n5. Formar panes y hornear a 200°C por 25 minutos',
        preparation_time: 180,
        created_at: new Date().toISOString(),
        ingredients: [
          { input_id: '1', quantity: 2 }, // Harina
          { input_id: '5', quantity: 0.05 }, // Levadura
          { input_id: '2', quantity: 0.1 } // Azúcar
        ]
      },
      {
        id: '2',
        name: 'Torta de Chocolate Húmeda',
        description: 'Torta esponjosa con cobertura de chocolate',
        product_id: '2',
        yield_quantity: 1,
        yield_unit: 'unidad',
        instructions: '1. Batir manteca con azúcar\n2. Agregar huevos de a uno\n3. Incorporar harina tamizada\n4. Hornear a 180°C por 45 minutos\n5. Enfriar antes de desmoldar',
        preparation_time: 90,
        created_at: new Date().toISOString(),
        ingredients: [
          { input_id: '1', quantity: 0.5 }, // Harina
          { input_id: '2', quantity: 0.3 }, // Azúcar
          { input_id: '3', quantity: 4 }, // Huevos
          { input_id: '4', quantity: 0.2 } // Manteca
        ]
      },
      {
        id: '3',
        name: 'Galletas de Manteca',
        description: 'Galletas crujientes tradicionales',
        product_id: '3',
        yield_quantity: 2,
        yield_unit: 'docena',
        instructions: '1. Cremar manteca con azúcar\n2. Agregar huevos\n3. Incorporar harina\n4. Formar galletas\n5. Hornear a 170°C por 15 minutos',
        preparation_time: 60,
        created_at: new Date().toISOString(),
        ingredients: [
          { input_id: '1', quantity: 0.3 }, // Harina
          { input_id: '2', quantity: 0.2 }, // Azúcar
          { input_id: '3', quantity: 2 }, // Huevos
          { input_id: '4', quantity: 0.15 } // Manteca
        ]
      }
    ];

    setStorageData(STORAGE_KEYS.INPUTS, sampleInputs);
    setStorageData(STORAGE_KEYS.PRODUCTS, sampleProducts);
    setStorageData(STORAGE_KEYS.RECIPES, sampleRecipes);
    setStorageData(STORAGE_KEYS.BATCHES, []);
    setStorageData(STORAGE_KEYS.STOCK_TRANSACTIONS, []);
  }
}