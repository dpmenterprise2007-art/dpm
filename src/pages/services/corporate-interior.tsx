import { Building2, Users, Lightbulb, TrendingUp, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function CorporateInteriorPage() {
  return (
    <>
      <Helmet>
        <title>Corporate Interior Design Mumbai | Office Interiors | DPM Enterprise</title>
        <meta name="description" content="Premium corporate office interior design in Mumbai. Productive workspaces, boardrooms, reception areas. ISO 9001:2015 certified, 15+ years experience. Free consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/corporate-interior" />
        <meta property="og:title" content="Corporate Interior Design Mumbai | DPM Enterprise" />
        <meta property="og:description" content="Premium corporate office interior design in Mumbai. ISO 9001:2015 certified, 15+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/corporate-interior" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Corporate Interior Design Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="Premium corporate office interior design in Mumbai. ISO certified, 15+ years experience." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/corporate-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Corporate Interior Design",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "Mumbai",
          "url": "https://www.dpmenterprise.in/services/corporate-interior",
          "description": "Professional corporate office interior design in Mumbai."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://media.gettyimages.com/id/2237056505/photo/modern-industrial-loft-office-interior-empty-open-plan-workspace-with-brick-walls-and-wooden.jpg?b=1&s=2048x2048&w=0&k=20&c=NYPgi-lnZmXQe7nXM-YxjzxR5TaBd0OucDHEMDJftLE="
              alt="Modern corporate office interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-4 bg-primary text-white">Corporate Solutions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Corporate Interior Design</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your workspace into a productivity powerhouse that reflects your brand and inspires your team
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                Get Free Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Corporate Interior Solutions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From reception areas to executive cabins, we design every space to enhance productivity and brand image
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: 'Office Layouts',
                  description: 'Open-plan, cubicles, or hybrid workspaces designed for collaboration and focus',
                  image: 'https://media.gettyimages.com/id/2204385564/photo/minimalist-office-of-it-company.jpg?b=1&s=2048x2048&w=0&k=20&c=SxUHj4EjtNXcx_P1qB7uf_GlBGEbtQU71fdrZDJFAvo=',
                },
                {
                  icon: Users,
                  title: 'Conference Rooms',
                  description: 'State-of-the-art meeting spaces with AV integration and acoustic treatment',
                  image: 'https://media.gettyimages.com/id/2221897297/photo/creative-modern-office-interior-with-desks-and-computers-bright-and-cozy.jpg?b=1&s=2048x2048&w=0&k=20&c=NsTHfrouGWQ64UiR4MpSC6P5q6YRUcOmdvElduVkPkU=',
                },
                {
                  icon: Lightbulb,
                  title: 'Reception Areas',
                  description: 'Make a lasting first impression with stunning reception and lobby designs',
                  image: 'https://media.gettyimages.com/id/2238709469/photo/modern-interior-design-in-illuminated-hotel-lobby-with-elegant-ambiance.jpg?b=1&s=2048x2048&w=0&k=20&c=Qh2_kLlIcq6KFvabHDRDsQ-95RwR3jsOAbExl9myMc4=',
                },
                {
                  icon: TrendingUp,
                  title: 'Executive Cabins',
                  description: 'Premium private offices that balance privacy, comfort, and professional aesthetics',
                  image: 'https://media.gettyimages.com/id/2157129491/photo/co-workers-walk-out-of-lift-in-building-atrium.jpg?b=1&s=2048x2048&w=0&k=20&c=cyFpgJuNBKSe21zt9t_kqljYhrfTPJRx0szYHuiTsT4=',
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Corporate Design Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A systematic approach to creating workspaces that drive business success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Space Analysis',
                  description: 'We assess your current space, workflow patterns, and employee needs to understand requirements',
                },
                {
                  step: '02',
                  title: 'Brand Integration',
                  description: 'Design concepts that reflect your company culture, values, and brand identity',
                },
                {
                  step: '03',
                  title: 'Execution',
                  description: 'Professional installation with minimal disruption to your business operations',
                },
                {
                  step: '04',
                  title: 'Post-Completion',
                  description: 'Ongoing support, warranty service, and maintenance guidance for long-term satisfaction',
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DPM ENTERPRISE for Corporate Interiors?</h2>
                <div className="space-y-4">
                  {[
                    'ISO 9001:2015 certified quality management',
                    'Experience with 200+ corporate projects across Mumbai',
                    'Specialized in IT offices, banks, and professional services',
                    'GeM registered for government and PSU projects',
                    'Ergonomic furniture and lighting design expertise',
                    'Sustainable and eco-friendly material options',
                    'Complete project management from concept to completion',
                    'Post-installation support and warranty service',
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
                  src="https://media.gettyimages.com/id/2204385564/photo/minimalist-office-of-it-company.jpg?b=1&s=2048x2048&w=0&k=20&c=SxUHj4EjtNXcx_P1qB7uf_GlBGEbtQU71fdrZDJFAvo="
                  alt="Modern office space"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2221897297/photo/creative-modern-office-interior-with-desks-and-computers-bright-and-cozy.jpg?b=1&s=2048x2048&w=0&k=20&c=NsTHfrouGWQ64UiR4MpSC6P5q6YRUcOmdvElduVkPkU="
                  alt="Collaborative workspace"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://media.gettyimages.com/id/2238709469/photo/modern-interior-design-in-illuminated-hotel-lobby-with-elegant-ambiance.jpg?b=1&s=2048x2048&w=0&k=20&c=Qh2_kLlIcq6KFvabHDRDsQ-95RwR3jsOAbExl9myMc4="
                  alt="Reception area"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2157129491/photo/co-workers-walk-out-of-lift-in-building-atrium.jpg?b=1&s=2048x2048&w=0&k=20&c=cyFpgJuNBKSe21zt9t_kqljYhrfTPJRx0szYHuiTsT4="
                  alt="Office atrium"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workspace?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free consultation and 3D design visualization for your corporate interior project
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
