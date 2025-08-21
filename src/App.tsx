import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InputsManager from './components/InputsManager';
import ProductsManager from './components/ProductsManager';
import RecipesManager from './components/RecipesManager';
import ProductionManager from './components/ProductionManager';
import ReportsManager from './components/ReportsManager';
import { initializeSampleData } from './lib/localStorage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inputs':
        return <InputsManager />;
      case 'products':
        return <ProductsManager />;
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

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;