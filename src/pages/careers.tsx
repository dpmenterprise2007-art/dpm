import { Briefcase, Users, TrendingUp, Heart, Award, Send } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CareersPage() {
  const benefits = [
    { icon: TrendingUp, title: 'Career Growth', description: 'Clear career progression paths and skill development' },
    { icon: Users, title: 'Great Team', description: 'Work with talented professionals in a collaborative environment' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible working hours and supportive culture' },
    { icon: Award, title: 'Recognition', description: 'Performance-based rewards and recognition programs' },
  ];

  const openings = [
    {
      title: 'Interior Designer',
      department: 'Design',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-5 years',
    },
    {
      title: 'Project Manager',
      department: 'Operations',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '5+ years',
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '1-3 years',
    },
    {
      title: 'Furniture Carpenter',
      department: 'Production',
      location: 'Virar',
      type: 'Full-time',
      experience: '3+ years',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Careers at DPM Enterprise | Join Our Team in Mumbai</title>
        <meta name="description" content="Explore career opportunities at DPM Enterprise. Join our team of interior designers, project managers, and furniture manufacturing professionals in Mumbai." />
        <link rel="canonical" href="https://www.dpmenterprise.in/careers" />
        <meta property="og:title" content="Careers at DPM Enterprise | Join Our Team" />
        <meta property="og:description" content="Interior design, project management, and manufacturing careers in Mumbai. Join a growing team trusted by Indian Navy, Army and Fortune 500 companies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/careers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at DPM Enterprise" />
        <meta name="twitter:description" content="Interior design, project management, and manufacturing careers in Mumbai." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Build Your Career With Us</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join DPM ENTERPRISE and be part of a team that's transforming spaces across India. We're looking for talented individuals who are passionate about design and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join DPM ENTERPRISE?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in nurturing talent and creating an environment where everyone can thrive
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
              <p className="text-muted-foreground">Explore opportunities across different departments</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>📍 {job.location}</span>
                          <span>🏢 {job.department}</span>
                          <span>⏰ {job.type}</span>
                          <span>💼 {job.experience}</span>
                        </div>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Submit Your Application</h2>
                <p className="text-muted-foreground">
                  Don't see a perfect match? Send us your resume and we'll keep you in mind for future opportunities.
                </p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                      </div>
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium mb-2">
                          Position Applied For *
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interior-designer">Interior Designer</SelectItem>
                            <SelectItem value="project-manager">Project Manager</SelectItem>
                            <SelectItem value="sales-executive">Sales Executive</SelectItem>
                            <SelectItem value="carpenter">Furniture Carpenter</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium mb-2">
                        Years of Experience *
                      </label>
                      <Input id="experience" placeholder="e.g., 3 years" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Cover Letter / Message
                      </label>
                      <Textarea id="message" placeholder="Tell us about yourself and why you'd be a great fit..." rows={4} />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium mb-2">
                        Upload Resume (PDF) *
                      </label>
                      <Input id="resume" type="file" accept=".pdf" required />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
