import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  ShoppingCart, FileText, Users, Award, ArrowRight, Phone,
  MessageCircle, CheckCircle2, Shield, Landmark, TrendingUp,
  BadgeCheck, Zap, Globe, ChevronRight,
  ClipboardList, Calculator, FileCheck, Building2, Package,
  Truck, BarChart3, Headphones, Search,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '₹500Cr+', label: 'GeM Orders Executed', icon: TrendingUp, color: '#D4AF37' },
  { value: '59+', label: 'Government Projects', icon: Landmark, color: '#22c55e' },
  { value: '100%', label: 'Order Fulfilment Rate', icon: BadgeCheck, color: '#60a5fa' },
  { value: '2018', label: 'GeM Registered Since', icon: Shield, color: '#a78bfa' },
];

const SERVICES = [
  {
    icon: ShoppingCart,
    title: 'GeM Support Services',
    subtitle: 'End-to-end GeM portal assistance',
    desc: 'Complete support for GeM product listing, tender participation, BOQ preparation, bid management, and order execution — handled by our expert team.',
    href: '/marketplace/gem-support',
    color: '#1d4ed8',
    bg: 'from-blue-700 to-blue-900',
    features: [
      'Product catalog & listing',
      'Tender search & bid management',
      'BOQ preparation & compliance',
      'PDF estimate generation',
      'Documentation & certification',
      'Order processing & handover',
    ],
    cta: 'Explore GeM Support',
  },
  {
    icon: Building2,
    title: 'Supplier Registration',
    subtitle: 'Become a DPM supply partner',
    desc: 'Register as a verified supplier in the DPM Enterprise network. Get access to government tenders, bulk orders, and long-term supply contracts across India.',
    href: '/marketplace/supplier-registration',
    color: '#16a34a',
    bg: 'from-green-700 to-green-900',
    features: [
      'Verified supplier onboarding',
      'Access to government tenders',
      'Bulk order opportunities',
      'Pan-India supply contracts',
      'Quality compliance support',
      'Dedicated account manager',
    ],
    cta: 'Register as Supplier',
  },
  {
    icon: Users,
    title: 'Buyer Registration',
    subtitle: 'Procure with confidence',
    desc: 'Register as a buyer to access DPM\'s full product catalog, get competitive pricing, and benefit from our GeM-verified supply chain for your government or corporate procurement.',
    href: '/marketplace/buyer-registration',
    color: '#ea580c',
    bg: 'from-orange-600 to-orange-900',
    features: [
      'Access full product catalog',
      'GeM-verified pricing',
      'Government procurement support',
      'Customised quotations',
      'Dedicated project manager',
      'After-sales service',
    ],
    cta: 'Register as Buyer',
  },
  {
    icon: Award,
    title: 'Elite Enquiry',
    subtitle: 'Premium project consultation',
    desc: 'For large-scale government, defence, or corporate projects requiring bespoke solutions. Our elite team handles high-value tenders with dedicated support from concept to completion.',
    href: '/marketplace/elite-enquiry',
    color: '#D4AF37',
    bg: 'from-yellow-600 to-yellow-800',
    features: [
      'High-value tender management',
      'Defence & PSU projects',
      'Bespoke design solutions',
      'Dedicated project director',
      'Priority execution',
      'White-glove handover',
    ],
    cta: 'Submit Elite Enquiry',
  },
];

const GEM_PROCESS = [
  { step: '01', icon: Search, title: 'Tender Discovery', desc: 'We scan GeM portal daily for relevant tenders matching your category, budget, and location.' },
  { step: '02', icon: FileCheck, title: 'Eligibility Check', desc: 'Our team verifies all pre-qualification criteria, certifications, and compliance requirements.' },
  { step: '03', icon: Calculator, title: 'BOQ & Pricing', desc: 'Detailed Bill of Quantities with competitive pricing, margin analysis, and cost breakdown.' },
  { step: '04', icon: FileText, title: 'Bid Preparation', desc: 'Complete bid documents, technical compliance, and professional PDF estimates with letterhead.' },
  { step: '05', icon: ClipboardList, title: 'Submission & Follow-up', desc: 'Online bid submission, clarification management, and post-bid follow-up with the buyer.' },
  { step: '06', icon: Truck, title: 'Order Execution', desc: 'Manufacturing, quality control, delivery, installation, and official handover documentation.' },
];

const WHY_DPM = [
  { icon: Shield, title: 'GeM Verified Since 2018', desc: 'One of the earliest registered vendors on Government e-Marketplace with a spotless compliance record.' },
  { icon: Award, title: 'ISO 9001:2015 Certified', desc: 'International quality certification ensures every product and service meets the highest standards.' },
  { icon: Landmark, title: 'Defence Empanelled', desc: 'Approved vendor for Indian Navy, Army, and Air Force — the most stringent procurement standard in India.' },
  { icon: BarChart3, title: '₹500Cr+ Executed', desc: 'Proven track record of executing large-value government orders on time and within budget.' },
  { icon: Globe, title: 'Pan-India Operations', desc: 'Active in 12+ states with logistics, installation, and after-sales support across the country.' },
  { icon: Headphones, title: 'Dedicated GeM Desk', desc: 'Specialised team for GeM portal management, tender tracking, and buyer/seller support.' },
];

const CATEGORIES = [
  { name: 'Office Furniture', icon: '🪑', count: '200+ SKUs' },
  { name: 'Modular Kitchens', icon: '🍳', count: '80+ SKUs' },
  { name: 'Interior Fit-outs', icon: '🏢', count: 'Turnkey' },
  { name: 'Workstations', icon: '💼', count: '150+ SKUs' },
  { name: 'Storage Systems', icon: '📦', count: '120+ SKUs' },
  { name: 'Soft Furnishings', icon: '🛋️', count: '90+ SKUs' },
  { name: 'Flooring Solutions', icon: '🏗️', count: '60+ SKUs' },
  { name: 'Lighting & Electrical', icon: '💡', count: '100+ SKUs' },
];

const CLIENTS = [
  { name: 'Indian Navy', icon: '⚓', type: 'Defence' },
  { name: 'Indian Army', icon: '🎖️', type: 'Defence' },
  { name: 'Indian Railways', icon: '🚂', type: 'Government' },
  { name: 'ONGC', icon: '⚙️', type: 'PSU' },
  { name: 'BHEL', icon: '🔧', type: 'PSU' },
  { name: 'SBI', icon: '🏛️', type: 'Banking' },
  { name: 'HDFC Bank', icon: '🏦', type: 'Corporate' },
  { name: 'Mumbai University', icon: '🎓', type: 'Education' },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#b8962e] text-xs font-black rounded-full uppercase tracking-widest mb-4">
      {children}
    </span>
  );
}

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const Icon = svc.icon;
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      {/* Header */}
      <div className={`bg-gradient-to-br ${svc.bg} p-7 relative overflow-hidden`}>
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -right-2 -bottom-10 w-24 h-24 rounded-full bg-white/5" />

        <div className="flex items-start gap-4 relative">
          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white leading-tight">{svc.title}</h3>
            <p className="text-white/55 text-xs mt-1">{svc.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{svc.desc}</p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {svc.features.map(f => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 flex-shrink-0" style={{ color: svc.color }} />
              <span className="text-xs text-gray-600 leading-tight">{f}</span>
            </div>
          ))}
        </div>

        <Link
          to={svc.href}
          className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:gap-3"
          style={{ backgroundColor: svc.color + '14', color: svc.color }}
        >
          {svc.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Bottom accent */}
      <div
        className="h-1 w-full transition-all duration-500 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}66)` }}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  return (
    <>
      <Helmet>
        <title>GeM Marketplace & Government Procurement | DPM Enterprise</title>
        <meta
          name="description"
          content="DPM Enterprise — India's trusted GeM registered vendor since 2018. Government e-Marketplace support, supplier & buyer registration, BOQ preparation, tender management, and defence-grade procurement services."
        />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace" />
      </Helmet>

      <div className="overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-[#001a3a] text-white overflow-hidden min-h-[90vh] flex items-center">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          {/* Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-green-900/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative container mx-auto px-6 max-w-6xl py-24 md:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-7"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-black rounded-full uppercase tracking-widest">
                    <Shield className="h-3.5 w-3.5" /> GeM Registered Vendor · Since 2018
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="block"
                  >
                    India's Most
                    <br />
                    Trusted
                    <br />
                    <span className="text-[#D4AF37]">GeM Partner.</span>
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
                >
                  DPM Enterprise is a verified Government e-Marketplace vendor with ₹500Cr+ in executed
                  government orders. We handle everything — from tender discovery to final handover.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 mb-10"
                >
                  <Link
                    to="/marketplace/gem-support"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
                  >
                    GeM Support Services <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/919930998063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  {['GeM Verified', 'ISO 9001:2015', 'Defence Empanelled', 'MSME Certified'].map(b => (
                    <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/6 border border-white/12 rounded-full text-xs text-white/65 font-medium">
                      <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" /> {b}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right — stats + GeM badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="space-y-4"
              >
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map(({ value, label, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="bg-white/6 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/9 transition-colors"
                    >
                      <Icon className="h-5 w-5 mb-3" style={{ color }} />
                      <div className="text-2xl md:text-3xl font-black text-white">{value}</div>
                      <div className="text-xs text-white/45 mt-1 leading-snug">{label}</div>
                    </div>
                  ))}
                </div>

                {/* GeM portal card */}
                <div className="bg-gradient-to-br from-green-800/40 to-green-900/60 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-black text-white text-sm">GeM Registered Vendor</div>
                      <div className="text-green-400/70 text-xs">Government e-Marketplace, India</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold">ACTIVE</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { v: '200+', l: 'Products Listed' },
                      { v: '59+', l: 'Orders Won' },
                      { v: '100%', l: 'Delivery Rate' },
                    ].map(({ v, l }) => (
                      <div key={l} className="bg-white/5 rounded-xl p-3">
                        <div className="text-lg font-black text-white">{v}</div>
                        <div className="text-[10px] text-white/40 mt-0.5 leading-tight">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">Quick Access</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'GeM Support', href: '/marketplace/gem-support', icon: ShoppingCart },
                      { label: 'Supplier Reg.', href: '/marketplace/supplier-registration', icon: Building2 },
                      { label: 'Buyer Reg.', href: '/marketplace/buyer-registration', icon: Users },
                      { label: 'Elite Enquiry', href: '/marketplace/elite-enquiry', icon: Award },
                    ].map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        to={href}
                        className="flex items-center gap-2 px-3 py-2.5 bg-white/6 hover:bg-white/12 border border-white/8 rounded-xl text-xs text-white/70 font-medium transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        </section>

        {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Our Services</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                Everything You Need on GeM
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                From vendor registration to order execution — DPM Enterprise is your complete
                Government e-Marketplace partner.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {SERVICES.map((svc, i) => (
                <ServiceCard key={svc.title} svc={svc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Our Process</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                How We Win Tenders for You
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                A proven 6-step process that has delivered 59+ government projects with a 100% fulfilment rate.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GEM_PROCESS.map(({ step, icon: Icon, title, desc }, i) => (
                <motion.div
                  key={step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group relative bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Step number */}
                  <div className="absolute top-5 right-5 text-5xl font-black text-gray-50 select-none group-hover:text-[#D4AF37]/10 transition-colors">
                    {step}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#001a3a] flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-black text-[#001a3a] text-base mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>

                  {/* Connector arrow (not on last) */}
                  {i < GEM_PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="h-5 w-5 text-gray-200" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT CATEGORIES ───────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-14"
            >
              <SectionLabel>GeM Catalog</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                Products Listed on GeM
              </h2>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                800+ SKUs across 8 categories — all GeM-listed, GST-compliant, and ready for government procurement.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {CATEGORIES.map(({ name, icon, count }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#001a3a] flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="font-black text-[#001a3a] text-sm mb-1 leading-tight">{name}</h3>
                  <div className="text-[11px] text-[#D4AF37] font-bold">{count}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Link
                to="/marketplace/gem-support"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#001a3a] hover:bg-[#002d5c] text-white font-bold rounded-xl transition-colors text-sm"
              >
                View Full GeM Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── WHY DPM ──────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#001a3a] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black">
                Why DPM Enterprise is
                <br />
                <span className="text-[#D4AF37]">India's #1 GeM Partner</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_DPM.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group bg-white/5 border border-white/8 rounded-2xl p-7 hover:bg-white/8 hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/12 border border-[#D4AF37]/20 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-black text-white text-base mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLIENTS ──────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-14"
            >
              <SectionLabel>Government Clients</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                Trusted by India's Finest Institutions
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {CLIENTS.map(({ name, icon, type }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#001a3a] flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="font-black text-[#001a3a] text-sm mb-1">{name}</h3>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{type}</div>
                </motion.div>
              ))}
            </div>

            {/* Aggregate bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-[#001a3a] rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: '59+', label: 'Govt. Projects Won', icon: Landmark },
                { value: '₹500Cr+', label: 'Total Order Value', icon: TrendingUp },
                { value: '200+', label: 'GeM SKUs Listed', icon: Package },
                { value: '100%', label: 'Delivery Fulfilment', icon: BadgeCheck },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="h-5 w-5 text-[#D4AF37] mx-auto mb-2 opacity-70" />
                  <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
                  <div className="text-xs text-white/40 mt-1 uppercase tracking-wider font-semibold">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-[#001a3a] via-[#001f47] to-[#002d5c] rounded-3xl p-10 md:p-16 text-white text-center overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/12 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-900/25 rounded-full blur-[80px] pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.03] rounded-3xl"
                style={{
                  backgroundImage:
                    'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black rounded-full uppercase tracking-widest mb-7">
                  <Zap className="h-3.5 w-3.5" /> Start Your GeM Journey Today
                </div>

                <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">
                  Ready to Win Government
                  <br />
                  <span className="text-[#D4AF37]">Contracts on GeM?</span>
                </h2>
                <p className="text-white/55 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                  Whether you're a buyer, supplier, or need end-to-end GeM support — DPM Enterprise
                  has the expertise, certifications, and track record to deliver.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                  <Link
                    to="/marketplace/gem-support"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
                  >
                    GeM Support Services <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/919930998063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                  <a
                    href="tel:+919930998063"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/8 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4" /> +91 99309 98063
                  </a>
                </div>

                {/* Sub-page links */}
                <div className="flex flex-wrap justify-center gap-3 pt-8 border-t border-white/10">
                  {[
                    { label: 'GeM Support', href: '/marketplace/gem-support' },
                    { label: 'Supplier Registration', href: '/marketplace/supplier-registration' },
                    { label: 'Buyer Registration', href: '/marketplace/buyer-registration' },
                    { label: 'Elite Enquiry', href: '/marketplace/elite-enquiry' },
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      to={href}
                      className="flex items-center gap-1.5 text-xs text-white/45 hover:text-[#D4AF37] font-medium transition-colors"
                    >
                      <ChevronRight className="h-3 w-3" /> {label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
