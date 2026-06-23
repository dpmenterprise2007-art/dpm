import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Package, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SupplierRegistration() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    gst: '',
    category: '',
    products: '',
    experience: '',
    certifications: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    website: '',
    turnover: '',
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
      const response = await fetch('/api/forms/supplier-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Registration submitted successfully! We will contact you soon.');
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          gst: '',
          category: '',
          products: '',
          experience: '',
          certifications: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          website: '',
          turnover: '',
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
        <title>Supplier Registration | DPM Enterprise — Join Our Vendor Network</title>
        <meta name="description" content="Register as a supplier partner with DPM Enterprise. Join our network of trusted vendors and manufacturers supplying to government and corporate projects." />
        <link rel="canonical" href="https://www.dpmenterprise.in/marketplace/supplier-registration" />
        <meta property="og:title" content="Supplier Registration | DPM Enterprise" />
        <meta property="og:description" content="Join DPM Enterprise's vendor network for government and corporate interior projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dpmenterprise.in/marketplace/supplier-registration" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/1390815938/photo/modern-office-building.jpg?s=2048x2048&w=gi&k=20&c=VlZjVLjp_O5h-xQYKJlLLLjLLLjLLLjL="
              alt="Supplier Registration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Building2 className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Supplier Registration</h1>
            <p className="text-xl max-w-2xl mx-auto">Join our network of trusted suppliers and grow your business with DPM ENTERPRISE</p>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Supplier Registration Form</CardTitle>
                <CardDescription>Please fill in all required details to register as our supplier partner</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gst">GST Number *</Label>
                        <Input
                          id="gst"
                          required
                          value={formData.gst}
                          onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
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
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Business Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Business Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="furniture">Furniture Manufacturing</SelectItem>
                            <SelectItem value="hardware">Hardware & Fittings</SelectItem>
                            <SelectItem value="materials">Raw Materials</SelectItem>
                            <SelectItem value="lighting">Lighting Solutions</SelectItem>
                            <SelectItem value="flooring">Flooring & Tiles</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Input
                          id="experience"
                          type="number"
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="turnover">Annual Turnover (₹)</Label>
                        <Input
                          id="turnover"
                          value={formData.turnover}
                          onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="certifications">Certifications (if any)</Label>
                        <Input
                          id="certifications"
                          placeholder="ISO, BIS, etc."
                          value={formData.certifications}
                          onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="products">Products/Services Offered *</Label>
                      <Textarea
                        id="products"
                        required
                        rows={3}
                        placeholder="Describe your products and services"
                        value={formData.products}
                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Address Details
                    </h3>
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
                      I agree to the terms and conditions and confirm that all information provided is accurate
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
