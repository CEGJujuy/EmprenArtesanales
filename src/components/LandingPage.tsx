@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    font-feature-settings: "rlig\" 1, "calt\" 1;
    line-height: 1.5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 600;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  }
  
  /* Custom animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
    50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md;
  }
  
  .btn-secondary {
    @apply btn bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500;
  }
  
  .btn-success {
    @apply btn bg-success-600 text-white hover:bg-success-700 focus:ring-success-500;
  }
  
  .btn-warning {
    @apply btn bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500;
  }
  
  .btn-error {
    @apply btn bg-error-600 text-white hover:bg-error-700 focus:ring-error-500;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200;
  }
  
  .input {
  }
}