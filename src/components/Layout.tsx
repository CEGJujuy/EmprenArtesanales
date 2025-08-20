import React, { useState } from 'react';
import { BarChart3, Package, ChefHat, Factory, Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  onSignOut?: () => void;
}

export default function Layout({ children, currentView, onViewChange, onSignOut }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Panel Principal', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'inputs', name: 'Insumos', icon: Package, color: 'text-blue-600' },
    { id: 'products', name: 'Productos', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'recipes', name: 'Recetas', icon: ChefHat, color: 'text-purple-600' },
    { id: 'production', name: 'Producción', icon: Factory, color: 'text-orange-600' },
    { id: 'reports', name: 'Reportes', icon: BarChart3, color: 'text-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="text-white">
            <h1 className="text-xl font-bold">EmprenArtesanales</h1>
            <p className="text-indigo-100 text-sm">Sistema de Gestión</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-4 text-left rounded-xl transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-lg mr-4 ${
                  currentView === item.id ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <item.icon className={`h-6 w-6 ${
                    currentView === item.id ? item.color : 'text-gray-500'
                  }`} />
                </div>
                <span className="font-medium text-base">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          )}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">César Eduardo González</p>
            <p className="text-xs text-gray-400">gonzalezeduardo_31@hotmail.com</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}