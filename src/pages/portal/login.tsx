import { useState } from 'react';
import { User, Lock, Mail, Phone, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

export default function PortalLoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
      <title>Partner Portal Login | DPM ENTERPRISE</title>
      <meta
        name="description"
        content="Access DPM ENTERPRISE Partner Portal. Login or register as a vendor, buyer, or partner to access tenders, BOQ, and project management tools."
      />
      <meta name="keywords" content="partner portal, vendor login, buyer portal, GeM portal, tender management, DPM ENTERPRISE login" />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light mb-2 text-gray-900">Partner Portal</h1>
              <p className="text-gray-600 text-sm">
                Access your account
              </p>
            </div>

            {/* Login/Register Tabs */}
            <Card className="shadow-xl">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Login Tab */}
                  <TabsContent value="login">
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="login-email">Email Address</Label>
                          <div className="relative mt-2">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="your@email.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="login-password">Password</Label>
                          <div className="relative mt-2">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="login-password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm cursor-pointer">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Login to Portal
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register">
                    <form className="space-y-6">
                      <div className="space-y-4">
                        {/* Account Type */}
                        <div>
                          <Label htmlFor="account-type">Account Type *</Label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vendor">Vendor / Supplier</SelectItem>
                              <SelectItem value="buyer">Buyer / Client</SelectItem>
                              <SelectItem value="partner">Partner (Architect/Contractor)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Company Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="company-name">Company Name *</Label>
                            <Input id="company-name" placeholder="ABC Enterprises" className="mt-2" required />
                          </div>
                          <div>
                            <Label htmlFor="gst">GST Number</Label>
                            <Input id="gst" placeholder="22AAAAA0000A1Z5" className="mt-2" />
                          </div>
                        </div>

                        {/* Contact Person */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contact-name">Contact Person Name *</Label>
                            <div className="relative mt-2">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input id="contact-name" placeholder="John Doe" className="pl-10" required />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="designation">Designation *</Label>
                            <Input id="designation" placeholder="Manager" className="mt-2" required />
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="reg-email">Email Address *</Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                id="reg-email"
                                type="email"
                                placeholder="your@email.com"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <div className="relative mt-2">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10" required />
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <Label htmlFor="address">Business Address *</Label>
                          <Input id="address" placeholder="Street, City, State, PIN" className="mt-2" required />
                        </div>

                        {/* Password */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="reg-password">Password *</Label>
                            <div className="relative mt-2">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                id="reg-password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="confirm-password">Confirm Password *</Label>
                            <div className="relative mt-2">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start space-x-2">
                          <Checkbox id="terms" required />
                          <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                            I agree to the{' '}
                            <Link to="/terms-conditions" className="text-primary hover:underline">
                              Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy-policy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Tender Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access GeM tenders, submit bids, track status, and manage clarifications
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    BOQ & Quotations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create detailed BOQ, generate quotations, and export professional PDFs
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Project Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Monitor project progress, manage documents, and track payments
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Need help? Contact our support team
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="tel:+919930998063">📞 +91 9930998063</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:admin@dpmenterprise.in">✉️ admin@dpmenterprise.in</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
