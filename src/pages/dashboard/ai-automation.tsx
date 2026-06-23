import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Target,
  Zap,
  CheckCircle2,
  Clock,

  BarChart3,
  Send,

  Sparkles,
} from 'lucide-react';

export default function AIAutomationDashboard() {
  const [stats] = useState({
    leadsGenerated: 127,
    campaignsActive: 8,
    emailsSent: 2450,
    whatsappSent: 890,
    quotesGenerated: 45,
    conversionRate: 23.5,
    revenueImpact: 3850000,
    timeSaved: 220,
  });

  const [leadGeneration] = useState({
    status: 'active',
    lastRun: '2 hours ago',
    nextRun: 'In 4 hours',
    sources: [
      { name: 'Google Maps', leads: 45, status: 'active' },
      { name: 'LinkedIn', leads: 38, status: 'active' },
      { name: 'GeM Portal', leads: 28, status: 'active' },
      { name: 'Website Forms', leads: 16, status: 'active' },
    ],
  });

  const [campaigns] = useState([
    {
      id: 1,
      name: 'Corporate Interior Q1 2026',
      type: 'email',
      status: 'active',
      sent: 450,
      opened: 315,
      clicked: 89,
      converted: 12,
    },
    {
      id: 2,
      name: 'Residential Projects Mumbai',
      type: 'whatsapp',
      status: 'active',
      sent: 280,
      opened: 268,
      clicked: 145,
      converted: 18,
    },
    {
      id: 3,
      name: 'Government Tender Alerts',
      type: 'email',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
    },
  ]);

  const [contentCalendar] = useState([
    {
      id: 1,
      title: 'Modern Office Interior Design Trends 2026',
      platform: 'LinkedIn',
      scheduledFor: '2026-02-10 10:00 AM',
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'DPM Enterprise Completes 500+ Projects',
      platform: 'Facebook',
      scheduledFor: '2026-02-12 02:00 PM',
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Sustainable Furniture Manufacturing',
      platform: 'Instagram',
      scheduledFor: '2026-02-14 11:00 AM',
      status: 'scheduled',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Helmet>
        <title>AI Automation | DPM Enterprise</title>
        <meta name="description" content="AI automation tools for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/ai-automation" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">AI Automation Dashboard</h1>
            <p className="text-gray-600 font-medium">Complete AI-powered sales & marketing automation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className="bg-green-500 text-white px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            System Active
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: 2 min ago
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Leads Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-purple-600">{stats.leadsGenerated}</div>
            <p className="text-xs text-gray-500 mt-1">+23% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-600" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600">{stats.campaignsActive}</div>
            <p className="text-xs text-gray-500 mt-1">{stats.emailsSent + stats.whatsappSent} messages sent</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-green-600">{stats.conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">+5.2% improvement</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-600">₹{(stats.revenueImpact / 100000).toFixed(1)}L</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="lead-generation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="lead-generation">Lead Generation</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="content">Content Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Lead Generation Tab */}
        <TabsContent value="lead-generation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Generation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI Lead Generation Engine
                </CardTitle>
                <CardDescription>Automatic lead discovery from multiple sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div>
                    <p className="font-bold text-green-900">Status: Active</p>
                    <p className="text-sm text-green-700">Last run: {leadGeneration.lastRun}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">Next scheduled run</span>
                    <span className="text-gray-600">{leadGeneration.nextRun}</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="pt-4 space-y-3">
                  {leadGeneration.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-gray-900">{source.name}</span>
                      </div>
                      <Badge variant="secondary">{source.leads} leads</Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Run Now
                </Button>
              </CardContent>
            </Card>

            {/* Lead Quality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Lead Quality Distribution
                </CardTitle>
                <CardDescription>AI-scored lead classification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {/* HOT Leads */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <span className="font-bold text-gray-900">HOT Leads</span>
                      </div>
                      <span className="font-black text-red-600">23</span>
                    </div>
                    <Progress value={18} className="h-3 bg-red-100" />
                    <p className="text-xs text-gray-500 mt-1">Score: 80-100 | Immediate follow-up</p>
                  </div>

                  {/* WARM Leads */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                        <span className="font-bold text-gray-900">WARM Leads</span>
                      </div>
                      <span className="font-black text-orange-600">45</span>
                    </div>
                    <Progress value={35} className="h-3 bg-orange-100" />
                    <p className="text-xs text-gray-500 mt-1">Score: 60-79 | Follow-up within 24h</p>
                  </div>

                  {/* COLD Leads */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                        <span className="font-bold text-gray-900">COLD Leads</span>
                      </div>
                      <span className="font-black text-blue-600">59</span>
                    </div>
                    <Progress value={46} className="h-3 bg-blue-100" />
                    <p className="text-xs text-gray-500 mt-1">Score: &lt;60 | Nurture campaign</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Total Leads</span>
                    <span className="text-2xl font-black text-purple-600">127</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  View All Leads
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                Active Marketing Campaigns
              </CardTitle>
              <CardDescription>Automated email and WhatsApp campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={campaign.type === 'email' ? 'default' : 'secondary'}>
                            {campaign.type === 'email' ? <Mail className="h-3 w-3 mr-1" /> : <MessageSquare className="h-3 w-3 mr-1" />}
                            {campaign.type.toUpperCase()}
                          </Badge>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                            {campaign.status === 'active' ? 'Active' : 'Scheduled'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {campaign.status === 'active' && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="text-lg font-bold text-gray-900">{campaign.sent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Opened</p>
                          <p className="text-lg font-bold text-blue-600">{campaign.opened}</p>
                          <p className="text-xs text-gray-500">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicked</p>
                          <p className="text-lg font-bold text-green-600">{campaign.clicked}</p>
                          <p className="text-xs text-gray-500">{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Converted</p>
                          <p className="text-lg font-bold text-purple-600">{campaign.converted}</p>
                          <p className="text-xs text-gray-500">{((campaign.converted / campaign.sent) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="h-4 w-4 mr-2" />
                Create New Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Calendar Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                AI Content Calendar
              </CardTitle>
              <CardDescription>Auto-generated social media posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentCalendar.map((content) => (
                  <div key={content.id} className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{content.title}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <Badge variant="outline">{content.platform}</Badge>
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {content.scheduledFor}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate More Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Email Open Rate</span>
                      <span className="text-sm font-bold text-blue-600">68.5%</span>
                    </div>
                    <Progress value={68.5} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Click-Through Rate</span>
                      <span className="text-sm font-bold text-green-600">24.3%</span>
                    </div>
                    <Progress value={24.3} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Conversion Rate</span>
                      <span className="text-sm font-bold text-purple-600">23.5%</span>
                    </div>
                    <Progress value={23.5} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">WhatsApp Response Rate</span>
                      <span className="text-sm font-bold text-orange-600">89.2%</span>
                    </div>
                    <Progress value={89.2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Time & Cost Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Time Saved This Month</p>
                  <p className="text-3xl font-black text-orange-600">{stats.timeSaved} hours</p>
                  <p className="text-xs text-gray-600 mt-1">Equivalent to ₹1.1L in labor costs</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Lead Generation</span>
                    <span className="font-bold text-gray-900">80h saved</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Content Creation</span>
                    <span className="font-bold text-gray-900">40h saved</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Follow-ups</span>
                    <span className="font-bold text-gray-900">60h saved</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">Reporting</span>
                    <span className="font-bold text-gray-900">40h saved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
