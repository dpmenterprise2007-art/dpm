/**
 * AI Sales & Marketing Command Center
 * Complete AI-powered hub for DPM Enterprise
 * Covers: Lead Gen, Social Media, Email, WhatsApp, Sales Pipeline, Analytics
 */
import { useState, useEffect, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Dashboard from '@/layouts/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Brain, Zap, TrendingUp, Users, MessageCircle, Mail, Phone,
  Send, Target, BarChart3, Sparkles, RefreshCw, Loader2,
  CheckCircle2, Settings, 
  Instagram, Facebook, Linkedin, Youtube, Globe,
  ArrowUpRight, ArrowDownRight, IndianRupee, Clock, Eye,
  MousePointerClick, Share2, PenTool, Megaphone, Activity,
  ChevronRight, Flame, Snowflake, Thermometer, Copy,
  Calendar, Award, Layers,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  totalDeals: number;
  totalDealValue: number;
  wonDeals: number;
  conversionRate: number;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  score: number;
  projectType: string;
  city: string;
  createdAt: string;
}

interface Deal {
  id: number;
  dealId: string;
  title: string;
  clientName: string;
  stage: string;
  estimatedValue: string;
  probability: number | null;
  projectType: string;
}

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string;
  bestTime: string;
}

// ─── Dashboard Config ─────────────────────────────────────────────────────────

const dashboardConfig = {
  sidebar: {
    logo: { text: 'DPM Enterprise', image: '/assets/logo.jpg', href: '/dashboard/director' },
    navigation: {
      main: [
        { title: 'Director Dashboard', href: '/dashboard/director', icon: BarChart3 },
        { title: 'AI Command Center', href: '/dashboard/ai-sales-marketing', icon: Brain, active: true },
        { title: 'Lead Intelligence', href: '/dashboard/ai-lead-intelligence', icon: Target },
        { title: 'Sales Pipeline', href: '/dashboard/sales-pipeline', icon: TrendingUp },
        { title: 'Marketing Hub', href: '/dashboard/marketing', icon: Megaphone },
        { title: 'WhatsApp Business', href: '/dashboard/whatsapp', icon: MessageCircle },
        { title: 'GeM Portal', href: '/dashboard/gem-portal', icon: Award },
        { title: 'Finance Center', href: '/dashboard/finance', icon: IndianRupee },
        { title: 'Leads Database', href: '/dashboard/leads', icon: Users },
        { title: 'Master Sheet', href: '/dashboard/master-sheet', icon: Layers },
        { title: 'AI Automation', href: '/dashboard/ai-automation', icon: Zap },
        { title: 'Control Panel', href: '/dashboard/control-panel', icon: Settings },
      ],
    },
  },
  header: {
    user: { name: 'Director', email: 'director@dpmenterprise.in', initials: 'D' },
    notifications: { enabled: true, count: 5 },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AISalesMarketing() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  // Social Media AI
  const [socialTopic, setSocialTopic] = useState('');
  const [socialPlatform, setSocialPlatform] = useState('all');
  const [generatedPosts, setGeneratedPosts] = useState<SocialPost[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);

  // Email Campaign AI
  const [emailSubject, setEmailSubject] = useState('');
  const [emailAudience, setEmailAudience] = useState('all');
  const [emailTemplate, setEmailTemplate] = useState('promotional');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // WhatsApp Broadcast
  const [waMessage, setWaMessage] = useState('');
  const [waAudience, setWaAudience] = useState('hot');
  const [waLoading, setWaLoading] = useState(false);

  // AI Lead Generation
  const [leadGenLoading, setLeadGenLoading] = useState(false);
  const [leadGenResult, setLeadGenResult] = useState<any>(null);

  // AI Chat
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Namaste! Main DPM Enterprise ka AI Sales Assistant hoon. Aap kaise help kar sakta hoon? Leads, deals, marketing — sab ke baare mein poochh sakte hain.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadStats();
    loadLeads();
    loadDeals();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  async function loadStats() {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // use fallback
    } finally {
      setStatsLoading(false);
    }
  }

  async function loadLeads() {
    try {
      const res = await fetch('/api/leads/list?limit=10&sort=createdAt&order=desc');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {}
  }

  async function loadDeals() {
    try {
      const res = await fetch('/api/sales/deals/list');
      if (res.ok) {
        const data = await res.json();
        setDeals(data.deals || []);
      }
    } catch {}
  }

  // ── AI Social Post Generator ──────────────────────────────────────────────

  async function generateSocialPosts() {
    if (!socialTopic.trim()) {
      toast.error('Topic daalo pehle!');
      return;
    }
    setSocialLoading(true);
    setGeneratedPosts([]);
    try {
      const res = await fetch('/api/ai/generate-social-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: socialTopic, platform: socialPlatform, brand: 'DPM Enterprise' }),
      });
      const data = await res.json();
      if (data.posts) {
        setGeneratedPosts(data.posts);
        toast.success('AI ne posts generate kar diye!');
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch {
      toast.error('AI se connect nahi ho paya');
    } finally {
      setSocialLoading(false);
    }
  }

  async function publishPost(post: SocialPost) {
    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: post.platform, content: post.content + '\n\n' + post.hashtags }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${post.platform} par publish ho gaya!`);
      } else {
        toast.error(data.error || 'Publish nahi hua');
      }
    } catch {
      toast.error('Publish karne mein error');
    }
  }

  // ── Email Campaign ────────────────────────────────────────────────────────

  async function sendEmailCampaign() {
    if (!emailSubject.trim()) {
      toast.error('Subject daalo!');
      return;
    }
    setEmailLoading(true);
    try {
      const res = await fetch('/api/email/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: emailSubject,
          audience: emailAudience,
          template: emailTemplate,
          senderName: 'DPM Enterprise',
          senderEmail: 'info@dpmenterprise.in',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
        toast.success(`Email campaign send ho gaya! ${data.sent || ''} emails bheje gaye.`);
      } else {
        toast.error(data.error || 'Campaign send nahi hua');
      }
    } catch {
      toast.error('Email service se connect nahi ho paya');
    } finally {
      setEmailLoading(false);
    }
  }

  // ── WhatsApp Broadcast ────────────────────────────────────────────────────

  async function sendWhatsAppBroadcast() {
    if (!waMessage.trim()) {
      toast.error('Message likho pehle!');
      return;
    }
    setWaLoading(true);
    try {
      const res = await fetch('/api/whatsapp/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: waMessage, audience: waAudience }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`WhatsApp broadcast bheja! ${data.sent || 0} contacts ko.`);
        setWaMessage('');
      } else {
        toast.error(data.error || 'Broadcast nahi hua');
      }
    } catch {
      toast.error('WhatsApp se connect nahi ho paya');
    } finally {
      setWaLoading(false);
    }
  }

  // ── AI Lead Generation ────────────────────────────────────────────────────

  async function runAILeadGen() {
    setLeadGenLoading(true);
    setLeadGenResult(null);
    try {
      const res = await fetch('/api/ai/generate-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 10, city: 'Delhi NCR', projectType: 'Interior Design' }),
      });
      const data = await res.json();
      if (data.leads || data.generated) {
        setLeadGenResult(data);
        toast.success(`AI ne ${data.generated || data.leads?.length || 0} leads generate kiye!`);
        loadLeads();
      } else {
        toast.error(data.error || 'Lead generation failed');
      }
    } catch {
      toast.error('AI se connect nahi ho paya');
    } finally {
      setLeadGenLoading(false);
    }
  }

  // ── AI Chat ───────────────────────────────────────────────────────────────

  async function sendChatMessage() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: 'sales_marketing' }),
      });
      const data = await res.json();
      if (data.reply || data.message) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.message }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Maafi chahta hoon, abhi AI key configure nahi hai. OpenAI API key save karein.' }]);
      }
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  }

  // ── Score Lead ────────────────────────────────────────────────────────────

  async function scoreAllLeads() {
    setIsLoading(true);
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
      }
    } catch {
      toast.error('Scoring failed');
    } finally {
      setIsLoading(false);
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  const getStatusColor = (status: string) => {
    if (status === 'HOT') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'WARM') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Lead': 'bg-gray-100 text-gray-700',
      'Qualified': 'bg-blue-100 text-blue-700',
      'Proposal': 'bg-yellow-100 text-yellow-700',
      'Negotiation': 'bg-orange-100 text-orange-700',
      'Won': 'bg-green-100 text-green-700',
      'Lost': 'bg-red-100 text-red-700',
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (val: string | number) => {
    const n = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(n)) return '₹0';
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };

  const platformIcon = (platform: string) => {
    if (platform === 'instagram') return <Instagram className="h-4 w-4 text-pink-500" />;
    if (platform === 'facebook') return <Facebook className="h-4 w-4 text-blue-600" />;
    if (platform === 'linkedin') return <Linkedin className="h-4 w-4 text-blue-700" />;
    if (platform === 'youtube') return <Youtube className="h-4 w-4 text-red-600" />;
    return <Globe className="h-4 w-4 text-gray-500" />;
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Dashboard config={dashboardConfig}>
      <Helmet><meta name="robots" content="noindex,nofollow" /><title>AI Sales & Marketing | DPM Enterprise</title><meta name="description" content="AI Sales and Marketing dashboard." /><link rel="canonical" href="https://www.dpmenterprise.in/dashboard/ai-sales-marketing" /></Helmet>
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-7 w-7 text-purple-600" />
              AI Sales & Marketing Command Center
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Poora business ek jagah — AI-powered leads, marketing, sales, aur automation
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadStats} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Sparkles className="h-4 w-4" />
              AI Auto-Run
            </Button>
          </div>
        </div>

        {/* ── KPI Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Leads',
              value: statsLoading ? '...' : (stats?.totalLeads ?? leads.length ?? 0).toLocaleString(),
              icon: Users,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              sub: `${stats?.hotLeads ?? 0} HOT`,
              trend: '+12%',
              up: true,
            },
            {
              label: 'Active Deals',
              value: statsLoading ? '...' : (stats?.totalDeals ?? deals.length ?? 0).toString(),
              icon: Target,
              color: 'text-green-600',
              bg: 'bg-green-50',
              sub: `${stats?.wonDeals ?? 0} Won`,
              trend: '+8%',
              up: true,
            },
            {
              label: 'Pipeline Value',
              value: statsLoading ? '...' : formatCurrency(stats?.totalDealValue ?? 0),
              icon: IndianRupee,
              color: 'text-yellow-600',
              bg: 'bg-yellow-50',
              sub: 'This Month',
              trend: '+23%',
              up: true,
            },
            {
              label: 'Conversion Rate',
              value: statsLoading ? '...' : `${stats?.conversionRate ?? 0}%`,
              icon: TrendingUp,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
              sub: 'Lead → Deal',
              trend: '+5%',
              up: true,
            },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                    {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.trend}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className="text-sm text-gray-500">{kpi.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{kpi.sub}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Main Tabs ── */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto gap-1 bg-gray-100 p-1">
            <TabsTrigger value="overview" className="text-xs gap-1">
              <Activity className="h-3.5 w-3.5" />Overview
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs gap-1">
              <Share2 className="h-3.5 w-3.5" />Social AI
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs gap-1">
              <Mail className="h-3.5 w-3.5" />Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="text-xs gap-1">
              <MessageCircle className="h-3.5 w-3.5" />WhatsApp
            </TabsTrigger>
            <TabsTrigger value="leads" className="text-xs gap-1">
              <Target className="h-3.5 w-3.5" />Leads AI
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs gap-1">
              <Brain className="h-3.5 w-3.5" />AI Chat
            </TabsTrigger>
          </TabsList>

          {/* ═══ OVERVIEW TAB ═══ */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Recent Leads */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Recent Leads
                    </CardTitle>
                    <a href="/dashboard/leads" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      Sab dekho <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {leads.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      Koi lead nahi mila
                    </div>
                  ) : (
                    <div className="divide-y">
                      {leads.slice(0, 6).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {lead.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{lead.name}</div>
                              <div className="text-xs text-gray-400 truncate">{lead.city || lead.source}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">{lead.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Active Deals */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      Active Deals
                    </CardTitle>
                    <a href="/dashboard/sales-pipeline" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      Pipeline dekho <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {deals.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      <Target className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      Koi deal nahi
                    </div>
                  ) : (
                    <div className="divide-y">
                      {deals.slice(0, 6).map((deal) => (
                        <div key={deal.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{deal.title}</div>
                            <div className="text-xs text-gray-400">{deal.clientName}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStageColor(deal.stage)}`}>
                              {deal.stage}
                            </span>
                            <span className="text-xs font-bold text-gray-700">
                              {formatCurrency(deal.estimatedValue)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Quick AI Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Generate Social Posts', icon: Share2, color: 'from-pink-500 to-purple-500', tab: 'social' },
                    { label: 'Send Email Campaign', icon: Mail, color: 'from-blue-500 to-cyan-500', tab: 'email' },
                    { label: 'WhatsApp Broadcast', icon: MessageCircle, color: 'from-green-500 to-emerald-500', tab: 'whatsapp' },
                    { label: 'AI Lead Scoring', icon: Target, color: 'from-orange-500 to-red-500', tab: 'leads' },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setActiveTab(action.tab)}
                      className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-4 text-left hover:opacity-90 transition-opacity`}
                    >
                      <action.icon className="h-6 w-6 mb-2" />
                      <div className="text-sm font-semibold">{action.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Automation Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  AI Automation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Lead Auto-Scoring', status: 'active', runs: 'Har ghante', icon: Target, color: 'text-green-600', bg: 'bg-green-50' },
                    { name: 'WhatsApp Auto-Reply', status: 'active', runs: 'Real-time', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { name: 'Social Auto-Post', status: 'inactive', runs: 'Daily 9am', icon: Share2, color: 'text-gray-400', bg: 'bg-gray-50' },
                    { name: 'Email Follow-up', status: 'active', runs: 'Har 6 ghante', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { name: 'Lead Generation', status: 'active', runs: 'Daily midnight', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { name: 'Deal Follow-up', status: 'inactive', runs: 'Weekly', icon: TrendingUp, color: 'text-gray-400', bg: 'bg-gray-50' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border bg-white">
                      <div className={`p-2 rounded-lg ${item.bg}`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.runs}</div>
                      </div>
                      <div className={`h-2 w-2 rounded-full flex-shrink-0 ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══ SOCIAL AI TAB ═══ */}
          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    AI Social Post Generator
                  </CardTitle>
                  <CardDescription>GPT se professional posts banao — Hindi + English</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Topic / Campaign</Label>
                    <Input
                      placeholder="e.g. Diwali offer, New project launch, Interior tips..."
                      value={socialTopic}
                      onChange={e => setSocialTopic(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Platform</Label>
                    <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* DPM Templates */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-2 block">Quick Templates</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Interior Design Tips', 'Project Showcase', 'Client Testimonial', 'Festival Offer', 'GeM Tender Win'].map(t => (
                        <button
                          key={t}
                          onClick={() => setSocialTopic(t)}
                          className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={generateSocialPosts}
                    disabled={socialLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    {socialLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />AI Generate kar raha hai...</>
                    ) : (
                      <><Sparkles className="h-4 w-4 mr-2" />Generate Posts</>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-blue-600" />
                    Generated Posts
                  </CardTitle>
                  <CardDescription>
                    {generatedPosts.length > 0 ? `${generatedPosts.length} posts ready to publish` : 'Posts yahan dikhenge'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedPosts.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <Share2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">Topic daalo aur Generate karo</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {generatedPosts.map((post, i) => (
                        <div key={i} className="border rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {platformIcon(post.platform)}
                              <span className="text-xs font-semibold capitalize text-gray-700">{post.platform}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => { navigator.clipboard.writeText(post.content); toast.success('Copied!'); }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => publishPost(post)}
                              >
                                <Send className="h-3 w-3 mr-1" />Publish
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 line-clamp-3">{post.content}</p>
                          {post.hashtags && (
                            <p className="text-xs text-blue-500 mt-1 truncate">{post.hashtags}</p>
                          )}
                          {post.bestTime && (
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />Best time: {post.bestTime}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Social Platform Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">DPM Enterprise Social Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', url: 'https://instagram.com/dpmenterprise', followers: '2.1K' },
                    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', url: 'https://facebook.com/dpmenterprise', followers: '3.4K' },
                    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800', url: 'https://linkedin.com/company/dpmenterprise', followers: '1.2K' },
                    { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', url: 'https://youtube.com/@dpmenterprise', followers: '890' },
                  ].map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-gradient-to-br ${p.color} text-white rounded-xl p-4 hover:opacity-90 transition-opacity`}
                    >
                      <p.icon className="h-6 w-6 mb-2" />
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs opacity-80">{p.followers} followers</div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══ EMAIL TAB ═══ */}
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email Campaign
                  </CardTitle>
                  <CardDescription>Database ke leads ko targeted emails bhejo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Campaign Subject</Label>
                    <Input
                      placeholder="e.g. DPM Enterprise - Exclusive Diwali Offer 2025"
                      value={emailSubject}
                      onChange={e => setEmailSubject(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Audience</Label>
                      <Select value={emailAudience} onValueChange={setEmailAudience}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Leads</SelectItem>
                          <SelectItem value="hot">HOT Leads Only</SelectItem>
                          <SelectItem value="warm">WARM Leads</SelectItem>
                          <SelectItem value="new">New Leads (7 days)</SelectItem>
                          <SelectItem value="uncontacted">Uncontacted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Template</Label>
                      <Select value={emailTemplate} onValueChange={setEmailTemplate}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="followup">Follow-up</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="welcome">Welcome</SelectItem>
                          <SelectItem value="project_showcase">Project Showcase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Quick Subject Templates */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-2 block">Quick Subjects</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Transform Your Space with DPM',
                        'Exclusive Interior Design Offer',
                        'Your Dream Home Awaits',
                        'GeM Registered Contractor',
                      ].map(s => (
                        <button
                          key={s}
                          onClick={() => setEmailSubject(s)}
                          className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {emailSent && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Campaign successfully bheja gaya!
                    </div>
                  )}

                  <Button
                    onClick={sendEmailCampaign}
                    disabled={emailLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {emailLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />Send Email Campaign</>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Email Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Total Sent', value: '1,247', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Open Rate', value: '34.2%', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Click Rate', value: '8.7%', icon: MousePointerClick, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Conversions', value: '23', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{stat.label}</span>
                          <span className="font-bold text-gray-900">{stat.value}</span>
                        </div>
                        <Progress value={Math.random() * 80 + 10} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-2">Recent Campaigns</p>
                    {['Diwali Offer 2024', 'New Year Greetings', 'Project Launch'].map(c => (
                      <div key={c} className="flex items-center justify-between py-1.5 text-sm">
                        <span className="text-gray-700">{c}</span>
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200">Sent</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══ WHATSAPP TAB ═══ */}
          <TabsContent value="whatsapp" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    WhatsApp Broadcast
                  </CardTitle>
                  <CardDescription>Leads ko bulk WhatsApp message bhejo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Audience</Label>
                    <Select value={waAudience} onValueChange={setWaAudience}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot">HOT Leads</SelectItem>
                        <SelectItem value="warm">WARM Leads</SelectItem>
                        <SelectItem value="all">All Leads</SelectItem>
                        <SelectItem value="new">New Leads (7 days)</SelectItem>
                        <SelectItem value="uncontacted">Uncontacted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Namaste! DPM Enterprise ki taraf se special offer..."
                      value={waMessage}
                      onChange={e => setWaMessage(e.target.value)}
                      rows={5}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-400 mt-1">{waMessage.length}/1000 characters</p>
                  </div>

                  {/* Message Templates */}
                  <div>
                    <Label className="text-xs text-gray-500 mb-2 block">Quick Templates</Label>
                    <div className="space-y-2">
                      {[
                        { label: 'Follow-up', msg: 'Namaste! DPM Enterprise se follow-up kar rahe hain. Aapka interior design project kab start karna hai? Hum free consultation dete hain. Call: +91-XXXXXXXXXX' },
                        { label: 'Offer', msg: 'Special Offer! DPM Enterprise - 20% discount on all interior projects this month. Limited slots available. Book now: +91-XXXXXXXXXX' },
                        { label: 'New Project', msg: 'DPM Enterprise ne ek aur beautiful project complete kiya! Aap bhi apna dream home banwao. Free site visit ke liye call karein.' },
                      ].map(t => (
                        <button
                          key={t.label}
                          onClick={() => setWaMessage(t.msg)}
                          className="w-full text-left text-xs p-2 rounded border border-gray-200 hover:bg-gray-50 text-gray-700"
                        >
                          <span className="font-semibold text-green-700">[{t.label}]</span> {t.msg.substring(0, 60)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={sendWhatsAppBroadcast}
                    disabled={waLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {waLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />Send Broadcast</>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp Stats & Links */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">WhatsApp Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: 'Messages Sent', value: '3,421', color: 'text-green-600' },
                      { label: 'Delivered', value: '3,389 (99%)', color: 'text-blue-600' },
                      { label: 'Read', value: '2,156 (63%)', color: 'text-purple-600' },
                      { label: 'Replies', value: '487 (14%)', color: 'text-orange-600' },
                    ].map(s => (
                      <div key={s.label} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{s.label}</span>
                        <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <a href="/dashboard/whatsapp" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">WhatsApp Dashboard</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                    <a
                      href="https://wa.me/919XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Open WhatsApp Business</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ═══ LEADS AI TAB ═══ */}
          <TabsContent value="leads" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* AI Lead Generation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-orange-600" />
                    AI Lead Generation
                  </CardTitle>
                  <CardDescription>GPT se naye potential leads generate karo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800 font-medium">AI Lead Generator</p>
                    <p className="text-xs text-orange-600 mt-1">
                      GPT Delhi NCR ke interior design prospects generate karega aur database mein save karega.
                    </p>
                  </div>

                  {leadGenResult && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        {leadGenResult.generated || leadGenResult.leads?.length || 0} leads generate hue!
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={runAILeadGen}
                    disabled={leadGenLoading}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {leadGenLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />AI Generate kar raha hai...</>
                    ) : (
                      <><Brain className="h-4 w-4 mr-2" />Generate 10 New Leads</>
                    )}
                  </Button>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">AI Lead Scoring</p>
                    <p className="text-xs text-gray-500 mb-3">
                      Existing leads ko AI se score karo — HOT/WARM/COLD classify hoga
                    </p>
                    <Button
                      onClick={scoreAllLeads}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      {isLoading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Scoring...</>
                      ) : (
                        <><Target className="h-4 w-4 mr-2" />Score All Leads</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Temperature Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Lead Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Temperature */}
                  <div className="space-y-3">
                    {[
                      { label: 'HOT Leads', count: stats?.hotLeads ?? 0, total: stats?.totalLeads ?? 1, icon: Flame, color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-500' },
                      { label: 'WARM Leads', count: stats?.warmLeads ?? 0, total: stats?.totalLeads ?? 1, icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50', bar: 'bg-orange-500' },
                      { label: 'COLD Leads', count: stats?.coldLeads ?? 0, total: stats?.totalLeads ?? 1, icon: Snowflake, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500' },
                    ].map(item => {
                      const pct = item.total > 0 ? Math.round((item.count / item.total) * 100) : 0;
                      return (
                        <div key={item.label} className="space-y-1">
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
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <a href="/dashboard/ai-lead-intelligence" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">AI Lead Intelligence</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                    <a href="/dashboard/lead-verification" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Lead Verification</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                    <a href="/dashboard/lead-followup" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Follow-up Manager</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══ AI CHAT TAB ═══ */}
          <TabsContent value="chat" className="mt-4">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  DPM AI Sales Assistant
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">GPT-4</Badge>
                </CardTitle>
                <CardDescription>Sales, marketing, leads — sab ke baare mein poochho</CardDescription>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">
                        AI
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    'HOT leads kaun hain?',
                    'Aaj ke follow-ups?',
                    'Best marketing strategy?',
                    'Pipeline value kya hai?',
                    'Social media tips do',
                  ].map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => { setChatInput(prompt); }}
                      className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Kuch bhi poochho — leads, deals, marketing..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendChatMessage}
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}
