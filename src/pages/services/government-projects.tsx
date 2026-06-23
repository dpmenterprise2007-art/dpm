import { Landmark, FileText, Shield, TrendingUp, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function GovernmentProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Government Interior Projects Mumbai | GeM Tender Services | DPM Enterprise</title>
        <meta name="description" content="ISO certified government interior projects and GeM tender services in Mumbai. Indian Navy, Army, Railways, PSU offices. MSME registered, GeM portal expertise. Free consultation." />
        <link rel="canonical" href="https://www.dpmenterprise.in/services/government-projects" />
        <meta property="og:title" content="Government Interior Projects Mumbai | DPM Enterprise" />
        <meta property="og:description" content="ISO certified government interior projects and GeM tender services in Mumbai. MSME registered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/services/government-projects" />
        <meta property="og:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/government-service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Government Interior Projects Mumbai | DPM Enterprise" />
        <meta name="twitter:description" content="ISO certified government interior projects and GeM tender services in Mumbai." />
        <meta name="twitter:image" content="https://www.dpmenterprise.in/airo-assets/images/pages/home/government-service" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Government Interior Projects & GeM Tender Services",
          "provider": { "@id": "https://www.dpmenterprise.in/#organization" },
          "areaServed": "India",
          "url": "https://www.dpmenterprise.in/services/government-projects",
          "description": "Government interior projects and GeM tender services. ISO certified, MSME registered."
        })}</script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://media.gettyimages.com/id/2156919463/photo/bright-and-light-atrium-and-staircase-in-library-of-modern-university.jpg?b=1&s=2048x2048&w=0&k=20&c=wrt1foHRfOYFs1gxI6_pXo9rD1lp3vGJ_AG7W764scM="
              alt="Government building interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-4 bg-primary text-white">Government Solutions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Government Projects & GeM Tenders</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Specialized interior solutions for government offices, PSUs, and public sector projects
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                GeM Tender Inquiry
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications Banner */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'ISO 9001:2015', sublabel: 'Quality Certified' },
                { label: 'MSME Registered', sublabel: 'Government Recognized' },
                { label: 'GeM Portal', sublabel: 'Active Seller' },
                { label: 'Startup India', sublabel: 'Certified Startup' },
              ].map((cert, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold mb-1">{cert.label}</div>
                  <div className="text-sm opacity-90">{cert.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Government Project Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                End-to-end solutions for government tenders, procurement, and project execution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Landmark,
                  title: 'GeM Compliance',
                  description: 'Complete GeM portal registration, product listing, and tender management',
                  image: 'https://media.gettyimages.com/id/2236714346/photo/3d-rendering-of-a-modern-open-plan-office-interior-industrial-style-workspace-with-exposed.jpg?b=1&s=2048x2048&w=0&k=20&c=hl0QC-QrHparj7Xd1_COk-F0n2VI89T-2Z-4hHHFXrA=',
                },
                {
                  icon: FileText,
                  title: 'Tender Management',
                  description: 'BOQ preparation, technical bid documentation, and tender submission',
                  image: 'https://media.gettyimages.com/id/2209106148/photo/reception-area-in-lobby-of-luxury-wellness-center-and-spa.jpg?b=1&s=2048x2048&w=0&k=20&c=jJiTtUhHXFvPqeYaMPGC7yT2d6OoB_6ckai_gP_7m0M=',
                },
                {
                  icon: Shield,
                  title: 'Quality Standards',
                  description: 'ISO certified processes ensuring government quality requirements',
                  image: 'https://media.gettyimages.com/id/2254176939/photo/shenzhen-shigu-station-metro-station.jpg?b=1&s=2048x2048&w=0&k=20&c=uNOI37uOKV07igXqm6jc0fjCdvx5u3MA2lpVzBIymYc=',
                },
                {
                  icon: TrendingUp,
                  title: 'Project Execution',
                  description: 'Timely delivery with proper documentation and compliance',
                  image: 'https://media.gettyimages.com/id/2250981346/photo/empty-corridor-in-a-residential-care-home.jpg?b=1&s=2048x2048&w=0&k=20&c=jhykUs5aOvIGUXjfIzWLl59IM3k8EOXcWD0wBChAsz8=',
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

        {/* Project Types */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Government Project Experience</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Proven track record with various government departments and PSUs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: 'Central Government',
                  projects: ['Ministry Offices', 'Central PSUs', 'Government Departments', 'Public Sector Banks'],
                },
                {
                  category: 'State Government',
                  projects: ['State Offices', 'Municipal Corporations', 'State PSUs', 'Government Schools'],
                },
                {
                  category: 'Defense & Police',
                  projects: ['Defense Establishments', 'Police Stations', 'Training Centers', 'Administrative Offices'],
                },
                {
                  category: 'Healthcare',
                  projects: ['Government Hospitals', 'Primary Health Centers', 'Medical Colleges', 'Dispensaries'],
                },
                {
                  category: 'Education',
                  projects: ['Government Schools', 'Colleges & Universities', 'Training Institutes', 'Libraries'],
                },
                {
                  category: 'Infrastructure',
                  projects: ['Railway Stations', 'Airports', 'Bus Terminals', 'Government Buildings'],
                },
              ].map((type, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">{type.category}</h3>
                  <ul className="space-y-2">
                    {type.projects.map((project, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Government Project Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Streamlined process ensuring compliance and timely delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Tender Analysis',
                  description: 'Review tender requirements, specifications, and eligibility criteria',
                },
                {
                  step: '02',
                  title: 'BOQ & Bidding',
                  description: 'Prepare detailed BOQ, technical specifications, and submit competitive bid',
                },
                {
                  step: '03',
                  title: 'Award & Planning',
                  description: 'Post-award documentation, project planning, and resource allocation',
                },
                {
                  step: '04',
                  title: 'Execution & Handover',
                  description: 'Quality execution, inspection clearance, and proper documentation',
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
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Government Departments Choose Us</h2>
                <div className="space-y-4">
                  {[
                    'ISO 9001:2015 certified quality management system',
                    'MSME registered with government benefits',
                    'Active GeM portal seller with verified products',
                    'Startup India certified for innovation',
                    'Experience with 50+ government projects',
                    'Complete tender documentation support',
                    'Compliance with government quality standards',
                    'Timely delivery with proper inspection clearance',
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
                  src="https://media.gettyimages.com/id/2156919463/photo/bright-and-light-atrium-and-staircase-in-library-of-modern-university.jpg?b=1&s=2048x2048&w=0&k=20&c=wrt1foHRfOYFs1gxI6_pXo9rD1lp3vGJ_AG7W764scM="
                  alt="Government building"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2236714346/photo/3d-rendering-of-a-modern-open-plan-office-interior-industrial-style-workspace-with-exposed.jpg?b=1&s=2048x2048&w=0&k=20&c=hl0QC-QrHparj7Xd1_COk-F0n2VI89T-2Z-4hHHFXrA="
                  alt="Office interior"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://media.gettyimages.com/id/2254176939/photo/shenzhen-shigu-station-metro-station.jpg?b=1&s=2048x2048&w=0&k=20&c=uNOI37uOKV07igXqm6jc0fjCdvx5u3MA2lpVzBIymYc="
                  alt="Public space"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://media.gettyimages.com/id/2209106148/photo/reception-area-in-lobby-of-luxury-wellness-center-and-spa.jpg?b=1&s=2048x2048&w=0&k=20&c=jJiTtUhHXFvPqeYaMPGC7yT2d6OoB_6ckai_gP_7m0M="
                  alt="Reception area"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with Us for Government Projects</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get expert assistance with GeM tenders, BOQ preparation, and project execution
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                GeM Tender Inquiry
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
