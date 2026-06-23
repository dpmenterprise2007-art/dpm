import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Building2, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BuyerRegistration() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    gst: '',
    requirement: '',
    projectType: '',
    budget: '',
    timeline: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
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
      const response = await fetch('/api/forms/buyer-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Registration submitted successfully! Our team will contact you soon.');
        setFormData({
          organizationType: '',
          organizationName: '',
          contactPerson: '',
          designation: '',
          email: '',
          phone: '',
          gst: '',
          requirement: '',
          projectType: '',
          budget: '',
          timeline: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
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
        <title>Buyer Registration | DPM Enterprise — B2B Interior Solutions</title>
        <meta name="description" content="Register as a corporate buyer with DPM Enterprise. Get access to premium interior solutions and B2B services for government and corporate projects." />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace/buyer-registration" />
        <meta property="og:title" content="Buyer Registration | DPM Enterprise" />
        <meta property="og:description" content="Register as a corporate buyer with DPM Enterprise for premium interior and B2B services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/marketplace/buyer-registration" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/1311934969/photo/modern-office-interior.jpg?s=2048x2048&w=gi&k=20&c=abc123"
              alt="Buyer Registration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Buyer Registration</h1>
            <p className="text-xl max-w-2xl mx-auto">Register your organization for premium B2B interior solutions and corporate services</p>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Buyer Registration Form</CardTitle>
                <CardDescription>Register your organization to access our B2B services and get personalized quotes</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Organization Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="organizationType">Organization Type *</Label>
                        <Select value={formData.organizationType} onValueChange={(value) => setFormData({ ...formData, organizationType: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="government">Government Department</SelectItem>
                            <SelectItem value="psu">Public Sector Undertaking</SelectItem>
                            <SelectItem value="corporate">Corporate/Private Company</SelectItem>
                            <SelectItem value="educational">Educational Institution</SelectItem>
                            <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                            <SelectItem value="hospitality">Hospitality/Hotel</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="organizationName">Organization Name *</Label>
                        <Input
                          id="organizationName"
                          required
                          value={formData.organizationName}
                          onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          required
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="designation">Designation *</Label>
                        <Input
                          id="designation"
                          required
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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
                      <div>
                        <Label htmlFor="gst">GST Number (if applicable)</Label>
                        <Input
                          id="gst"
                          value={formData.gst}
                          onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Project Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office">Office Interior</SelectItem>
                            <SelectItem value="residential">Residential Interior</SelectItem>
                            <SelectItem value="furniture">Furniture Supply</SelectItem>
                            <SelectItem value="turnkey">Turnkey Project</SelectItem>
                            <SelectItem value="modular">Modular Kitchen</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Estimated Budget (₹)</Label>
                        <Input
                          id="budget"
                          placeholder="e.g., 10,00,000"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                            <SelectItem value="6months+">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="requirement">Detailed Requirements *</Label>
                      <Textarea
                        id="requirement"
                        required
                        rows={4}
                        placeholder="Describe your project requirements in detail"
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Location</h3>
                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the terms and conditions and authorize DPM ENTERPRISE to contact me regarding this registration
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
