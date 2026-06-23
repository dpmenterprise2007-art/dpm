import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  ArrowRight, Award, BadgeCheck, BookOpen, Building2, CheckCircle2,
  ChevronRight, ClipboardList, FileText, Globe, Handshake, Landmark,
  LayoutGrid, Mail, MessageCircle, Package, Phone, Shield,
  ShieldCheck, Star, TrendingUp, Truck, Users, Zap,
} from 'lucide-react';

/* ─── Animation helpers ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/* ─── Data ───────────────────────────────────────────────────── */
const STATS = [
  { value: '500+', label: 'GeM Orders Delivered', icon: Package },
  { value: '₹12Cr+', label: 'Government Procurement Value', icon: Landmark },
  { value: '8+', label: 'Years of Excellence', icon: Award },
  { value: '200+', label: 'Verified Clients', icon: Users },
];

const CATEGORIES = [
  {
    title: 'Office Furniture & Workstations',
    desc: 'Custom office furniture, ergonomic workstations, chairs, tables and modular storage.',
    icon: LayoutGrid,
    color: '#1a56db',
    sub: ['Executive Desks', 'Ergonomic Chairs', 'Modular Cabins', 'Storage Units'],
  },
  {
    title: 'Office Interiors & Partitions',
    desc: 'Glass partitions, modular cabins, false ceilings, acoustic panels and branding solutions.',
    icon: Building2,
    color: '#0e9f6e',
    sub: ['Glass Partitions', 'False Ceilings', 'Acoustic Panels', 'Branding Walls'],
  },
  {
    title: 'Residential Interior Products',
    desc: 'Modular kitchens, wardrobes, TV units and custom home furniture for premium residences.',
    icon: Globe,
    color: '#D4AF37',
    sub: ['Modular Kitchens', 'Wardrobes', 'TV Units', 'Custom Furniture'],
  },
  {
    title: 'Hospital & Clinic Furniture',
    desc: 'Hospital beds, lab furniture, medical storage and hygienic interior solutions.',
    icon: Shield,
    color: '#e02424',
    sub: ['Hospital Beds', 'Lab Furniture', 'Medical Storage', 'Hygienic Interiors'],
  },
  {
    title: 'Showroom & Retail Fixtures',
    desc: 'Display counters, racks, lighting and custom showroom furniture for retail spaces.',
    icon: Star,
    color: '#7e3af2',
    sub: ['Display Counters', 'Retail Racks', 'Lighting Solutions', 'Custom Fixtures'],
  },
  {
    title: 'Custom Manufacturing',
    desc: 'Made-to-order furniture and interior components as per exact project requirements.',
    icon: Zap,
    color: '#ff5a1f',
    sub: ['BOQ-Based Orders', 'Bulk Manufacturing', 'OEM Components', 'Special Projects'],
  },
];

const GEM_SERVICES = [
  {
    icon: BookOpen,
    title: 'GeM Registration & Onboarding',
    desc: 'Complete end-to-end GeM portal registration for sellers and buyers with document preparation and profile setup.',
    badge: 'Most Popular',
  },
  {
    icon: ClipboardList,
    title: 'Tender Identification & Bidding',
    desc: 'We identify relevant government tenders, prepare bid documents and submit competitive proposals on your behalf.',
    badge: null,
  },
  {
    icon: FileText,
    title: 'BOQ Preparation & Costing',
    desc: 'Detailed Bill of Quantities with accurate market costing, GST compliance and government rate analysis.',
    badge: null,
  },
  {
    icon: Truck,
    title: 'Order Fulfilment & Delivery',
    desc: 'End-to-end order management from acceptance to delivery with installation and handover documentation.',
    badge: 'New',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance & Documentation',
    desc: 'GST invoicing, delivery challans, inspection reports and all compliance documents for government orders.',
    badge: null,
  },
  {
    icon: Handshake,
    title: 'Buyer–Seller Matchmaking',
    desc: 'Connect government buyers with verified suppliers for furniture, interiors and fit-out requirements.',
    badge: null,
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Register & Verify', desc: 'Create your buyer or supplier profile with KYC and GST verification.', icon: Users },
  { step: '02', title: 'Post Requirement', desc: 'Submit your project requirement with specifications, budget and timeline.', icon: FileText },
  { step: '03', title: 'Supplier Matching', desc: 'Our team matches you with verified, GeM-compliant suppliers.', icon: Handshake },
  { step: '04', title: 'Quote & Negotiate', desc: 'Receive competitive quotes and negotiate terms with full transparency.', icon: TrendingUp },
  { step: '05', title: 'Order & Execute', desc: 'Place order with professional support, tracking and quality assurance.', icon: Package },
  { step: '06', title: 'Deliver & Close', desc: 'Delivery, installation, inspection and documentation handover.', icon: CheckCircle2 },
];

const BENEFITS = [
  { icon: BadgeCheck, title: 'GeM Authorized Vendor', desc: 'Registered on Government e-Marketplace for direct government procurement.' },
  { icon: Shield, title: 'ISO 9001:2015 Certified', desc: 'Quality management system certified for consistent product and service delivery.' },
  { icon: Award, title: 'MSME (UDYAM) Registered', desc: 'Recognized MSME with priority access to government tenders and schemes.' },
  { icon: Globe, title: 'Startup India (DPIIT)', desc: 'DPIIT-recognized startup with innovation and procurement advantages.' },
  { icon: FileText, title: 'GST Compliant', desc: 'Fully GST registered with proper invoicing and tax compliance for all orders.' },
  { icon: Landmark, title: 'Defence & PSU Approved', desc: 'Approved vendor for defence establishments and public sector undertakings.' },
];

const PORTALS = [
  { label: 'GeM Support', href: '/marketplace/gem-support', icon: Landmark, desc: 'Full GeM portal assistance', color: '#1a56db' },
  { label: 'Supplier Registration', href: '/marketplace/supplier-registration', icon: Building2, desc: 'Register as a verified supplier', color: '#0e9f6e' },
  { label: 'Buyer Registration', href: '/marketplace/buyer-registration', icon: Users, desc: 'Register as a corporate buyer', color: '#D4AF37' },
  { label: 'Elite Enquiry', href: '/marketplace/elite-enquiry', icon: Star, desc: 'Priority handling for large projects', color: '#7e3af2' },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Helmet>
        <title>B2B Marketplace & GeM Hub | DPM Enterprise — Government Procurement Experts</title>
        <meta
          name="description"
          content="DPM Enterprise's B2B Marketplace & GeM Hub — India's trusted platform for government procurement, GeM registration, tender bidding, furniture supply and interior project execution."
        />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace" />
        <meta property="og:title" content="B2B Marketplace & GeM Hub | DPM Enterprise" />
        <meta property="og:description" content="Government procurement, GeM registration, tender bidding and B2B interior supply — all in one platform." />
        <meta property="og:url" content="https://www.dpmenterprise.in/marketplace" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#001a3a]">
        <img
          src="/airo-assets/images/pages/marketplace/hero"
          alt="DPM Enterprise GeM Marketplace"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a] via-[#001a3a]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a3a] via-transparent to-transparent" />
        {/* Gold grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px,transparent 1px),linear-gradient(90deg,#D4AF37 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8"
            >
              <Landmark className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-bold tracking-wider uppercase">GeM Authorized Vendor · MSME Registered</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                B2B Marketplace
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="block text-[#D4AF37]"
              >
                &amp; GeM Hub
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
            >
              India's trusted platform for government procurement, GeM registration, tender bidding and B2B interior supply. Connecting verified suppliers with government and corporate buyers.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/marketplace/gem-support"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
              >
                <Landmark className="h-4 w-4" /> GeM Support Portal
              </Link>
              <Link
                to="/marketplace/supplier-registration"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm"
              >
                <Building2 className="h-4 w-4" /> Register as Supplier
              </Link>
              <Link
                to="/marketplace/buyer-registration"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm"
              >
                <Users className="h-4 w-4" /> Register as Buyer
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 px-6 py-5"
                >
                  <Icon className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <div className="text-xl font-black text-white">{value}</div>
                    <div className="text-xs text-white/50 font-medium">{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTAL QUICK ACCESS ──────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PORTALS.map(({ label, href, icon: Icon, desc, color }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  to={href}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white hover:bg-[#001a3a]"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color + '18' }}
                  >
                    <Icon className="h-6 w-6 transition-colors duration-300" style={{ color }} />
                  </div>
                  <h3 className="font-black text-[#001a3a] group-hover:text-white text-sm mb-1 transition-colors duration-300">{label}</h3>
                  <p className="text-xs text-gray-400 group-hover:text-white/60 transition-colors duration-300">{desc}</p>
                  <ChevronRight className="h-4 w-4 mt-3 text-gray-300 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEM SERVICES ─────────────────────────────────────── */}
      <section className="py-24 bg-[#f8f9fc]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#001a3a]/8 rounded-full px-4 py-2 mb-5">
              <Landmark className="h-4 w-4 text-[#001a3a]" />
              <span className="text-[#001a3a] text-xs font-bold uppercase tracking-widest">GeM Portal Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#001a3a] mb-5">
              Complete GeM Ecosystem Support
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              From registration to order fulfilment — we handle every step of your government e-Marketplace journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GEM_SERVICES.map(({ icon: Icon, title, desc, badge }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {badge && (
                  <span className={`absolute top-5 right-5 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${badge === 'Most Popular' ? 'bg-[#D4AF37] text-[#001a3a]' : 'bg-[#001a3a] text-white'}`}>
                    {badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-[#001a3a]/8 flex items-center justify-center mb-5 group-hover:bg-[#001a3a] transition-colors duration-300">
                  <Icon className="h-5 w-5 text-[#001a3a] group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                <h3 className="font-black text-[#001a3a] text-base mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                <Link
                  to="/marketplace/gem-support"
                  className="inline-flex items-center gap-1 mt-5 text-[#D4AF37] text-xs font-bold hover:gap-2 transition-all duration-200"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/12 rounded-full px-4 py-2 mb-5">
              <Package className="h-4 w-4 text-[#b8962e]" />
              <span className="text-[#b8962e] text-xs font-bold uppercase tracking-widest">Product Categories</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#001a3a] mb-5">
              Browse Our B2B Catalogue
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Explore verified product categories for government, corporate and institutional procurement.
            </p>
          </motion.div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(({ title }, i) => (
              <button
                key={title}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === i
                    ? 'bg-[#001a3a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(({ title, desc, icon: Icon, color, sub }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                onClick={() => setActiveCategory(i)}
                className={`cursor-pointer rounded-2xl p-7 border-2 transition-all duration-300 ${
                  activeCategory === i
                    ? 'border-[#001a3a] bg-[#001a3a] shadow-2xl'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: color + '20' }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <h3 className={`font-black text-base mb-2 ${activeCategory === i ? 'text-white' : 'text-[#001a3a]'}`}>{title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${activeCategory === i ? 'text-white/60' : 'text-gray-500'}`}>{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sub.map(s => (
                    <span
                      key={s}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        activeCategory === i
                          ? 'bg-white/10 text-white/80'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#001a3a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px,transparent 1px),linear-gradient(90deg,#D4AF37 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full px-4 py-2 mb-5">
              <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
              How It Works
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Six transparent steps from registration to project completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center group-hover:bg-[#D4AF37]/25 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[#D4AF37]/40 text-xs font-black uppercase tracking-widest mb-1">Step {step}</div>
                    <h3 className="font-black text-white text-base mb-2">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST & COMPLIANCE ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 mb-5">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-green-700 text-xs font-bold uppercase tracking-widest">Verified & Compliant</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#001a3a] mb-5">
              Trusted for Government &amp; Corporate Procurement
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Every certification and registration that makes DPM Enterprise the preferred procurement partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-4 p-6 rounded-2xl bg-[#f8f9fc] border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#001a3a] flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-black text-[#001a3a] text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELITE ENQUIRY BANNER ─────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] to-[#b8962e]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#001a3a]/15 flex items-center justify-center flex-shrink-0">
                <Star className="h-8 w-8 text-[#001a3a]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#001a3a] mb-1">Elite Enquiry — Priority Service</h3>
                <p className="text-[#001a3a]/70 text-sm max-w-xl">
                  Large project? Get dedicated account management, priority processing and custom pricing for orders above ₹10 Lakhs.
                </p>
              </div>
            </div>
            <Link
              to="/marketplace/elite-enquiry"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-[#001a3a] hover:bg-[#002a5c] text-white font-black rounded-xl transition-colors text-sm"
            >
              Submit Elite Enquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA + CONTACT ────────────────────────────────────── */}
      <section className="py-24 bg-[#001a3a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
                Start Your Procurement Journey
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
                Whether you're a government buyer, corporate client or supplier — we have the right solution for you.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-14">
                <Link
                  to="/marketplace/gem-support"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
                >
                  <Landmark className="h-4 w-4" /> GeM Support
                </Link>
                <Link
                  to="/marketplace/supplier-registration"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  <Building2 className="h-4 w-4" /> Supplier Registration
                </Link>
                <Link
                  to="/marketplace/buyer-registration"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  <Users className="h-4 w-4" /> Buyer Registration
                </Link>
              </div>
            </motion.div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 99309 98063', href: 'tel:+919930998063', sub: '022 6971 9769' },
                { icon: Mail, label: 'Email Us', value: 'sales@dpmenterprise.in', href: 'mailto:sales@dpmenterprise.in', sub: 'Mon–Sat, 9:30–6:30' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat Instantly', href: 'https://wa.me/919930998063', sub: 'Quick response guaranteed' },
              ].map(({ icon: Icon, label, value, href, sub }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-2 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center group-hover:bg-[#D4AF37]/25 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">{label}</div>
                  <div className="text-white font-black text-sm">{value}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
