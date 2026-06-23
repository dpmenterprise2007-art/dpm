import { ChefHat, Ruler, Package, Sparkles, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function ModularKitchenPage() {
  return (
    <>
      <Helmet>
        <title>Modular Kitchen Design Mumbai | Custom Kitchen Interiors | DPM Enterprise</title>
        <meta name="description" content="Premium modular kitchen design in Mumbai — L-shaped, U-shaped, island kitchens. Smart storage, Italian finishes. ISO 9001:2015 certified. Free 3D design consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/modular-kitchen" />
        <meta property="og:title" content="Modular Kitchen Design Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Premium modular kitchen design in Mumbai. ISO certified, 15+ years experience. Free 3D design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/modular-kitchen" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/kitchen-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Modular Kitchen Design Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Premium modular kitchen design in Mumbai. ISO certified. Free 3D design." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/kitchen-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Modular Kitchen Design",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/modular-kitchen",
          "description": "Premium modular kitchen design and installation in Mumbai."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://media.gettyimages.com/id/2220564905/photo/front-view-of-modern-kitchen-with-white-cabinets-gas-stove-and-red-cookware.jpg?b=1&s=2048x2048&w=0&k=20&c=uB7gN9We-cL85Oyfj1B38HnSCgaHm2jCQ7jjm9IEumk="
              alt="Modern modular kitchen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-4 bg-primary text-white">Kitchen Solutions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Modular Kitchen Design</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your cooking space with smart, stylish, and functional modular kitchens
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                Get Free 3D Design
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Modular Kitchen Solutions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From compact kitchens to luxury chef's kitchens, we design every element for maximum efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Ruler,
                  title: 'Custom Layouts',
                  description: 'L-shaped, U-shaped, parallel, or island kitchens designed for your space',
                  image: 'https://media.gettyimages.com/id/2243906492/photo/3d-render-of-a-modern-kitchen-interior-with-green-cabinets-and-a-white-island.jpg?b=1&s=2048x2048&w=0&k=20&c=mqAHVcWEw3d25Ov80rCGcd3jn3TEkDam8Wy_YQohi0c=',
                },
                {
                  icon: Package,
                  title: 'Smart Storage',
                  description: 'Pull-out drawers, corner units, tall units, and innovative storage solutions',
                  image: 'https://media.gettyimages.com/id/1492202241/photo/modern-white-marble-top-dining-table-island-cabinet-counter-cupboard-cantilever-stair.jpg?b=1&s=2048x2048&w=0&k=20&c=M6W76QdhIrMhZ-VSK-yfBZiwzRAX-a1XywE1zA9-Ey4=',
                },
                {
                  icon: Sparkles,
                  title: 'Premium Finishes',
                  description: 'Acrylic, laminate, membrane, lacquer, and veneer finishes in 100+ colors',
                  image: 'https://media.gettyimages.com/id/2148414864/photo/dark-contemporary-elegant-kitchen.jpg?b=1&s=2048x2048&w=0&k=20&c=ZrTja1NJ6oBvjC_D-rZ49VX-ApU-mIXkeJq1W05xNeg=',
                },
                {
                  icon: ChefHat,
                  title: 'Appliance Integration',
                  description: 'Built-in hobs, chimneys, ovens, dishwashers, and refrigerator panels',
                  image: 'https://media.gettyimages.com/id/2205860397/photo/modern-wooden-kitchen-with-minimalist-design-in-a-stylish-apartment.jpg?b=1&s=2048x2048&w=0&k=20&c=mOuR0mazZNpMEx8A0izB5lYo61YUFWjn57FGR3zAyPQ=',
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

        {/* Design Process */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Kitchen Design Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A step-by-step approach to creating your dream kitchen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Site Measurement',
                  description: 'Precise measurements of your kitchen space, plumbing, and electrical points',
                },
                {
                  step: '02',
                  title: '3D Design',
                  description: 'Photorealistic 3D visualization with multiple layout and color options',
                },
                {
                  step: '03',
                  title: 'Manufacturing',
                  description: 'In-house production with premium materials and quality control',
                },
                {
                  step: '04',
                  title: 'Installation',
                  description: 'Professional installation with plumbing, electrical, and appliance setup',
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DPM ENTERPRISE for Your Kitchen?</h2>
                <div className="space-y-4">
                  {[
                    'In-house manufacturing facility in Mumbai',
                    'Premium hardware: Hettich, Blum, Ebco',
                    'Water-resistant and termite-proof materials',
                    'Soft-close drawers and shutters as standard',
                    'Free 3D design and visualization',
                    '10-year warranty on cabinets',
                    'Installation in 7-10 days',
                    'Post-installation service and support',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://media.gettyimages.com/id/2220564905/photo/front-view-of-modern-kitchen-with-white-cabinets-gas-stove-and-red-cookware.jpg?b=1&s=2048x2048&w=0&k=20&c=uB7gN9We-cL85Oyfj1B38HnSCgaHm2jCQ7jjm9IEumk="
                  alt="White modular kitchen"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2243906492/photo/3d-render-of-a-modern-kitchen-interior-with-green-cabinets-and-a-white-island.jpg?b=1&s=2048x2048&w=0&k=20&c=mqAHVcWEw3d25Ov80rCGcd3jn3TEkDam8Wy_YQohi0c="
                  alt="Green kitchen with island"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://media.gettyimages.com/id/2148414864/photo/dark-contemporary-elegant-kitchen.jpg?b=1&s=2048x2048&w=0&k=20&c=ZrTja1NJ6oBvjC_D-rZ49VX-ApU-mIXkeJq1W05xNeg="
                  alt="Dark elegant kitchen"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2205860397/photo/modern-wooden-kitchen-with-minimalist-design-in-a-stylish-apartment.jpg?b=1&s=2048x2048&w=0&k=20&c=mOuR0mazZNpMEx8A0izB5lYo61YUFWjn57FGR3zAyPQ="
                  alt="Wooden minimalist kitchen"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Design Your Dream Kitchen?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free home visit, 3D design, and detailed quotation within 48 hours
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
