import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { 
  Users, TrendingUp, DollarSign, FileText, 
  AlertCircle, Building2,
  Wallet, CreditCard, UserPlus, Settings, LogOut, Bell, Sheet,
  Brain, Target, MessageCircle, Megaphone, Award, IndianRupee, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DirectorDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    hotLeads: 0,
    activeProjects: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    walletBalance: 0,
    todayLeads: 0,
    monthRevenue: 0
  });

  useEffect(() => {
    // Mock data - will be replaced with real API calls
    setStats({
      totalLeads: 127,
      hotLeads: 23,
      activeProjects: 15,
      totalRevenue: 2850000,
      pendingPayments: 450000,
      walletBalance: 1250000,
      todayLeads: 8,
      monthRevenue: 850000
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Director Dashboard - DPM ENTERPRISE</title>
        <meta name="description" content="Director control panel for DPM ENTERPRISE Private Limited" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/director" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-[#002147] text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Director Dashboard</h1>
                <p className="text-sm text-gray-300">DPM ENTERPRISE Private Limited</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => window.location.href = '/dashboard/master-sheet'}
                >
                  <Sheet className="h-4 w-4 mr-2" />
                  Master Sheet
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts (5)
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 opacity-80" />
                  <Badge className="bg-white/20 text-white">Today: {stats.todayLeads}</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalLeads}</div>
                <div className="text-sm opacity-90">Total Leads</div>
                <div className="mt-2 text-xs opacity-75">
                  {stats.hotLeads} Hot Leads 🔥
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="h-8 w-8 opacity-80" />
                  <Badge className="bg-white/20 text-white">Active</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.activeProjects}</div>
                <div className="text-sm opacity-90">Active Projects</div>
                <div className="mt-2 text-xs opacity-75">
                  {formatCurrency(stats.totalRevenue)} Total Value
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-8 w-8 opacity-80" />
                  <Badge className="bg-white/20 text-white">This Month</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{formatCurrency(stats.monthRevenue)}</div>
                <div className="text-sm opacity-90">Revenue</div>
                <div className="mt-2 text-xs opacity-75">
                  {formatCurrency(stats.pendingPayments)} Pending
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="h-8 w-8 opacity-80" />
                  <Badge className="bg-white/20 text-white">Available</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{formatCurrency(stats.walletBalance)}</div>
                <div className="text-sm opacity-90">Wallet Balance</div>
                <div className="mt-2 text-xs opacity-75">
                  Last updated: Today
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="accounting">Accounting</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Hot Leads 🔥</span>
                      <Button size="sm" variant="outline">View All</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Rajesh Kumar', company: 'Tech Solutions Pvt Ltd', value: '50L', time: '10 mins ago' },
                        { name: 'Indian Navy', company: 'Defense Project', value: '2Cr', time: '1 hour ago' },
                        { name: 'Sunita Reddy', company: 'Retail Showroom', value: '30L', time: '2 hours ago' }
                      ].map((lead, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-semibold text-[#002147]">{lead.name}</p>
                            <p className="text-sm text-gray-600">{lead.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{lead.value}</p>
                            <p className="text-xs text-gray-500">{lead.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Active Projects</span>
                      <Button size="sm" variant="outline">View All</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Corporate Office - Andheri', progress: 75, value: '85L', status: 'On Track' },
                        { name: 'Residential Villa - Virar', progress: 45, value: '45L', status: 'In Progress' },
                        { name: 'Showroom - Thane', progress: 90, value: '60L', status: 'Near Completion' }
                      ].map((project, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-[#002147]">{project.name}</p>
                            <Badge variant="outline">{project.status}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex-1 mr-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-gray-600">{project.progress}%</span>
                            <span className="font-bold text-green-600 ml-3">₹{project.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Command Center Quick Access */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Sales & Marketing Command Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'AI Command Center', href: '/dashboard/ai-sales-marketing', icon: Brain, color: 'from-purple-500 to-blue-500' },
                      { label: 'Lead Intelligence', href: '/dashboard/ai-lead-intelligence', icon: Target, color: 'from-orange-500 to-red-500' },
                      { label: 'Sales Pipeline', href: '/dashboard/sales-pipeline', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                      { label: 'Marketing Hub', href: '/dashboard/marketing', icon: Megaphone, color: 'from-pink-500 to-purple-500' },
                      { label: 'WhatsApp Business', href: '/dashboard/whatsapp', icon: MessageCircle, color: 'from-green-600 to-teal-500' },
                      { label: 'GeM Portal', href: '/dashboard/gem-portal', icon: Award, color: 'from-yellow-500 to-orange-500' },
                      { label: 'Finance Center', href: '/dashboard/finance', icon: IndianRupee, color: 'from-blue-500 to-cyan-500' },
                      { label: 'AI Automation', href: '/dashboard/ai-automation', icon: Zap, color: 'from-yellow-400 to-orange-400' },
                    ].map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-3 hover:opacity-90 transition-opacity flex flex-col items-start gap-2`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs font-semibold leading-tight">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                    Pending Actions & Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="h-6 w-6 text-orange-600" />
                        <Badge className="bg-orange-500">3 Pending</Badge>
                      </div>
                      <p className="font-semibold text-[#002147]">Quotations to Approve</p>
                      <Button size="sm" className="mt-3 w-full" variant="outline">Review Now</Button>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-6 w-6 text-blue-600" />
                        <Badge className="bg-blue-500">2 Pending</Badge>
                      </div>
                      <p className="font-semibold text-[#002147]">Vendor Registrations</p>
                      <Button size="sm" className="mt-3 w-full" variant="outline">Review Now</Button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard className="h-6 w-6 text-red-600" />
                        <Badge className="bg-red-500">5 Overdue</Badge>
                      </div>
                      <p className="font-semibold text-[#002147]">Payment Follow-ups</p>
                      <Button size="sm" className="mt-3 w-full" variant="outline">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Management System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 mb-4">Omni-Channel Lead Dashboard</p>
                    <Button onClick={() => window.location.href = '/dashboard/leads'}>
                      Open Lead Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Project Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 mb-4">Complete project tracking and management</p>
                    <Button>View All Projects</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accounting Tab */}
            <TabsContent value="accounting">
              <Card>
                <CardHeader>
                  <CardTitle>Accounting & Wallet System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg">
                      <Wallet className="h-8 w-8 mb-3 opacity-80" />
                      <p className="text-sm opacity-90 mb-1">Current Balance</p>
                      <p className="text-3xl font-bold">{formatCurrency(stats.walletBalance)}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
                      <DollarSign className="h-8 w-8 mb-3 opacity-80" />
                      <p className="text-sm opacity-90 mb-1">Total Income (Month)</p>
                      <p className="text-3xl font-bold">{formatCurrency(stats.monthRevenue)}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg">
                      <CreditCard className="h-8 w-8 mb-3 opacity-80" />
                      <p className="text-sm opacity-90 mb-1">Pending Payments</p>
                      <p className="text-3xl font-bold">{formatCurrency(stats.pendingPayments)}</p>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Full accounting system with invoicing, payments, and financial reports</p>
                    <Button>Open Accounting Dashboard</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>User Management</span>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New User
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 mb-4">Director-controlled user creation and management</p>
                    <p className="text-sm text-gray-500 mb-4">Create staff accounts, manage vendors, control access</p>
                    <Button>Manage Users</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Business Reports & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <FileText className="h-8 w-8 mb-2" />
                      <span>Daily Performance Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <TrendingUp className="h-8 w-8 mb-2" />
                      <span>Monthly Revenue Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <Users className="h-8 w-8 mb-2" />
                      <span>Lead Conversion Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <Building2 className="h-8 w-8 mb-2" />
                      <span>Project Status Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
