import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, TrendingUp, Search, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  location?: string;
  source: string;
  message?: string;
  timestamp: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  insights: string[];
}

export default function OmniChannelDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    warm: 0,
    cold: 0,
    today: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@company.com',
        company: 'Tech Solutions Pvt Ltd',
        projectType: 'Corporate Office Interior',
        budget: '50 Lakh',
        timeline: 'Immediate',
        location: 'Mumbai',
        source: 'IndiaMART',
        message: 'Need complete office interior for 10,000 sq ft. Urgent requirement.',
        timestamp: new Date().toISOString(),
        score: 85,
        status: 'hot',
        insights: ['High budget potential', 'Urgent timeline', 'High-value project type', 'Corporate client']
      },
      {
        id: '2',
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        email: 'priya.sharma@email.com',
        projectType: 'Residential Interior',
        budget: '15 Lakh',
        timeline: '2 months',
        location: 'Virar',
        source: 'Website Direct',
        message: 'Looking for 3BHK interior design',
        timestamp: new Date().toISOString(),
        score: 65,
        status: 'warm',
        insights: ['Local area - easy to service', 'High-quality lead source']
      },
      {
        id: '3',
        name: 'Indian Navy - Mumbai',
        phone: '+91 22 6971 9769',
        email: 'procurement@navy.gov.in',
        company: 'Indian Navy',
        projectType: 'Defense Interior Project',
        budget: '2 Crore',
        timeline: 'Immediate',
        location: 'Mumbai',
        source: 'GeM Portal',
        message: 'Tender for naval base interior work. GeM registered vendors only.',
        timestamp: new Date().toISOString(),
        score: 95,
        status: 'hot',
        insights: ['High budget potential', 'Urgent timeline', 'High-value project type', 'Government client']
      },
      {
        id: '4',
        name: 'Amit Patel',
        phone: '+91 76543 21098',
        projectType: 'Modular Kitchen',
        budget: '3 Lakh',
        timeline: '3 months',
        location: 'Palghar',
        source: 'JustDial',
        message: 'Kitchen renovation',
        timestamp: new Date().toISOString(),
        score: 45,
        status: 'warm',
        insights: ['Local area - easy to service']
      },
      {
        id: '5',
        name: 'Sunita Reddy',
        phone: '+91 65432 10987',
        projectType: 'Commercial Showroom',
        budget: '30 Lakh',
        timeline: '1 month',
        location: 'Thane',
        source: 'Facebook',
        message: 'Showroom interior for retail store',
        timestamp: new Date().toISOString(),
        score: 72,
        status: 'hot',
        insights: ['High budget potential', 'Urgent timeline', 'High-value project type']
      }
    ];

    setLeads(mockLeads);
    setStats({
      total: mockLeads.length,
      hot: mockLeads.filter(l => l.status === 'hot').length,
      warm: mockLeads.filter(l => l.status === 'warm').length,
      cold: mockLeads.filter(l => l.status === 'cold').length,
      today: mockLeads.length
    });
  }, []);

  const filteredLeads = leads
    .filter(lead => filter === 'all' || lead.status === filter)
    .filter(lead => 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-orange-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSourceIcon = (source: string) => {
    const sourceLower = source.toLowerCase();
    if (sourceLower.includes('indiamart')) return '🏭';
    if (sourceLower.includes('justdial')) return '📞';
    if (sourceLower.includes('website')) return '🌐';
    if (sourceLower.includes('facebook')) return '📘';
    if (sourceLower.includes('gem')) return '🏛️';
    return '📧';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#002147] mb-2">Omni-Channel Lead Dashboard</h1>
          <p className="text-gray-600">Real-time leads from all platforms with AI scoring</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{stats.total}</div>
              <div className="text-sm opacity-90">Total Leads</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{stats.hot}</div>
              <div className="text-sm opacity-90">🔥 Hot Leads</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{stats.warm}</div>
              <div className="text-sm opacity-90">⚡ Warm Leads</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{stats.cold}</div>
              <div className="text-sm opacity-90">❄️ Cold Leads</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-1">{stats.today}</div>
              <div className="text-sm opacity-90">📅 Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name, phone, company, or project type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filter === 'hot' ? 'default' : 'outline'}
                  onClick={() => setFilter('hot')}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                >
                  🔥 Hot
                </Button>
                <Button
                  variant={filter === 'warm' ? 'default' : 'outline'}
                  onClick={() => setFilter('warm')}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  ⚡ Warm
                </Button>
                <Button
                  variant={filter === 'cold' ? 'default' : 'outline'}
                  onClick={() => setFilter('cold')}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  ❄️ Cold
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Lead Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#002147]">{lead.name}</h3>
                          <Badge className={`${getStatusColor(lead.status)} text-white`}>
                            {lead.status.toUpperCase()} • Score: {lead.score}
                          </Badge>
                          <span className="text-2xl">{getSourceIcon(lead.source)}</span>
                        </div>
                        {lead.company && (
                          <p className="text-sm text-gray-600 font-medium">{lead.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline font-medium">
                          {lead.phone}
                        </a>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                            {lead.email}
                          </a>
                        </div>
                      )}
                      {lead.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{lead.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{new Date(lead.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Project Type:</span>
                          <p className="font-semibold text-gray-900">{lead.projectType}</p>
                        </div>
                        {lead.budget && (
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <p className="font-semibold text-green-600">{lead.budget}</p>
                          </div>
                        )}
                        {lead.timeline && (
                          <div>
                            <span className="text-gray-500">Timeline:</span>
                            <p className="font-semibold text-orange-600">{lead.timeline}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {lead.message && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 italic">"{lead.message}"</p>
                      </div>
                    )}

                    {/* AI Insights */}
                    {lead.insights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {lead.insights.map((insight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {insight}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button className="w-full" variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button className="w-full" variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <div className="text-xs text-center text-gray-500 mt-2">
                      Source: {lead.source}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500 text-lg">No leads found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
