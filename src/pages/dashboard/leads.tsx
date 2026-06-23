import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, Building2, DollarSign, Clock, Search } from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  source: string;
  status: 'hot' | 'warm' | 'cold';
  aiScore: number;
  aiInsights: string | null;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/forms/contact');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      activeTab === 'all' || 
      lead.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'warm': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hot': return '🔥';
      case 'warm': return '⚡';
      case 'cold': return '❄️';
      default: return '📊';
    }
  };

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.status === 'hot').length,
    warm: leads.filter(l => l.status === 'warm').length,
    cold: leads.filter(l => l.status === 'cold').length,
    today: leads.filter(l => {
      const leadDate = new Date(l.createdAt);
      const today = new Date();
      return leadDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Lead Management | DPM Enterprise</title>
        <meta name="description" content="Manage and track all leads for DPM Enterprise." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/leads" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all inquiries from your website
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>🔥 Hot Leads</CardDescription>
              <CardTitle className="text-3xl text-red-600">{stats.hot}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>⚡ Warm Leads</CardDescription>
              <CardTitle className="text-3xl text-orange-600">{stats.warm}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>❄️ Cold Leads</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.cold}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>📅 Today</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.today}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email, phone, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="hot">🔥 Hot ({stats.hot})</TabsTrigger>
            <TabsTrigger value="warm">⚡ Warm ({stats.warm})</TabsTrigger>
            <TabsTrigger value="cold">❄️ Cold ({stats.cold})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Loading leads...</p>
                </CardContent>
              </Card>
            ) : filteredLeads.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No leads found matching your search.' : 'No leads yet. They will appear here when someone submits the contact form.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredLeads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{lead.name}</CardTitle>
                          <Badge className={getStatusColor(lead.status)}>
                            {getStatusIcon(lead.status)} {lead.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">Score: {lead.aiScore}/145</Badge>
                        </div>
                        <CardDescription>
                          {new Date(lead.createdAt).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                          {lead.phone}
                        </a>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${lead.phone}`}>
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </a>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${lead.email}`} className="text-primary hover:underline truncate">
                          {lead.email}
                        </a>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${lead.email}`}>
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </div>

                    {lead.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{lead.company}</span>
                      </div>
                    )}

                    {/* Project Details */}
                    {(lead.projectType || lead.budget || lead.timeline) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        {lead.projectType && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.projectType}</span>
                          </div>
                        )}
                        {lead.budget && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.budget}</span>
                          </div>
                        )}
                        {lead.timeline && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.timeline}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message */}
                    {lead.message && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Message:</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {lead.message}
                        </p>
                      </div>
                    )}

                    {/* AI Insights */}
                    {lead.aiInsights && (
                      <div className="pt-4 border-t bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                        <p className="text-sm font-medium mb-2 text-blue-900">AI Recommendation:</p>
                        <p className="text-sm text-blue-800">
                          {JSON.parse(lead.aiInsights).recommendation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}
