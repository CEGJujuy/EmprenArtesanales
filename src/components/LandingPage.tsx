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
  Phone
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Package,
      title: 'Gestión de Inventario',
      description: 'Control total de materias primas con alertas automáticas de stock bajo y seguimiento en tiempo real.',
      color: 'bg-blue-500'
    },
    {
      icon: ChefHat,
      title: 'Recetas Inteligentes',
      description: 'Crea y gestiona fórmulas de producción con cálculo automático de costos y rendimientos.',
      color: 'bg-purple-500'
    },
    {
      icon: Factory,
      title: 'Control de Producción',
      description: 'Planifica y monitorea lotes de producción desde el inicio hasta la finalización.',
      color: 'bg-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Análisis Avanzado',
      description: 'Reportes detallados y métricas clave para optimizar tu operación y rentabilidad.',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Datos protegidos con autenticación segura y respaldos automáticos en la nube.',
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Tiempo Real',
      description: 'Actualizaciones instantáneas de stock, producción y métricas de rendimiento.',
      color: 'bg-indigo-500'
    }
  ];

  const benefits = [
    'Reduce desperdicios hasta un 30%',
    'Optimiza costos de producción',
    'Mejora la planificación de compras',
    'Aumenta la eficiencia operativa',
    'Garantiza trazabilidad completa',
    'Facilita el cumplimiento normativo'
  ];

  const testimonials = [
    {
      name: 'María González',
      company: 'Panadería Artesanal La Esperanza',
      text: 'Desde que implementamos EmprenArtesanales, hemos reducido nuestros desperdicios en un 25% y optimizado completamente nuestros procesos.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Cervecería Craft Beer Co.',
      text: 'La gestión de recetas y control de lotes nos ha permitido mantener la consistencia en todos nuestros productos. Excelente herramienta.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'Cosméticos Naturales Verde',
      text: 'El sistema de reportes nos da insights valiosos sobre nuestros costos y nos ayuda a tomar mejores decisiones comerciales.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Empresas Confiando' },
    { number: '98%', label: 'Satisfacción Cliente' },
    { number: '30%', label: 'Reducción Desperdicios' },
    { number: '24/7', label: 'Soporte Técnico' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">EmprenArtesanales</h1>
                <p className="text-xs text-gray-600">Sistema de Gestión</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Características
                </a>
                <a href="#benefits" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Beneficios
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Testimonios
                </a>
                <a href="#contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Contacto
                </a>
                <button
                  onClick={onGetStarted}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">
                Características
              </a>
              <a href="#benefits" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">
                Beneficios
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">
                Testimonios
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">
                Contacto
              </a>
              <button
                onClick={onGetStarted}
                className="w-full mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Comenzar Ahora
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4 mr-2" />
                Solución Líder en Gestión Artesanal
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transforma tu
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Producción Artesanal</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Sistema integral de gestión que optimiza tu inventario, controla la producción y maximiza la rentabilidad de tu negocio artesanal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
                >
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 font-semibold text-lg">
                  Ver Demo
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Sin tarjeta de crédito
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Configuración en 5 minutos
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Panel de Control</h3>
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <p className="text-sm opacity-90">Lotes Activos</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <p className="text-sm opacity-90">Eficiencia</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium">Harina de Trigo</span>
                    </div>
                    <span className="text-green-600 font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="font-medium">Azúcar</span>
                    </div>
                    <span className="text-yellow-600 font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="font-medium">Levadura</span>
                    </div>
                    <span className="text-red-600 font-bold">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características Poderosas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para gestionar tu producción artesanal de manera profesional y eficiente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Resultados que Transforman tu Negocio
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Empresas como la tuya han logrado mejoras significativas implementando nuestro sistema de gestión.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button
                  onClick={onGetStarted}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Comenzar Transformación
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-900 mb-2">30%</div>
                <div className="text-blue-700 font-medium">Reducción de Costos</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-900 mb-2">50%</div>
                <div className="text-green-700 font-medium">Menos Tiempo Admin</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-900 mb-2">95%</div>
                <div className="text-purple-700 font-medium">Precisión Inventario</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-orange-900 mb-2">24/7</div>
                <div className="text-orange-700 font-medium">Acceso Total</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-gray-600">
              Empresas reales, resultados reales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Revolucionar tu Producción?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Únete a cientos de empresas que ya optimizaron sus procesos con EmprenArtesanales
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-indigo-600 px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Comenzar Ahora - Es Gratis
          </button>
          <p className="text-indigo-200 mt-4 text-sm">
            No se requiere tarjeta de crédito • Configuración en 5 minutos
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Contacta con Nosotros
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte a encontrar la mejor solución para tu negocio.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-indigo-600 rounded-lg p-3 mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">gonzalezeduardo_31@hotmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-600 rounded-lg p-3 mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Teléfono</div>
                    <div className="text-gray-300">+54 93884 858-907</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-600 rounded-lg p-3 mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Desarrollador</div>
                    <div className="text-gray-300">César Eduardo González</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Solicita una Demo</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tu empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Cuéntanos sobre tu negocio..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg mr-3">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">EmprenArtesanales</div>
                <div className="text-gray-400 text-sm">Sistema de Gestión</div>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>© 2025 EmprenArtesanales. Todos los derechos reservados.</p>
              <p className="mt-1">Desarrollado por César Eduardo González</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}