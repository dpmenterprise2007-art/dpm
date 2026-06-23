/**
 * Lead Verification & Cleanup System
 * Verify contact numbers via OTP + WhatsApp, fix data, remove duplicates
 */
import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Shield,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  Edit,
  MessageCircle,
  Users,
  Download,
  Send,
  KeyRound,
  Loader2,
  ScanLine,
} from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Lead {
  id: number;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'HOT' | 'WARM' | 'COLD';
  score: number;
  verified: boolean;
  phoneValid?: boolean;
  emailValid?: boolean;
  isDuplicate?: boolean;
  duplicateOf?: number;
}

interface ValidationIssue {
  leadId: number;
  leadName: string;
  type: 'phone' | 'email' | 'duplicate' | 'incomplete';
  issue: string;
  suggestion: string;
}

interface OTPState {
  isOpen: boolean;
  leadId: string;
  leadName: string;
  phone: string;
  whatsappLink: string;
  otp: string;
  step: 'send' | 'verify';
  loading: boolean;
  devOtp?: string;
}

export default function LeadVerification() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [filter, setFilter] = useState<'all' | 'invalid' | 'duplicate' | 'unverified'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    invalidPhone: 0,
    invalidEmail: 0,
    duplicates: 0,
    incomplete: 0,
  });

  // OTP Modal state
  const [otpState, setOtpState] = useState<OTPState>({
    isOpen: false,
    leadId: '',
    leadName: '',
    phone: '',
    whatsappLink: '',
    otp: '',
    step: 'send',
    loading: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads/list?limit=1000');
      if (res.ok) {
        const data = await res.json();
        const allLeads = data.leads || [];

        const validatedLeads = allLeads.map((lead: Lead) => ({
          ...lead,
          phoneValid: validatePhone(lead.phone),
          emailValid: validateEmail(lead.email),
        }));

        const duplicates = findDuplicates(validatedLeads);
        const leadsWithDuplicates = validatedLeads.map((lead: Lead) => {
          const dup = duplicates.find((d) => d.id === lead.id);
          return { ...lead, isDuplicate: !!dup, duplicateOf: dup?.duplicateOf };
        });

        setLeads(leadsWithDuplicates);

        const foundIssues: ValidationIssue[] = [];
        leadsWithDuplicates.forEach((lead: Lead) => {
          if (!lead.phoneValid)
            foundIssues.push({
              leadId: lead.id,
              leadName: lead.name,
              type: 'phone',
              issue: `Invalid phone: ${lead.phone}`,
              suggestion: fixPhoneNumber(lead.phone),
            });
          if (!lead.emailValid)
            foundIssues.push({
              leadId: lead.id,
              leadName: lead.name,
              type: 'email',
              issue: `Invalid email: ${lead.email}`,
              suggestion: 'Update with valid email',
            });
          if (lead.isDuplicate)
            foundIssues.push({
              leadId: lead.id,
              leadName: lead.name,
              type: 'duplicate',
              issue: `Duplicate of lead #${lead.duplicateOf}`,
              suggestion: 'Merge or delete duplicate',
            });
          if (!lead.name || !lead.email || !lead.phone)
            foundIssues.push({
              leadId: lead.id,
              leadName: lead.name || 'Unknown',
              type: 'incomplete',
              issue: 'Missing required fields',
              suggestion: 'Complete all required fields',
            });
        });
        setIssues(foundIssues);

        setStats({
          total: leadsWithDuplicates.length,
          verified: leadsWithDuplicates.filter((l: Lead) => l.verified).length,
          invalidPhone: leadsWithDuplicates.filter((l: Lead) => !l.phoneValid).length,
          invalidEmail: leadsWithDuplicates.filter((l: Lead) => !l.emailValid).length,
          duplicates: leadsWithDuplicates.filter((l: Lead) => l.isDuplicate).length,
          incomplete: leadsWithDuplicates.filter(
            (l: Lead) => !l.name || !l.email || !l.phone
          ).length,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Load error:', error);
      toast.error('Failed to load leads');
      setLoading(false);
    }
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'));
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const fixPhoneNumber = (phone: string): string => {
    if (!phone) return 'No phone provided';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    if (cleaned.length === 12 && cleaned.startsWith('91'))
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    return 'Invalid format - needs 10 digits';
  };

  const findDuplicates = (leads: Lead[]): Array<{ id: number; duplicateOf: number }> => {
    const duplicates: Array<{ id: number; duplicateOf: number }> = [];
    const seen = new Map<string, number>();
    leads.forEach((lead: Lead) => {
      const phoneKey = lead.phone?.replace(/\D/g, '');
      if (phoneKey && seen.has(phoneKey)) {
        duplicates.push({ id: lead.id, duplicateOf: seen.get(phoneKey)! });
      } else if (phoneKey) {
        seen.set(phoneKey, lead.id);
      }
      const emailKey = lead.email?.toLowerCase();
      if (emailKey && seen.has(emailKey)) {
        duplicates.push({ id: lead.id, duplicateOf: seen.get(emailKey)! });
      } else if (emailKey) {
        seen.set(emailKey, lead.id);
      }
    });
    return duplicates;
  };

  // ─── VERIFY ALL PHONES ───────────────────────────────────────────────
  const verifyAllPhones = async () => {
    try {
      setActionLoading('verify');
      const res = await fetch('/api/leads/verify-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoFix: false }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(
          `✅ Verified ${data.total} leads! ${data.valid} valid, ${data.invalidPhone} invalid phones`
        );
        loadData();
      } else {
        toast.error('Verification failed');
      }
    } catch {
      toast.error('Failed to verify leads');
    } finally {
      setActionLoading(null);
    }
  };

  // ─── WHATSAPP OTP VERIFY (bulk) ──────────────────────────────────────
  const verifyViaWhatsApp = async () => {
    // Open OTP modal for first unverified lead with valid phone
    const unverifiedLead = leads.find((l) => !l.verified && l.phoneValid && l.leadId);
    if (!unverifiedLead) {
      toast.info('No unverified leads with valid phone numbers found!');
      return;
    }
    openOTPModal(unverifiedLead);
  };

  // ─── OPEN OTP MODAL for a specific lead ─────────────────────────────
  const openOTPModal = (lead: Lead) => {
    setOtpState({
      isOpen: true,
      leadId: lead.leadId || String(lead.id),
      leadName: lead.name,
      phone: lead.phone,
      whatsappLink: '',
      otp: '',
      step: 'send',
      loading: false,
    });
  };

  // ─── SEND OTP via WhatsApp ───────────────────────────────────────────
  const sendOTP = async () => {
    try {
      setOtpState((prev) => ({ ...prev, loading: true }));
      const res = await fetch('/api/leads/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: otpState.leadId, phone: otpState.phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpState((prev) => ({
          ...prev,
          loading: false,
          step: 'verify',
          whatsappLink: data.whatsappLink,
          devOtp: data.otp, // shown in dev mode
        }));
        // Auto-open WhatsApp
        window.open(data.whatsappLink, '_blank');
        toast.success('OTP sent! WhatsApp opened. Ask lead to share the OTP.');
      } else {
        toast.error(data.error || 'Failed to send OTP');
        setOtpState((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      toast.error('Network error. Please try again.');
      setOtpState((prev) => ({ ...prev, loading: false }));
    }
  };

  // ─── VERIFY OTP ──────────────────────────────────────────────────────
  const verifyOTP = async () => {
    if (!otpState.otp || otpState.otp.length !== 6) {
      toast.error('Please enter 6-digit OTP');
      return;
    }
    try {
      setOtpState((prev) => ({ ...prev, loading: true }));
      const res = await fetch('/api/leads/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: otpState.leadId, otp: otpState.otp }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        toast.success(`✅ ${otpState.leadName} verified successfully!`);
        setOtpState((prev) => ({ ...prev, isOpen: false, loading: false }));
        loadData();
      } else {
        toast.error(data.error || 'Wrong OTP');
        setOtpState((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      toast.error('Network error. Please try again.');
      setOtpState((prev) => ({ ...prev, loading: false }));
    }
  };

  // ─── FIX ALL PHONES ──────────────────────────────────────────────────
  const fixAllPhones = async () => {
    try {
      setActionLoading('fix');
      const res = await fetch('/api/admin/leads/auto-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun: false }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(
          `Fixed ${data.fixed} phone numbers. ${data.unfixable} need manual correction.`
        );
        loadData();
      } else {
        toast.error('Auto-fix failed');
      }
    } catch {
      toast.error('Failed to fix phone numbers');
    } finally {
      setActionLoading(null);
    }
  };

  // ─── BULK SCAN ───────────────────────────────────────────────────────
  const runBulkScan = async () => {
    try {
      setActionLoading('scan');
      const res = await fetch('/api/admin/leads/bulk-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const s = data.summary;
        toast.success(
          `Scan complete — ${s.totalIssues} issues found: ${s.invalidPhone} bad phones, ${s.duplicatePhones} dup phones, ${s.invalidEmail} bad emails, ${s.incomplete} incomplete`
        );
        loadData(); // refresh stats
      } else {
        toast.error('Bulk scan failed');
      }
    } catch {
      toast.error('Failed to run bulk scan');
    } finally {
      setActionLoading(null);
    }
  };

  // ─── REMOVE DUPLICATES ───────────────────────────────────────────────
  const removeDuplicates = async () => {
    try {
      setActionLoading('duplicates');
      const res = await fetch('/api/leads/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove-duplicates', createBackup: true }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(
          `Processed ${data.stats?.total ?? 0} leads. Found ${data.stats?.duplicates ?? 0} duplicates.`
        );
        loadData();
      } else {
        toast.error('Duplicate removal failed');
      }
    } catch {
      toast.error('Failed to remove duplicates');
    } finally {
      setActionLoading(null);
    }
  };

  // ─── EXPORT ──────────────────────────────────────────────────────────
  const exportCleanData = () => {
    const validLeads = leads.filter((l) => l.phoneValid && l.emailValid && !l.isDuplicate);
    const csv = [
      'Name,Email,Phone,Status,Score,Verified',
      ...validLeads.map(
        (l) => `${l.name},${l.email},${l.phone},${l.status},${l.score},${l.verified}`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clean-leads.csv';
    a.click();
    toast.success(`Exported ${validLeads.length} clean leads!`);
  };

  const filteredLeads = leads.filter((lead) => {
    if (filter === 'invalid') return !lead.phoneValid || !lead.emailValid;
    if (filter === 'duplicate') return lead.isDuplicate;
    if (filter === 'unverified') return !lead.verified;
    return true;
  });

  if (loading) {
    return (
      <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
        <div className="flex items-center justify-center min-h-screen">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Lead Verification | DPM Enterprise</title>
        <meta name="description" content="Lead verification and cleanup system for DPM Enterprise." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/lead-verification" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-500" />
              Lead Verification & Cleanup
            </h1>
            <p className="text-muted-foreground mt-1">
              Verify contacts via OTP + WhatsApp, fix errors, remove duplicates
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportCleanData}>
              <Download className="h-4 w-4 mr-2" />
              Export Clean Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}%
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Invalid Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.invalidPhone}</div>
              <p className="text-xs text-red-600 mt-1">Need fixing</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Invalid Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.invalidEmail}</div>
              <p className="text-xs text-orange-600 mt-1">Need fixing</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Duplicates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.duplicates}</div>
              <p className="text-xs text-yellow-600 mt-1">To remove</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.incomplete}</div>
              <p className="text-xs text-blue-600 mt-1">Missing data</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-500" />
              Quick Fix Actions
            </CardTitle>
            <CardDescription>One-click cleanup and verification tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Button
                onClick={runBulkScan}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={actionLoading === 'scan'}
              >
                {actionLoading === 'scan' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ScanLine className="h-4 w-4 mr-2" />
                )}
                Bulk Scan
              </Button>

              <Button
                onClick={verifyAllPhones}
                className="w-full"
                disabled={actionLoading === 'verify'}
              >
                {actionLoading === 'verify' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Phone className="h-4 w-4 mr-2" />
                )}
                Verify All Phones
              </Button>

              <Button
                onClick={verifyViaWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={actionLoading === 'whatsapp'}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp OTP Verify
              </Button>

              <Button
                onClick={fixAllPhones}
                className="w-full"
                variant="outline"
                disabled={actionLoading === 'fix'}
              >
                {actionLoading === 'fix' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Edit className="h-4 w-4 mr-2" />
                )}
                Auto-Fix Phones
              </Button>

              <Button
                onClick={removeDuplicates}
                className="w-full"
                variant="destructive"
                disabled={actionLoading === 'duplicates'}
              >
                {actionLoading === 'duplicates' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Remove Duplicates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="issues" className="space-y-4">
          <TabsList>
            <TabsTrigger value="issues">Issues ({issues.length})</TabsTrigger>
            <TabsTrigger value="leads">All Leads ({filteredLeads.length})</TabsTrigger>
          </TabsList>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Data Issues ({issues.length})
                </CardTitle>
                <CardDescription>Problems found in lead data that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {issues.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                      <p className="font-medium">No issues found!</p>
                      <p className="text-sm">All leads are clean and verified</p>
                    </div>
                  ) : (
                    issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
                      >
                        <div className="flex items-center gap-3">
                          {issue.type === 'phone' && <Phone className="h-4 w-4 text-red-500" />}
                          {issue.type === 'email' && <Mail className="h-4 w-4 text-orange-500" />}
                          {issue.type === 'duplicate' && (
                            <Users className="h-4 w-4 text-yellow-500" />
                          )}
                          {issue.type === 'incomplete' && (
                            <AlertTriangle className="h-4 w-4 text-blue-500" />
                          )}
                          <div>
                            <p className="font-medium">{issue.leadName}</p>
                            <p className="text-sm text-muted-foreground">{issue.issue}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {issue.suggestion}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle>All Leads</CardTitle>
                    <CardDescription>View, filter and verify individual leads</CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(['all', 'invalid', 'duplicate', 'unverified'] as const).map((f) => (
                      <Button
                        key={f}
                        size="sm"
                        variant={filter === f ? 'default' : 'outline'}
                        onClick={() => setFilter(f)}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredLeads.slice(0, 50).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            lead.status === 'HOT'
                              ? 'bg-orange-500'
                              : lead.status === 'WARM'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              {lead.phoneValid ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500" />
                              )}
                              {lead.phone}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {lead.emailValid ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500" />
                              )}
                              {lead.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {lead.isDuplicate && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs"
                          >
                            Duplicate
                          </Badge>
                        )}
                        {lead.verified ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 text-xs"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                        {!lead.verified && lead.phoneValid && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-700 border-green-300 hover:bg-green-50"
                            onClick={() => openOTPModal(lead)}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            OTP Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredLeads.length > 50 && (
                    <p className="text-center text-sm text-muted-foreground py-2">
                      Showing 50 of {filteredLeads.length} leads
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── OTP VERIFICATION MODAL ─────────────────────────────────── */}
      <Dialog
        open={otpState.isOpen}
        onOpenChange={(open) => setOtpState((prev) => ({ ...prev, isOpen: open }))}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-green-600" />
              WhatsApp OTP Verification
            </DialogTitle>
            <DialogDescription>
              Verify <strong>{otpState.leadName}</strong> via WhatsApp OTP
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Phone display */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-semibold">{otpState.phone}</p>
              </div>
            </div>

            {otpState.step === 'send' ? (
              /* STEP 1: Send OTP */
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    📱 How it works:
                  </p>
                  <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                    <li>Click "Send OTP via WhatsApp"</li>
                    <li>WhatsApp will open with OTP message</li>
                    <li>Send the message to the lead</li>
                    <li>Ask lead to share the OTP back</li>
                    <li>Enter OTP below to verify</li>
                  </ol>
                </div>
                <Button
                  onClick={sendOTP}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={otpState.loading}
                >
                  {otpState.loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send OTP via WhatsApp
                </Button>
              </div>
            ) : (
              /* STEP 2: Enter OTP */
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    OTP sent! WhatsApp opened. Ask the lead to share the 6-digit OTP.
                  </p>
                </div>

                {otpState.devOtp && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-700 font-medium">
                      🔧 Dev Mode OTP: <strong className="text-lg">{otpState.devOtp}</strong>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp-input">Enter 6-Digit OTP</Label>
                  <Input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter OTP here..."
                    value={otpState.otp}
                    onChange={(e) =>
                      setOtpState((prev) => ({
                        ...prev,
                        otp: e.target.value.replace(/\D/g, '').slice(0, 6),
                      }))
                    }
                    className="text-center text-2xl font-bold tracking-widest h-14"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOtpState((prev) => ({ ...prev, step: 'send', otp: '' }))}
                  >
                    Resend OTP
                  </Button>
                  <Button
                    onClick={verifyOTP}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={otpState.loading || otpState.otp.length !== 6}
                  >
                    {otpState.loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Verify OTP
                  </Button>
                </div>

                {otpState.whatsappLink && (
                  <Button
                    variant="outline"
                    className="w-full text-green-700 border-green-300"
                    onClick={() => window.open(otpState.whatsappLink, '_blank')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open WhatsApp Again
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Dashboard>
  );
}
