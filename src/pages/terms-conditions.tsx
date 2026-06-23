import { Scale, CheckCircle } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsConditionsPage() {
  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | DPM Enterprise Private Limited</title>
        <meta name="description" content="Terms and Conditions for DPM Enterprise Private Limited. Read our terms of service, user agreements, and legal policies." />
        <link rel="canonical" href="https://www.dpmenterprise.in/terms-conditions" />
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              Last updated: January 31, 2026
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to DPM ENTERPRISE Private Limited. These Terms and Conditions ("Terms") govern your use of our website dpmenterprise.in and our services. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.
              </p>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Definitions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>"Company," "we," "our," or "us"</strong> refers to DPM ENTERPRISE Private Limited</li>
                <li><strong>"Client," "you," or "your"</strong> refers to the individual or entity using our services</li>
                <li><strong>"Services"</strong> refers to interior design, furniture manufacturing, and related services provided by us</li>
                <li><strong>"Website"</strong> refers to dpmenterprise.in and all associated pages</li>
                <li><strong>"Project"</strong> refers to any interior design or furniture manufacturing work undertaken by us</li>
              </ul>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                DPM ENTERPRISE Private Limited provides professional interior design and furniture manufacturing services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Residential interior design</li>
                <li>Corporate and commercial interior design</li>
                <li>Modular kitchen design and installation</li>
                <li>Custom furniture manufacturing</li>
                <li>Government and institutional projects</li>
                <li>Turnkey interior solutions</li>
              </ul>
              <p>
                All services are subject to availability, project scope, and mutual agreement between the Company and the Client.
              </p>
            </CardContent>
          </Card>

          {/* Quotations and Agreements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Quotations and Project Agreements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>3.1 Quotations:</strong> All quotations provided are valid for 30 days from the date of issue unless otherwise specified. Quotations are estimates and may be subject to change based on site conditions, material availability, and scope modifications.
              </p>
              <p>
                <strong>3.2 Project Agreement:</strong> A formal project agreement must be signed by both parties before commencement of work. The agreement will specify project scope, timeline, payment terms, and deliverables.
              </p>
              <p>
                <strong>3.3 Modifications:</strong> Any changes to the agreed scope of work must be documented in writing and may result in additional charges and timeline adjustments.
              </p>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>4.1 Payment Schedule:</strong> Unless otherwise agreed, payments are typically structured as follows:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>30% advance payment upon signing the agreement</li>
                <li>40% payment upon material procurement and commencement of work</li>
                <li>25% payment upon substantial completion</li>
                <li>5% final payment upon project handover</li>
              </ul>
              <p>
                <strong>4.2 Payment Methods:</strong> We accept payments via bank transfer, cheque, or other mutually agreed methods. All payments must be made in Indian Rupees (INR).
              </p>
              <p>
                <strong>4.3 Late Payments:</strong> Late payments may result in project delays and may incur interest charges at the rate of 2% per month or as per applicable law.
              </p>
              <p>
                <strong>4.4 Taxes:</strong> All quoted prices are exclusive of applicable taxes (GST, etc.) unless explicitly stated otherwise.
              </p>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Project Timeline and Delays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>5.1 Timeline:</strong> Project timelines are estimates and may be affected by factors including material availability, site conditions, client approvals, and force majeure events.
              </p>
              <p>
                <strong>5.2 Client Responsibilities:</strong> Timely client approvals, site access, and payment are essential for maintaining project schedules. Delays caused by the client may result in timeline extensions.
              </p>
              <p>
                <strong>5.3 Force Majeure:</strong> We are not liable for delays caused by circumstances beyond our reasonable control, including natural disasters, government actions, pandemics, or material shortages.
              </p>
            </CardContent>
          </Card>

          {/* Warranties */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Warranties and Guarantees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>6.1 Workmanship Warranty:</strong> We provide a warranty on our workmanship for a period specified in the project agreement (typically 6-12 months from project handover).
              </p>
              <p>
                <strong>6.2 Material Warranties:</strong> Materials are covered by manufacturer warranties. We will assist in warranty claims but are not responsible for manufacturer defects.
              </p>
              <p>
                <strong>6.3 Exclusions:</strong> Warranties do not cover damage caused by misuse, negligence, unauthorized modifications, or normal wear and tear.
              </p>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>7.1 Maximum Liability:</strong> Our total liability for any claims arising from our services shall not exceed the total project value paid by the client.
              </p>
              <p>
                <strong>7.2 Indirect Damages:</strong> We are not liable for indirect, consequential, or incidental damages including loss of profits, business interruption, or loss of data.
              </p>
              <p>
                <strong>7.3 Insurance:</strong> Clients are advised to maintain appropriate insurance coverage for their property and projects.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>8.1 Design Rights:</strong> All design concepts, drawings, and intellectual property created by us remain our property unless explicitly transferred in writing.
              </p>
              <p>
                <strong>8.2 Portfolio Use:</strong> We reserve the right to photograph completed projects and use them for marketing and portfolio purposes unless the client objects in writing.
              </p>
              <p>
                <strong>8.3 Client Materials:</strong> Clients grant us a license to use any materials, logos, or content provided for the purpose of completing the project.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>9. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>9.1 Client Termination:</strong> Clients may terminate the project by providing written notice. Payment for work completed and materials procured will be due immediately.
              </p>
              <p>
                <strong>9.2 Company Termination:</strong> We may terminate the project if the client breaches payment terms, fails to provide necessary approvals, or violates these Terms.
              </p>
              <p>
                <strong>9.3 Refunds:</strong> Refunds, if any, will be processed after deducting costs for work completed, materials procured, and administrative charges.
              </p>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>10. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>10.1 Negotiation:</strong> Parties agree to first attempt to resolve disputes through good-faith negotiation.
              </p>
              <p>
                <strong>10.2 Mediation:</strong> If negotiation fails, parties may agree to mediation before pursuing legal action.
              </p>
              <p>
                <strong>10.3 Jurisdiction:</strong> These Terms are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
              </p>
            </CardContent>
          </Card>

          {/* Website Use */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>11. Website Use and Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Scrape, copy, or reproduce website content without permission</li>
                <li>Impersonate the Company or misrepresent your affiliation</li>
                <li>Interfere with the proper functioning of the website</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>12. Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your use of our website and services is also governed by our Privacy Policy. Please review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>13. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website and services after changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.
              </p>
            </CardContent>
          </Card>

          {/* Severability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>14. Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>15. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>DPM ENTERPRISE Private Limited</strong></p>
                <p>35 Florence Building, Work City, Virar East</p>
                <p>Mumbai, Maharashtra 401305, India</p>
                <p>Email: <a href="mailto:admin@dpmenterprise.in" className="text-primary hover:underline">admin@dpmenterprise.in</a></p>
                <p>Phone: <a href="tel:+919930998063" className="text-primary hover:underline">+91 9930998063</a></p>
                <p>Landline: <a href="tel:+912269719769" className="text-primary hover:underline">022-69719769</a></p>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Acceptance of Terms</h3>
                <p className="text-sm text-muted-foreground">
                  By using our website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
