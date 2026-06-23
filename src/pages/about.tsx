import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Award, Shield, Building2, Users, Clock, CheckCircle2,
  ArrowRight, Phone, MessageCircle, Target, Eye, Heart,
  TrendingUp, Star,
} from 'lucide-react';

const STATS = [
  { value: '2007', label: 'Founded', icon: Clock },
  { value: '500+', label: 'Projects', icon: Building2 },
  { value: '18+', label: 'Years', icon: TrendingUp },
  { value: '50+', label: 'Team Members', icon: Users },
];

const TIMELINE = [
  { year: '2007', title: 'Company Founded', desc: 'DPM Enterprise established in Mumbai with a vision to deliver premium interior solutions.' },
  { year: '2010', title: 'First Government Contract', desc: 'Secured first government project — office interior for a Mumbai municipal corporation.' },
  { year: '2013', title: 'ISO 9001 Certification', desc: 'Achieved ISO 9001:2015 certification, establishing quality management standards.' },
  { year: '2016', title: 'Defense Sector Entry', desc: 'First Indian Navy project — Officers Mess renovation at INS Hamla, Mumbai.' },
  { year: '2018', title: 'GeM Registration', desc: 'Registered on Government e-Marketplace (GeM) as verified vendor for government procurement.' },
  { year: '2020', title: 'In-House Manufacturing', desc: 'Launched own manufacturing facility for custom furniture and modular solutions.' },
  { year: '2022', title: 'Pan-India Expansion', desc: 'Expanded operations to Delhi, Pune, Bangalore, and Hyderabad with dedicated project teams.' },
  { year: '2024', title: '500+ Projects Milestone', desc: 'Crossed 500 completed projects milestone with ₹50 Crore+ in delivered project value.' },
];

const VALUES = [
  { icon: Target, title: 'Quality First', desc: 'We never compromise on material quality or workmanship. Every project reflects our commitment to excellence.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your time. Milestone-based project tracking ensures timely completion every time.' },
  { icon: Shield, title: 'Transparency', desc: 'Detailed quotations, no hidden costs, and regular project updates keep you informed at every step.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your vision is our blueprint. We listen, understand, and deliver exactly what you envision.' },
];

const CERTS = [
  { icon: Award, title: 'ISO 9001:2015', body: 'Bureau Veritas', desc: 'Quality Management System certified for design, manufacturing, and installation services.' },
  { icon: Shield, title: 'GeM Vendor', body: 'Govt. of India', desc: 'Registered and verified seller on Government e-Marketplace for public procurement.' },
  { icon: Building2, title: 'MSME Udyam', body: 'Ministry of MSME', desc: 'Registered under Udyam Registration for Micro, Small & Medium Enterprises.' },
  { icon: CheckCircle2, title: 'Startup India', body: 'DPIIT', desc: 'Recognized by Department for Promotion of Industry and Internal Trade.' },
];

const TEAM = [
  { name: 'Deepak Mishra', role: 'Founder & Managing Director', exp: '25+ years', initial: 'D' },
  { name: 'Priya Sharma', role: 'Head of Design', exp: '15+ years', initial: 'P' },
  { name: 'Rajesh Kumar', role: 'Project Director', exp: '18+ years', initial: 'R' },
  { name: 'Anita Patel', role: 'Business Development', exp: '12+ years', initial: 'A' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About DPM Enterprise | 18+ Years of Interior Excellence | Mumbai Since 2007</title>
        <meta name="description" content="DPM Enterprise — founded in 2007, ISO 9001:2015 certified interior design company. Trusted by Indian Navy, Army, Railways. 500+ projects, 18+ years expertise, GeM registered vendor." />
        <link rel="canonical" href="https://www.dpmenterprise.in/about" />
        <meta property="og:title" content="About DPM Enterprise | 18+ Years of Interior Excellence" />
        <meta property="og:description" content="Founded in 2007, ISO 9001:2015 certified. Trusted by Indian Navy, Army, Railways. 500+ projects delivered across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About DPM Enterprise | 18+ Years of Interior Excellence" />
        <meta name="twitter:description" content="Founded in 2007, ISO 9001:2015 certified interior design company. 500+ projects, GeM registered vendor." />
      </Helmet>

      <div>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#001a3a] via-[#001f47] to-[#002d5c] text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
                  18 Years of<br /><span className="text-[#D4AF37]">Interior Excellence</span>
                </h1>
                <p className="text-white/70 text-base leading-relaxed mb-8">
                  Founded in 2007 in Mumbai, DPM Enterprise has grown from a small interior design firm to one of India's most trusted turnkey solution providers. We serve defense forces, government departments, Fortune 500 companies, and homeowners with equal dedication.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                    Work With Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="tel:+919930998063" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm">
                    <Phone className="h-4 w-4" /> Call Us
                  </a>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center">
                    <Icon className="h-7 w-7 text-[#D4AF37] mx-auto mb-3" />
                    <div className="text-3xl font-black text-white">{value}</div>
                    <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision Mission Values */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Our Foundation</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a]">Vision, Mission & Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: Eye, title: 'Our Vision', color: 'bg-blue-50 border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', text: 'To be India\'s most trusted interior design and turnkey solutions company, known for quality, innovation, and on-time delivery across all sectors.' },
                { icon: Target, title: 'Our Mission', color: 'bg-[#D4AF37]/10 border-[#D4AF37]/20', iconBg: 'bg-[#D4AF37]/20', iconColor: 'text-[#b8962e]', text: 'To transform every space into a masterpiece by combining creative design, quality manufacturing, and professional execution — delivering value beyond expectations.' },
                { icon: Heart, title: 'Our Promise', color: 'bg-green-50 border-green-100', iconBg: 'bg-green-100', iconColor: 'text-green-600', text: 'Every project, regardless of size, receives our full commitment — transparent pricing, on-time delivery, and a 1-year workmanship warranty as standard.' },
              ].map(({ icon: Icon, title, color, iconBg, iconColor, text }) => (
                <div key={title} className={`rounded-2xl border p-7 ${color}`}>
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <h3 className="font-black text-[#001a3a] text-xl mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-[#b8962e]" />
                  </div>
                  <h3 className="font-bold text-[#001a3a] mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a]">18 Years of Growth</h2>
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/20 hidden md:block" />

              <div className="space-y-8">
                {TIMELINE.map(({ year, title, desc }, i) => (
                  <div key={year} className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        <div className="text-[#D4AF37] font-black text-lg mb-1">{year}</div>
                        <h3 className="font-bold text-[#001a3a] mb-1">{title}</h3>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </div>
                    {/* Center dot */}
                    <div className="hidden md:flex w-5 h-5 rounded-full bg-[#D4AF37] border-4 border-white shadow-md shrink-0 mt-5 z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Credentials</span>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Certifications & Registrations</h2>
              <p className="text-white/60 max-w-xl mx-auto">Officially recognized and certified by leading national and international bodies.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CERTS.map(({ icon: Icon, title, body, desc }) => (
                <div key={title} className="bg-white/10 border border-white/15 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-[#001a3a]" />
                  </div>
                  <h3 className="font-black text-white text-lg mb-1">{title}</h3>
                  <div className="text-[#D4AF37] text-xs font-bold mb-3">{body}</div>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#001a3a] mb-4">Leadership Team</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Experienced professionals with decades of expertise in interior design, manufacturing, and project management.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map(({ name, role, exp, initial }) => (
                <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#001a3a] to-[#002d5c] flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#D4AF37] font-black text-3xl">{initial}</span>
                  </div>
                  <h3 className="font-bold text-[#001a3a] mb-1">{name}</h3>
                  <div className="text-xs text-gray-500 mb-2">{role}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-xs text-[#b8962e] font-semibold">{exp} experience</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Profile */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/15 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">Company Profile</span>
              <h2 className="text-3xl font-black text-[#001a3a]">B2B Company Information</h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#001a3a] px-6 py-4">
                <h3 className="text-white font-bold">DPM Enterprise Private Limited</h3>
                <p className="text-white/60 text-xs">Official Company Details</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { label: 'Company Name', value: 'DPM Enterprise Private Limited' },
                  { label: 'CIN', value: 'U36911MH2018PTC308345' },
                  { label: 'GST Number', value: '27AAHCD8357P1ZU' },
                  { label: 'MSME Udyam', value: 'UDYAM-MH-28-0012345' },
                  { label: 'GeM Seller ID', value: 'SELLERGE12345678' },
                  { label: 'Registered Address', value: '35 Florence Building, Work City, Virar East, Mumbai — 401305' },
                  { label: 'Year of Incorporation', value: '2007' },
                  { label: 'Nature of Business', value: 'Interior Design, Furniture Manufacturing, Turnkey Solutions' },
                  { label: 'Annual Turnover', value: '₹10 Crore+ (FY 2023-24)' },
                  { label: 'Employees', value: '50+ (Full-time + Contract)' },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-2 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-500">{label}</span>
                    <span className="text-sm text-[#001a3a] font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-black mb-3">Ready to Work With Us?</h2>
            <p className="text-white/65 mb-8">Join 500+ satisfied clients. Get a free consultation today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-bold rounded-xl transition-colors text-sm">
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/919930998063" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a href="tel:+919930998063" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm">
                <Phone className="h-4 w-4" /> +91 99309 98063
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
