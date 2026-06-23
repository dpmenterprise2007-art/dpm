import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  Award, Shield, Building2, CheckCircle2, ArrowRight,
  Phone, MessageCircle, Star, FileText, Globe,
  BadgeCheck, Landmark, TrendingUp, Users,
  CalendarCheck, Lock, Zap, ChevronRight,
  Anchor, Sword, Train, GraduationCap, Banknote, Wrench,
  Download,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CERTS = [
  {
    id: 'iso',
    icon: Award,
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    issuer: 'Bureau Veritas Certification',
    certNo: 'BV-QMS-2013-IN',
    year: '2013',
    validity: 'Valid till 2026',
    tag: 'International',
    tagColor: '#1d4ed8',
    gradient: 'from-blue-700 to-blue-900',
    sealColor: '#1d4ed8',
    desc: 'International standard for Quality Management Systems — covering design, manufacturing, installation, and after-sales service across all DPM operations.',
    scope: 'Interior Design · Furniture Manufacturing · Turnkey Execution',
    benefits: [
      'Consistent quality across all projects',
      'Documented processes & procedures',
      'Continuous improvement framework',
      'Customer satisfaction monitoring',
    ],
  },
  {
    id: 'gem',
    icon: Shield,
    title: 'GeM Registered Vendor',
    subtitle: 'Government e-Marketplace',
    issuer: 'Government e-Marketplace, Govt. of India',
    certNo: 'GeM-2018-VENDOR',
    year: '2018',
    validity: 'Active',
    tag: 'Government',
    tagColor: '#16a34a',
    gradient: 'from-green-700 to-green-900',
    sealColor: '#16a34a',
    desc: "Verified seller on India's official Government e-Marketplace — enabling direct procurement by government departments, PSUs, and defence establishments.",
    scope: 'Furniture Supply · Interior Services · Turnkey Government Projects',
    benefits: [
      'Direct government procurement',
      'Verified & trusted vendor status',
      'Transparent pricing on portal',
      'Eligible for all government tenders',
    ],
  },
  {
    id: 'msme',
    icon: Building2,
    title: 'MSME Udyam',
    subtitle: 'Udyam Registration Certificate',
    issuer: 'Ministry of MSME, Govt. of India',
    certNo: 'UDYAM-MH-2020',
    year: '2020',
    validity: 'Permanent',
    tag: 'National',
    tagColor: '#ea580c',
    gradient: 'from-orange-600 to-orange-900',
    sealColor: '#ea580c',
    desc: 'Registered under Udyam Registration for Micro, Small & Medium Enterprises — enabling access to government schemes and priority sector benefits.',
    scope: 'All Business Activities of DPM Enterprise Pvt. Ltd.',
    benefits: [
      'Priority in government tenders',
      'Access to MSME schemes & subsidies',
      'Collateral-free loan eligibility',
      'Reduced registration fees',
    ],
  },
  {
    id: 'startup',
    icon: Globe,
    title: 'Startup India',
    subtitle: 'DPIIT Recognition Certificate',
    issuer: 'DPIIT, Ministry of Commerce, Govt. of India',
    certNo: 'DIPP-2019-SI',
    year: '2019',
    validity: 'Active',
    tag: 'Innovation',
    tagColor: '#7c3aed',
    gradient: 'from-violet-700 to-violet-900',
    sealColor: '#7c3aed',
    desc: 'Recognized by DPIIT under the Startup India initiative for innovation in interior design, manufacturing processes, and technology adoption.',
    scope: 'Innovation in Interior Design & Manufacturing Processes',
    benefits: [
      'Tax exemptions for 3 years',
      'Fast-track patent applications',
      'Self-certification compliance',
      'Access to startup funds',
    ],
  },
  {
    id: 'gst',
    icon: FileText,
    title: 'GST Registration',
    subtitle: 'Goods & Services Tax Compliance',
    issuer: 'GST Council, Govt. of India',
    certNo: '27AAHCD8357P1ZU',
    year: '2017',
    validity: 'Active',
    tag: 'Compliance',
    tagColor: '#0d9488',
    gradient: 'from-teal-700 to-teal-900',
    sealColor: '#0d9488',
    desc: 'Registered under Goods and Services Tax with GSTIN 27AAHCD8357P1ZU — fully compliant with all GST filing, invoicing, and return requirements.',
    scope: 'All Taxable Supplies of Goods and Services',
    benefits: [
      'Input tax credit available',
      'Compliant & transparent invoicing',
      'Pan-India operations enabled',
      'Regular GST return filing',
    ],
  },
  {
    id: 'defense',
    icon: Shield,
    title: 'Defense Empanelment',
    subtitle: 'Ministry of Defence Approved',
    issuer: 'Ministry of Defence, Govt. of India',
    certNo: 'MOD-EMP-2016',
    year: '2016',
    validity: 'Active',
    tag: 'Defence',
    tagColor: '#475569',
    gradient: 'from-slate-700 to-slate-900',
    sealColor: '#475569',
    desc: 'Empanelled vendor for defence establishment projects including Indian Navy, Army, and Air Force facilities — with full security clearance and background verification.',
    scope: 'Interior Works · Furniture Supply for Defence Establishments',
    benefits: [
      'Eligible for defence tenders',
      'Security clearance obtained',
      'Specialised defence specifications',
      'Trusted by all three armed forces',
    ],
  },
];

const CLIENTS = [
  { name: 'Indian Navy', type: 'Defence', projects: '8+', icon: Anchor, color: '#1d4ed8' },
  { name: 'Indian Army', type: 'Defence', projects: '5+', icon: Sword, color: '#475569' },
  { name: 'Indian Railways', type: 'Government', projects: '6+', icon: Train, color: '#16a34a' },
  { name: 'Mumbai University', type: 'Education', projects: '3+', icon: GraduationCap, color: '#7c3aed' },
  { name: 'HDFC Bank', type: 'Banking', projects: '18+', icon: Banknote, color: '#0d9488' },
  { name: 'State Bank of India', type: 'Banking', projects: '12+', icon: Landmark, color: '#ea580c' },
  { name: 'ONGC', type: 'PSU', projects: '4+', icon: Zap, color: '#D4AF37' },
  { name: 'BHEL', type: 'PSU', projects: '3+', icon: Wrench, color: '#64748b' },
];

const TIMELINE = [
  { year: '2013', event: 'ISO 9001:2015 Certified', detail: 'Bureau Veritas Certification', icon: Award, color: '#1d4ed8' },
  { year: '2016', event: 'Defense Empanelment', detail: 'Ministry of Defence, India', icon: Shield, color: '#475569' },
  { year: '2017', event: 'GST Registration', detail: 'GSTIN: 27AAHCD8357P1ZU', icon: FileText, color: '#0d9488' },
  { year: '2018', event: 'GeM Vendor Registration', detail: 'Government e-Marketplace', icon: Landmark, color: '#16a34a' },
  { year: '2019', event: 'Startup India Recognition', detail: 'DPIIT, Ministry of Commerce', icon: Globe, color: '#7c3aed' },
  { year: '2020', event: 'MSME Udyam Registration', detail: 'Ministry of MSME, India', icon: Building2, color: '#ea580c' },
];

const WHY_MATTERS = [
  { icon: Lock, title: 'Zero Compliance Risk', desc: 'Every project is executed under certified processes — no legal, tax, or quality surprises for your organisation.' },
  { icon: TrendingUp, title: 'Proven Track Record', desc: 'Over a decade of certifications means our quality systems are battle-tested across 500+ projects pan-India.' },
  { icon: Landmark, title: 'Government-Grade Trust', desc: 'Defence empanelment and GeM registration means we meet the strictest procurement standards in India.' },
  { icon: Zap, title: 'Faster Project Clearance', desc: 'Pre-verified credentials mean faster approvals, less paperwork, and quicker project kick-offs.' },
  { icon: Users, title: 'Preferred Vendor Status', desc: 'MSME and Startup India recognition gives us priority access to government tenders and schemes.' },
  { icon: BadgeCheck, title: 'End-to-End Accountability', desc: 'ISO-certified processes ensure every stage — from design to handover — is documented and auditable.' },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: 'easeOut' as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#b8962e] text-xs font-bold rounded-full uppercase tracking-widest mb-4">
      {children}
    </span>
  );
}

// ─── Certificate Card ─────────────────────────────────────────────────────────

function CertCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const Icon = cert.icon;
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      {/* Header band */}
      <div className={`bg-gradient-to-br ${cert.gradient} p-7 relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 -bottom-12 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute left-0 bottom-0 w-full h-px bg-white/10" />

        {/* Tag */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.12)' }}
          >
            {cert.tag}
          </span>
          <span className="text-[10px] text-white/50 font-semibold">Since {cert.year}</span>
        </div>

        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-white leading-tight">{cert.title}</h2>
            <p className="text-white/60 text-xs mt-1 leading-snug">{cert.subtitle}</p>
            <p className="text-white/40 text-[10px] mt-1 font-mono">{cert.issuer}</p>
          </div>
        </div>

        {/* Validity badge */}
        <div className="mt-5 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold">
            <CheckCircle2 className="h-3 w-3 text-green-300" />
            {cert.validity}
          </span>
          <span className="text-white/30 text-[10px] font-mono">{cert.certNo}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{cert.desc}</p>

        {/* Scope */}
        <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-4 pb-4 border-b border-gray-100">
          {cert.scope}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-2 mt-auto">
          {cert.benefits.map(b => (
            <div key={b} className="flex items-center gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: cert.sealColor + '18' }}
              >
                <CheckCircle2 className="h-2.5 w-2.5" style={{ color: cert.sealColor }} />
              </div>
              <span className="text-xs text-gray-600">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-1 w-full transition-all duration-500 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${cert.sealColor}, ${cert.sealColor}88)` }}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  return (
    <>
      <Helmet>
        <title>Certifications | DPM Enterprise — ISO 9001, GeM, MSME, Defence Certified</title>
        <meta
          name="description"
          content="DPM Enterprise holds ISO 9001:2015, GeM registration, MSME Udyam, Startup India recognition, and Defence empanelment. Trusted by Indian Navy, Army, Railways, and top corporates since 2007."
        />
        <link rel="canonical" href="https://www.dpmenterprise.in/certifications" />
        <meta property="og:title" content="Certifications | DPM Enterprise — ISO 9001, GeM, MSME, Defence Certified" />
        <meta property="og:description" content="ISO 9001:2015, GeM registration, MSME Udyam, Startup India, and Defence empanelment. Trusted since 2007." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/certifications" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Certifications | DPM Enterprise" />
        <meta name="twitter:description" content="ISO 9001:2015, GeM, MSME, Startup India, and Defence certified. Trusted by Indian Navy, Army, Railways since 2007." />
      </Helmet>

      <div className="overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-[#001a3a] text-white overflow-hidden min-h-[88vh] flex items-center">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          {/* Radial glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none" />
          {/* Radial glow bottom-right */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-900/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative container mx-auto px-6 max-w-6xl py-24 md:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-7"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-black rounded-full uppercase tracking-widest">
                    <BadgeCheck className="h-3.5 w-3.5" /> Our Credentials
                  </span>
                </motion.div>

                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
                >
                  Certified.
                  <br />
                  Trusted.
                  <br />
                  <span className="text-[#D4AF37]">Approved.</span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
                >
                  DPM Enterprise holds 6 active national and international certifications — making us the
                  preferred choice for government, defence, and corporate projects across India since 2007.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
                  >
                    Get Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="tel:+919930998063"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 hover:bg-white/8 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4" /> +91 99309 98063
                  </a>
                </motion.div>
              </div>

              {/* Right — stats + cert pills */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="space-y-5"
              >
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '13+', label: 'Years Certified', icon: CalendarCheck, color: '#D4AF37' },
                    { value: '6', label: 'Active Certifications', icon: BadgeCheck, color: '#22c55e' },
                    { value: '59+', label: 'Govt. Projects', icon: Landmark, color: '#60a5fa' },
                    { value: '100%', label: 'Compliance Record', icon: Lock, color: '#a78bfa' },
                  ].map(({ value, label, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="bg-white/6 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/9 transition-colors"
                    >
                      <Icon className="h-5 w-5 mb-3" style={{ color }} />
                      <div className="text-3xl font-black text-white">{value}</div>
                      <div className="text-xs text-white/45 mt-1 leading-snug">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Cert pills */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Active Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {['ISO 9001:2015', 'GeM Registered', 'MSME Udyam', 'Startup India', 'Defence Empanelled', 'GST Compliant'].map(cert => (
                      <span
                        key={cert}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 border border-white/12 rounded-full text-xs text-white/75 font-medium"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        </section>

        {/* ── CERTIFICATION TIMELINE ────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Our Journey</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                A Decade of Compliance
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Every certification represents our unwavering commitment to quality, transparency, and trust.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Centre line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent -translate-x-1/2" />

              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
                {TIMELINE.map(({ year, event, detail, icon: Icon, color }, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={year}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className={`md:flex md:items-center md:gap-0 md:mb-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Card side */}
                      <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                        <div className="inline-block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-5 max-w-xs w-full">
                          <div className={`flex items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: color + '18' }}
                            >
                              <Icon className="h-5 w-5" style={{ color }} />
                            </div>
                            <div className={isLeft ? 'md:text-right' : ''}>
                              <div className="font-black text-[#001a3a] text-sm">{event}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{detail}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Centre node */}
                      <div
                        className="hidden md:flex w-12 h-12 rounded-full border-4 border-white shadow-lg items-center justify-center flex-shrink-0 z-10 relative"
                        style={{ backgroundColor: color }}
                      >
                        <span className="text-white text-xs font-black">{year.slice(2)}</span>
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS GRID ───────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Full Credentials</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                Our Certifications
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Each certification is a testament to our commitment to quality, compliance, and excellence across every project.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTS.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ────────────────────────────────────────────────── */}
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
              <SectionLabel>Why It Matters</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black">
                What Our Certifications<br />
                <span className="text-[#D4AF37]">Mean for You</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_MATTERS.map(({ icon: Icon, title, desc }, i) => (
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

        {/* ── CLIENTS SERVED ────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <SectionLabel>Trusted By</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-[#001a3a]">
                Government & Corporate Clients
              </h2>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                Our certifications have earned us the trust of India's most prestigious institutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {CLIENTS.map(({ name, type, projects, icon: Icon, color }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color + '18', border: `1.5px solid ${color}30` }}
                  >
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <h3 className="font-black text-[#001a3a] text-sm mb-1 leading-tight">{name}</h3>
                  <div className="text-[11px] text-gray-400 mb-3 uppercase tracking-wider font-semibold">{type}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-xs text-[#b8962e] font-bold">{projects} projects</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Aggregate stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-[#001a3a] rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: '500+', label: 'Projects Delivered', icon: ChevronRight },
                { value: '59+', label: 'Government Projects', icon: Landmark },
                { value: '₹200Cr+', label: 'Project Value Executed', icon: TrendingUp },
                { value: '12+', label: 'States Covered', icon: Globe },
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-[#001a3a] via-[#001f47] to-[#002d5c] rounded-3xl p-10 md:p-16 text-white text-center overflow-hidden"
            >
              {/* Decorative glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/12 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-900/30 rounded-full blur-[80px] pointer-events-none" />

              {/* Grid overlay */}
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
                  <BadgeCheck className="h-3.5 w-3.5" /> Certified Quality Guaranteed
                </div>

                <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">
                  Need Certified Quality<br />for Your Project?
                </h2>
                <p className="text-white/55 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                  Our certifications ensure you get the highest quality, fully compliant, and government-trusted
                  service — every single time.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black rounded-xl transition-colors text-sm"
                  >
                    Get Free Quote <ArrowRight className="h-4 w-4" />
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

                {/* Download credentials */}
                <div className="flex justify-center mb-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/15 hover:bg-white/14 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all duration-200"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Request Credentials Pack (ISO + GeM + Defence)
                  </Link>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap justify-center gap-5 pt-8 border-t border-white/10">
                  {['ISO 9001:2015', 'GeM Registered', 'Defence Empanelled', 'MSME Certified', 'Startup India'].map(c => (
                    <span key={c} className="flex items-center gap-1.5 text-xs text-white/45 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" /> {c}
                    </span>
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
