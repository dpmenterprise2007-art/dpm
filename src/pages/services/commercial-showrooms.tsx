import { Store, Lightbulb, Palette, Users, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function CommercialShowroomsPage() {
  const services = [
    {
      icon: Store,
      title: 'Retail Store Design',
      description: 'Create compelling retail environments that enhance customer experience and drive sales with strategic space planning and visual merchandising.',
    },
    {
      icon: Lightbulb,
      title: 'Luxury Showrooms',
      description: 'Premium showroom interiors that showcase your products with sophisticated lighting, materials, and brand-aligned aesthetics.',
    },
    {
      icon: Palette,
      title: 'Brand Experience Centers',
      description: 'Immersive brand spaces that tell your story through innovative design, interactive displays, and memorable customer journeys.',
    },
    {
      icon: Users,
      title: 'Commercial Spaces',
      description: 'Multi-functional commercial interiors including restaurants, cafes, salons, and service centers with optimal flow and ambiance.',
    },
  ];

  const features = [
    'Strategic Space Planning',
    'Visual Merchandising Design',
    'Custom Display Systems',
    'Lighting Design & Automation',
    'Brand Identity Integration',
    'Customer Flow Optimization',
    'Sustainable Materials',
    'Turnkey Execution',
  ];

  const projects = [
    {
      title: 'Luxury Automobile Showroom',
      description: 'Premium car showroom with dramatic lighting and sophisticated finishes',
      image: 'https://media.gettyimages.com/id/2190753921/photo/modern-luxury-retail-showroom-interior.jpg?b=1&s=2048x2048&w=0&k=20&c=7vQZxH0KqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0=',
    },
    {
      title: 'Fashion Retail Store - Mumbai',
      description: 'Contemporary fashion boutique with custom display fixtures',
      image: 'https://media.gettyimages.com/id/2203380313/photo/modern-luxury-living-room-with-brown-l-shape-sofa-on-high-pile-shag-rug-on-white-tile-floor.jpg?b=1&s=2048x2048&w=0&k=20&c=vT58Bbbs5g3iwbt3kAejrYno_gnzK0zD2a09-Va5oiY=',
    },
    {
      title: 'Electronics Showroom',
      description: 'Tech-forward showroom with interactive product displays',
      image: 'https://media.gettyimages.com/id/2236714346/photo/3d-rendering-of-a-modern-open-plan-office-interior-industrial-style-workspace-with-exposed.jpg?b=1&s=2048x2048&w=0&k=20&c=hl0QC-QrHparj7Xd1_COk-F0n2VI89T-2Z-4hHHFXrA=',
    },
  ];

  const benefits = [
    {
      title: 'Increased Sales',
      description: 'Strategic design that guides customers and highlights products effectively',
    },
    {
      title: 'Brand Differentiation',
      description: 'Unique spaces that set you apart from competitors',
    },
    {
      title: 'Customer Engagement',
      description: 'Memorable experiences that build loyalty and word-of-mouth',
    },
    {
      title: 'Operational Efficiency',
      description: 'Optimized layouts for staff productivity and inventory management',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Commercial & Showroom Interior Design Mumbai | Retail Spaces | DPM Enterprise</title>
        <meta name="description" content="Premium commercial and showroom interior design in Mumbai — retail stores, luxury showrooms, brand experience centers, restaurants, salons. ISO 9001:2015 certified. Free consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/commercial-showrooms" />
        <meta property="og:title" content="Commercial & Showroom Interior Design Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Premium commercial and showroom interior design in Mumbai. ISO certified. Retail, luxury showrooms, brand spaces." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/commercial-showrooms" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial & Showroom Interior Design Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Premium commercial and showroom interior design in Mumbai. ISO certified." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Commercial & Showroom Interior Design",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/commercial-showrooms",
          "description": "Premium commercial and showroom interior design in Mumbai."
        })}</script>
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/2190753921/photo/modern-luxury-retail-showroom-interior.jpg?b=1&s=2048x2048&w=0&k=20&c=7vQZxH0KqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0YqJ0="
              alt="Commercial Showroom Interior Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/75" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5" />
              <span className="text-sm font-semibold">Commercial Excellence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Commercial & Showrooms
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Transform Your Retail Space into a Sales-Driving Experience
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
              <h2 className="text-4xl font-bold mb-4">Our Commercial Design Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Creating retail and commercial spaces that captivate customers and drive business success
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
              <h2 className="text-4xl font-bold mb-12 text-center">What We Deliver</h2>
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

        {/* Benefits Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Invest in Professional Design?</h2>
              <p className="text-xl text-muted-foreground">Strategic design delivers measurable business results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground">Transforming commercial spaces across industries</p>
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
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
              <p className="text-xl text-muted-foreground">From concept to grand opening</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Brand & Business Analysis', description: 'Understanding your brand, target customers, and business goals' },
                  { step: '02', title: 'Concept Design', description: '3D visualization and mood boards aligned with your brand identity' },
                  { step: '03', title: 'Space Planning', description: 'Optimized layouts for customer flow and product display' },
                  { step: '04', title: 'Execution & Installation', description: 'Turnkey implementation with minimal disruption to operations' },
                  { step: '05', title: 'Launch Support', description: 'Final styling, merchandising guidance, and post-launch support' },
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

        {/* Industries Served */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-xl text-muted-foreground">Specialized expertise across commercial sectors</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                'Fashion & Apparel',
                'Automobile Showrooms',
                'Electronics & Tech',
                'Jewelry & Luxury',
                'Home Furnishing',
                'Cosmetics & Beauty',
                'Restaurants & Cafes',
                'Service Centers',
              ].map((industry, index) => (
                <div key={index} className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <p className="font-semibold">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Let's create a commercial space that drives sales and delights customers
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
