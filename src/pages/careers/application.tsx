import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Upload, CheckCircle, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

export default function CareerApplication() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    currentCompany: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    qualification: '',
    skills: '',
    portfolio: '',
    coverLetter: '',
    city: '',
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
      const response = await fetch('/api/forms/career-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success('Application submitted successfully! We will review and contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          currentCompany: '',
          currentSalary: '',
          expectedSalary: '',
          noticePeriod: '',
          qualification: '',
          skills: '',
          portfolio: '',
          coverLetter: '',
          city: '',
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
      <title>Career Application | DPM ENTERPRISE</title>
      <meta name="description" content="Apply for career opportunities at DPM ENTERPRISE. Join our team of interior design and manufacturing professionals." />

      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/1311934969/photo/modern-office-team.jpg?s=2048x2048&w=gi&k=20&c=team123"
              alt="Career Opportunities"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Briefcase className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Career Application</h1>
            <p className="text-xl max-w-2xl mx-auto">Join our team and build your career with DPM ENTERPRISE</p>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Job Application Form</CardTitle>
                <CardDescription>Fill in your details to apply for open positions at DPM ENTERPRISE</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                        <Label htmlFor="city">Current City *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="position">Position Applied For *</Label>
                        <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interior-designer">Interior Designer</SelectItem>
                            <SelectItem value="3d-visualizer">3D Visualizer</SelectItem>
                            <SelectItem value="project-manager">Project Manager</SelectItem>
                            <SelectItem value="site-supervisor">Site Supervisor</SelectItem>
                            <SelectItem value="carpenter">Carpenter</SelectItem>
                            <SelectItem value="sales-executive">Sales Executive</SelectItem>
                            <SelectItem value="business-development">Business Development</SelectItem>
                            <SelectItem value="accounts">Accounts/Finance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experience">Total Experience *</Label>
                        <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fresher">Fresher</SelectItem>
                            <SelectItem value="0-1">0-1 Years</SelectItem>
                            <SelectItem value="1-3">1-3 Years</SelectItem>
                            <SelectItem value="3-5">3-5 Years</SelectItem>
                            <SelectItem value="5-10">5-10 Years</SelectItem>
                            <SelectItem value="10+">10+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currentCompany">Current/Last Company</Label>
                        <Input
                          id="currentCompany"
                          value={formData.currentCompany}
                          onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="qualification">Highest Qualification *</Label>
                        <Input
                          id="qualification"
                          required
                          placeholder="e.g., B.Arch, Diploma, B.Com"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentSalary">Current Salary (₹/month)</Label>
                        <Input
                          id="currentSalary"
                          placeholder="e.g., 30000"
                          value={formData.currentSalary}
                          onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedSalary">Expected Salary (₹/month) *</Label>
                        <Input
                          id="expectedSalary"
                          required
                          placeholder="e.g., 35000"
                          value={formData.expectedSalary}
                          onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="noticePeriod">Notice Period *</Label>
                        <Select value={formData.noticePeriod} onValueChange={(value) => setFormData({ ...formData, noticePeriod: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="15days">15 Days</SelectItem>
                            <SelectItem value="1month">1 Month</SelectItem>
                            <SelectItem value="2months">2 Months</SelectItem>
                            <SelectItem value="3months">3 Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
                        <Input
                          id="portfolio"
                          type="url"
                          placeholder="https://"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills">Key Skills *</Label>
                      <Textarea
                        id="skills"
                        required
                        rows={3}
                        placeholder="List your key skills relevant to the position (e.g., AutoCAD, 3ds Max, Project Management, etc.)"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coverLetter">Cover Letter / Why should we hire you? *</Label>
                      <Textarea
                        id="coverLetter"
                        required
                        rows={5}
                        placeholder="Tell us about yourself, your experience, and why you're a great fit for this role"
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Resume Upload Note */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Upload className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Resume Submission</p>
                        <p className="text-sm text-muted-foreground">
                          After submitting this form, please email your resume to <a href="mailto:hr@dpmenterprise.in" className="text-primary hover:underline">hr@dpmenterprise.in</a> with the subject line: "Application - [Position Name] - [Your Name]"
                        </p>
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
                      I confirm that all information provided is accurate and authorize DPM ENTERPRISE to contact me regarding this application
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Application
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
