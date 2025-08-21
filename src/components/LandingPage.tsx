import React, { useState } from 'react';
import { 
  Factory, 
  Package, 
  ChefHat, 
  BarChart3, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Award,
  Zap,
  Target,
  Globe,
  Mail,
  Phone,
  Play,
  Sparkles,
  Rocket,
  Heart,
  Coffee,
  Cake,
  Scissors,
  Palette
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Package,
      title: 'Gestión Inteligente de Inventario',
      description: 'Control total de materias primas con alertas automáticas, predicciones de stock y optimización de compras.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: ChefHat,
      title: 'Recetas Digitales Avanzadas',
      description: 'Crea fórmulas perfectas con cálculo automático de costos, escalado inteligente y control de calidad.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Factory,
      title: 'Producción Optimizada',
      description: 'Planifica, monitorea y optimiza cada lote de producción con seguimiento en tiempo real.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: BarChart3,
      title: 'Analytics Empresarial',
      description: 'Dashboards interactivos con métricas clave, tendencias y reportes para decisiones inteligentes.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Shield,
      title: 'Seguridad Empresarial',
      description: 'Protección de datos nivel bancario, respaldos automáticos y cumplimiento normativo.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Zap,
      title: 'Automatización Inteligente',
      description: 'Workflows automáticos que ahorran tiempo y eliminan errores humanos en tu operación.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const industries = [
    {
      icon: Coffee,
      name: 'Cafeterías & Tostadores',
      description: 'Gestión perfecta de granos, mezclas y productos terminados',
      color: 'from-amber-600 to-orange-600',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      icon: Cake,
      name: 'Panaderías & Pastelerías',
      description: 'Control total de ingredientes, recetas y producción diaria',
      color: 'from-pink-500 to-rose-500',
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      icon: Heart,
      name: 'Cosméticos Naturales',
      description: 'Trazabilidad completa de ingredientes y lotes de producción',
      color: 'from-emerald-500 to-teal-500',
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      icon: Palette,
      name: 'Artesanías & Manualidades',
      description: 'Organización perfecta de materiales y proyectos creativos',
      color: 'from-violet-500 to-purple-500',
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const testimonials = [
    {
      name: 'María Elena Rodríguez',
      company: 'Panadería Artesanal "El Trigal"',
      role: 'Propietaria',
      text: 'Increíble cómo EmprenArtesanales transformó nuestra operación. Redujimos desperdicios en 35% y aumentamos la rentabilidad significativamente.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: '+35% Rentabilidad'
    },
    {
      name: 'Carlos Mendoza',
      company: 'Cervecería Craft "Montaña Dorada"',
      role: 'Maestro Cervecero',
      text: 'La gestión de recetas y control de lotes nos permitió escalar la producción manteniendo la calidad excepcional que nos caracteriza.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: '3x Producción'
    },
    {
      name: 'Ana Sofía Vargas',
      company: 'Cosméticos Naturales "Verde Vida"',
      role: 'Directora de Operaciones',
      text: 'Los reportes detallados y el control de costos nos dieron la visibilidad necesaria para tomar decisiones estratégicas acertadas.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      results: '-40% Costos'
    }
  ];

  const stats = [
    { number: '1,200+', label: 'Empresas Activas', icon: Factory },
    { number: '99.9%', label: 'Uptime Garantizado', icon: Shield },
    { number: '45%', label: 'Reducción Promedio Costos', icon: TrendingUp },
    { number: '24/7', label: 'Soporte Premium', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EmprenArtesanales
                </h1>
                <p className="text-sm text-gray-600 font-medium">Sistema de Gestión Profesional</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg">
                  Características
                </a>
                <a href="#industries" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg">
                  Industrias
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg">
                  Casos de Éxito
                </a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg">
                  Contacto
                </a>
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Comenzar Gratis
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#features" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                Características
              </a>
              <a href="#industries" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                Industrias
              </a>
              <a href="#testimonials" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                Casos de Éxito
              </a>
              <a href="#contact" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                Contacto
              </a>
              <button
                onClick={onGetStarted}
                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Comenzar Gratis
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 lg:py-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
                <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                #1 en Gestión Artesanal Profesional
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                Revoluciona tu
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Producción Artesanal
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed font-medium">
                La plataforma más avanzada para optimizar inventarios, controlar producción y 
                <span className="text-indigo-600 font-bold"> maximizar rentabilidad</span> en tu negocio artesanal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 flex items-center justify-center"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Comenzar Gratis Ahora
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-3 border-indigo-600 text-indigo-600 px-10 py-5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Play className="mr-3 h-6 w-6" />
                  Ver Demo en Vivo
                </button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold">Prueba gratuita 30 días</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold">Sin compromiso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold">Soporte 24/7</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Dashboard Ejecutivo</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-6 w-6" />
                        <span className="text-xs bg-green-400 px-2 py-1 rounded-full text-green-900 font-bold">+24%</span>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Rentabilidad</p>
                      <p className="text-2xl font-black">$47,250</p>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Factory className="h-6 w-6" />
                        <span className="text-xs bg-blue-400 px-2 py-1 rounded-full text-blue-900 font-bold">18</span>
                      </div>
                      <p className="text-sm opacity-90 mb-1">Lotes Activos</p>
                      <p className="text-2xl font-black">94%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      <div>
                        <span className="font-bold text-gray-900">Harina Premium</span>
                        <p className="text-xs text-gray-600">Stock óptimo</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-black text-lg">87%</span>
                      <p className="text-xs text-gray-500">245 kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                      <div>
                        <span className="font-bold text-gray-900">Azúcar Orgánica</span>
                        <p className="text-xs text-gray-600">Reposición sugerida</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-yellow-600 font-black text-lg">34%</span>
                      <p className="text-xs text-gray-500">67 kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                      <div>
                        <span className="font-bold text-gray-900">Levadura Fresca</span>
                        <p className="text-xs text-gray-600">¡Comprar urgente!</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-black text-lg">8%</span>
                      <p className="text-xs text-gray-500">2.4 kg</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-bold text-sm">Lote Completado</p>
                    <p className="text-xs opacity-90">Pan Artesanal x50</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-xl animate-pulse">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-bold text-sm">+32% Eficiencia</p>
                    <p className="text-xs opacity-90">Este mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-6 mb-4 group-hover:bg-opacity-20 transition-all duration-300">
                  <stat.icon className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 font-semibold text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Zap className="h-5 w-5 mr-2" />
              Tecnología de Vanguardia
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Características que
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transforman Negocios
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Descubre las herramientas más avanzadas diseñadas específicamente para productores artesanales que buscan la excelencia operativa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-r ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                      <span>Explorar característica</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Perfecto para
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Múltiples Industrias
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Adaptado específicamente para las necesidades únicas de cada sector artesanal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-w-1 aspect-h-1 h-80">
                  <img 
                    src={industry.image} 
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-2 w-fit mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                    <industry.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Casos de Éxito
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Reales y Verificados
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Empresarios reales compartiendo sus resultados extraordinarios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  {/* Stars */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      <div className="text-gray-500 text-sm">{testimonial.company}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {testimonial.results}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
            <Rocket className="h-5 w-5 mr-2" />
            ¡Oferta Limitada por Tiempo Limitado!
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
            ¿Listo para Transformar
            <span className="block">tu Negocio?</span>
          </h2>
          
          <p className="text-2xl text-white opacity-90 mb-12 leading-relaxed">
            Únete a más de 1,200 empresas que ya revolucionaron su producción artesanal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="group bg-white text-indigo-600 px-12 py-6 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 flex items-center"
            >
              <Sparkles className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" />
              Comenzar Gratis Ahora
              <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="text-white text-center">
              <div className="text-sm opacity-75 mb-1">Más de</div>
              <div className="text-3xl font-black">1,200</div>
              <div className="text-sm opacity-75">empresas confían en nosotros</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-white opacity-75 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">30 días gratis</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Configuración en 5 minutos</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-black text-white mb-8">
                Hablemos de tu
                <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Transformación
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tu negocio artesanal.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Email Directo</div>
                    <div className="text-gray-300 text-lg">gonzalezeduardo_31@hotmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">WhatsApp Business</div>
                    <div className="text-gray-300 text-lg">+54 93884 858-907</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Fundador & CEO</div>
                    <div className="text-gray-300 text-lg">César Eduardo González</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-700">
              <h3 className="text-3xl font-bold text-white mb-8">Solicita tu Demo Personalizada</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="tu@empresa.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3">
                    Tipo de Negocio
                  </label>
                  <select className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300">
                    <option>Panadería / Pastelería</option>
                    <option>Cervecería Artesanal</option>
                    <option>Cosméticos Naturales</option>
                    <option>Productos Alimenticios</option>
                    <option>Artesanías</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3">
                    Cuéntanos sobre tu desafío
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Describe tu situación actual y qué te gustaría mejorar..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  Solicitar Demo Gratuita
                  <ArrowRight className="ml-3 h-6 w-6" />
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  <span className="text-green-400 font-semibold">✓</span> Respuesta en menos de 2 horas
                  <span className="mx-3">•</span>
                  <span className="text-green-400 font-semibold">✓</span> Demo personalizada
                  <span className="mx-3">•</span>
                  <span className="text-green-400 font-semibold">✓</span> Sin compromiso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-2xl mr-4">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-white font-black text-xl">EmprenArtesanales</div>
                <div className="text-gray-400 text-sm">Transformando la producción artesanal</div>
              </div>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-lg mb-2">© 2025 EmprenArtesanales. Todos los derechos reservados.</p>
              <p className="text-sm">
                Desarrollado con <Heart className="inline h-4 w-4 text-red-500 mx-1" /> por 
                <span className="text-white font-semibold ml-1">César Eduardo González</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}