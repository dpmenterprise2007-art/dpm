import { useState, useEffect, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { toast } from 'sonner';
import {
  Users,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock as _Clock,
  CheckCircle2,
  Plus,
  Send,
  Sparkles,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  IndianRupee,
  Target,
  Edit,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Deal {
  id: number;
  dealId: string;
  leadId: string | null;
  title: string;
  clientName: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  projectType: string;
  location: string | null;
  description: string | null;
  estimatedValue: string;
  probability: number | null;
  stage: string;
  status: string | null;
  assignedTo: string | null;
  source: string | null;
  expectedCloseDate: string | null;
  createdAt: string;
}

const STAGES = [
  { id: 'new',          label: 'New Leads',      color: 'border-blue-300 bg-blue-50',     badge: 'bg-blue-100 text-blue-700' },
  { id: 'contacted',    label: 'Contacted',       color: 'border-purple-300 bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
  { id: 'qualified',    label: 'Qualified',       color: 'border-orange-300 bg-orange-50', badge: 'bg-orange-100 text-orange-700' },
  { id: 'proposal',     label: 'Proposal Sent',   color: 'border-green-300 bg-green-50',   badge: 'bg-green-100 text-green-700' },
  { id: 'negotiation',  label: 'Negotiation',     color: 'border-yellow-300 bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
  { id: 'closed-won',   label: 'Won ✓',           color: 'border-emerald-300 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
];

const PROJECT_TYPES = [
  'Corporate Interior', 'Residential Interior', 'Commercial Showroom',
  'Government Project', 'Modular Kitchen', 'Turnkey Solution',
  'Architectural Solution', 'Furniture Manufacturing',
];

const EMPTY_FORM = {
  title: '', clientName: '', company: '', email: '', phone: '',
  projectType: '', location: '', description: '', estimatedValue: '',
  probability: '50', stage: 'new', expectedCloseDate: '', assignedTo: 'Sales Team', source: 'Manual',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalesPipelinePage() {
  const [dealsByStage, setDealsByStage] = useState<Record<string, Deal[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [aiReply, setAiReply] = useState('');

  // Form
  const [form, setForm] = useState({ ...EMPTY_FORM });

  // Stats
  const allDeals = Object.values(dealsByStage).flat();
  const totalPipelineValue = allDeals
    .filter(d => d.status !== 'lost')
    .reduce((sum, d) => sum + parseFloat(d.estimatedValue || '0'), 0);
  const wonDeals = allDeals.filter(d => d.stage === 'closed-won');
  const wonValue = wonDeals.reduce((sum, d) => sum + parseFloat(d.estimatedValue || '0'), 0);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sales/deals/list');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const grouped: Record<string, Deal[]> = {};
      STAGES.forEach(s => { grouped[s.id] = []; });
      (data.deals as Deal[]).forEach(deal => {
        const stageId = deal.stage || 'new';
        if (!grouped[stageId]) grouped[stageId] = [];
        grouped[stageId].push(deal);
      });
      setDealsByStage(grouped);
    } catch (err) {
      toast.error('Failed to load deals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDeals(); }, [fetchDeals]);

  // ── Drag & Drop ────────────────────────────────────────────────────────────

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;

    // Optimistic UI update
    const newGrouped = { ...dealsByStage };
    const sourceList = [...(newGrouped[sourceStage] || [])];
    const [moved] = sourceList.splice(source.index, 1);
    newGrouped[sourceStage] = sourceList;

    const destList = [...(newGrouped[destStage] || [])];
    destList.splice(destination.index, 0, { ...moved, stage: destStage });
    newGrouped[destStage] = destList;
    setDealsByStage(newGrouped);

    // Persist to DB
    try {
      const res = await fetch(`/api/sales/deals/${draggableId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: destStage }),
      });
      const data = await res.json();
      if (data.success) {
        const stageName = STAGES.find(s => s.id === destStage)?.label || destStage;
        toast.success(`✅ Moved to "${stageName}"`);
      } else {
        toast.error('Failed to update stage');
        fetchDeals(); // revert
      }
    } catch {
      toast.error('Network error updating stage');
      fetchDeals();
    }
  };

  // ── Create Deal ────────────────────────────────────────────────────────────

  const handleCreateDeal = async () => {
    if (!form.title || !form.clientName || !form.projectType || !form.estimatedValue) {
      toast.error('Title, Client Name, Project Type and Value are required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/sales/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`✅ Deal "${form.title}" created!`);
        setShowAddModal(false);
        setForm({ ...EMPTY_FORM });
        fetchDeals();
      } else {
        toast.error('Failed to create deal: ' + (data.error || ''));
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Deal ────────────────────────────────────────────────────────────

  const handleDeleteDeal = async (deal: Deal) => {
    if (!confirm(`Delete deal "${deal.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/sales/deals/${deal.dealId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('🗑️ Deal deleted');
        setSelectedDeal(null);
        fetchDeals();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  // ── AI Reply ───────────────────────────────────────────────────────────────

  const generateAIReply = (deal: Deal) => {
    const replies = [
      `Dear ${deal.clientName},\n\nThank you for your interest in DPM Enterprise! We're excited to discuss your ${deal.projectType} project.\n\nBased on your estimated budget of ₹${parseFloat(deal.estimatedValue).toLocaleString('en-IN')}, we can create a stunning design that exceeds your expectations. Our team has completed 500+ similar projects with 100% client satisfaction.\n\nI'd love to schedule a site visit to understand your vision better. Are you available for a meeting this week?\n\nBest regards,\nDPM Enterprise Team`,
      `Hi ${deal.clientName},\n\nGreat to connect! I reviewed your ${deal.projectType} requirements and we have some exciting ideas${deal.company ? ` for ${deal.company}` : ''}.\n\nOur portfolio includes premium projects in your budget range. We specialize in turnkey solutions with on-time delivery and transparent pricing.\n\nCan we schedule a quick 15-minute call to discuss your project timeline?\n\nWarm regards,\nDPM Enterprise`,
    ];
    setAiReply(replies[Math.floor(Math.random() * replies.length)]);
    toast.success('AI reply generated!');
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  const formatValue = (val: string) => {
    const n = parseFloat(val || '0');
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${n.toLocaleString('en-IN')}`;
  };

  const getProbabilityColor = (p: number | null) => {
    if (!p) return 'bg-gray-200';
    if (p >= 75) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (p >= 50) return 'bg-gradient-to-r from-blue-500 to-purple-500';
    if (p >= 25) return 'bg-gradient-to-r from-orange-400 to-yellow-400';
    return 'bg-gradient-to-r from-red-400 to-orange-400';
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Helmet>
        <title>Sales Pipeline | DPM Enterprise</title>
        <meta name="description" content="Sales pipeline management for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/sales-pipeline" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Sales Pipeline</h1>
              <p className="text-gray-600 font-medium">Drag & drop deals to manage your sales process</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchDeals} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4" />
              Add Deal
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-2 border-blue-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Total Deals</p>
                <p className="text-2xl font-black text-blue-600">{allDeals.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Won</p>
                <p className="text-2xl font-black text-green-600">{wonDeals.length}</p>
                <p className="text-xs text-green-600">{formatValue(String(wonValue))}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Pipeline Value</p>
                <p className="text-2xl font-black text-orange-600">{formatValue(String(totalPipelineValue))}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-purple-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Conversion</p>
                <p className="text-2xl font-black text-purple-600">
                  {allDeals.length > 0 ? Math.round((wonDeals.length / allDeals.length) * 100) : 0}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const stageDeals = dealsByStage[stage.id] || [];
              const stageValue = stageDeals.reduce((s, d) => s + parseFloat(d.estimatedValue || '0'), 0);
              return (
                <div key={stage.id} className="flex-shrink-0 w-72">
                  <div className={`rounded-xl border-2 ${stage.color} p-3`}>
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{stage.label}</h3>
                        {stageValue > 0 && (
                          <p className="text-xs text-gray-500">{formatValue(String(stageValue))}</p>
                        )}
                      </div>
                      <Badge className={`${stage.badge} border-0 text-xs font-bold`}>
                        {stageDeals.length}
                      </Badge>
                    </div>

                    <Droppable droppableId={stage.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-2 min-h-[400px] rounded-lg p-1 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-white/60 ring-2 ring-blue-300' : ''
                          }`}
                        >
                          {stageDeals.map((deal, index) => (
                            <Draggable key={deal.dealId} draggableId={deal.dealId} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white rounded-lg border p-3 shadow-sm hover:shadow-md transition-all cursor-move ${
                                    snapshot.isDragging ? 'shadow-xl rotate-1 ring-2 ring-blue-400' : ''
                                  }`}
                                  onClick={() => { setSelectedDeal(deal); setAiReply(''); setEditMode(false); }}
                                >
                                  <div className="space-y-2">
                                    {/* Title & Value */}
                                    <div className="flex items-start justify-between gap-1">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 text-sm truncate">{deal.title}</p>
                                        <p className="text-xs text-gray-500 truncate">{deal.clientName}{deal.company ? ` · ${deal.company}` : ''}</p>
                                      </div>
                                      <span className="text-xs font-black text-green-700 shrink-0">{formatValue(deal.estimatedValue)}</span>
                                    </div>

                                    {/* Project Type */}
                                    <Badge variant="secondary" className="text-xs py-0">{deal.projectType}</Badge>

                                    {/* Probability Bar */}
                                    {deal.probability !== null && (
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                          <div
                                            className={`${getProbabilityColor(deal.probability)} h-1.5 rounded-full`}
                                            style={{ width: `${deal.probability}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-gray-500">{deal.probability}%</span>
                                      </div>
                                    )}

                                    {/* Quick Actions */}
                                    <div className="flex gap-1 pt-1">
                                      {deal.phone && (
                                        <a href={`tel:${deal.phone}`} onClick={e => e.stopPropagation()}>
                                          <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                            <Phone className="h-3 w-3" />
                                          </Button>
                                        </a>
                                      )}
                                      {deal.email && (
                                        <a href={`mailto:${deal.email}`} onClick={e => e.stopPropagation()}>
                                          <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                            <Mail className="h-3 w-3" />
                                          </Button>
                                        </a>
                                      )}
                                      {deal.phone && (
                                        <a
                                          href={`https://wa.me/${deal.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(deal.clientName)}!%20DPM%20Enterprise%20here%20regarding%20your%20${encodeURIComponent(deal.projectType)}%20project.`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={e => e.stopPropagation()}
                                        >
                                          <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                                            <MessageSquare className="h-3 w-3" />
                                          </Button>
                                        </a>
                                      )}
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 ml-auto text-red-400 hover:text-red-600"
                                        onClick={e => { e.stopPropagation(); handleDeleteDeal(deal); }}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}

                          {/* Empty state */}
                          {stageDeals.length === 0 && !snapshot.isDraggingOver && (
                            <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                              <DollarSign className="h-6 w-6 mb-1 opacity-30" />
                              <p className="text-xs">Drop deals here</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}

      {/* ── Add Deal Modal ──────────────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Add New Deal
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Deal Title *</Label>
                  <Input className="mt-1" placeholder="e.g. Office Interior — Tech Solutions Pvt Ltd"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <Label>Client Name *</Label>
                  <Input className="mt-1" placeholder="Rajesh Kumar"
                    value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input className="mt-1" placeholder="Tech Solutions Pvt Ltd"
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input className="mt-1" type="email" placeholder="client@company.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input className="mt-1" placeholder="+91 98765 43210"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label>Project Type *</Label>
                  <Select value={form.projectType} onValueChange={v => setForm({ ...form, projectType: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estimated Value (₹) *</Label>
                  <Input className="mt-1" type="number" placeholder="2500000"
                    value={form.estimatedValue} onChange={e => setForm({ ...form, estimatedValue: e.target.value })} />
                  {form.estimatedValue && (
                    <p className="text-xs text-green-600 mt-1">{formatValue(form.estimatedValue)}</p>
                  )}
                </div>
                <div>
                  <Label>Stage</Label>
                  <Select value={form.stage} onValueChange={v => setForm({ ...form, stage: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STAGES.map(s => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Win Probability (%)</Label>
                  <Input className="mt-1" type="number" min="0" max="100" placeholder="50"
                    value={form.probability} onChange={e => setForm({ ...form, probability: e.target.value })} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input className="mt-1" placeholder="Navi Mumbai"
                    value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
                <div>
                  <Label>Expected Close Date</Label>
                  <Input className="mt-1" type="date"
                    value={form.expectedCloseDate} onChange={e => setForm({ ...form, expectedCloseDate: e.target.value })} />
                </div>
                <div>
                  <Label>Source</Label>
                  <Select value={form.source} onValueChange={v => setForm({ ...form, source: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Manual', 'Website', 'LinkedIn', 'GeM Portal', 'Referral', 'Cold Call', 'WhatsApp'].map(s =>
                        <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea className="mt-1" placeholder="Project details, requirements, notes..."
                    value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                  onClick={handleCreateDeal}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  {saving ? 'Creating...' : 'Create Deal'}
                </Button>
                <Button variant="outline" onClick={() => { setShowAddModal(false); setForm({ ...EMPTY_FORM }); }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Deal Detail Modal ───────────────────────────────────────────────── */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  {selectedDeal.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditMode(!editMode)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDeal(selectedDeal)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDeal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Deal Info Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg text-sm">
                <div><p className="text-xs text-gray-500">Client</p><p className="font-semibold">{selectedDeal.clientName}</p></div>
                <div><p className="text-xs text-gray-500">Company</p><p className="font-semibold">{selectedDeal.company || '—'}</p></div>
                <div><p className="text-xs text-gray-500">Project Type</p><p className="font-semibold">{selectedDeal.projectType}</p></div>
                <div><p className="text-xs text-gray-500">Value</p><p className="font-semibold text-green-700">{formatValue(selectedDeal.estimatedValue)}</p></div>
                <div><p className="text-xs text-gray-500">Stage</p>
                  <Badge className="mt-1">{STAGES.find(s => s.id === selectedDeal.stage)?.label || selectedDeal.stage}</Badge>
                </div>
                <div><p className="text-xs text-gray-500">Win Probability</p><p className="font-semibold">{selectedDeal.probability ?? 50}%</p></div>
                {selectedDeal.email && <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold">{selectedDeal.email}</p></div>}
                {selectedDeal.phone && <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold">{selectedDeal.phone}</p></div>}
                {selectedDeal.location && <div><p className="text-xs text-gray-500">Location</p><p className="font-semibold">{selectedDeal.location}</p></div>}
                {selectedDeal.source && <div><p className="text-xs text-gray-500">Source</p><p className="font-semibold">{selectedDeal.source}</p></div>}
                {selectedDeal.expectedCloseDate && <div><p className="text-xs text-gray-500">Expected Close</p><p className="font-semibold">{selectedDeal.expectedCloseDate}</p></div>}
                {selectedDeal.assignedTo && <div><p className="text-xs text-gray-500">Assigned To</p><p className="font-semibold">{selectedDeal.assignedTo}</p></div>}
              </div>

              {selectedDeal.description && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700">{selectedDeal.description}</p>
                </div>
              )}

              {/* Move Stage */}
              <div>
                <Label className="text-sm font-semibold">Move to Stage</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {STAGES.filter(s => s.id !== selectedDeal.stage).map(s => (
                    <Button key={s.id} size="sm" variant="outline"
                      className="text-xs"
                      onClick={async () => {
                        const res = await fetch(`/api/sales/deals/${selectedDeal.dealId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ stage: s.id }),
                        });
                        const data = await res.json();
                        if (data.success) {
                          toast.success(`Moved to "${s.label}"`);
                          setSelectedDeal({ ...selectedDeal, stage: s.id });
                          fetchDeals();
                        }
                      }}
                    >
                      → {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Reply */}
              <div>
                <Label className="text-sm font-semibold">AI-Generated Client Reply</Label>
                <Textarea
                  value={aiReply}
                  onChange={e => setAiReply(e.target.value)}
                  rows={8}
                  className="font-mono text-sm mt-2"
                  placeholder="Click 'Generate AI Reply' to create a personalised message"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
                  onClick={() => generateAIReply(selectedDeal)}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate AI Reply
                </Button>
                {selectedDeal.email && (
                  <a
                    href={`mailto:${selectedDeal.email}?subject=${encodeURIComponent(`DPM Enterprise — ${selectedDeal.projectType}`)}&body=${encodeURIComponent(aiReply)}`}
                    className="flex-1"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
                      disabled={!aiReply}
                    >
                      <Send className="h-4 w-4" />
                      Send Email
                    </Button>
                  </a>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-1">
                {selectedDeal.phone && (
                  <>
                    <a href={`tel:${selectedDeal.phone}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="h-4 w-4" />Call
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${selectedDeal.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedDeal.clientName)}!%20DPM%20Enterprise%20here.`}
                      target="_blank" rel="noopener noreferrer" className="flex-1"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare className="h-4 w-4" />WhatsApp
                      </Button>
                    </a>
                  </>
                )}
                <Button variant="outline" className="flex-1 gap-2" onClick={() => {
                  const date = new Date();
                  date.setDate(date.getDate() + 3);
                  toast.success(`Follow-up reminder set for ${date.toLocaleDateString('en-IN')}`);
                }}>
                  <Calendar className="h-4 w-4" />Follow-up
                </Button>
              </div>

              <Button variant="ghost" className="w-full" onClick={() => setSelectedDeal(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
