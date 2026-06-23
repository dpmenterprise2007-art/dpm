import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  ArrowRight, Phone, Mail, MapPin,
  Building2, Home, ChefHat, Factory, Shield, Layers,
  CheckCircle2, Star, Award, Zap,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '18+',  label: 'Years of Excellence', sub: 'Since 2007' },
  { value: '500+', label: 'Projects Completed',  sub: 'Defense, Corporate & Govt' },
  { value: '50+',  label: 'Corporate Clients',   sub: 'Pan-India' },
  { value: '100%', label: 'On-Time Delivery',     sub: 'Guaranteed' },
];

const SERVICES = [
  {
    icon: Building2,
    title: 'Corporate Interiors',
    desc: 'High-performance office environments designed for productivity, brand identity, and employee well-being.',
    href: '/services/corporate-interior',
    img: '/airo-assets/images/pages/home/corporate-service',
    alt: 'Corporate Interiors',
  },
  {
    icon: Home,
    title: 'Residential Interiors',
    desc: 'Elegant living spaces blending comfort, style, and functionality for modern luxury homes.',
    href: '/services/residential-interior',
    img: '/airo-assets/images/pages/home/residential-service',
    alt: 'Residential Interiors',
  },
  {
    icon: Shield,
    title: 'Defense & Government',
    desc: 'Specialized high-security solutions for Indian Navy, Army, Railways, and institutional facilities.',
    href: '/services/government-projects',
    img: '/airo-assets/images/pages/home/government-service',
    alt: 'Defense & Government',
  },
  {
    icon: ChefHat,
    title: 'Modular Kitchen',
    desc: 'Precision-engineered modular kitchens with premium hardware and custom cabinetry.',
    href: '/services/modular-kitchen',
    img: '/airo-assets/images/pages/home/kitchen-service',
    alt: 'Modular Kitchen',
  },
  {
    icon: Factory,
    title: 'Furniture Manufacturing',
    desc: 'In-house bespoke furniture production with premium materials for perfect integration.',
    href: '/services/furniture-manufacturing',
    img: '/airo-assets/images/pages/home/furniture-service',
    alt: 'Furniture Manufacturing',
  },
  {
    icon: Layers,
    title: 'Turnkey Solutions',
    desc: 'End-to-end project management from concept to completion — zero hassle for you.',
    href: '/services/turnkey-solutions',
    img: '/airo-assets/images/pages/home/corporate-service',
    alt: 'Turnkey Solutions',
  },
];

const WHY_DPM = [
  'ISO 9001:2015 Certified',
  'GeM Registered Vendor',
  'MSME Certified',
  'DPIIT Startup India',
  'In-house Manufacturing',
  'Pan-India Service',
  'Transparent Pricing',
  '10-Year Warranty',
];

const WHY_CARDS = [
  { icon: Award,    title: 'ISO 9001:2015',       sub: 'Quality Management Certified' },
  { icon: Shield,   title: 'GeM Registered',       sub: 'Govt. e-Marketplace Vendor' },
  { icon: Building2,title: 'MSME Certified',       sub: 'Ministry of MSME, India' },
  { icon: Zap,      title: 'DPIIT Startup',        sub: 'Startup India Recognized' },
];

const PROCESS = [
  { step: '01', title: 'Discovery & Consulting',      desc: 'Site visit, requirement analysis, budget planning, and feasibility study.' },
  { step: '02', title: '3D Design & Visualization',   desc: 'Photorealistic 3D renders using AutoCAD, SketchUp, and 3ds Max.' },
  { step: '03', title: 'Technical Drafting & BOQ',    desc: 'Detailed engineering drawings, material specs, and cost breakdowns.' },
  { step: '04', title: 'Precision Execution',         desc: 'In-house CNC fabrication, quality-controlled manufacturing, certified installation.' },
  { step: '05', title: 'Handover & Support',          desc: 'Multi-point inspection, warranty documentation, 24/7 post-installation support.' },
];

const TESTIMONIALS = [
  {
    name: 'Cmdr. Rajesh Sharma',
    role: 'Indian Navy, Mumbai',
    rating: 5,
    text: 'DPM Enterprise delivered an exceptional project for our naval facility. Their attention to detail, quality of materials, and adherence to defense specifications was outstanding.',
  },
  {
    name: 'Priya Mehta',
    role: 'Director, TechCorp India',
    rating: 5,
    text: 'Our new office looks absolutely stunning! DPM transformed a plain space into a world-class corporate environment. Professional, punctual, and quality exceeded expectations.',
  },
  {
    name: 'Suresh Patel',
    role: 'Homeowner, Andheri West',
    rating: 5,
    text: 'From the first consultation to the final handover, the experience was seamless. Our home looks like it came out of a magazine. The modular kitchen is especially beautiful.',
  },
];

const FAQS = [
  { q: 'What services does DPM Enterprise provide?', a: 'We offer residential interior design, corporate office interiors, modular kitchens, custom furniture manufacturing, government & defense projects, turnkey solutions, architectural solutions, and commercial showroom design.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary by scope: a single room takes 2–4 weeks, a full home interior takes 6–12 weeks, and large commercial/government projects are planned with detailed milestone schedules.' },
  { q: 'Do you provide 3D design visualization?', a: 'Yes! We provide photorealistic 3D renders using AutoCAD, SketchUp, and 3ds Max so you can see exactly how your space will look before work begins.' },
  { q: 'Are you registered for government projects?', a: 'Yes, DPM Enterprise is a registered and verified seller on the Government e-Marketplace (GeM). We have successfully executed projects for Indian Navy, Army, Railways, and multiple government departments.' },
  { q: 'What warranty do you provide?', a: 'We provide a 1-year comprehensive warranty on all workmanship and a 10-year structural warranty on furniture. We also offer Annual Maintenance Contracts (AMC) for ongoing support.' },
  { q: 'Do you work outside Mumbai?', a: 'Yes, we serve clients pan-India. We have completed projects in Mumbai, Pune, Delhi, Bangalore, Hyderabad, and across Maharashtra. Contact us to discuss your location.' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>DPM Enterprise | Premium Interior Design &amp; Turnkey Solutions | Mumbai Since 2007</title>
        <meta name="description" content="DPM Enterprise — ISO 9001:2015 certified interior design and furniture manufacturing company since 2007. Serving Indian Navy, Army, Railways, and Fortune 500 companies. GeM registered vendor. Free consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/" />
        <meta property="og:title" content="DPM Enterprise | Premium Interior Design & Turnkey Solutions" />
        <meta property="og:description" content="ISO 9001:2015 certified interior design and furniture manufacturing company since 2007. Trusted by Indian Navy, Army, Railways and Fortune 500 companies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/hero" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="DPM Enterprise" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DPM Enterprise | Premium Interior Design & Turnkey Solutions" />
        <meta name="twitter:description" content="ISO 9001:2015 certified interior design company since 2007. GeM registered vendor. Free consultation." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/hero" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.dpmenterprise.in/#website",
              "name": "DPM Enterprise",
              "url": "https://www.dpmenterprise.in/",
              "description": "ISO 9001:2015 certified interior design and furniture manufacturing company since 2007"
            },
            {
              "@type": ["Organization", "LocalBusiness"],
              "@id": "https://www.dpmenterprise.in/#organization",
              "name": "DPM Enterprise Private Limited",
              "url": "https://www.dpmenterprise.in/",
              "logo": "https://www.dpmenterprise.in/airo-assets/images/logo/main",
              "description": "Premium interior design and turnkey solutions provider since 2007. ISO 9001:2015 certified, GeM registered, MSME certified.",
              "foundingDate": "2007",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "areaServed": "India",
              "hasCredential": ["ISO 9001:2015", "GeM Registered Vendor", "MSME Certified", "DPIIT Startup India"]
            },
            {
              "@type": "WebPage",
              "@id": "https://www.dpmenterprise.in/#webpage",
              "url": "https://www.dpmenterprise.in/",
              "name": "DPM Enterprise | Premium Interior Design & Turnkey Solutions | Mumbai Since 2007",
              "isPartOf": { "@id": "https://www.dpmenterprise.in/#website" },
              "about": { "@id": "https://www.dpmenterprise.in/#organization" },
              "datePublished": "2007-01-01",
              "dateModified": "2026-06-23"
            }
          ]
        })}</script>
      </Helmet>

      <div>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
          {/* Background image */}
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="DPM Enterprise Premium Interior Design"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/90 via-[#001a3a]/70 to-[#001a3a]/30" />

          <div className="relative z-10 container mx-auto px-6 py-20">
            <div className="max-w-2xl">
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-7">
                {['ISO 9001:2015', 'GeM Registered', 'MSME Certified', 'Since 2007'].map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs text-white/90 font-medium border border-white/20">
                    <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" /> {b}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
                Transforming Spaces,<br />
                <span className="text-[#D4AF37]">Delivering Excellence</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl max-w-xl mb-4 leading-relaxed">
                18+ years of premium interior design &amp; turnkey solutions for Defense, Corporate, and Residential spaces across India.
              </p>
              <p className="text-white/55 text-sm mb-10">
                Trusted by Indian Navy · Army · Railways · Fortune 500 Companies
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors text-base"
                >
                  Get Free Consultation <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/40 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-base backdrop-blur-sm"
                >
                  View Our Projects
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section className="bg-[#D4AF37] py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map(({ value, label, sub }) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-[#001a3a]">{value}</div>
                  <div className="text-[#001a3a] text-sm font-bold mt-0.5">{label}</div>
                  <div className="text-[#001a3a]/60 text-xs mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a] mb-3">Complete Interior Solutions</h2>
              <p className="text-gray-500 max-w-xl mx-auto">From concept to completion — every space we design reflects precision, quality, and your vision.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map(({ icon: Icon, title, desc, href, img, alt }) => (
                <Link
                  key={href}
                  to={href}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={img}
                      alt={alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001a3a]/80 via-[#001a3a]/20 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-5 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-[#b8962e]" />
                      </div>
                      <h3 className="font-bold text-[#001a3a] text-base">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                    <div className="flex items-center gap-1 text-[#b8962e] text-xs font-semibold group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#001a3a] hover:bg-[#002d5c] text-white font-semibold rounded-xl transition-colors"
              >
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#001a3a] mb-4">
                  18 Years of Trust,<br />500+ Projects Delivered
                </h2>
                <p className="text-gray-500 mb-7 leading-relaxed">
                  DPM Enterprise is India's trusted partner for premium interior solutions. From defense installations to luxury residences, we bring the same commitment to quality, precision, and on-time delivery.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {WHY_DPM.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-[#001a3a] hover:bg-[#002d5c] text-white font-semibold rounded-xl transition-colors text-sm">
                    About Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/certifications" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-[#D4AF37] text-gray-700 font-semibold rounded-xl transition-colors text-sm">
                    Our Certifications
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {WHY_CARDS.map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-[#b8962e]" />
                    </div>
                    <div className="font-bold text-[#001a3a] text-sm mb-1">{title}</div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ───────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-4">How We Work</span>
              <h2 className="text-3xl md:text-4xl font-black mb-3">Our Process</h2>
              <p className="text-white/60 max-w-xl mx-auto">A proven 5-step process that ensures quality, transparency, and on-time delivery every time.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {PROCESS.map(({ step, title, desc }, i) => (
                <div key={step} className="relative">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-[#D4AF37]/20 z-0" />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#001a3a] font-black text-xl">{step}</span>
                    </div>
                    <h3 className="font-bold text-base mb-2">{title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors">
                Start Your Project Today <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Client Reviews</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a] mb-3">What Our Clients Say</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Trusted by defense forces, government departments, and leading corporates across India.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map(({ name, role, rating, text }) => (
                <div key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5 italic">"{text}"</p>
                  <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#001a3a] flex items-center justify-center shrink-0">
                      <span className="text-[#D4AF37] font-bold text-sm">{name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#001a3a] text-sm">{name}</div>
                      <div className="text-xs text-gray-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a] mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know before starting your project.</p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white border border-gray-100 rounded-xl px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#001a3a] text-sm py-4 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-3">Ready to Transform Your Space?</h2>
              <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto">
                Get a free consultation and detailed quote from our expert team. No obligation, no hidden charges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+919930998063" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm">
                <Phone className="h-4 w-4 text-[#D4AF37]" /> +91 99309 98063
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
              {[
                { icon: Mail,   label: 'Email',    value: 'admin@dpmenterprise.in', href: 'mailto:admin@dpmenterprise.in' },
                { icon: Phone,  label: 'Mobile',   value: '+91 99309 98063',        href: 'tel:+919930998063' },
                { icon: Phone,  label: 'Office',   value: '022-6971-9769',          href: 'tel:02269719769' },
                { icon: MapPin, label: 'Location', value: 'Virar East, Mumbai',     href: 'https://maps.google.com/?q=35+Florence+Building+Work+City+Virar+East+Mumbai+401305' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
                >
                  <Icon className="h-5 w-5 text-[#D4AF37]" />
                  <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">{label}</span>
                  <span className="text-white/80 text-xs font-medium leading-snug group-hover:text-white transition-colors break-all">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
