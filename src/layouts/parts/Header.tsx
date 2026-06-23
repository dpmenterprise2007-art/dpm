import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone, Mail, ChevronDown, Menu, X, MessageCircle, MapPin,
  Award, Shield, Building2, Home, Wrench, Layers, ChefHat, Factory, Globe, ArrowRight,
} from 'lucide-react';

const SERVICES = [
  { label: 'Residential Interior',    href: '/services/residential-interior',  icon: Home,     desc: 'Luxury home interiors' },
  { label: 'Corporate Interior',      href: '/services/corporate-interior',     icon: Building2,desc: 'Office & workspace design' },
  { label: 'Modular Kitchen',         href: '/services/modular-kitchen',        icon: ChefHat,  desc: 'Modern modular kitchens' },
  { label: 'Furniture Manufacturing', href: '/services/furniture-manufacturing',icon: Factory,  desc: 'Custom furniture solutions' },
  { label: 'Government Projects',     href: '/services/government-projects',    icon: Shield,   desc: 'Defense & govt contracts' },
  { label: 'Turnkey Solutions',       href: '/services/turnkey-solutions',      icon: Layers,   desc: 'End-to-end project delivery' },
  { label: 'Architectural Solutions', href: '/services/architectural-solutions',icon: Wrench,   desc: 'Architecture & planning' },
  { label: 'Commercial Showrooms',    href: '/services/commercial-showrooms',   icon: Globe,    desc: 'Retail & showroom design' },
];

const NAV = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Services',  href: '/services', hasDropdown: true },
  { label: 'Projects',  href: '/projects' },
  { label: 'B2B Portal',href: '/marketplace' },
  { label: 'Careers',   href: '/careers' },
  { label: 'Contact',   href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled]               = useState(false);
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [servicesOpen, setServicesOpen]       = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-100'}`}>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="bg-[#001a3a] text-white hidden md:block">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 text-white/70">
            <a href="mailto:admin@dpmenterprise.in" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Mail className="h-3 w-3" /> admin@dpmenterprise.in
            </a>
            <a href="tel:+919930998063" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone className="h-3 w-3" /> +91 99309 98063
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Virar East, Mumbai — 401305
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5"><Award className="h-3 w-3 text-[#D4AF37]" /> ISO 9001:2015</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-[#D4AF37]" /> GeM Registered</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-[#D4AF37]" /> MSME Certified</span>
          </div>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo — real image */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/assets/logo.jpg"
              alt="DPM Enterprise"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = 'none';
                const fallback = t.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback text logo (hidden when image loads) */}
            <div className="hidden items-center gap-2" aria-hidden="true">
              <div className="w-10 h-10 rounded-lg bg-[#001a3a] flex items-center justify-center">
                <span className="text-[#D4AF37] font-black text-lg leading-none">D</span>
              </div>
              <div className="leading-tight">
                <div className="font-black text-[#001a3a] text-base tracking-tight">DPM Enterprise</div>
                <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Interior &amp; Turnkey Solutions</div>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(item =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                        : 'text-gray-700 hover:text-[#001a3a] hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {SERVICES.map(s => (
                          <Link
                            key={s.href}
                            to={s.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#001a3a]/5 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/25 transition-colors">
                              <s.icon className="h-4 w-4 text-[#b8962e]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#001a3a] leading-tight">{s.label}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-3">
                        <Link
                          to="/services"
                          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#001a3a] hover:bg-[#002d5c] text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                          View All Services <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'text-gray-700 hover:text-[#001a3a] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://wa.me/919930998063?text=Hi%20DPM%20Enterprise!%20I%20need%20interior%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] text-sm font-bold rounded-xl transition-colors"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#001a3a]" /> : <Menu className="h-5 w-5 text-[#001a3a]" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="container mx-auto px-6 py-4 space-y-1">
            {NAV.map(item =>
              item.hasDropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {SERVICES.map(s => (
                        <Link
                          key={s.href}
                          to={s.href}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-[#001a3a]/5 hover:text-[#001a3a] transition-colors"
                        >
                          <s.icon className="h-4 w-4 text-[#b8962e] shrink-0" />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-3 border-t border-gray-100 space-y-2">
              <a
                href="https://wa.me/919930998063?text=Hi%20DPM%20Enterprise!%20I%20need%20interior%20design%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] text-sm font-bold rounded-xl transition-colors"
              >
                Book Free Consultation
              </Link>
              <a
                href="tel:+919930998063"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Phone className="h-4 w-4" /> +91 99309 98063
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
