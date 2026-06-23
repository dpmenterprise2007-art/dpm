/**
 * Lead Follow-up Dashboard
 * Complete WhatsApp follow-up system with daily updates
 */

import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle, Send, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  status: string;
  followUpDate: string | null;
  lastContact: string | null;
  verified: boolean;
  createdAt: string;
}

interface FollowUp {
  id: number;
  leadId: string;
  type: 'whatsapp' | 'email' | 'call';
  message: string;
  scheduledDate: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt: string | null;
}

export default function LeadFollowupDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    today: 0
  });

  // Fetch leads
  useEffect(() => {
    fetchLeads();
    fetchFollowUps();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads/list');
      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
        calculateStats(data.leads);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
  };

  const fetchFollowUps = async () => {
    try {
      const response = await fetch('/api/sales/follow-ups/list');
      const data = await response.json();
      if (data.success) {
        setFollowUps(data.followUps || []);
      }
    } catch (error) {
      console.error('Failed to fetch follow-ups:', error);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const today = new Date().toISOString().split('T')[0];
    const pending = leadsData.filter(l => l.followUpDate && new Date(l.followUpDate) <= new Date()).length;
    const todayFollowups = leadsData.filter(l => l.followUpDate?.startsWith(today)).length;
    
    setStats({
      total: leadsData.length,
      pending,
      completed: leadsData.length - pending,
      today: todayFollowups
    });
  };

  const sendWhatsAppFollowup = async (lead: Lead, message: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/whatsapp/auto-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: lead.phone,
          message,
          leadId: lead.leadId
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('WhatsApp message sent!');
        fetchLeads();
        fetchFollowUps();
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending WhatsApp message');
    } finally {
      setLoading(false);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-orange-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysUntilFollowup = (followUpDate: string | null) => {
    if (!followUpDate) return null;
    const days = Math.ceil((new Date(followUpDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet>
        <title>Lead Follow-up | DPM Enterprise</title>
        <meta name="description" content="Lead follow-up dashboard for DPM Enterprise." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/lead-followup" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Follow-up System</h1>
          <p className="text-muted-foreground mt-2">WhatsApp automation & daily updates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.total}</div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-orange-500">{stats.pending}</div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-500">{stats.today}</div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Follow-ups</TabsTrigger>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="schedule">Schedule New</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Pending Follow-ups */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Follow-ups</CardTitle>
                <CardDescription>Leads requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads
                    .filter(lead => lead.followUpDate && new Date(lead.followUpDate) <= new Date())
                    .map(lead => {
                      const days = getDaysUntilFollowup(lead.followUpDate);
                      return (
                        <div key={lead.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{lead.name}</h3>
                                <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                                {lead.verified && <Badge variant="outline">✓ Verified</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{lead.company} • {lead.projectType}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  {lead.phone}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {lead.email}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={days && days < 0 ? 'destructive' : 'secondary'}>
                                {days && days < 0 ? `${Math.abs(days)} days overdue` : 'Due today'}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                const message = `Hi ${lead.name},\n\nThank you for your interest in DPM Enterprise!\n\nI wanted to follow up on your inquiry about ${lead.projectType}.\n\nWe specialize in corporate and residential interiors and have successfully completed 500+ projects.\n\nWould you like to schedule a consultation call this week?\n\nBest regards,\nDPM Enterprise Team`;
                                sendWhatsAppFollowup(lead, message);
                              }}
                              disabled={loading}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send WhatsApp
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                  {leads.filter(lead => lead.followUpDate && new Date(lead.followUpDate) <= new Date()).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p>No pending follow-ups! Great job! 🎉</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Leads */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Leads</CardTitle>
                <CardDescription>Complete lead database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leads.slice(0, 20).map(lead => (
                    <div key={lead.id} className="border rounded p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Lead: ${lead.name} — ${lead.phone}`)}>
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule New */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Follow-up</CardTitle>
                <CardDescription>Create new follow-up task</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Lead</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {leads.slice(0, 50).map(lead => (
                          <SelectItem key={lead.id} value={lead.leadId}>
                            {lead.name} - {lead.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Follow-up Date</label>
                    <Input type="date" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Enter follow-up message..."
                      rows={6}
                      defaultValue="Hi [Name],\n\nThank you for your interest in DPM Enterprise!\n\nI wanted to follow up on your inquiry about [Project Type].\n\nWe specialize in corporate and residential interiors and have successfully completed 500+ projects.\n\nWould you like to schedule a consultation call this week?\n\nBest regards,\nDPM Enterprise Team"
                    />
                  </div>

                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Follow-up History</CardTitle>
                <CardDescription>Past follow-up activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {followUps.slice(0, 20).map(followup => (
                    <div key={followup.id} className="border rounded p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {followup.type === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-500" />}
                        {followup.type === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                        {followup.type === 'call' && <Phone className="h-5 w-5 text-orange-500" />}
                        <div>
                          <p className="font-medium">{followup.leadId}</p>
                          <p className="text-sm text-muted-foreground">{followup.message.substring(0, 50)}...</p>
                        </div>
                      </div>
                      <Badge variant={followup.status === 'sent' ? 'default' : followup.status === 'pending' ? 'secondary' : 'destructive'}>
                        {followup.status}
                      </Badge>
                    </div>
                  ))}

                  {followUps.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                      <p>No follow-up history yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
