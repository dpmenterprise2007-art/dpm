import { Briefcase, Layers, Clock, Award, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function TurnkeySolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Turnkey Interior Solutions Mumbai | Complete Project Management | DPM Enterprise</title>
        <meta name="description" content="Complete turnkey interior solutions in Mumbai — design to handover. Civil, MEP, furniture, fit-out. Residential, commercial, and government projects. ISO 9001:2015 certified." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/turnkey-solutions" />
        <meta property="og:title" content="Turnkey Interior Solutions Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Complete turnkey interior solutions in Mumbai — design to handover. ISO 9001:2015 certified." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/turnkey-solutions" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Turnkey Interior Solutions Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Complete turnkey interior solutions in Mumbai. ISO certified. Design to handover." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Turnkey Interior Solutions",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/turnkey-solutions",
          "description": "Complete turnkey interior solutions from design to handover."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://media.gettyimages.com/id/2234871765/photo/architecture-and-construction-professionals-reviewing-project-outdoors.jpg?b=1&s=2048x2048&w=0&k=20&c=VwiUTEkhcvoEtnLDQIH0IcI8PJpZa6x6lYum0PXd1Cs="
              alt="Turnkey project management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-4 bg-primary text-white">Complete Solutions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Turnkey Interior Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              One-stop solution for all your interior needs - from concept to completion, we handle everything
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                Get Project Quote
              </Button>
            </div>
          </div>
        </section>

        {/* What is Turnkey */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What is a Turnkey Interior Solution?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                A turnkey solution means you hand us the keys to your space, and we return it fully transformed and ready to use. 
                We manage every aspect of your interior project - design, procurement, execution, and handover.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <Card className="p-6">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-2">Single Point of Contact</h3>
                  <p className="text-muted-foreground">No need to coordinate with multiple vendors. We handle everything.</p>
                </Card>
                <Card className="p-6">
                  <div className="text-4xl mb-4">⏱️</div>
                  <h3 className="text-xl font-bold mb-2">Time-Bound Delivery</h3>
                  <p className="text-muted-foreground">Fixed timeline with milestone-based execution and monitoring.</p>
                </Card>
                <Card className="p-6">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold mb-2">Fixed Budget</h3>
                  <p className="text-muted-foreground">Transparent pricing with no hidden costs or surprises.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Included */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything Included in Our Turnkey Package</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive services covering every aspect of your interior project
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Briefcase,
                  title: 'Design & Planning',
                  description: '3D visualization, space planning, material selection, and design approval',
                  image: 'https://media.gettyimages.com/id/2214174914/photo/white-collar-workers-are-working-at-skyscraper.jpg?b=1&s=2048x2048&w=0&k=20&c=Y-cAfX6FHRFNHGdLKpAsKDV6u9hGh3G7M0qP1AfN5WQ=',
                },
                {
                  icon: Layers,
                  title: 'Civil & MEP Work',
                  description: 'False ceiling, flooring, electrical, plumbing, HVAC, and fire safety',
                  image: 'https://media.gettyimages.com/id/2234871766/photo/construction-manager-and-architect-giving-instructions-to-worker.jpg?b=1&s=2048x2048&w=0&k=20&c=yOsLTJAJeHqgUqLqTTQTBGjMh_6S6pi4zqnry_fdnyE=',
                },
                {
                  icon: Clock,
                  title: 'Furniture & Fixtures',
                  description: 'Custom furniture manufacturing, modular units, and fixture installation',
                  image: 'https://media.gettyimages.com/id/1490077242/photo/aerial-wide-shot-of-large-construction-site-of-high-school.jpg?b=1&s=2048x2048&w=0&k=20&c=2xG7DdCNbWFdlvl8G5FUcLTOH89MpWYWuW09Ql7YohQ=',
                },
                {
                  icon: Award,
                  title: 'Project Management',
                  description: 'Site supervision, quality control, vendor coordination, and timely delivery',
                  image: 'https://media.gettyimages.com/id/1740832895/photo/large-construction-site-industrial-buildings.jpg?b=1&s=2048x2048&w=0&k=20&c=9hx8KsUIibzpzf0Piyc4DqAS1XNEAem2f3us0CWyJhY=',
                },
              ].map((feature, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Scope */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Scope of Work</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Detailed breakdown of all services included in our turnkey package
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: 'Design Services',
                  items: ['Site Survey & Measurement', '3D Design & Visualization', 'Material Selection', 'Lighting Design', 'Color Consultation'],
                },
                {
                  category: 'Civil Work',
                  items: ['False Ceiling', 'Partition Walls', 'Flooring (Tiles/Wood/Vinyl)', 'Wall Painting & Texture', 'Plaster of Paris Work'],
                },
                {
                  category: 'Electrical Work',
                  items: ['Wiring & Rewiring', 'Light Fixtures Installation', 'Switch & Socket Points', 'Electrical Panel Setup', 'Smart Home Integration'],
                },
                {
                  category: 'Plumbing & Sanitary',
                  items: ['Water Supply Lines', 'Drainage System', 'Bathroom Fixtures', 'Kitchen Plumbing', 'Water Heater Installation'],
                },
                {
                  category: 'Furniture & Joinery',
                  items: ['Modular Kitchen', 'Wardrobes & Storage', 'TV Units & Cabinets', 'Beds & Headboards', 'Study Tables & Desks'],
                },
                {
                  category: 'Finishing & Handover',
                  items: ['Painting & Polishing', 'Hardware Installation', 'Cleaning & Housekeeping', 'Snag List Clearance', 'Final Handover'],
                },
              ].map((scope, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">{scope.category}</h3>
                  <ul className="space-y-2">
                    {scope.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Turnkey Project Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Structured approach ensuring quality, transparency, and timely delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                {
                  step: '01',
                  title: 'Consultation',
                  description: 'Understanding requirements, site visit, and initial planning',
                  duration: 'Week 1',
                },
                {
                  step: '02',
                  title: 'Design',
                  description: '3D design, material selection, and quotation approval',
                  duration: 'Week 2-3',
                },
                {
                  step: '03',
                  title: 'Execution',
                  description: 'Civil work, MEP installation, and furniture manufacturing',
                  duration: 'Week 4-10',
                },
                {
                  step: '04',
                  title: 'Installation',
                  description: 'Furniture setup, fixture installation, and finishing work',
                  duration: 'Week 11-12',
                },
                {
                  step: '05',
                  title: 'Handover',
                  description: 'Quality check, snag clearance, and final handover',
                  duration: 'Week 13',
                },
              ].map((process, index) => (
                <Card key={index} className="p-6 relative">
                  <div className="text-5xl font-bold text-primary/10 absolute top-4 right-4">{process.step}</div>
                  <div className="relative z-10">
                    <Badge className="mb-3 bg-primary/10 text-primary">{process.duration}</Badge>
                    <h3 className="text-lg font-bold mb-2">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://media.gettyimages.com/id/2234871765/photo/architecture-and-construction-professionals-reviewing-project-outdoors.jpg?b=1&s=2048x2048&w=0&k=20&c=VwiUTEkhcvoEtnLDQIH0IcI8PJpZa6x6lYum0PXd1Cs="
                  alt="Project planning"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2234871766/photo/construction-manager-and-architect-giving-instructions-to-worker.jpg?b=1&s=2048x2048&w=0&k=20&c=yOsLTJAJeHqgUqLqTTQTBGjMh_6S6pi4zqnry_fdnyE="
                  alt="Site supervision"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://media.gettyimages.com/id/1490077242/photo/aerial-wide-shot-of-large-construction-site-of-high-school.jpg?b=1&s=2048x2048&w=0&k=20&c=2xG7DdCNbWFdlvl8G5FUcLTOH89MpWYWuW09Ql7YohQ="
                  alt="Construction site"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/1740832895/photo/large-construction-site-industrial-buildings.jpg?b=1&s=2048x2048&w=0&k=20&c=9hx8KsUIibzpzf0Piyc4DqAS1XNEAem2f3us0CWyJhY="
                  alt="Project execution"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Turnkey Solutions?</h2>
                <div className="space-y-4">
                  {[
                    'Single point of contact for entire project',
                    'Fixed timeline with milestone-based delivery',
                    'Transparent pricing with detailed quotation',
                    'ISO 9001:2015 certified quality processes',
                    'In-house design, manufacturing, and execution team',
                    'Regular project updates and site visits',
                    'Post-completion warranty and support',
                    'Experience with 500+ turnkey projects',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Types */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Turnkey Projects We Handle</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete interior solutions for residential, commercial, and government projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  type: 'Residential',
                  projects: ['Apartments & Flats', 'Villas & Bungalows', 'Penthouses', 'Row Houses', 'Studio Apartments'],
                },
                {
                  type: 'Commercial',
                  projects: ['Corporate Offices', 'Retail Stores', 'Restaurants & Cafes', 'Showrooms', 'Hotels & Resorts'],
                },
                {
                  type: 'Institutional',
                  projects: ['Government Offices', 'Schools & Colleges', 'Hospitals & Clinics', 'Banks & PSUs', 'Training Centers'],
                },
              ].map((category, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">{category.type}</h3>
                  <ul className="space-y-3">
                    {category.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-lg">{project}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Hassle-Free Interior Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a comprehensive turnkey quotation with detailed scope, timeline, and pricing
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Request Turnkey Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
