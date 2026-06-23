import { Building2, Ruler, Layers, PenTool, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function ArchitecturalSolutionsPage() {
  const services = [
    {
      icon: PenTool,
      title: 'Concept Design & Planning',
      description: 'Transform your vision into detailed architectural concepts with 3D visualization, space planning, and feasibility studies.',
    },
    {
      icon: Layers,
      title: 'Structural Engineering',
      description: 'Complete structural design and engineering services ensuring safety, compliance, and optimal material utilization.',
    },
    {
      icon: Ruler,
      title: '3D Visualization & Walkthroughs',
      description: 'Photorealistic 3D renderings and virtual walkthroughs to visualize your project before construction begins.',
    },
    {
      icon: Building2,
      title: 'Construction Documentation',
      description: 'Comprehensive working drawings, BOQ preparation, and technical specifications for seamless project execution.',
    },
  ];

  const features = [
    'BIM (Building Information Modeling)',
    'Sustainable Design Integration',
    'Code Compliance & Approvals',
    'MEP Coordination',
    'Value Engineering',
    'Site Analysis & Planning',
  ];

  const projects = [
    {
      title: 'Corporate Headquarters - Mumbai',
      description: '50,000 sq.ft. modern office complex with sustainable design elements',
      image: 'https://media.gettyimages.com/id/2158847991/photo/architect-working-on-blueprint-architectural-concept.jpg?b=1&s=2048x2048&w=0&k=20&c=8vQZxH0KqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0=',
    },
    {
      title: 'Defense Facility - Virar',
      description: 'High-security infrastructure with specialized architectural requirements',
      image: 'https://media.gettyimages.com/id/2236714346/photo/3d-rendering-of-a-modern-open-plan-office-interior-industrial-style-workspace-with-exposed.jpg?b=1&s=2048x2048&w=0&k=20&c=hl0QC-QrHparj7Xd1_COk-F0n2VI89T-2Z-4hHHFXrA=',
    },
    {
      title: 'Educational Campus - Thane',
      description: 'Multi-building campus design with modern learning spaces',
      image: 'https://media.gettyimages.com/id/2240807469/photo/secondary-school-library.jpg?b=1&s=2048x2048&w=0&k=20&c=Pjjg4W6C03tglyWYau3WLodsR0E-U4c0CwwhuCSES74=',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Architectural Design & Planning Services Mumbai | DPM Enterprise</title>
        <meta name="description" content="Comprehensive architectural solutions in Mumbai — concept design, 3D visualization, structural drawings, BOQ. ISO 9001:2015 certified. Corporate, defense, and institutional projects." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/architectural-solutions" />
        <meta property="og:title" content="Architectural Design & Planning Services Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Comprehensive architectural solutions in Mumbai. ISO certified. Corporate, defense, institutional projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/architectural-solutions" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Architectural Design & Planning Services Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Comprehensive architectural solutions in Mumbai. ISO certified." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Architectural Design & Planning",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/architectural-solutions",
          "description": "Comprehensive architectural design and planning services in Mumbai."
        })}</script>
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/2158847991/photo/architect-working-on-blueprint-architectural-concept.jpg?b=1&s=2048x2048&w=0&k=20&c=8vQZxH0KqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0="
              alt="Architectural Design Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/75" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-semibold">Architectural Excellence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Architectural Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              From Blueprint to Reality - Precision Design for Large-Scale Projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
                <a href="/contact">Request Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white" asChild>
                <a href="/projects">View Projects</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Architectural Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive design and planning services for corporate, defense, and institutional projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Advanced Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground">Architectural excellence across diverse sectors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
              <p className="text-xl text-muted-foreground">Systematic approach to architectural excellence</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Site Analysis & Brief', description: 'Comprehensive site study and requirement gathering' },
                  { step: '02', title: 'Concept Development', description: '3D visualization and design options presentation' },
                  { step: '03', title: 'Design Development', description: 'Detailed drawings and technical specifications' },
                  { step: '04', title: 'Documentation', description: 'Complete construction documentation and approvals' },
                  { step: '05', title: 'Construction Support', description: 'On-site supervision and quality control' },
                ].map((phase, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      {phase.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{phase.title}</h3>
                      <p className="text-muted-foreground text-lg">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Let's discuss your architectural requirements and create something extraordinary
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <a href="/contact">Get Free Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-primary-foreground text-lg px-8" asChild>
                <a href="tel:+919930998063">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
