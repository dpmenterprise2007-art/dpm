import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Building2, Home, ChefHat, Factory, Shield, Layers,
  MapPin, Calendar, ArrowRight, Phone, MessageCircle, Filter,
} from 'lucide-react';

const CATEGORIES = ['All', 'Corporate', 'Residential', 'Government', 'Modular Kitchen', 'Turnkey', 'Furniture'];

const PROJECTS = [
  { id: 1, title: 'Indian Navy Officers Mess', category: 'Government', location: 'Mumbai, Maharashtra', year: '2023', value: '₹1.8 Cr', icon: Shield, tag: 'Defense', tagColor: 'bg-green-100 text-green-700', desc: 'Complete interior renovation of the Naval Officers Mess including dining hall, lounge, and accommodation areas with premium furniture.' },
  { id: 2, title: 'TechCorp India HQ', category: 'Corporate', location: 'BKC, Mumbai', year: '2023', value: '₹2.4 Cr', icon: Building2, tag: 'Corporate', tagColor: 'bg-blue-100 text-blue-700', desc: 'Full office interior for 500-seat IT company — open workstations, 12 conference rooms, executive cabins, cafeteria, and reception.' },
  { id: 3, title: 'Mumbai University Campus', category: 'Government', location: 'Fort, Mumbai', year: '2022', value: '₹3.2 Cr', icon: Shield, tag: 'Education', tagColor: 'bg-purple-100 text-purple-700', desc: 'Modular lab furniture, faculty offices, conference halls, and administrative block interior for the main campus.' },
  { id: 4, title: 'Luxury Villa — Juhu', category: 'Residential', location: 'Juhu, Mumbai', year: '2023', value: '₹85 L', icon: Home, tag: 'Premium', tagColor: 'bg-yellow-100 text-yellow-700', desc: '5BHK luxury villa complete interior — living, dining, 5 bedrooms, home theatre, modular kitchen, and terrace garden.' },
  { id: 5, title: 'Indian Army Barracks', category: 'Government', location: 'Pune, Maharashtra', year: '2022', value: '₹1.2 Cr', icon: Shield, tag: 'Defense', tagColor: 'bg-green-100 text-green-700', desc: 'Barracks renovation with modular furniture, storage systems, and common area interiors for 200 personnel.' },
  { id: 6, title: 'HDFC Bank Branch Network', category: 'Corporate', location: 'Pan-Maharashtra', year: '2022', value: '₹4.5 Cr', icon: Building2, tag: 'Banking', tagColor: 'bg-blue-100 text-blue-700', desc: 'Interior design and furniture supply for 18 HDFC Bank branches across Maharashtra — standardized design with local customization.' },
  { id: 7, title: 'Modular Kitchen — Andheri', category: 'Modular Kitchen', location: 'Andheri West, Mumbai', year: '2023', value: '₹12 L', icon: ChefHat, tag: 'Kitchen', tagColor: 'bg-orange-100 text-orange-700', desc: 'Premium L-shaped modular kitchen with Hettich hardware, quartz countertop, chimney integration, and smart storage.' },
  { id: 8, title: 'Railway Station Waiting Hall', category: 'Government', location: 'Virar, Mumbai', year: '2021', value: '₹95 L', icon: Shield, tag: 'Railways', tagColor: 'bg-green-100 text-green-700', desc: 'Complete renovation of passenger waiting hall with seating, information kiosks, lighting, and flooring.' },
  { id: 9, title: 'Pharma Company Office', category: 'Corporate', location: 'Thane, Maharashtra', year: '2023', value: '₹1.1 Cr', icon: Building2, tag: 'Corporate', tagColor: 'bg-blue-100 text-blue-700', desc: 'Modern office interior for 300-seat pharmaceutical company with lab-adjacent workspaces and sterile design elements.' },
  { id: 10, title: 'Hospital Furniture Supply', category: 'Furniture', location: 'Navi Mumbai', year: '2022', value: '₹68 L', icon: Factory, tag: 'Healthcare', tagColor: 'bg-red-100 text-red-700', desc: 'Custom hospital furniture — patient beds, nursing stations, OT tables, and ward furniture for 150-bed hospital.' },
  { id: 11, title: 'Turnkey Office — Powai', category: 'Turnkey', location: 'Powai, Mumbai', year: '2023', value: '₹1.6 Cr', icon: Layers, tag: 'Turnkey', tagColor: 'bg-indigo-100 text-indigo-700', desc: 'Complete turnkey delivery — civil, electrical, HVAC, furniture, and IT infrastructure for 400-seat office.' },
  { id: 12, title: 'Residential Complex — Vasai', category: 'Residential', location: 'Vasai, Mumbai', year: '2022', value: '₹2.8 Cr', icon: Home, tag: 'Residential', tagColor: 'bg-yellow-100 text-yellow-700', desc: 'Interior design for 32 apartments in a residential complex — standardized design with individual customization options.' },
];

const STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '18+', label: 'Years Experience' },
  { value: '₹50 Cr+', label: 'Projects Delivered' },
  { value: '25+', label: 'Defense Projects' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Projects | DPM Enterprise — 500+ Interior Projects Across India</title>
        <meta name="description" content="Explore DPM Enterprise's portfolio of 500+ completed projects — corporate offices, government defense projects, luxury residences, and turnkey solutions across India." />
        <link rel="canonical" href="https://www.dpmenterprise.in/projects" />
        <meta property="og:title" content="Our Projects | DPM Enterprise — 500+ Interior Projects" />
        <meta property="og:description" content="Portfolio of 500+ completed projects — corporate offices, government defense, luxury residences, and turnkey solutions across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Projects | DPM Enterprise" />
        <meta name="twitter:description" content="500+ completed projects — corporate offices, government defense, luxury residences across India." />
      </Helmet>

      <div>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-5">
              500+ Projects.<br /><span className="text-[#D4AF37]">Every One a Masterpiece.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              From defense installations to luxury villas — explore our diverse portfolio of completed projects across India.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#D4AF37] py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl md:text-3xl font-black text-[#001a3a]">{value}</div>
                  <div className="text-[#001a3a]/70 text-xs font-bold uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              <Filter className="h-4 w-4 text-gray-400 shrink-0" />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    activeCategory === cat
                      ? 'bg-[#001a3a] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(({ id, title, category, location, year, value, icon: Icon, tag, tagColor, desc }) => (
                <div key={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  {/* Color header */}
                  <div className="h-3 bg-gradient-to-r from-[#001a3a] to-[#002d5c]" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#001a3a]/5 group-hover:bg-[#D4AF37]/15 flex items-center justify-center transition-colors shrink-0">
                        <Icon className="h-6 w-6 text-[#001a3a] group-hover:text-[#b8962e] transition-colors" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
                    </div>

                    <h3 className="font-black text-[#001a3a] text-lg mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{year}</span>
                      <span className="font-bold text-[#b8962e]">{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No projects in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-black mb-3">Want to Be Our Next Success Story?</h2>
            <p className="text-white/65 mb-8">Join 500+ satisfied clients. Get a free consultation and detailed project quote today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+919930998063" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm">
                <Phone className="h-4 w-4" /> +91 99309 98063
              </a>
              <a href="https://wa.me/919930998063" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
