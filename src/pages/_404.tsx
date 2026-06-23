import { Link } from '../router';
import { Home, ArrowLeft, Search, Mail, Phone } from 'lucide-react';

/**
 * 404 Not Found page component - Premium Design
 * 
 * Professional error page with navigation, search suggestions, and contact options.
 * Includes premium 3D buttons and gradient background.
 */
export default function NotFoundPage() {
  const popularPages = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Search },
    { name: 'Projects', href: '/projects', icon: Search },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'About Us', href: '/about', icon: Search },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002147] via-[#003366] to-[#001a33] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div className="space-y-12">
          {/* Error Code */}
          <div className="space-y-6">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700] animate-pulse">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved. 
              Don't worry, we'll help you find what you need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Go Home Button - Gold Premium */}
            <Link to="/">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(212,175,55,0.6)] hover:scale-105 bg-[length:200%_100%] hover:bg-right">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Home className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">Go Home</span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </Link>

            {/* Go Back Button - White Glass */}
            <button 
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/30 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-white hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowLeft className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10">Go Back</span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Popular Pages */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white/90">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {popularPages.map((page) => (
                <Link key={page.name} to={page.href}>
                  <div className="group relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105">
                    <page.icon className="h-6 w-6 text-[#D4AF37] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white/90 group-hover:text-[#D4AF37] transition-colors">
                      {page.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 pt-8 border-t border-white/10">
            <p className="text-white/70">
              Need help? Contact us directly:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:02269719769"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                022-6971-9769
              </a>
              <a 
                href="https://wa.me/919930998063"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
