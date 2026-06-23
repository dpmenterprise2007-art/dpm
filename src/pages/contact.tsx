import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Phone, Mail, MapPin, MessageCircle, Clock,
  Send, CheckCircle2, ArrowRight, Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const SERVICES_LIST = [
  'Residential Interior',
  'Corporate Interior',
  'Modular Kitchen',
  'Furniture Manufacturing',
  'Government / Defense Project',
  'Turnkey Solutions',
  'Architectural Solutions',
  'Commercial Showrooms',
  'GeM Portal Enquiry',
  'Other',
];

const BUDGETS = [
  'Under ₹5 Lakhs',
  '₹5 – ₹15 Lakhs',
  '₹15 – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  'Above ₹1 Crore',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: '', city: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success('Enquiry submitted! We will contact you within 24 hours.');
      } else {
        toast.error('Something went wrong. Please call us directly.');
      }
    } catch {
      toast.error('Network error. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact DPM Enterprise | Free Consultation | Mumbai +91 99309 98063</title>
        <meta name="description" content="Contact DPM Enterprise for free interior design consultation. Call +91 99309 98063 or email admin@dpmenterprise.in. Serving Mumbai, Pune, Delhi, Bangalore and pan-India." />
        <link rel="canonical" href="https://www.dpmenterprise.in/contact" />
        <meta property="og:title" content="Contact DPM Enterprise | Free Consultation" />
        <meta property="og:description" content="Get a free interior design consultation. Call +91 99309 98063 or email admin@dpmenterprise.in. Serving pan-India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact DPM Enterprise | Free Consultation" />
        <meta name="twitter:description" content="Free interior design consultation. Call +91 99309 98063. Serving Mumbai, Pune, Delhi, Bangalore and pan-India." />
      </Helmet>

      <div>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#001a3a] to-[#002d5c] text-white py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Let's Build Something<br /><span className="text-[#D4AF37]">Extraordinary Together</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Free consultation · No obligation · Expert advice · Pan-India service
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-10 bg-[#D4AF37]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Phone,   label: 'Mobile',   value: '+91 99309 98063', href: 'tel:+919930998063' },
                { icon: Phone,   label: 'Office',   value: '022-6971-9769',   href: 'tel:02269719769' },
                { icon: Mail,    label: 'Email',    value: 'admin@dpmenterprise.in', href: 'mailto:admin@dpmenterprise.in' },
                { icon: MapPin,  label: 'Address',  value: 'Virar East, Mumbai', href: 'https://maps.google.com/?q=35+Florence+Building+Work+City+Virar+East+Mumbai+401305' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center gap-2 p-4 bg-[#001a3a]/10 hover:bg-[#001a3a]/20 rounded-xl text-center transition-colors group"
                >
                  <Icon className="h-5 w-5 text-[#001a3a]" />
                  <span className="text-[10px] text-[#001a3a]/60 uppercase tracking-wider font-bold">{label}</span>
                  <span className="text-[#001a3a] text-xs font-semibold leading-snug break-all">{value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-5 gap-12">

              {/* Form — 3 cols */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-black text-[#001a3a] mb-2">Send Us an Enquiry</h2>
                <p className="text-gray-500 text-sm mb-8">We respond within 24 hours. For urgent queries, call or WhatsApp directly.</p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-green-800 mb-2">Enquiry Submitted!</h3>
                    <p className="text-green-700 text-sm mb-6">Our team will contact you within 24 hours. For immediate assistance, call or WhatsApp us.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href="tel:+919930998063" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#001a3a] text-white font-semibold rounded-xl text-sm">
                        <Phone className="h-4 w-4" /> Call Now
                      </a>
                      <a
                        href="https://wa.me/919930998063"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl text-sm"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="rounded-xl border-gray-200" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className="rounded-xl border-gray-200" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="rounded-xl border-gray-200" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Location</label>
                        <Input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai, Pune, Delhi..." className="rounded-xl border-gray-200" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Service Required</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
                        >
                          <option value="">Select a service</option>
                          {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Approximate Budget</label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
                        >
                          <option value="">Select budget range</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Details</label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — size, requirements, timeline, special needs..."
                        rows={4}
                        className="rounded-xl border-gray-200 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#D4AF37] hover:bg-[#b8962e] text-[#001a3a] font-bold py-3 rounded-xl text-sm gap-2"
                    >
                      {loading ? 'Submitting...' : <><Send className="h-4 w-4" /> Submit Enquiry</>}
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you agree to be contacted by our team. We never share your data.
                    </p>
                  </form>
                )}
              </div>

              {/* Info — 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                {/* Office info */}
                <div className="bg-[#001a3a] text-white rounded-2xl p-6">
                  <h3 className="font-black text-lg mb-5 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#D4AF37]" /> Our Office
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <div className="text-sm text-white/80">
                        35 Florence Building, Work City,<br />
                        Virar East, Mumbai — 401305<br />
                        Maharashtra, India
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <div className="text-sm text-white/80">
                        <a href="tel:+919930998063" className="hover:text-white transition-colors">+91 99309 98063</a>
                        <span className="mx-2 text-white/30">|</span>
                        <a href="tel:02269719769" className="hover:text-white transition-colors">022-6971-9769</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <a href="mailto:admin@dpmenterprise.in" className="text-sm text-white/80 hover:text-white transition-colors break-all">
                        admin@dpmenterprise.in
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <div className="text-sm text-white/80">
                        Mon–Sat: 9:00 AM – 7:00 PM<br />
                        Sunday: 10:00 AM – 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919930998063?text=Hi%20DPM%20Enterprise%2C%20I%20need%20a%20free%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-green-800">Chat on WhatsApp</div>
                    <div className="text-sm text-green-600">Instant reply · Available 9 AM – 9 PM</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Why contact us */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-[#001a3a] mb-4">Why Contact Us?</h3>
                  <ul className="space-y-3">
                    {[
                      'Free site visit & consultation',
                      'Detailed 3D design visualization',
                      'Transparent pricing — no hidden costs',
                      'On-time delivery guarantee',
                      'Pan-India project execution',
                      'GeM portal procurement support',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map embed */}
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    title="DPM Enterprise Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.5!2d72.8!3d19.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVirar+East+Mumbai!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
