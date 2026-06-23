import { Hammer, Wrench, Palette, Award, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function FurnitureManufacturingPage() {
  return (
    <>
      <Helmet>
        <title>Custom Furniture Manufacturing Mumbai | Bespoke Furniture | DPM Enterprise</title>
        <meta name="description" content="Custom furniture manufacturing in Mumbai — bespoke designs, premium materials, expert craftsmanship. Residential & commercial. ISO 9001:2015 certified factory. Free quote." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/furniture-manufacturing" />
        <meta property="og:title" content="Custom Furniture Manufacturing Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Custom furniture manufacturing in Mumbai. Bespoke designs, premium materials. ISO certified factory." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/furniture-manufacturing" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/furniture-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Furniture Manufacturing Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Custom furniture manufacturing in Mumbai. ISO certified factory. Free quote." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/furniture-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Custom Furniture Manufacturing",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/furniture-manufacturing",
          "description": "Custom furniture manufacturing in Mumbai — bespoke designs, premium materials."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://media.gettyimages.com/id/2182261806/photo/wide-angle-of-a-carpentry-workshop-with-workers-in-the-background.jpg?b=1&s=2048x2048&w=0&k=20&c=MQobhbRifVPPql_IgfgmRuZ7PC_8z86XOuI9VUZ5pSM="
              alt="Furniture manufacturing workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-4 bg-primary text-white">Manufacturing Excellence</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Custom Furniture Manufacturing</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Handcrafted furniture pieces that combine traditional craftsmanship with modern design
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                Request Custom Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Furniture Manufacturing Solutions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From concept to delivery, we manufacture furniture that perfectly fits your space and style
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Palette,
                  title: 'Custom Design',
                  description: 'Bespoke furniture designed to your exact specifications and measurements',
                  image: 'https://media.gettyimages.com/id/1479652111/photo/wide-shot-of-an-artisan-furniture-designer-reading-blueprint-and-starting-to-assemble-legs-of.jpg?b=1&s=2048x2048&w=0&k=20&c=ivluTQYLXW8AOUetXESnMPyE_Ag9B0IDEsYnEtOBW7s=',
                },
                {
                  icon: Wrench,
                  title: 'Quality Materials',
                  description: 'Premium wood, engineered wood, metal, and upholstery materials',
                  image: 'https://media.gettyimages.com/id/2199042839/photo/engineers-are-working-at-wooden-workshop.jpg?b=1&s=2048x2048&w=0&k=20&c=SsgOgPOllDJD9Kdq4Nm1hi8ojfkzfag6PuZmLeNb89A=',
                },
                {
                  icon: Hammer,
                  title: 'Expert Craftsmanship',
                  description: 'Skilled artisans with 15+ years of furniture-making experience',
                  image: 'https://media.gettyimages.com/id/2233432453/photo/carpenter-restoring-and-old-door-in-workshop.jpg?b=1&s=2048x2048&w=0&k=20&c=dFiaeza3EUB_jOinXjrwV161AYIpQAzfwzAPZyJogP4=',
                },
                {
                  icon: Award,
                  title: 'Timely Delivery',
                  description: 'On-time manufacturing and installation with quality assurance',
                  image: 'https://media.gettyimages.com/id/1485138083/photo/wide-shot-of-african-american-man-as-carpenter-use-saw-to-cut-timber-in-factory-or-workplace.jpg?b=1&s=2048x2048&w=0&k=20&c=u6eJ5JqZTjXu39AznfmAmshsaqQ3lCbujCuq7m2svXM=',
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

        {/* Product Categories */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Furniture We Manufacture</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive range of furniture for residential and commercial spaces
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: 'Living Room',
                  items: ['Sofas & Sectionals', 'Coffee Tables', 'TV Units', 'Display Cabinets', 'Bookshelves'],
                },
                {
                  category: 'Bedroom',
                  items: ['Beds & Headboards', 'Wardrobes', 'Dressing Tables', 'Bedside Tables', 'Study Tables'],
                },
                {
                  category: 'Dining',
                  items: ['Dining Tables', 'Dining Chairs', 'Buffet Units', 'Crockery Units', 'Bar Cabinets'],
                },
                {
                  category: 'Office',
                  items: ['Executive Desks', 'Office Chairs', 'Conference Tables', 'Filing Cabinets', 'Reception Desks'],
                },
                {
                  category: 'Commercial',
                  items: ['Restaurant Furniture', 'Cafe Seating', 'Hotel Furniture', 'Retail Displays', 'Lobby Furniture'],
                },
                {
                  category: 'Custom',
                  items: ['Built-in Units', 'Wall Panels', 'Partition Walls', 'Decorative Elements', 'Special Projects'],
                },
              ].map((category, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
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

        {/* Manufacturing Process */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Manufacturing Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From design to delivery, every step ensures quality and precision
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Design Consultation',
                  description: 'Understand your requirements, style preferences, and space measurements',
                },
                {
                  step: '02',
                  title: 'Material Selection',
                  description: 'Choose from premium wood, finishes, hardware, and upholstery options',
                },
                {
                  step: '03',
                  title: 'Manufacturing',
                  description: 'Precision cutting, assembly, finishing, and quality checks in our factory',
                },
                {
                  step: '04',
                  title: 'Delivery & Setup',
                  description: 'Safe delivery and professional installation at your location',
                },
              ].map((process, index) => (
                <Card key={index} className="p-6 relative">
                  <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">{process.step}</div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://media.gettyimages.com/id/2182261806/photo/wide-angle-of-a-carpentry-workshop-with-workers-in-the-background.jpg?b=1&s=2048x2048&w=0&k=20&c=MQobhbRifVPPql_IgfgmRuZ7PC_8z86XOuI9VUZ5pSM="
                  alt="Workshop"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/1479652111/photo/wide-shot-of-an-artisan-furniture-designer-reading-blueprint-and-starting-to-assemble-legs-of.jpg?b=1&s=2048x2048&w=0&k=20&c=ivluTQYLXW8AOUetXESnMPyE_Ag9B0IDEsYnEtOBW7s="
                  alt="Craftsmanship"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://media.gettyimages.com/id/2199042839/photo/engineers-are-working-at-wooden-workshop.jpg?b=1&s=2048x2048&w=0&k=20&c=SsgOgPOllDJD9Kdq4Nm1hi8ojfkzfag6PuZmLeNb89A="
                  alt="Quality materials"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2233432453/photo/carpenter-restoring-and-old-door-in-workshop.jpg?b=1&s=2048x2048&w=0&k=20&c=dFiaeza3EUB_jOinXjrwV161AYIpQAzfwzAPZyJogP4="
                  alt="Detail work"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DPM ENTERPRISE for Furniture?</h2>
                <div className="space-y-4">
                  {[
                    'In-house manufacturing facility with modern machinery',
                    'Experienced craftsmen with 15+ years expertise',
                    'Premium materials: Teak, Sheesham, engineered wood',
                    'Custom designs tailored to your space and style',
                    'Competitive pricing with transparent quotations',
                    '5-year warranty on structural components',
                    'Eco-friendly finishes and sustainable practices',
                    'Complete project management from design to installation',
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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Custom Furniture?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free consultation and detailed quotation for your custom furniture project
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Request Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
