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