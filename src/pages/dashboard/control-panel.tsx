import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
  MessageCircle,
  MessageSquare,
  Phone,
  Mail,
  Share2,
  Download,
  ExternalLink,
  DollarSign,
  Settings,
} from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Link } from 'react-router-dom';

interface DashboardStats {
  leads: {
    total: number;
    hot: number;
    warm: number;
    cold: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  projects: {
    active: number;
    completed: number;
    pending: number;
    totalValue: number;
  };
  financial: {
    revenue: number;
    expenses: number;
    profit: number;
    pending: number;
  };
  performance: {
    conversionRate: number;
    avgResponseTime: string;
    customerSatisfaction: number;
  };
}

export default function ControlPanelPage() {
  const [stats, setStats] = useState<DashboardStats>({
    leads: {
      total: 0,
      hot: 0,
      warm: 0,
      cold: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    },
    projects: {
      active: 0,
      completed: 0,
      pending: 0,
      totalValue: 0,
    },
    financial: {
      revenue: 0,
      expenses: 0,
      profit: 0,
      pending: 0,
    },
    performance: {
      conversionRate: 0,
      avgResponseTime: '0h',
      customerSatisfaction: 0,
    },
  });

  const [, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch leads from correct API
      const leadsResponse = await fetch('/api/leads/list?limit=1000');
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json();
        const leads = leadsData.leads || [];

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        setStats(prev => ({
          ...prev,
          leads: {
            total: leads.length,
            hot: leads.filter((l: any) => l.status === 'hot').length,
            warm: leads.filter((l: any) => l.status === 'warm').length,
            cold: leads.filter((l: any) => l.status === 'cold').length,
            today: leads.filter((l: any) => new Date(l.createdAt) >= today).length,
            thisWeek: leads.filter((l: any) => new Date(l.createdAt) >= weekAgo).length,
            thisMonth: leads.filter((l: any) => new Date(l.createdAt) >= monthAgo).length,
          },
        }));
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const quickActions = [
    {
      title: 'AI Master Control',
      description: 'Complete automation hub - All AI features',
      icon: BarChart3,
      link: '/dashboard/ai-master-control',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      badge: 'MASTER',
    },
    {
      title: 'Lead Verification',
      description: 'Fix phone numbers, remove duplicates, verify contacts',
      icon: Settings,
      link: '/dashboard/lead-verification',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      badge: 'FIX',
    },
    {
      title: 'Automation Settings',
      description: 'WhatsApp, Email & Social Media',
      icon: Settings,
      link: '/dashboard/automation-settings',
      color: 'bg-purple-500',
      badge: 'CONFIG',
    },
    {
      title: 'AI Automation',
      description: 'Lead generation & social media',
      icon: BarChart3,
      link: '/dashboard/ai-automation',
      color: 'bg-indigo-500',
      badge: 'AI',
    },
    {
      title: 'Sales Pipeline',
      description: 'Drag & drop lead management',
      icon: Users,
      link: '/dashboard/sales-pipeline',
      color: 'bg-blue-500',
      badge: 'AI',
    },
    {
      title: 'View All Leads',
      description: 'Complete lead database',
      icon: Users,
      link: '/dashboard/leads',
      color: 'bg-green-500',
    },
    {
      title: 'Master Control Sheet',
      description: 'Unified operations dashboard',
      icon: LayoutDashboard,
      link: '/dashboard/master-sheet',
      color: 'bg-orange-500',
    },
  ];

  const whatsappMessage = encodeURIComponent(
    `🏢 DPM Enterprise - New Lead Alert\n\n📊 Total Leads: ${stats.leads.total}\n🔥 Hot Leads: ${stats.leads.hot}\n⚡ Warm Leads: ${stats.leads.warm}\n\n📈 Today: ${stats.leads.today} new leads\n📅 This Week: ${stats.leads.thisWeek} leads\n\nCheck dashboard for details!`
  );

  const handleExportData = () => {
    const data = {
      leads: stats.leads,
      projects: stats.projects,
      financial: stats.financial,
      performance: stats.performance,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dpm-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Control Panel | DPM Enterprise</title>
        <meta name="description" content="Complete business control panel for DPM Enterprise." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/control-panel" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
            <p className="text-muted-foreground mt-2">
              Complete business overview and management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
            </div>
            <Button onClick={handleExportData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={fetchStats} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={`https://wa.me/919930998063?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-green-200 hover:border-green-400">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Share via WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Send dashboard summary</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href="tel:02269719769" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-blue-200 hover:border-blue-400">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Call Director</h3>
                    <p className="text-sm text-muted-foreground">+91 99309 98063</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href="mailto:admin@dpmenterprise.in" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-purple-200 hover:border-purple-400">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Email Report</h3>
                    <p className="text-sm text-muted-foreground">admin@dpmenterprise.in</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-4xl">{stats.leads.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  +{stats.leads.today} today
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  +{stats.leads.thisWeek} this week
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>🔥 Hot Leads</CardDescription>
              <CardTitle className="text-4xl text-red-600">{stats.leads.hot}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Require immediate attention
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Projects</CardDescription>
              <CardTitle className="text-4xl text-blue-600">{stats.projects.active}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {stats.projects.pending} pending approval
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle className="text-4xl text-green-600">
                {formatCurrency(stats.financial.revenue)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Profit: {formatCurrency(stats.financial.profit)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Overview</CardTitle>
            <CardDescription>Current lead distribution and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">🔥 Hot Leads</span>
                  <span className="text-2xl font-bold text-red-600">{stats.leads.hot}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{
                      width: `${stats.leads.total > 0 ? (stats.leads.hot / stats.leads.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.leads.total > 0
                    ? Math.round((stats.leads.hot / stats.leads.total) * 100)
                    : 0}% of total leads
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">⚡ Warm Leads</span>
                  <span className="text-2xl font-bold text-orange-600">{stats.leads.warm}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{
                      width: `${stats.leads.total > 0 ? (stats.leads.warm / stats.leads.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.leads.total > 0
                    ? Math.round((stats.leads.warm / stats.leads.total) * 100)
                    : 0}% of total leads
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">❄️ Cold Leads</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.leads.cold}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${stats.leads.total > 0 ? (stats.leads.cold / stats.leads.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.leads.total > 0
                    ? Math.round((stats.leads.cold / stats.leads.total) * 100)
                    : 0}% of total leads
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 hover:border-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`${action.color} p-3 rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{action.title}</CardTitle>
                            {action.badge && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">
                            {action.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.performance.conversionRate}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Leads converted to projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.performance.avgResponseTime}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Time to first response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {stats.performance.customerSatisfaction}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on project feedback
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Marketing Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Social Media Marketing
            </CardTitle>
            <CardDescription>Quick share and promotion tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Share Dashboard Summary</h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://9j515avjk1.preview.c24.airoapp.ai')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Share2 className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://9j515avjk1.preview.c24.airoapp.ai')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                      <Share2 className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Marketing Stats</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Website Visits</span>
                    <span className="font-bold">Track with Analytics</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-bold text-green-600">{stats.performance.conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-bold text-blue-600">{stats.performance.avgResponseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Automation Status */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              AI Automation Engine
            </CardTitle>
            <CardDescription>Real-time automation status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Lead Generation AI</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    Auto-generating leads from Google Maps, LinkedIn, GeM Portal
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Social Media Automation</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Scheduled
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    Daily posts on Facebook, Instagram, LinkedIn (7 posts/week)
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">AI Reply Generator</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Live
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    Auto-generating personalized client responses in real-time
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Lead Scoring Engine</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Running
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    AI scoring all leads (0-100) with HOT/WARM/COLD classification
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-purple-600">127</p>
                    <p className="text-xs text-muted-foreground">AI Generated Leads</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-blue-600">8</p>
                    <p className="text-xs text-muted-foreground">Active Campaigns</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-green-600">23.5%</p>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link to="/dashboard/ai-automation">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    AI Dashboard
                  </Button>
                </Link>
                <Link to="/dashboard/sales-pipeline">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Sales Pipeline
                  </Button>
                </Link>
                <Link to="/dashboard/marketing">
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Marketing Hub
                  </Button>
                </Link>
                <Link to="/dashboard/finance">
                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Finance Center
                  </Button>
                </Link>
                <Link to="/dashboard/whatsapp">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Website</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Database</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Lead Capture</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">WhatsApp Integration</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Live
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Email Notifications</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  Setup Required
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}
