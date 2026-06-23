import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Award, Truck, Phone, Mail, ShoppingCart, ClipboardList, FileCheck, Calculator, Download, Building, FileSignature, HelpCircle, Wrench, Shield } from 'lucide-react';

export default function GeMSupportPage() {
  const gemFeatures = [
    { 
      icon: ShoppingCart, 
      title: 'GeM Product Listing & Catalog', 
      desc: 'Complete product catalog creation with HD images, detailed specifications, HSN codes, and competitive pricing for all interior products',
      features: ['Product Photography', 'Technical Specifications', 'HSN Code Mapping', 'Competitive Pricing']
    },
    { 
      icon: ClipboardList, 
      title: 'Tender Participation & Bid Management', 
      desc: 'End-to-end tender search, analysis, bid preparation, and submission with compliance checks and deadline management',
      features: ['Tender Search & Analysis', 'Bid Document Preparation', 'Compliance Verification', 'Online Submission']
    },
    { 
      icon: FileCheck, 
      title: 'BOQ Preparation & Technical Compliance', 
      desc: 'Detailed Bill of Quantities with item-wise breakup, technical specifications, and full compliance with tender requirements',
      features: ['Item-wise BOQ', 'Technical Specifications', 'Compliance Documents', 'Quality Standards']
    },
    { 
      icon: Calculator, 
      title: 'Price Quotation & Cost Estimation', 
      desc: 'Competitive pricing analysis, detailed cost breakdowns, and professional quotation preparation with transparent pricing',
      features: ['Market Rate Analysis', 'Cost Breakdown', 'Profit Margin Calculation', 'Competitive Pricing']
    },
    { 
      icon: Download, 
      title: 'PDF Estimate Generation', 
      desc: 'Automated professional PDF estimates with company letterhead, detailed item breakdowns, terms & conditions, and digital signatures',
      features: ['Company Letterhead', 'Itemized Breakdown', 'Terms & Conditions', 'Digital Signature']
    },
    { 
      icon: Award, 
      title: 'Documentation & Certification', 
      desc: 'Complete management of ISO 9001:2015, MSME, GST, PAN, and all required certificates with renewal reminders',
      features: ['ISO Certificates', 'MSME Registration', 'GST Documents', 'PAN & TAN']
    },
    { 
      icon: FileSignature, 
      title: 'Company Letter Head & Formats', 
      desc: 'Professional letterheads, quotation templates, invoice formats, and all official document templates as per standards',
      features: ['Letterhead Design', 'Quotation Templates', 'Invoice Formats', 'Official Stamps']
    },
    { 
      icon: Building, 
      title: 'Order Processing & Execution', 
      desc: 'Complete order management from confirmation to delivery with quality checks, installation, and handover documentation',
      features: ['Order Confirmation', 'Production Tracking', 'Quality Control', 'Installation & Handover']
    },
    { 
      icon: HelpCircle, 
      title: 'Clarification Management', 
      desc: 'Professional handling of all pre-bid and post-bid clarifications with technical responses and documentation support',
      features: ['Pre-bid Queries', 'Technical Clarifications', 'Document Submission', 'Follow-up Support']
    },
    { 
      icon: Wrench, 
      title: 'After-Sales Service & AMC', 
      desc: 'Annual Maintenance Contract, warranty support, repair services, and replacement parts with dedicated support team',
      features: ['Warranty Support', 'AMC Contracts', 'Repair Services', 'Spare Parts']
    },
    { 
      icon: Shield, 
      title: 'Bid Login & Account Management', 
      desc: 'Secure GeM portal login assistance, account setup, profile management, and digital signature certificate support',
      features: ['Account Setup', 'Profile Management', 'DSC Support', 'Login Assistance']
    },
    { 
      icon: FileText, 
      title: 'Category-wise Bid Preparation', 
      desc: 'Specialized bid preparation for furniture, interior, civil work, electrical, and all related categories with expert guidance',
      features: ['Furniture Bids', 'Interior Work Bids', 'Civil Work Bids', 'Electrical Bids']
    },
  ];

  const bidProcess = [
    { step: '1', title: 'Tender Search', desc: 'We search and identify relevant tenders matching your business' },
    { step: '2', title: 'Bid Analysis', desc: 'Complete analysis of tender requirements and eligibility criteria' },
    { step: '3', title: 'BOQ Preparation', desc: 'Detailed Bill of Quantities with item-wise pricing and specifications' },
    { step: '4', title: 'Document Preparation', desc: 'All compliance documents, certificates, and technical specifications' },
    { step: '5', title: 'Bid Submission', desc: 'Online submission with all required documents before deadline' },
    { step: '6', title: 'Follow-up', desc: 'Post-submission follow-up, clarifications, and status tracking' },
  ];

  const whyChoose = [
    { icon: Award, title: 'GeM Registered Vendor', desc: 'Official GeM portal registered with verified credentials' },
    { icon: Shield, title: 'ISO 9001:2015 Certified', desc: 'Quality management system certified by international standards' },
    { icon: Building, title: 'MSME Certified', desc: 'Government recognized MSME enterprise with all benefits' },
    { icon: CheckCircle, title: '18+ Years Experience', desc: 'Serving government departments since 2007 with proven track record' },
    { icon: FileCheck, title: 'Complete Documentation', desc: 'All certificates, licenses, and compliance documents ready' },
    { icon: Truck, title: 'Pan-India Service', desc: 'Delivery and installation services across India' },
  ];

  return (
    <>
      <Helmet>
        <title>GeM Portal Support — Bid Management, BOQ &amp; Estimates | DPM Enterprise</title>
        <meta name="description" content="Complete GeM portal support: Tender participation, bid management, BOQ preparation, PDF estimates, category-wise bidding. ISO certified GeM registered vendor." />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace/gem-support" />
        <meta property="og:title" content="GeM Portal Support | DPM Enterprise" />
        <meta property="og:description" content="End-to-end GeM portal support — tender bidding, BOQ, estimates, documentation. ISO certified." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/marketplace/gem-support" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-700">
          <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/2206139704/photo/aerial-view-of-office-towers-and-capitol-mall-from-across-sacramento-river.jpg?b=1&s=2048x2048&w=0&k=20&c=DAedKRQFg_kD4scHvnrvT-biL2GdvutWXY8pLoIUrUQ=')] bg-cover bg-center opacity-10"></div>

          <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 text-white text-center">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm font-bold tracking-wide">GOVERNMENT e-MARKETPLACE (GeM) SUPPORT</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Complete GeM Portal & Bidding Services
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-bold tracking-wide">
                Tender Participation | BOQ Preparation | PDF Estimates | Bid Login | Category-wise Bidding
              </p>
              <p className="text-base md:text-lg mb-10 text-white/95 max-w-3xl mx-auto font-medium leading-relaxed">
                DPM ENTERPRISE provides end-to-end GeM portal support for government tenders, institutional procurement, and PSU projects with complete documentation and professional execution.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/contact" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold bg-white text-green-700 hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                  Get GeM Support
                </a>
                <a href="tel:+919930998063" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 transition-all shadow-xl">
                  <Phone className="h-5 w-5" />
                  Call: +91 99309 98063
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GeM Features - Complete List */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">Complete GeM Portal Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From tender search to after-sales service - we handle everything for your GeM procurement needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {gemFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 border-gray-200 hover:border-green-600 transition-all hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Icon className="h-6 w-6 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-[#002147] mb-2">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{feature.desc}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bid Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">Our Bid Management Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Step-by-step professional bid management from tender search to order execution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bidProcess.map((process, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#002147] mb-2">{process.title}</h3>
                      <p className="text-sm text-gray-600">{process.desc}</p>
                    </div>
                  </div>
                  {index < bidProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-green-200 -translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">Why Choose DPM ENTERPRISE for GeM</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Trusted GeM partner with proven track record in government procurement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {whyChoose.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <Card key={index} className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all hover:shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#D4AF37]/10 rounded-lg">
                          <Icon className="h-6 w-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-[#002147]">{reason.title}</h3>
                          <p className="text-sm text-gray-600">{reason.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#002147] via-[#003366] to-[#002147] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your GeM Journey?</h2>
            <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">
              Contact us today for complete GeM portal support, bid management, and government procurement assistance
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold bg-[#D4AF37] text-gray-900 hover:bg-[#C19B2B] transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                Request GeM Support
              </a>
              <a href="tel:+919930998063" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold bg-white text-[#002147] hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a href="mailto:admin@dpmenterprise.in" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 transition-all shadow-xl">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
