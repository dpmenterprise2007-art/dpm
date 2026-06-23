import { useState, useEffect, useCallback, useRef } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Users,
  TrendingUp,
  RefreshCw,
  Search,
  Phone,
  Mail,
  MapPin,
  Flame,
  Thermometer,
  Snowflake,
  Eye,
  Trash2,
  Download,
  Activity,
  Crown,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface Lead {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  projectType: string;
  budget: string | null;
  location: string | null;
  source: string;
  status: string;
  score: number | null;
  conversionStatus: string | null;
  createdAt: string;
}

interface Stats {
  leads: {
    total: number; hot: number; warm: number; cold: number;
    today: number; thisWeek: number; thisMonth: number;
    recent: Lead[];
  };
  users: {
    total: number; active: number; frozen: number; directors: number; staff: number;
  };
  timestamp: string;
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  hot: <Flame className="w-3 h-3 text-red-500" />,
  warm: <Thermometer className="w-3 h-3 text-orange-500" />,
  cold: <Snowflake className="w-3 h-3 text-blue-500" />,
};

const STATUS_COLOR: Record<string, string> = {
  hot: 'bg-red-100 text-red-700 border-red-200',
  warm: 'bg-orange-100 text-orange-700 border-orange-200',
  cold: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function AdminPortalPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) setStats(data);
    } catch { /* silent */ }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const params = new URLSearchParams({ limit: '500' });
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (sourceFilter !== 'all') params.set('source', sourceFilter);
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      if (data.success) setLeads(data.leads);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLeadsLoading(false);
    }
  }, [statusFilter, sourceFilter]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchLeads()]);
    setLoading(false);
  }, [fetchStats, fetchLeads]);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => { fetchStats(); fetchLeads(); }, 30000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoRefresh, fetchStats, fetchLeads]);

  useEffect(() => {
    let list = leads;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.company || '').toLowerCase().includes(q) ||
        (l.location || '').toLowerCase().includes(q) ||
        l.leadId.toLowerCase().includes(q)
      );
    }
    setFilteredLeads(list);
  }, [search, leads]);

  async function handleDeleteLead() {
    if (!deleteLeadId) return;
    try {
      const res = await fetch(`/api/admin/leads/${deleteLeadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Lead deleted');
        setDeleteOpen(false);
        fetchLeads();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Delete failed');
    }
  }

  async function handleUpdateLeadStatus(leadId: string, status: string) {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Lead status → ${status.toUpperCase()}`);
        fetchLeads();
      }
    } catch { toast.error('Update failed'); }
  }

  function exportCSV() {
    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Company', 'Project Type', 'Budget', 'Location', 'Source', 'Status', 'Score', 'Created'];
    const rows = filteredLeads.map(l => [
      l.leadId, l.name, l.phone, l.email || '', l.company || '',
      l.projectType, l.budget || '', l.location || '', l.source,
      l.status, l.score || 0,
      l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-IN') : '',
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `dpm-leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filteredLeads.length} leads`);
  }

  const sources = [...new Set(leads.map(l => l.source))].filter(Boolean);

  return (
    <DashboardShell>
      <Helmet><meta name="robots" content="noindex,nofollow" /><title>Admin Portal | DPM Enterprise</title><meta name="description" content="DPM Enterprise admin portal." /><link rel="canonical" href="https://www.dpmenterprise.in/dashboard/admin-portal" /></Helmet>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Crown className="w-7 h-7 text-yellow-600" />
              Admin Control Portal
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Complete visibility — all leads, users, stats in real-time
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(p => !p)}
              className={autoRefresh ? 'border-green-400 text-green-600' : ''}
            >
              <Activity className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-pulse text-green-500' : ''}`} />
              {autoRefresh ? 'Live' : 'Auto-Refresh'}
            </Button>
            <Button variant="outline" size="sm" onClick={loadAll} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" onClick={exportCSV} className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Global Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Total Leads', value: stats.leads.total, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'HOT', value: stats.leads.hot, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'WARM', value: stats.leads.warm, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'COLD', value: stats.leads.cold, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Today', value: stats.leads.today, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'This Week', value: stats.leads.thisWeek, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'This Month', value: stats.leads.thisMonth, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            ].map(s => (
              <Card key={s.label} className={`${s.bg} border-0`}>
                <CardContent className="p-3 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Tabs defaultValue="leads">
          <TabsList className="mb-4">
            <TabsTrigger value="leads">
              <TrendingUp className="w-4 h-4 mr-2" />
              All Leads ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="w-4 h-4 mr-2" />
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              User Stats
            </TabsTrigger>
          </TabsList>

          {/* All Leads Tab */}
          <TabsContent value="leads" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); }}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="hot">HOT</SelectItem>
                  <SelectItem value="warm">WARM</SelectItem>
                  <SelectItem value="cold">COLD</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={v => { setSourceFilter(v); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                {leadsLoading ? (
                  <div className="p-8 text-center">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading leads...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          {['Lead ID', 'Name', 'Phone', 'Email', 'Project', 'Source', 'Status', 'Score', 'Date', 'Actions'].map(h => (
                            <th key={h} className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.slice(0, 200).map(lead => (
                          <tr key={lead.id} className="border-b hover:bg-muted/20 transition-colors">
                            <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{lead.leadId}</td>
                            <td className="px-3 py-2 font-medium whitespace-nowrap">
                              <div>{lead.name}</div>
                              {lead.company && <div className="text-xs text-muted-foreground">{lead.company}</div>}
                            </td>
                            <td className="px-3 py-2 text-xs">
                              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                <Phone className="w-3 h-3" />{lead.phone}
                              </a>
                            </td>
                            <td className="px-3 py-2 text-xs text-muted-foreground">
                              {lead.email ? (
                                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                  <Mail className="w-3 h-3" />{lead.email.slice(0, 20)}
                                </a>
                              ) : '—'}
                            </td>
                            <td className="px-3 py-2 text-xs whitespace-nowrap">
                              <div>{lead.projectType}</div>
                              {lead.location && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="w-2.5 h-2.5" />{lead.location}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-2 text-xs">
                              <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                            </td>
                            <td className="px-3 py-2">
                              <Select
                                value={lead.status}
                                onValueChange={v => handleUpdateLeadStatus(lead.leadId, v)}
                              >
                                <SelectTrigger className={`h-6 text-xs w-20 border ${STATUS_COLOR[lead.status] || ''}`}>
                                  <div className="flex items-center gap-1">
                                    {STATUS_ICON[lead.status]}
                                    {lead.status?.toUpperCase()}
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hot">HOT</SelectItem>
                                  <SelectItem value="warm">WARM</SelectItem>
                                  <SelectItem value="cold">COLD</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2 text-center">
                              {lead.score ? (
                                <span className={`text-xs font-bold ${lead.score >= 60 ? 'text-red-600' : lead.score >= 30 ? 'text-orange-600' : 'text-blue-600'}`}>
                                  {lead.score}
                                </span>
                              ) : '—'}
                            </td>
                            <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : '—'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => { setSelectedLead(lead); setViewOpen(true); }}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                  onClick={() => { setDeleteLeadId(lead.leadId); setDeleteOpen(true); }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredLeads.length > 200 && (
                      <div className="p-3 text-center text-sm text-muted-foreground border-t">
                        Showing 200 of {filteredLeads.length} leads. Use filters to narrow down.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Latest 10 Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.leads.recent.length ? (
                  <div className="space-y-3">
                    {stats.leads.recent.map((lead: any) => (
                      <div key={lead.leadId} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${lead.status === 'hot' ? 'bg-red-500' : lead.status === 'warm' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                          <div>
                            <p className="font-medium text-sm">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.phone} · {lead.source} · {lead.projectType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`text-xs ${STATUS_COLOR[lead.status] || ''}`}>
                            {lead.status?.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-8">No recent leads</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Stats Tab */}
          <TabsContent value="users">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats && [
                { label: 'Total Users', value: stats.users.total, icon: Users, color: 'text-blue-600' },
                { label: 'Active', value: stats.users.active, icon: UserCheck, color: 'text-green-600' },
                { label: 'Frozen', value: stats.users.frozen, icon: UserX, color: 'text-orange-600' },
                { label: 'Directors', value: stats.users.directors, icon: Crown, color: 'text-yellow-600' },
                { label: 'Staff', value: stats.users.staff, icon: Users, color: 'text-purple-600' },
              ].map(s => (
                <Card key={s.label}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <s.icon className={`w-10 h-10 ${s.color}`} />
                    <div>
                      <p className="text-3xl font-bold">{s.value}</p>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="col-span-2 md:col-span-1">
                <CardContent className="p-5">
                  <p className="text-sm font-medium mb-2">Quick Actions</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href="/dashboard/admin-users">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Users
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href="/dashboard/lead-verification">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Lead Verification
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Lead Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg z-[100]">
          <DialogHeader>
            <DialogTitle>Lead Details — {selectedLead?.leadId}</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-3 text-sm">
              {[
                ['Name', selectedLead.name],
                ['Phone', selectedLead.phone],
                ['Email', selectedLead.email || '—'],
                ['Company', selectedLead.company || '—'],
                ['Project Type', selectedLead.projectType],
                ['Budget', selectedLead.budget || '—'],
                ['Location', selectedLead.location || '—'],
                ['Source', selectedLead.source],
                ['Status', selectedLead.status?.toUpperCase()],
                ['Score', selectedLead.score ? `${selectedLead.score}/100` : '—'],
                ['Conversion', selectedLead.conversionStatus || '—'],
                ['Created', selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString('en-IN') : '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground font-medium">{k}</span>
                  <span className="font-medium text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>Close</Button>
            {selectedLead?.phone && (
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Lead Confirm */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm z-[100]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Lead?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently delete lead <strong>{deleteLeadId}</strong>. Cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteLead}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
