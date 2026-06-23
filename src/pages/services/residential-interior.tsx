import { Home, Palette, Sofa, Bed, Bath, ChefHat, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function ResidentialInteriorPage() {
  const features = [
    { icon: Bed, title: 'Bedroom Design', description: 'Luxurious and comfortable bedroom interiors' },
    { icon: Sofa, title: 'Living Room', description: 'Elegant living spaces for family gatherings' },
    { icon: ChefHat, title: 'Modular Kitchen', description: 'Functional and stylish kitchen solutions' },
    { icon: Bath, title: 'Bathroom Design', description: 'Modern and spa-like bathroom interiors' },
    { icon: Palette, title: 'Color Consultation', description: 'Expert color schemes and palettes' },
    { icon: Home, title: 'Complete Home', description: 'End-to-end residential interior solutions' },
  ];

  const benefits = [
    'Personalized design concepts',
    '3D visualization and walkthroughs',
    'Premium quality materials',
    'Timely project completion',
    'Post-installation support',
    'Budget-friendly packages',
  ];

  const process = [
    { step: '01', title: 'Consultation', description: 'Understanding your vision and requirements' },
    { step: '02', title: 'Design Concept', description: '3D designs and material selection' },
    { step: '03', title: 'Approval', description: 'Final design approval and quotation' },
    { step: '04', title: 'Execution', description: 'Professional installation and finishing' },
  ];

  return (
    <>
      <Helmet>
        <title>Residential Interior Design Mumbai | Premium Home Interiors | DPM Enterprise</title>
        <meta name="description" content="Expert residential interior design in Mumbai — bedrooms, living rooms, modular kitchens, bathrooms. ISO 9001:2015 certified. 500+ projects delivered. Free consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/residential-interior" />
        <meta property="og:title" content="Residential Interior Design Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Expert residential interior design in Mumbai. ISO 9001:2015 certified. 500+ projects delivered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/residential-interior" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/residential-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Residential Interior Design Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Expert residential interior design in Mumbai. ISO 9001:2015 certified. 500+ projects." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/residential-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Residential Interior Design",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/residential-interior",
          "description": "Professional residential interior design services in Mumbai — bedrooms, living rooms, modular kitchens, bathrooms."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Residential Interior Design
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your house into a dream home with our personalized residential interior design services. We create spaces that reflect your lifestyle and personality.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Get Free Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/projects">View Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Residential Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive interior design solutions for every room in your home
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section className="py-16 bg-gradient-to-br from-[#002147] to-[#003366] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Technical Expertise</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Combining artistic vision with technical precision for flawless execution
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-white">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-[#002147]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Design Software</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• AutoCAD 2024</li>
                    <li>• 3ds Max & V-Ray</li>
                    <li>• SketchUp Pro</li>
                    <li>• Photoshop & Illustrator</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-white">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-[#002147]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Material Expertise</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Premium Laminates</li>
                    <li>• Italian Marble & Granite</li>
                    <li>• Engineered Wood</li>
                    <li>• Smart Home Integration</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-white">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-[#002147]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Quality Standards</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• ISO 9001:2015 Certified</li>
                    <li>• BWP Grade Plywood</li>
                    <li>• German Hardware</li>
                    <li>• 5-Year Warranty</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section with Flowchart */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Design Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A systematic approach to bring your dream home to life
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6 relative">
                {process.map((item, index) => (
                  <div key={index} className="relative">
                    <Card className="border-2 hover:border-primary transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4 mx-auto">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                        <p className="text-muted-foreground text-center text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Timeline Visualization */}
              <div className="mt-12 p-6 bg-background rounded-lg border-2">
                <h3 className="text-xl font-bold mb-4 text-center">Typical Project Timeline</h3>
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1-2 Days</div>
                    <div className="text-sm text-muted-foreground">Consultation</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">7-10 Days</div>
                    <div className="text-sm text-muted-foreground">Design</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">2-3 Days</div>
                    <div className="text-sm text-muted-foreground">Approval</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">30-45 Days</div>
                    <div className="text-sm text-muted-foreground">Execution</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                <p className="text-muted-foreground">
                  Experience the DPM ENTERPRISE difference in residential interior design
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a free consultation and 3D design visualization for your residential project
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
