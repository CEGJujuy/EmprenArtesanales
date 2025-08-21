@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-gray-50 text-gray-900 font-sans;
    font-feature-settings: "rlig" 1, "calt" 1;
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
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
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
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200;
  }
  
  .nav-item {
    @apply flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer;
  }
  
  .nav-item.active {
    @apply bg-primary-100 text-primary-800 font-medium;
  }
  
  .metric-card {
    @apply card flex items-center space-x-4 p-4;
  }
  
  .metric-icon {
    @apply w-12 h-12 rounded-lg flex items-center justify-center;
  }
  
  .gradient-text {
    @apply bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent;
  }
  
  .hero-card {
    @apply bg-white rounded-2xl shadow-2xl p-8 transform transition-transform duration-300;
  }
  
  .hero-card:hover {
    @apply rotate-0;
  }
  
  .feature-card {
    @apply bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2;
  }
  
  .testimonial-card {
    @apply bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300;
  }
  
  .stat-card {
    @apply text-center;
  }
  
  .benefit-item {
    @apply flex items-center;
  }
  
  .contact-item {
    @apply flex items-center;
  }
}