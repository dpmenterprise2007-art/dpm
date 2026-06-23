import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Building2, FileText, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function EliteEnquiry() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',
    projectType: '',
    projectValue: '',
    projectLocation: '',
    timeline: '',
    requirements: '',
    referenceProjects: '',
    terms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast.error('Please accept terms and conditions');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/forms/elite-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Elite enquiry submitted! Our senior team will contact you within 24 hours.');
        setFormData({
          name: '',
          organization: '',
          designation: '',
          email: '',
          phone: '',
          projectType: '',
          projectValue: '',
          projectLocation: '',
          timeline: '',
          requirements: '',
          referenceProjects: '',
          terms: false,
        });
      } else {
        toast.error(result.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Elite B2B Enquiry | DPM Enterprise — Large-Scale Project Specialists</title>
        <meta name="description" content="Premium B2B enquiry for large-scale corporate and government interior projects. Get dedicated support from DPM Enterprise's senior team." />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace/elite-enquiry" />
        <meta property="og:title" content="Elite B2B Enquiry | DPM Enterprise" />
        <meta property="og:description" content="Large-scale corporate and government interior projects. Dedicated senior team support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/marketplace/elite-enquiry" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative h-[450px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/1371896330/photo/modern-luxury-office-interior.jpg?s=2048x2048&w=gi&k=20&c=xyz789"
              alt="Elite B2B Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/75" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Crown className="h-20 w-20 mx-auto mb-4 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Elite B2B Enquiry</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4">Premium support for large-scale corporate and government projects</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>Priority Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>Custom Solutions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="h-6 w-6 text-primary" />
                  Elite B2B Enquiry Form
                </CardTitle>
                <CardDescription>For projects valued at ₹10 Lakhs and above. Get personalized attention from our senior leadership team.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="designation">Designation *</Label>
                        <Input
                          id="designation"
                          required
                          placeholder="e.g., CEO, Director, Project Manager"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization Name *</Label>
                        <Input
                          id="organization"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate-office">Corporate Office Interior</SelectItem>
                            <SelectItem value="government">Government Project</SelectItem>
                            <SelectItem value="institutional">Institutional (School/Hospital)</SelectItem>
                            <SelectItem value="hospitality">Hospitality (Hotel/Resort)</SelectItem>
                            <SelectItem value="furniture-bulk">Bulk Furniture Supply</SelectItem>
                            <SelectItem value="turnkey">Complete Turnkey Solution</SelectItem>
                            <SelectItem value="other">Other Large-Scale Project</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="projectValue">Estimated Project Value *</Label>
                        <Select value={formData.projectValue} onValueChange={(value) => setFormData({ ...formData, projectValue: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select value range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-25lakhs">₹10-25 Lakhs</SelectItem>
                            <SelectItem value="25-50lakhs">₹25-50 Lakhs</SelectItem>
                            <SelectItem value="50lakhs-1cr">₹50 Lakhs - 1 Crore</SelectItem>
                            <SelectItem value="1-5cr">₹1-5 Crores</SelectItem>
                            <SelectItem value="5cr+">₹5 Crores+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="projectLocation">Project Location *</Label>
                        <Input
                          id="projectLocation"
                          required
                          placeholder="City, State"
                          value={formData.projectLocation}
                          onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Expected Timeline *</Label>
                        <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (Within 1 month)</SelectItem>
                            <SelectItem value="1-3months">1-3 Months</SelectItem>
                            <SelectItem value="3-6months">3-6 Months</SelectItem>
                            <SelectItem value="6-12months">6-12 Months</SelectItem>
                            <SelectItem value="12months+">12+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="requirements">Detailed Project Requirements *</Label>
                      <Textarea
                        id="requirements"
                        required
                        rows={5}
                        placeholder="Please provide comprehensive details about your project scope, specifications, and expectations"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referenceProjects">Reference Projects or Inspirations (Optional)</Label>
                      <Textarea
                        id="referenceProjects"
                        rows={3}
                        placeholder="Any specific projects, styles, or references that inspire your vision"
                        value={formData.referenceProjects}
                        onChange={(e) => setFormData({ ...formData, referenceProjects: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I confirm that this is a genuine business enquiry and authorize DPM ENTERPRISE to contact me. I understand that elite enquiries are for projects valued at ₹10 Lakhs and above.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Elite Enquiry...
                      </>
                    ) : (
                      <>
                        <Crown className="mr-2 h-5 w-5" />
                        Submit Elite Enquiry
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    Our senior team will review your enquiry and contact you within 24 business hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
