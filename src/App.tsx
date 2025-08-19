import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InputsManager from './components/InputsManager';
import RecipesManager from './components/RecipesManager';
import ProductionManager from './components/ProductionManager';
import ReportsManager from './components/ReportsManager';
import { initializeSampleData } from './lib/localStorage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inputs':
        return <InputsManager />;
      case 'recipes':
        return <RecipesManager />;
      case 'production':
        return <ProductionManager />;
      case 'reports':
        return <ReportsManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;