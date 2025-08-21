import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Shield, 
  Zap, 
  Target,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  User,
  MessageSquare,
  Award,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactSubmission extends FormData {
  id: string;
  timestamp: string;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Local database functions
  const saveToLocalDB = (data: ContactSubmission) => {
    const existingData = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    existingData.push(data);
    localStorage.setItem('contact_submissions', JSON.stringify(existingData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage('Por favor completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitMessage('Por favor ingresa un email válido');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const submission: ContactSubmission = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      saveToLocalDB(submission);
      
      setSubmitMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const benefits = [
    {
      icon: Rocket,
      title: 'Crecimiento Acelerado',
      description: 'Impulsa tu negocio con herramientas diseñadas para maximizar tu productividad y eficiencia operativa.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description: 'Protección de datos nivel empresarial con respaldos automáticos y encriptación de extremo a extremo.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Automatización Inteligente',
      description: 'Automatiza procesos repetitivos y enfócate en lo que realmente importa: hacer crecer tu empresa.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Resultados Medibles',
      description: 'Analytics avanzados y reportes detallados para tomar decisiones basadas en datos reales.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, Innovación Digital',
      text: 'Esta plataforma transformó completamente nuestra operación. Aumentamos la eficiencia en un 40% en solo 3 meses.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Director de Operaciones, TechCorp',
      text: 'La mejor inversión que hemos hecho. El ROI fue inmediato y el soporte técnico es excepcional.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Fundadora, StartupXYZ',
      text: 'Increíble cómo simplificaron procesos complejos. Ahora podemos escalar sin preocuparnos por la operación.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Empresas Activas', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '45%', label: 'Aumento Promedio ROI', icon: TrendingUp },
    { number: '150+', label: 'Países', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-3 rounded-2xl shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-blue-900">EmprenArtesanales</h1>
                <p className="text-sm text-gray-600 font-medium">Soluciones Empresariales</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">
                Beneficios
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">
                Testimonios
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors">
                Contacto
              </a>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Comenzar Ahora
              </button>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a href="#benefits" className="block px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg font-semibold">
                Beneficios
              </a>
              <a href="#testimonials" className="block px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg font-semibold">
                Testimonios
              </a>
              <a href="#contact" className="block px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg font-semibold">
                Contacto
              </a>
              <button
                onClick={onGetStarted}
                className="w-full mt-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 rounded-full font-semibold"
              >
                Comenzar Ahora
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Award className="h-5 w-5 mr-2 text-yellow-400" />
                #1 Plataforma Empresarial 2024
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                Transforma tu
                <span className="block bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                  Negocio Hoy
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
                La plataforma más avanzada para optimizar procesos, aumentar productividad y 
                <span className="text-yellow-400 font-bold"> maximizar resultados</span> en tu empresa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center justify-center"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Quiero más info
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#contact"
                  className="group border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 font-bold text-lg flex items-center justify-center"
                >
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Contactar Ahora
                </a>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-blue-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="font-semibold">Demo gratuita</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="font-semibold">Sin compromiso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="font-semibold">Soporte 24/7</span>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Dashboard mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Dashboard Ejecutivo</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                      <TrendingUp className="h-6 w-6 mb-2 text-green-400" />
                      <p className="text-sm opacity-90 mb-1">Crecimiento</p>
                      <p className="text-2xl font-black">+47%</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                      <Users className="h-6 w-6 mb-2 text-cyan-400" />
                      <p className="text-sm opacity-90 mb-1">Usuarios</p>
                      <p className="text-2xl font-black">12.5K</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Ventas', value: '94%', color: 'bg-green-500' },
                    { label: 'Productividad', value: '87%', color: 'bg-blue-500' },
                    { label: 'Satisfacción', value: '96%', color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-700">{item.label}</span>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                          <div className={`h-2 ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.value }}></div>
                        </div>
                        <span className="font-bold text-gray-900">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating notification */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <div>
                    <p className="font-bold text-sm">¡Objetivo Alcanzado!</p>
                    <p className="text-xs opacity-90">ROI +150%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center scroll-reveal">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-4 hover:shadow-lg transition-all duration-300">
                  <stat.icon className="h-12 w-12 text-blue-900 mx-auto mb-4" />
                  <div className="text-4xl font-black text-blue-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl font-black text-blue-900 mb-6">
              Beneficios que
              <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Transforman Empresas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestra plataforma puede revolucionar la forma en que trabajas y alcanzas tus objetivos empresariales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="scroll-reveal group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className={`bg-gradient-to-r ${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl font-black text-blue-900 mb-6">
              Lo que Dicen
              <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Nuestros Clientes
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Testimonios reales de empresas que transformaron sus resultados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="scroll-reveal">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
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
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-blue-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="scroll-reveal">
              <h2 className="text-5xl font-black text-white mb-8">
                ¿Listo para
                <span className="block bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                  Comenzar?
                </span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Email</div>
                    <div className="text-blue-200 text-lg">gonzalezeduardo_31@hotmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Teléfono</div>
                    <div className="text-blue-200 text-lg">+54 93884 858-907</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Ubicación</div>
                    <div className="text-blue-200 text-lg">Argentina</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-reveal">
              <div className="bg-white rounded-3xl p-10 shadow-2xl">
                <h3 className="text-3xl font-bold text-blue-900 mb-8">Envíanos un Mensaje</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <User className="inline h-4 w-4 mr-2" />
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <MessageSquare className="inline h-4 w-4 mr-2" />
                      Mensaje
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-5 rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    ) : (
                      <Send className="mr-3 h-6 w-6" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                  
                  {submitMessage && (
                    <div className={`p-4 rounded-2xl text-center font-semibold ${
                      submitMessage.includes('exitosamente') 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl mr-4">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-xl">EmprenArtesanales</div>
                  <div className="text-blue-300 text-sm">Transformando empresas</div>
                </div>
              </div>
              <p className="text-blue-200 leading-relaxed">
                La plataforma líder en soluciones empresariales para el crecimiento y optimización de procesos.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Enlaces Rápidos</h4>
              <div className="space-y-3">
                <a href="#benefits" className="block text-blue-200 hover:text-white transition-colors">Beneficios</a>
                <a href="#testimonials" className="block text-blue-200 hover:text-white transition-colors">Testimonios</a>
                <a href="#contact" className="block text-blue-200 hover:text-white transition-colors">Contacto</a>
                <button onClick={onGetStarted} className="block text-blue-200 hover:text-white transition-colors">Comenzar</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="h-6 w-6 text-white" />
                </a>
                <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Twitter className="h-6 w-6 text-white" />
                </a>
                <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Instagram className="h-6 w-6 text-white" />
                </a>
                <a href="#" className="bg-blue-800 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Linkedin className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-blue-200 text-center md:text-left mb-4 md:mb-0">
                <p>© 2025 EmprenArtesanales. Todos los derechos reservados.</p>
                <p className="text-sm mt-1">
                  Desarrollado por <span className="text-white font-semibold">César Eduardo González</span>
                </p>
              </div>
              <div className="text-blue-200 text-sm">
                <a href="#" className="hover:text-white mr-6">Política de Privacidad</a>
                <a href="#" className="hover:text-white">Términos de Servicio</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}