/**
 * AI Lead Intelligence Dashboard
 * Smart lead scoring, follow-up automation, conversion analytics
 */
import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Dashboard from '@/layouts/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Brain, Target, Users, TrendingUp, Flame, Snowflake, Thermometer,
  Phone, Mail, MessageCircle, Calendar, Clock,
  Loader2, RefreshCw, Sparkles, ChevronRight,
  Star, Search, BarChart3, Zap,
  IndianRupee, MapPin, Building2, Activity, Send, Eye,
  UserCheck, Bell,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  score: number | null;
  projectType: string | null;
  city: string | null;
  budget: string | null;
  notes: string | null;
  createdAt: string;
  lastContactedAt: string | null;
}

interface FollowUp {
  id: number;
  leadId: string;
  dealId: string | null;
  scheduledAt: string;
  type: string;
  notes: string | null;
  status: string;
}

// ─── Dashboard Config ─────────────────────────────────────────────────────────

const dashboardConfig = {
  sidebar: {
    logo: { text: 'DPM Enterprise', image: '/assets/logo.jpg', href: '/dashboard/director' },
    navigation: {
      main: [
        { title: 'Director Dashboard', href: '/dashboard/director', icon: BarChart3 },
        { title: 'AI Command Center', href: '/dashboard/ai-sales-marketing', icon: Brain },
        { title: 'Lead Intelligence', href: '/dashboard/ai-lead-intelligence', icon: Target, active: true },
        { title: 'Sales Pipeline', href: '/dashboard/sales-pipeline', icon: TrendingUp },
        { title: 'Leads Database', href: '/dashboard/leads', icon: Users },
        { title: 'Lead Verification', href: '/dashboard/lead-verification', icon: UserCheck },
        { title: 'Follow-up Manager', href: '/dashboard/lead-followup', icon: Calendar },
        { title: 'Marketing Hub', href: '/dashboard/marketing', icon: Zap },
        { title: 'WhatsApp Business', href: '/dashboard/whatsapp', icon: MessageCircle },
        { title: 'Finance Center', href: '/dashboard/finance', icon: IndianRupee },
        { title: 'Control Panel', href: '/dashboard/control-panel', icon: Activity },
      ],
    },
  },
  header: {
    user: { name: 'Director', email: 'director@dpmenterprise.in', initials: 'D' },
    notifications: { enabled: true, count: 3 },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AILeadIntelligence() {
  const [activeTab, setActiveTab] = useState('scoring');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoringLoading, setScoringLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiReply, setAiReply] = useState('');
  const [aiReplyLoading, setAiReplyLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // Follow-up form
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpType, setFollowUpType] = useState('call');
  const [followUpNotes, setFollowUpNotes] = useState('');

  useEffect(() => {
    loadLeads();
    loadFollowUps();
  }, []);

  useEffect(() => {
    let result = leads;
    if (statusFilter !== 'all') {
      result = result.filter(l => l.status?.toUpperCase() === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.city?.toLowerCase().includes(q)
      );
    }
    setFilteredLeads(result);
  }, [leads, statusFilter, searchQuery]);

  async function loadLeads() {
    setLoading(true);
    try {
      const res = await fetch('/api/leads/list?limit=50&sort=score&order=desc');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      toast.error('Leads load nahi hue');
    } finally {
      setLoading(false);
    }
  }

  async function loadFollowUps() {
    try {
      const res = await fetch('/api/sales/follow-ups/list');
      if (res.ok) {
        const data = await res.json();
        setFollowUps(data.followUps || []);
      }
    } catch {}
  }

  async function scoreAllLeads() {
    setScoringLoading(true);
    try {
      const res = await fetch('/api/leads/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scoreAll: true }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${data.scored || 0} leads score ho gaye!`);
        loadLeads();
      } else {
        toast.error(data.error || 'Scoring failed');
      }
    } catch {
      toast.error('AI scoring failed');
    } finally {
      setScoringLoading(false);
    }
  }

  async function generateAIReply(lead: Lead) {
    setSelectedLead(lead);
    setAiReply('');
    setAiReplyLoading(true);
    try {
      const res = await fetch('/api/ai/whatsapp-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadName: lead.name,
          projectType: lead.projectType || 'Interior Design',
          status: lead.status,
          lastMessage: 'Interested in your services',
        }),
      });
      const data = await res.json();
      if (data.reply || data.message) {
        setAiReply(data.reply || data.message);
      } else {
        setAiReply('Namaste! DPM Enterprise se follow-up kar rahe hain. Aapka project kab start karna hai?');
      }
    } catch {
      setAiReply('Namaste! DPM Enterprise se follow-up kar rahe hain. Aapka project kab start karna hai?');
    } finally {
      setAiReplyLoading(false);
    }
  }

  async function scheduleFollowUp() {
    if (!selectedLead || !followUpDate) {
      toast.error('Lead aur date select karo');
      return;
    }
    setScheduleLoading(true);
    try {
      const res = await fetch('/api/sales/follow-ups/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: selectedLead.id.toString(),
          scheduledAt: followUpDate,
          type: followUpType,
          notes: followUpNotes,
        }),
      });
      const data = await res.json();
      if (data.success || data.followUp) {
        toast.success('Follow-up schedule ho gaya!');
        setFollowUpDate('');
        setFollowUpNotes('');
        loadFollowUps();
      } else {
        toast.error(data.error || 'Schedule nahi hua');
      }
    } catch {
      toast.error('Follow-up schedule karne mein error');
    } finally {
      setScheduleLoading(false);
    }
  }

  async function convertToLead(leadId: number) {
    try {
      const res = await fetch('/api/sales/convert-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: leadId.toString() }),
      });
      const data = await res.json();
      if (data.success || data.deal) {
        toast.success('Lead ko deal mein convert kar diya!');
      } else {
        toast.error(data.error || 'Convert nahi hua');
      }
    } catch {
      toast.error('Convert karne mein error');
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'HOT') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'WARM') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'HOT') return <Flame className="h-3.5 w-3.5 text-red-500" />;
    if (s === 'WARM') return <Thermometer className="h-3.5 w-3.5 text-orange-500" />;
    return <Snowflake className="h-3.5 w-3.5 text-blue-500" />;
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-red-600 font-bold';
    if (score >= 60) return 'text-orange-600 font-bold';
    if (score >= 40) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const hotLeads = leads.filter(l => l.status?.toUpperCase() === 'HOT');
  const warmLeads = leads.filter(l => l.status?.toUpperCase() === 'WARM');
  const coldLeads = leads.filter(l => l.status?.toUpperCase() === 'COLD');

  const todayFollowUps = followUps.filter(f => {
    const d = new Date(f.scheduledAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Dashboard config={dashboardConfig}>
      <Helmet><meta name="robots" content="noindex,nofollow" /><title>AI Lead Intelligence | DPM Enterprise</title><meta name="description" content="AI Lead Intelligence dashboard." /><link rel="canonical" href="https://www.dpmenterprise.in/dashboard/ai-lead-intelligence" /></Helmet>
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="h-7 w-7 text-orange-600" />
              AI Lead Intelligence
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Smart scoring, follow-up automation, aur conversion analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadLeads} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={scoreAllLeads}
              disabled={scoringLoading}
              className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {scoringLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              AI Score All
            </Button>
          </div>
        </div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: leads.length.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'HOT Leads', value: hotLeads.length.toString(), icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'WARM Leads', value: warmLeads.length.toString(), icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: "Today's Follow-ups", value: todayFollowUps.length.toString(), icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(kpi => (
            <Card key={kpi.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg ${kpi.bg} mb-3`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{loading ? '...' : kpi.value}</div>
                <div className="text-sm text-gray-500">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-1 bg-gray-100 p-1">
            <TabsTrigger value="scoring" className="text-xs gap-1">
              <Brain className="h-3.5 w-3.5" />AI Scoring
            </TabsTrigger>
            <TabsTrigger value="followup" className="text-xs gap-1">
              <Calendar className="h-3.5 w-3.5" />Follow-ups
            </TabsTrigger>
            <TabsTrigger value="detail" className="text-xs gap-1">
              <Eye className="h-3.5 w-3.5" />Lead Detail
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs gap-1">
              <BarChart3 className="h-3.5 w-3.5" />Analytics
            </TabsTrigger>
          </TabsList>

          {/* ═══ SCORING TAB ═══ */}
          <TabsContent value="scoring" className="space-y-4 mt-4">

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, city..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="HOT">HOT Only</SelectItem>
                  <SelectItem value="WARM">WARM Only</SelectItem>
                  <SelectItem value="COLD">COLD Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lead Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Koi lead nahi mila</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredLeads.slice(0, 30).map(lead => (
                  <Card
                    key={lead.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                      lead.status?.toUpperCase() === 'HOT' ? 'border-l-red-500' :
                      lead.status?.toUpperCase() === 'WARM' ? 'border-l-orange-500' : 'border-l-blue-400'
                    }`}
                    onClick={() => { setSelectedLead(lead); setActiveTab('detail'); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {lead.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900 leading-tight">{lead.name}</div>
                            <div className="text-xs text-gray-400">{lead.source || 'Unknown'}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(lead.status)}
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-3">
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.city && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {lead.city}
                          </div>
                        )}
                        {lead.projectType && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            {lead.projectType}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500" />
                          <span className={`text-sm ${getScoreColor(lead.score)}`}>
                            {lead.score ?? 'N/A'}
                          </span>
                          <span className="text-xs text-gray-400">/ 100</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-green-600 hover:bg-green-50"
                            onClick={e => { e.stopPropagation(); generateAIReply(lead); setActiveTab('detail'); }}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />AI Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50"
                            onClick={e => { e.stopPropagation(); convertToLead(lead.id); }}
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />Convert
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══ FOLLOW-UP TAB ═══ */}
          <TabsContent value="followup" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Schedule Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Schedule Follow-up
                  </CardTitle>
                  <CardDescription>
                    {selectedLead ? `Lead: ${selectedLead.name}` : 'Pehle lead select karo (Scoring tab se)'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedLead ? (
                    <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold">
                        {selectedLead.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{selectedLead.name}</div>
                        <div className="text-xs text-gray-500">{selectedLead.phone} · {selectedLead.status}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center text-sm text-gray-400">
                      Scoring tab se koi lead click karo
                    </div>
                  )}

                  <div>
                    <Label>Follow-up Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={followUpDate}
                      onChange={e => setFollowUpDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={followUpType} onValueChange={setFollowUpType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="site_visit">Site Visit</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      placeholder="Follow-up ke baare mein notes..."
                      value={followUpNotes}
                      onChange={e => setFollowUpNotes(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={scheduleFollowUp}
                    disabled={scheduleLoading || !selectedLead}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {scheduleLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Scheduling...</>
                    ) : (
                      <><Calendar className="h-4 w-4 mr-2" />Schedule Follow-up</>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Follow-ups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Upcoming Follow-ups
                    {todayFollowUps.length > 0 && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                        {todayFollowUps.length} Today
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {followUps.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">Koi follow-up schedule nahi hai</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {followUps.slice(0, 15).map(fu => {
                        const d = new Date(fu.scheduledAt);
                        const isToday = d.toDateString() === new Date().toDateString();
                        const isPast = d < new Date();
                        return (
                          <div
                            key={fu.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${
                              isToday ? 'bg-yellow-50 border-yellow-200' :
                              isPast ? 'bg-red-50 border-red-200' : 'bg-white'
                            }`}
                          >
                            <div className={`p-1.5 rounded-full flex-shrink-0 ${
                              fu.type === 'call' ? 'bg-green-100' :
                              fu.type === 'whatsapp' ? 'bg-emerald-100' :
                              fu.type === 'email' ? 'bg-blue-100' : 'bg-purple-100'
                            }`}>
                              {fu.type === 'call' ? <Phone className="h-3.5 w-3.5 text-green-600" /> :
                               fu.type === 'whatsapp' ? <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> :
                               fu.type === 'email' ? <Mail className="h-3.5 w-3.5 text-blue-600" /> :
                               <Calendar className="h-3.5 w-3.5 text-purple-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-800">
                                Lead #{fu.leadId}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Clock className="h-3 w-3" />
                                {d.toLocaleDateString('en-IN')} {d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              {fu.notes && <div className="text-xs text-gray-400 mt-0.5 truncate">{fu.notes}</div>}
                            </div>
                            <div className="flex-shrink-0">
                              {isToday && <Badge className="text-xs bg-yellow-100 text-yellow-700 border-yellow-200">Today</Badge>}
                              {isPast && !isToday && <Badge className="text-xs bg-red-100 text-red-700 border-red-200">Overdue</Badge>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══ LEAD DETAIL TAB ═══ */}
          <TabsContent value="detail" className="space-y-4 mt-4">
            {!selectedLead ? (
              <div className="text-center py-20 text-gray-400">
                <Eye className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Scoring tab se koi lead select karo</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setActiveTab('scoring')}
                >
                  Leads Dekho
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Lead Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                          {selectedLead.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div>{selectedLead.name}</div>
                          <div className="text-sm font-normal text-gray-500">Lead #{selectedLead.id}</div>
                        </div>
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedLead.status)}
                        <span className={`text-sm px-2 py-1 rounded-full border font-medium ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Score Bar */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">AI Score</span>
                        <span className={`text-lg font-bold ${getScoreColor(selectedLead.score)}`}>
                          {selectedLead.score ?? 'N/A'} / 100
                        </span>
                      </div>
                      <Progress value={selectedLead.score ?? 0} className="h-2" />
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      {[
                        { icon: Phone, label: 'Phone', value: selectedLead.phone },
                        { icon: Mail, label: 'Email', value: selectedLead.email },
                        { icon: MapPin, label: 'City', value: selectedLead.city },
                        { icon: Building2, label: 'Project', value: selectedLead.projectType },
                        { icon: IndianRupee, label: 'Budget', value: selectedLead.budget },
                        { icon: Activity, label: 'Source', value: selectedLead.source },
                      ].filter(d => d.value).map(d => (
                        <div key={d.label} className="flex items-center gap-3">
                          <d.icon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-500 w-14 flex-shrink-0">{d.label}</span>
                          <span className="text-sm text-gray-800">{d.value}</span>
                        </div>
                      ))}
                    </div>

                    {selectedLead.notes && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{selectedLead.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {selectedLead.phone && (
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm hover:bg-green-100 transition-colors"
                        >
                          <Phone className="h-4 w-4" />Call
                        </a>
                      )}
                      {selectedLead.phone && (
                        <a
                          href={`https://wa.me/91${selectedLead.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />WhatsApp
                        </a>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        onClick={() => setActiveTab('followup')}
                      >
                        <Calendar className="h-4 w-4 mr-1" />Follow-up
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => convertToLead(selectedLead.id)}
                      >
                        <TrendingUp className="h-4 w-4 mr-1" />Convert
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Reply Generator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      AI Reply Generator
                    </CardTitle>
                    <CardDescription>Is lead ke liye personalized message banao</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={() => generateAIReply(selectedLead)}
                      disabled={aiReplyLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      {aiReplyLoading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />AI likh raha hai...</>
                      ) : (
                        <><Sparkles className="h-4 w-4 mr-2" />Generate AI Reply</>
                      )}
                    </Button>

                    {aiReply && (
                      <div className="space-y-2">
                        <Label>Generated Message</Label>
                        <Textarea
                          value={aiReply}
                          onChange={e => setAiReply(e.target.value)}
                          rows={6}
                          className="text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => { navigator.clipboard.writeText(aiReply); toast.success('Copied!'); }}
                          >
                            Copy Message
                          </Button>
                          {selectedLead.phone && (
                            <a
                              href={`https://wa.me/91${selectedLead.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(aiReply)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                <Send className="h-3.5 w-3.5 mr-1" />Send WhatsApp
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Reply Templates */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block">Quick Templates</Label>
                      <div className="space-y-2">
                        {[
                          { label: 'Initial Contact', msg: `Namaste ${selectedLead.name}! DPM Enterprise se contact kar rahe hain. Aapka ${selectedLead.projectType || 'project'} ke baare mein baat karni thi. Kya aap available hain?` },
                          { label: 'Follow-up', msg: `Namaste ${selectedLead.name}! Pichle baar baat hui thi. Kya aapne koi decision liya? Hum free site visit de sakte hain.` },
                          { label: 'Offer', msg: `Namaste ${selectedLead.name}! DPM Enterprise ki taraf se special offer — is mahine 15% discount on all interior projects. Limited time!` },
                        ].map(t => (
                          <button
                            key={t.label}
                            onClick={() => setAiReply(t.msg)}
                            className="w-full text-left text-xs p-2 rounded border border-gray-200 hover:bg-gray-50 text-gray-700"
                          >
                            <span className="font-semibold text-purple-700">[{t.label}]</span> {t.msg.substring(0, 70)}...
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* ═══ ANALYTICS TAB ═══ */}
          <TabsContent value="analytics" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Lead Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Lead Temperature Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'HOT Leads', count: hotLeads.length, total: leads.length, icon: Flame, color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-500' },
                    { label: 'WARM Leads', count: warmLeads.length, total: leads.length, icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50', bar: 'bg-orange-500' },
                    { label: 'COLD Leads', count: coldLeads.length, total: leads.length, icon: Snowflake, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500' },
                  ].map(item => {
                    const pct = item.total > 0 ? Math.round((item.count / item.total) * 100) : 0;
                    return (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded ${item.bg}`}>
                              <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                            </div>
                            <span className="text-sm text-gray-700">{item.label}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-gray-900">{item.count.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                          </div>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.bar} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Source Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Lead Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const sourceCounts: Record<string, number> = {};
                    leads.forEach(l => {
                      const src = l.source || 'Unknown';
                      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
                    });
                    const sorted = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
                    const total = leads.length || 1;
                    return (
                      <div className="space-y-3">
                        {sorted.map(([src, count]) => {
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={src} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-700 truncate">{src}</span>
                                <span className="font-medium text-gray-900 ml-2">{count} ({pct}%)</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                        {sorted.length === 0 && (
                          <div className="text-center py-8 text-gray-400 text-sm">Data load ho raha hai...</div>
                        )}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const buckets = [
                      { label: '80-100 (Excellent)', min: 80, max: 100, color: 'bg-red-500' },
                      { label: '60-79 (Good)', min: 60, max: 79, color: 'bg-orange-500' },
                      { label: '40-59 (Average)', min: 40, max: 59, color: 'bg-yellow-500' },
                      { label: '0-39 (Low)', min: 0, max: 39, color: 'bg-blue-400' },
                    ];
                    const total = leads.filter(l => l.score !== null).length || 1;
                    return (
                      <div className="space-y-3">
                        {buckets.map(b => {
                          const count = leads.filter(l => l.score !== null && l.score >= b.min && l.score <= b.max).length;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={b.label} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-700">{b.label}</span>
                                <span className="font-medium text-gray-900">{count} ({pct}%)</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: 'Sales Pipeline', href: '/dashboard/sales-pipeline', icon: TrendingUp, color: 'text-green-600' },
                    { label: 'Lead Verification', href: '/dashboard/lead-verification', icon: UserCheck, color: 'text-blue-600' },
                    { label: 'Follow-up Manager', href: '/dashboard/lead-followup', icon: Calendar, color: 'text-purple-600' },
                    { label: 'Master Sheet', href: '/dashboard/master-sheet', icon: BarChart3, color: 'text-orange-600' },
                    { label: 'AI Command Center', href: '/dashboard/ai-sales-marketing', icon: Brain, color: 'text-pink-600' },
                    { label: 'WhatsApp Business', href: '/dashboard/whatsapp', icon: MessageCircle, color: 'text-emerald-600' },
                  ].map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <link.icon className={`h-4 w-4 ${link.color}`} />
                        <span className="text-sm font-medium text-gray-700">{link.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}
