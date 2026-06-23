import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Home, Building2, ChefHat, Factory, Shield, Layers, Wrench, Globe,
  ArrowRight, CheckCircle2, Phone, MessageCircle,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Interior',
    href: '/services/residential-interior',
    tag: 'Premium',
    tagColor: 'bg-purple-100 text-purple-700',
    desc: 'Transform your home into a luxury living space. We design and execute complete residential interiors — living rooms, bedrooms, kitchens, bathrooms, and entire homes.',
    features: ['Complete home interior design', 'Custom furniture & wardrobes', 'Modular kitchen integration', 'Lighting & electrical planning', 'Premium material selection', '3D visualization before execution'],
    clients: 'Homeowners, Builders, Real Estate Developers',
  },
  {
    icon: Building2,
    title: 'Corporate Interior',
    href: '/services/corporate-interior',
    tag: 'Popular',
    tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Create inspiring workspaces that boost productivity and reflect your brand identity. From startups to Fortune 500 offices — we design spaces that work.',
    features: ['Open office & workstation design', 'Cabin & conference rooms', 'Reception & lobby design', 'Cafeteria & breakout zones', 'Branding & signage integration', 'Ergonomic furniture solutions'],
    clients: 'Corporates, IT Companies, Banks, Hospitals',
  },
  {
    icon: ChefHat,
    title: 'Modular Kitchen',
    href: '/services/modular-kitchen',
    tag: '',
    tagColor: '',
    desc: 'Beautiful, functional modular kitchens designed for the modern Indian home. Premium hardware, smart storage solutions, and elegant finishes.',
    features: ['L-shape, U-shape, Island layouts', 'Premium Hettich/Hafele hardware', 'Quartz & granite countertops', 'Smart storage solutions', 'Chimney & appliance integration', 'Waterproof & termite-proof materials'],
    clients: 'Homeowners, Builders, Hotels, Restaurants',
  },
  {
    icon: Factory,
    title: 'Furniture Manufacturing',
    href: '/services/furniture-manufacturing',
    tag: 'In-House',
    tagColor: 'bg-orange-100 text-orange-700',
    desc: 'Custom furniture manufactured in our state-of-the-art in-house facility. Office workstations, hospital furniture, lab furniture, and industrial solutions.',
    features: ['In-house manufacturing facility', 'Custom design & dimensions', 'Office workstations & chairs', 'Hospital & lab furniture', 'Industrial storage solutions', 'Bulk order capability'],
    clients: 'Government, Defense, Hospitals, Corporates',
  },
  {
    icon: Shield,
    title: 'Government & Defense Projects',
    href: '/services/government-projects',
    tag: 'GeM Ready',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Specialized interior and furniture solutions for government departments, defense forces, and public sector undertakings. GeM portal registered and compliant.',
    features: ['GeM portal registered vendor', 'Defense specification compliance', 'Indian Navy & Army projects', 'Railway station interiors', 'Government office furniture', 'Tender documentation support'],
    clients: 'Indian Navy, Army, Railways, PSUs, Govt Depts',
  },
  {
    icon: Layers,
    title: 'Turnkey Solutions',
    href: '/services/turnkey-solutions',
    tag: 'Complete',
    tagColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Complete end-to-end project delivery under a single contract. From concept and design to manufacturing, installation, and final handover.',
    features: ['Single-point responsibility', 'Concept to completion', 'Project management included', 'Vendor coordination', 'Quality assurance at every stage', 'On-time delivery guarantee'],
    clients: 'All sectors — residential to government',
  },
  {
    icon: Wrench,
    title: 'Architectural Solutions',
    href: '/services/architectural-solutions',
    tag: '',
    tagColor: '',
    desc: 'Comprehensive architectural planning and design services. Space optimization, structural design, and complete architectural documentation.',
    features: ['Space planning & optimization', 'Structural design consultation', 'AutoCAD & 3D drawings', 'Vastu-compliant designs', 'Building permit documentation', 'Site supervision'],
    clients: 'Builders, Developers, Corporates, Homeowners',
  },
  {
    icon: Globe,
    title: 'Commercial Showrooms',
    href: '/services/commercial-showrooms',
    tag: '',
    tagColor: '',
    desc: 'High-impact retail and showroom interiors that attract customers, enhance brand experience, and drive sales.',
    features: ['Retail store design', 'Showroom layout planning', 'Display fixture manufacturing', 'Brand identity integration', 'Lighting design for retail', 'Customer journey optimization'],
    clients: 'Retailers, Auto Showrooms, Jewellery Stores',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services | DPM Enterprise — Interior Design & Turnkey Solutions</title>
        <meta name="description" content="DPM Enterprise offers residential interior, corporate office design, modular kitchen, furniture manufacturing, government & defense projects, and turnkey solutions across India." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services" />
        <meta property="og:title" content="Our Services | DPM Enterprise — Interior Design & Turnkey Solutions" />
        <meta property="og:description" content="Residential interior, corporate office design, modular kitchen, furniture manufacturing, government & defense projects, and turnkey solutions across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | DPM Enterprise" />
        <meta name="twitter:description" content="Interior design, modular kitchen, furniture manufacturing, government & defense projects, and turnkey solutions across India." />
      </Helmet>

      <div>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-5">
              Complete Interior &<br /><span className="text-[#D4AF37]">Turnkey Solutions</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              From luxury residences to government defense projects — 8 specialized services delivered with 18+ years of expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                Get Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+919930998063" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.map(({ icon: Icon, title, href, tag, tagColor, desc, features, clients }) => (
                <div key={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#001a3a]/5 group-hover:bg-[#D4AF37]/15 flex items-center justify-center transition-colors shrink-0">
                          <Icon className="h-7 w-7 text-[#001a3a] group-hover:text-[#b8962e] transition-colors" />
                        </div>
                        <div>
                          <h2 className="font-black text-[#001a3a] text-xl">{title}</h2>
                          {tag && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>

                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {features.map(f => (
                        <div key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Clients: </span>
                        <span className="text-xs text-gray-500">{clients}</span>
                      </div>
                      <Link
                        to={href}
                        className="flex items-center gap-1.5 text-sm font-bold text-[#b8962e] hover:gap-2.5 transition-all"
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-black mb-3">Not Sure Which Service You Need?</h2>
            <p className="text-white/65 mb-8">Talk to our experts — we'll help you find the perfect solution for your project and budget.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919930998063"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
