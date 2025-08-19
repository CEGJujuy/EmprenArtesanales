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
        unit: 'kg',
        stock: 50,
        min_stock: 10,
        cost_per_unit: 2.5,
        created_at: new Date().toISOString()
      },
      {
        id: '2', 
        name: 'Azúcar',
        unit: 'kg',
        stock: 25,
        min_stock: 5,
        cost_per_unit: 3.0,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Huevos',
        unit: 'unidad',
        stock: 100,
        min_stock: 20,
        cost_per_unit: 0.5,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Manteca',
        unit: 'kg',
        stock: 15,
        min_stock: 3,
        cost_per_unit: 8.0,
        created_at: new Date().toISOString()
      }
    ];

    // Sample products
    const sampleProducts = [
      {
        id: '1',
        name: 'Pan Artesanal',
        unit: 'unidad',
        stock: 0,
        price: 12.0,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Torta de Chocolate',
        unit: 'unidad', 
        stock: 0,
        price: 45.0,
        created_at: new Date().toISOString()
      }
    ];

    // Sample recipes
    const sampleRecipes = [
      {
        id: '1',
        name: 'Pan Artesanal',
        product_id: '1',
        yield_quantity: 10,
        instructions: 'Mezclar ingredientes, amasar, fermentar y hornear',
        created_at: new Date().toISOString(),
        ingredients: [
          { input_id: '1', quantity: 2 }, // Harina
          { input_id: '2', quantity: 0.2 }, // Azúcar
          { input_id: '3', quantity: 2 } // Huevos
        ]
      },
      {
        id: '2',
        name: 'Torta de Chocolate',
        product_id: '2',
        yield_quantity: 1,
        instructions: 'Batir ingredientes, hornear a 180°C por 45 minutos',
        created_at: new Date().toISOString(),
        ingredients: [
          { input_id: '1', quantity: 0.5 }, // Harina
          { input_id: '2', quantity: 0.3 }, // Azúcar
          { input_id: '3', quantity: 4 }, // Huevos
          { input_id: '4', quantity: 0.2 } // Manteca
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