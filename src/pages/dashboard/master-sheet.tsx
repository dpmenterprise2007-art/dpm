import { useState, useEffect } from 'react';
import { 
  Clock, Target, IndianRupee,
  Phone, Mail, Calendar, ArrowUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from '@dr.pogodin/react-helmet';

interface LeadData {
  id: string;
  name: string;
  company: string;
  source: string;
  value: string;
  status: 'hot' | 'warm' | 'cold';
  time: string;
  followUp: string;
}

interface SocialPost {
  id: string;
  platform: string;
  type: string;
  scheduledTime: string;
  status: 'scheduled' | 'posted' | 'failed';
  engagement: { likes: number; comments: number; shares: number };
}

interface AccountingEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface GeMTender {
  id: string;
  title: string;
  value: string;
  deadline: string;
  status: 'active' | 'submitted' | 'won' | 'lost';
  progress: number;
}

export default function MasterSheet() {
  const [liveStats] = useState({
    totalLeads: 127,
    todayLeads: 8,
    hotLeads: 23,
    socialPosts: 2,
    walletBalance: 1250000,
    pendingPayments: 450000,
    activeTenders: 5,
    conversionRate: 18.5
  });

  const [leads, _setLeads] = useState<LeadData[]>([
    { id: '1', name: 'Rajesh Kumar', company: 'Tech Solutions Pvt Ltd', source: 'IndiaMART', value: '50L', status: 'hot', time: '10 mins ago', followUp: 'Today 3 PM' },
    { id: '2', name: 'Indian Navy', company: 'Defense Project', source: 'GeM Portal', value: '2Cr', status: 'hot', time: '1 hour ago', followUp: 'Tomorrow 10 AM' },
    { id: '3', name: 'Sunita Reddy', company: 'Retail Showroom', source: 'JustDial', value: '30L', status: 'warm', time: '2 hours ago', followUp: 'Monday' },
    { id: '4', name: 'Amit Sharma', company: 'IT Park Office', source: 'Livspace B2B', value: '75L', status: 'hot', time: '3 hours ago', followUp: 'Today 5 PM' },
    { id: '5', name: 'Priya Patel', company: 'Residential Villa', source: 'Website', value: '45L', status: 'warm', time: '5 hours ago', followUp: 'Tuesday' }
  ]);

  const [socialPosts, _setSocialPosts] = useState<SocialPost[]>([
    { id: '1', platform: 'Instagram', type: 'Reel', scheduledTime: 'Today 10:00 AM', status: 'posted', engagement: { likes: 245, comments: 18, shares: 12 } },
    { id: '2', platform: 'Facebook', type: 'Video', scheduledTime: 'Today 10:00 AM', status: 'posted', engagement: { likes: 189, comments: 23, shares: 8 } },
    { id: '3', platform: 'LinkedIn', type: 'Post', scheduledTime: 'Today 10:00 AM', status: 'posted', engagement: { likes: 156, comments: 15, shares: 22 } },
    { id: '4', platform: 'Instagram', type: 'Template', scheduledTime: 'Today 3:00 PM', status: 'scheduled', engagement: { likes: 0, comments: 0, shares: 0 } },
    { id: '5', platform: 'Facebook', type: 'Graphic', scheduledTime: 'Today 3:00 PM', status: 'scheduled', engagement: { likes: 0, comments: 0, shares: 0 } }
  ]);

  const [accounting, _setAccounting] = useState<AccountingEntry[]>([
    { id: '1', type: 'income', category: 'Project Payment', amount: 250000, description: 'Corporate Office - Andheri (Milestone 2)', date: 'Today', status: 'paid' },
    { id: '2', type: 'expense', category: 'Raw Material', amount: 85000, description: 'Furniture Hardware - Supplier A', date: 'Yesterday', status: 'paid' },
    { id: '3', type: 'income', category: 'Advance Payment', amount: 150000, description: 'Residential Villa - Virar', date: '2 days ago', status: 'paid' },
    { id: '4', type: 'income', category: 'Project Payment', amount: 180000, description: 'Showroom - Thane (Final)', date: '3 days ago', status: 'pending' },
    { id: '5', type: 'expense', category: 'Labor Cost', amount: 45000, description: 'Site Workers - Week 1', date: '4 days ago', status: 'paid' }
  ]);

  const [gemTenders, _setGemTenders] = useState<GeMTender[]>([
    { id: '1', title: 'Office Furniture - Indian Navy', value: '₹2.5Cr', deadline: '15 Feb 2026', status: 'active', progress: 65 },
    { id: '2', title: 'Interior Work - Railway Station', value: '₹1.8Cr', deadline: '20 Feb 2026', status: 'active', progress: 45 },
    { id: '3', title: 'Modular Kitchen - Govt Housing', value: '₹95L', deadline: '10 Feb 2026', status: 'submitted', progress: 100 },
    { id: '4', title: 'Corporate Office - MSME', value: '₹1.2Cr', deadline: '25 Feb 2026', status: 'active', progress: 30 },
    { id: '5', title: 'Turnkey Project - University', value: '₹3.5Cr', deadline: '28 Feb 2026', status: 'won', progress: 100 }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-orange-500';
      case 'cold': return 'bg-blue-500';
      case 'posted': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      case 'active': return 'bg-blue-500';
      case 'submitted': return 'bg-purple-500';
      case 'won': return 'bg-green-500';
      case 'lost': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would fetch real data from API
      console.log('Auto-refreshing master sheet data...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Master Control Sheet | DPM Enterprise</title>
        <meta name="description" content="Real-time operations master sheet for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/master-sheet" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">📊 Master Control Sheet</h1>
                <p className="text-sm text-gray-300">DPM ENTERPRISE Private Limited - Live Operations Dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-300">Last Updated</p>
                  <p className="text-sm font-semibold">Just Now</p>
                </div>
                <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total Leads</p>
                <p className="text-2xl font-bold text-[#002147]">{liveStats.totalLeads}</p>
                <p className="text-xs text-green-600 flex items-center justify-center">
                  <ArrowUp className="h-3 w-3" /> +{liveStats.todayLeads} today
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Hot Leads 🔥</p>
                <p className="text-2xl font-bold text-red-600">{liveStats.hotLeads}</p>
                <p className="text-xs text-gray-500">High Priority</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Social Posts</p>
                <p className="text-2xl font-bold text-blue-600">{liveStats.socialPosts}</p>
                <p className="text-xs text-green-600">Posted Today</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Wallet Balance</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(liveStats.walletBalance).slice(0, -3)}</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(liveStats.pendingPayments).slice(0, -3)}</p>
                <p className="text-xs text-gray-500">To Collect</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">GeM Tenders</p>
                <p className="text-2xl font-bold text-purple-600">{liveStats.activeTenders}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Conversion</p>
                <p className="text-2xl font-bold text-indigo-600">{liveStats.conversionRate}%</p>
                <p className="text-xs text-green-600 flex items-center justify-center">
                  <ArrowUp className="h-3 w-3" /> +2.3%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">System Status</p>
                <p className="text-2xl font-bold text-green-600">🟢</p>
                <p className="text-xs text-green-600">All Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">🎯 All Operations</TabsTrigger>
              <TabsTrigger value="sales">💼 Sales Hub</TabsTrigger>
              <TabsTrigger value="marketing">📱 Marketing Hub</TabsTrigger>
              <TabsTrigger value="accounting">💰 Accounting</TabsTrigger>
              <TabsTrigger value="gem">🏛️ GeM Control</TabsTrigger>
            </TabsList>

            {/* All Operations Tab */}
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Hub Preview */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>💼 Sales Hub - The Vacuum</span>
                      <Badge className="bg-white/20">⚡ Live</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {leads.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-[#002147]">{lead.name}</p>
                              <Badge className={`${getStatusColor(lead.status)} text-white text-xs`}>
                                {lead.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{lead.company} • {lead.source}</p>
                            <p className="text-xs text-gray-500 mt-1">Follow-up: {lead.followUp}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{lead.value}</p>
                            <p className="text-xs text-gray-500">{lead.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => document.querySelector('[value="sales"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                      View All Leads →
                    </Button>
                  </CardContent>
                </Card>

                {/* Marketing Hub Preview */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>📱 Marketing Hub - Social Engine</span>
                      <Badge className="bg-white/20">🟢 Scheduled</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {socialPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-[#002147]">{post.platform} {post.type}</p>
                              <Badge className={`${getStatusColor(post.status)} text-white text-xs`}>
                                {post.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{post.scheduledTime}</p>
                            {post.status === 'posted' && (
                              <p className="text-xs text-gray-500 mt-1">
                                ❤️ {post.engagement.likes} 💬 {post.engagement.comments} 🔄 {post.engagement.shares}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => document.querySelector('[value="marketing"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                      View All Posts →
                    </Button>
                  </CardContent>
                </Card>

                {/* Accounting Preview */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>💰 Accounting - Private</span>
                      <Badge className="bg-white/20">🔒 Locked</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {accounting.slice(0, 3).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-[#002147]">{entry.category}</p>
                              <Badge className={`${getStatusColor(entry.status)} text-white text-xs`}>
                                {entry.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{entry.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => document.querySelector('[value="accounting"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                      View Full Ledger →
                    </Button>
                  </CardContent>
                </Card>

                {/* GeM Control Preview */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>🏛️ GeM Tender Control</span>
                      <Badge className="bg-white/20">🛠️ Ready</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {gemTenders.slice(0, 3).map((tender) => (
                        <div key={tender.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-[#002147] text-sm">{tender.title}</p>
                            <Badge className={`${getStatusColor(tender.status)} text-white text-xs`}>
                              {tender.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Value: {tender.value}</span>
                            <span className="text-gray-600">Due: {tender.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${tender.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{tender.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => document.querySelector('[value="gem"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                      View All Tenders →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sales Hub Tab */}
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>💼 Sales Hub - The Indian Buyer Vacuum</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">⚡ Scraping Active</Badge>
                      <Button size="sm">Export CSV</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-[#002147] text-lg">{lead.name}</p>
                            <Badge className={`${getStatusColor(lead.status)} text-white`}>
                              {lead.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{lead.company}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {lead.source}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {lead.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Follow-up: {lead.followUp}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-xl mb-2">₹{lead.value}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-1" />
                              Email
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketing Hub Tab */}
            <TabsContent value="marketing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>📱 Marketing Hub - Daily Social Media Engine</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">🟢 Scheduled</Badge>
                      <Button size="sm">Schedule New Post</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-[#002147]">{post.platform} - {post.type}</p>
                            <Badge className={`${getStatusColor(post.status)} text-white`}>
                              {post.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{post.scheduledTime}</p>
                          {post.status === 'posted' && (
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-red-500">
                                ❤️ {post.engagement.likes} Likes
                              </span>
                              <span className="flex items-center gap-1 text-blue-500">
                                💬 {post.engagement.comments} Comments
                              </span>
                              <span className="flex items-center gap-1 text-green-500">
                                🔄 {post.engagement.shares} Shares
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {post.status === 'scheduled' && (
                            <Button size="sm" variant="outline">Edit</Button>
                          )}
                          {post.status === 'posted' && (
                            <Button size="sm" variant="outline">View Post</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accounting Tab */}
            <TabsContent value="accounting">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>💰 Accounting Ledger - Private (Director Only)</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500">🔒 Locked</Badge>
                      <Button size="sm">Add Entry</Button>
                      <Button size="sm" variant="outline">Export Report</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Income (Month)</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(accounting.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0))}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Expenses (Month)</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(accounting.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0))}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Net Profit (Month)</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(
                          accounting.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0) -
                          accounting.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {accounting.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-[#002147]">{entry.category}</p>
                            <Badge className={`${getStatusColor(entry.status)} text-white`}>
                              {entry.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{entry.description}</p>
                          <p className="text-xs text-gray-500">{entry.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-xl ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{entry.type === 'income' ? 'Income' : 'Expense'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GeM Control Tab */}
            <TabsContent value="gem">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>🏛️ GeM Tender Control - Government e-Marketplace</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500">🛠️ Ready</Badge>
                      <Button size="sm">Scan New Tenders</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gemTenders.map((tender) => (
                      <div key={tender.id} className="p-4 bg-white border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-bold text-[#002147] text-lg">{tender.title}</p>
                              <Badge className={`${getStatusColor(tender.status)} text-white`}>
                                {tender.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <IndianRupee className="h-4 w-4" />
                                Value: {tender.value}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Deadline: {tender.deadline}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            {tender.status === 'active' && (
                              <Button size="sm">Submit Bid</Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-orange-600 h-3 rounded-full transition-all" 
                              style={{ width: `${tender.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{tender.progress}%</span>
                        </div>
                      </div>
                    ))}
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
