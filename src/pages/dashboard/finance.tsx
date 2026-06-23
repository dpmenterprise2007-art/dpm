import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Receipt,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  FileCheck,
  Calculator,
  PieChart,
  BarChart3,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { format } from 'date-fns';

export default function FinanceCenter() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Finance | DPM Enterprise</title>
        <meta name="description" content="Finance centre for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/finance" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finance Center</h1>
            <p className="text-gray-600 mt-1">Complete financial management & compliance system</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Reports
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹45,28,500</div>
              <p className="text-xs text-gray-600 mt-1">This Financial Year</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹28,45,200</div>
              <p className="text-xs text-gray-600 mt-1">This Financial Year</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Net Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₹16,83,300</div>
              <p className="text-xs text-green-600 mt-1">+37.2% Profit Margin</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹8,45,000</div>
              <p className="text-xs text-gray-600 mt-1">12 Invoices Outstanding</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="gap-2">
              <PieChart className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2">
              <FileText className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2">
              <Receipt className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="registers" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Registers
            </TabsTrigger>
            <TabsTrigger value="gst" className="gap-2">
              <Calculator className="h-4 w-4" />
              GST
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <FinancialDashboard />
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <InvoiceGenerator />
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <ExpenseTracker />
          </TabsContent>

          {/* Registers Tab */}
          <TabsContent value="registers" className="space-y-6">
            <SalesPurchaseRegister />
          </TabsContent>

          {/* GST Tab */}
          <TabsContent value="gst" className="space-y-6">
            <GSTManagement />
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <ComplianceCenter />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}

// Financial Dashboard Component
function FinancialDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Last 6 months performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: 'Sep 2025', revenue: 6850000, growth: 12.5 },
              { month: 'Oct 2025', revenue: 7250000, growth: 5.8 },
              { month: 'Nov 2025', revenue: 7680000, growth: 5.9 },
              { month: 'Dec 2025', revenue: 8120000, growth: 5.7 },
              { month: 'Jan 2026', revenue: 7450000, growth: -8.2 },
              { month: 'Feb 2026', revenue: 7935000, growth: 6.5 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-20 text-sm font-medium text-gray-700">{item.month}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg" style={{ width: `${(item.revenue / 8500000) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold text-gray-900">₹{(item.revenue / 100000).toFixed(1)}L</div>
                  <Badge variant={item.growth > 0 ? 'default' : 'destructive'} className="gap-1">
                    {item.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(item.growth)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Current month categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { category: 'Salaries & Wages', amount: 1250000, percentage: 44, color: 'bg-blue-500' },
              { category: 'Materials & Supplies', amount: 680000, percentage: 24, color: 'bg-purple-500' },
              { category: 'Rent & Utilities', amount: 320000, percentage: 11, color: 'bg-orange-500' },
              { category: 'Transportation', amount: 180000, percentage: 6, color: 'bg-green-500' },
              { category: 'Marketing', amount: 150000, percentage: 5, color: 'bg-pink-500' },
              { category: 'Others', amount: 265200, percentage: 10, color: 'bg-gray-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700">{item.category}</div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-gray-900">₹{(item.amount / 100000).toFixed(1)}L</div>
                    <Badge variant="outline">{item.percentage}%</Badge>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 10 financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'income', party: 'CIDCO Navi Mumbai', amount: 850000, date: '2026-02-08', invoice: 'INV-2026-045', status: 'received' },
              { type: 'expense', party: 'Material Supplier - ABC Traders', amount: 125000, date: '2026-02-08', invoice: 'EXP-2026-234', status: 'paid' },
              { type: 'income', party: 'Corporate Office - Tech Solutions', amount: 450000, date: '2026-02-07', invoice: 'INV-2026-044', status: 'pending' },
              { type: 'expense', party: 'Salary Payment - February', amount: 625000, date: '2026-02-05', invoice: 'SAL-2026-02', status: 'paid' },
              { type: 'income', party: 'Residential Project - Mr. Sharma', amount: 320000, date: '2026-02-04', invoice: 'INV-2026-043', status: 'received' },
            ].map((txn, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    txn.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {txn.type === 'income' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{txn.party}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-600">{txn.invoice}</p>
                      <p className="text-xs text-gray-500">{format(new Date(txn.date), 'dd MMM yyyy')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-lg font-bold ${
                    txn.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}₹{(txn.amount / 100000).toFixed(1)}L
                  </div>
                  <Badge variant={txn.status === 'received' || txn.status === 'paid' ? 'default' : 'secondary'}>
                    {txn.status === 'received' || txn.status === 'paid' ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Invoice Generator Component
function InvoiceGenerator() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '', projectName: '', amount: '', gstRate: '18', dueDate: '', notes: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchInvoices(); }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sales/invoices');
      const data = await res.json();
      if (data.success) setInvoices(data.data || []);
    } catch {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!formData.clientName || !formData.amount) {
      toast.error('Client name and amount are required');
      return;
    }
    setSaving(true);
    try {
      const base = parseFloat(formData.amount);
      const gst = (base * parseFloat(formData.gstRate)) / 100;
      const res = await fetch('/api/sales/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice: {
            clientName: formData.clientName,
            projectName: formData.projectName,
            subtotal: base.toFixed(2),
            taxAmount: gst.toFixed(2),
            totalAmount: (base + gst).toFixed(2),
            dueDate: formData.dueDate || null,
            notes: formData.notes,
            status: 'pending',
          },
          items: [{ description: formData.projectName || 'Service', quantity: 1, unitPrice: base.toFixed(2), totalPrice: base.toFixed(2) }],
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('✅ Invoice created!');
        setShowForm(false);
        setFormData({ clientName: '', projectName: '', amount: '', gstRate: '18', dueDate: '', notes: '' });
        fetchInvoices();
      } else {
        toast.error('Failed: ' + data.error);
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // Fallback static data if DB is empty
  const staticInvoices = [
    { id: 'INV-2026-045', clientName: 'CIDCO Navi Mumbai', projectName: 'Government Office Interior', subtotal: '850000', taxAmount: '153000', totalAmount: '1003000', createdAt: '2026-02-08', dueDate: '2026-03-10', status: 'paid' },
    { id: 'INV-2026-044', clientName: 'Tech Solutions Pvt Ltd', projectName: 'Corporate Office Design', subtotal: '450000', taxAmount: '81000', totalAmount: '531000', createdAt: '2026-02-07', dueDate: '2026-03-09', status: 'pending' },
    { id: 'INV-2026-043', clientName: 'Mr. Rajesh Sharma', projectName: 'Residential Interior', subtotal: '320000', taxAmount: '57600', totalAmount: '377600', createdAt: '2026-02-04', dueDate: '2026-03-06', status: 'paid' },
  ];
  const displayInvoices = invoices.length > 0 ? invoices : staticInvoices;

  return (
    <div className="space-y-6">
      {/* Invoice Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Generator</CardTitle>
          <CardDescription>Create and manage GST invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus className="h-4 w-4" />
              {showForm ? 'Cancel' : 'Create New Invoice'}
            </Button>
            <Button variant="outline" className="gap-2" onClick={fetchInvoices}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Invoice Form */}
      {showForm && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>New Invoice</CardTitle>
            <CardDescription>Create a GST invoice for a client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Client Name *</Label>
                <Input className="mt-2" placeholder="Client / Company name" value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
              </div>
              <div>
                <Label>Project Name</Label>
                <Input className="mt-2" placeholder="Project description" value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
              </div>
              <div>
                <Label>Amount (₹) *</Label>
                <Input className="mt-2" type="number" placeholder="Base amount" value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
              </div>
              <div>
                <Label>GST Rate</Label>
                <Select value={formData.gstRate} onValueChange={(v) => setFormData({ ...formData, gstRate: v })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[['0', '0%'], ['5', '5%'], ['12', '12%'], ['18', '18%'], ['28', '28%']].map(([v, l]) => (
                      <SelectItem key={v} value={v}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Due Date</Label>
                <Input className="mt-2" type="date" value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
              </div>
              <div>
                <Label>Notes</Label>
                <Input className="mt-2" placeholder="Additional notes" value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
              </div>
              {formData.amount && (
                <div className="col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">📄 Invoice Summary:</p>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div>Base: <strong>₹{parseFloat(formData.amount || '0').toLocaleString('en-IN')}</strong></div>
                    <div>GST ({formData.gstRate}%): <strong>₹{((parseFloat(formData.amount || '0') * parseFloat(formData.gstRate)) / 100).toLocaleString('en-IN')}</strong></div>
                    <div>Total: <strong className="text-blue-700">₹{(parseFloat(formData.amount || '0') * (1 + parseFloat(formData.gstRate) / 100)).toLocaleString('en-IN')}</strong></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCreateInvoice} disabled={saving} className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                {saving ? 'Creating...' : 'Create Invoice'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices ({displayInvoices.length})</CardTitle>
          <CardDescription>GST invoices — {invoices.length > 0 ? 'from database' : 'sample data (no invoices in DB yet)'}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {displayInvoices.map((invoice: any) => (
                <div key={invoice.id || invoice.invoiceNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{invoice.invoiceNumber || invoice.id}</p>
                      <p className="text-sm text-gray-700 mt-1">{invoice.clientName || invoice.client}</p>
                      <p className="text-xs text-gray-600 mt-1">{invoice.projectName || invoice.project}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Base: ₹{parseFloat(invoice.subtotal || invoice.amount || 0).toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-600">GST: ₹{parseFloat(invoice.taxAmount || invoice.gst || 0).toLocaleString('en-IN')}</p>
                      <p className="text-sm font-bold text-gray-900">Total: ₹{parseFloat(invoice.totalAmount || invoice.total || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">
                        {invoice.createdAt || invoice.date ? format(new Date(invoice.createdAt || invoice.date), 'dd MMM yyyy') : '—'}
                      </p>
                      {(invoice.dueDate) && (
                        <p className="text-xs text-gray-500">Due: {format(new Date(invoice.dueDate), 'dd MMM yyyy')}</p>
                      )}
                      <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'pending' ? 'secondary' : 'destructive'} className="mt-2">
                        {invoice.status === 'paid' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {invoice.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {invoice.status === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const EMPTY_FORM = {
  category: '',
  description: '',
  amount: '',
  gstRate: '18',
  paymentMode: '',
  paymentDate: new Date().toISOString().split('T')[0],
  vendor: '',
  invoiceNumber: '',
};

// Expense Tracker Component
function ExpenseTracker() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editExpense, setEditExpense] = useState<any | null>(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      setFetching(true);
      const response = await fetch('/api/finance/expenses?limit=100');
      const data = await response.json();
      if (data.success) setExpenses(data.expenses || []);
    } catch (error) {
      toast.error('Failed to load expenses');
    } finally {
      setFetching(false);
    }
  };

  const handleAddExpense = async () => {
    if (!formData.category || !formData.description || !formData.amount || !formData.paymentMode) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/finance/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`✅ Expense added! ID: ${data.expenseId}`);
        setShowAddForm(false);
        setFormData({ ...EMPTY_FORM });
        fetchExpenses();
      } else {
        toast.error('Failed: ' + data.error);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditExpense = async () => {
    if (!editExpense) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/expenses/${editExpense.expenseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('✅ Expense updated successfully!');
        setEditExpense(null);
        setFormData({ ...EMPTY_FORM });
        fetchExpenses();
      } else {
        toast.error('Update failed: ' + data.error);
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId: string, description: string) => {
    if (!confirm(`Delete expense "${description}"? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/finance/expenses/${expenseId}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success('🗑️ Expense deleted');
        fetchExpenses();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const openEdit = (expense: any) => {
    setEditExpense(expense);
    setFormData({
      category: expense.category || '',
      description: expense.description || '',
      amount: expense.amount || '',
      gstRate: expense.gstRate || '18',
      paymentMode: expense.paymentMode || '',
      paymentDate: expense.paymentDate
        ? new Date(expense.paymentDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      vendor: expense.vendor || '',
      invoiceNumber: expense.invoiceNumber || '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Expense Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
          <CardDescription>Track daily business expenses with GST</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button
              className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              onClick={() => { setShowAddForm(!showAddForm); setEditExpense(null); setFormData({ ...EMPTY_FORM }); }}
            >
              <Plus className="h-4 w-4" />
              {showAddForm ? 'Cancel' : 'Add Expense'}
            </Button>
            <Button variant="outline" className="gap-2" onClick={fetchExpenses}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => {
              const csv = ['ID,Category,Description,Amount,GST,Total,Vendor,Date,Mode',
                ...expenses.map(e => `${e.expenseId},${e.category},"${e.description}",${e.amount},${e.gstAmount},${e.totalAmount},${e.vendor || ''},${e.paymentDate},${e.paymentMode}`)
              ].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'expenses.csv'; a.click();
              toast.success(`Exported ${expenses.length} expenses`);
            }}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Expense Form */}
      {showAddForm && (
        <Card className="border-2 border-orange-500">
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Enter expense details with GST calculation</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm formData={formData} setFormData={setFormData} />
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddExpense} disabled={loading} className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {loading ? 'Adding...' : 'Add Expense'}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Expense Modal */}
      <Dialog open={!!editExpense} onOpenChange={(open) => { if (!open) { setEditExpense(null); setFormData({ ...EMPTY_FORM }); } }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Edit className="h-5 w-5 text-blue-600" /> Edit Expense</DialogTitle>
            <DialogDescription>Update expense: {editExpense?.expenseId}</DialogDescription>
          </DialogHeader>
          <ExpenseForm formData={formData} setFormData={setFormData} />
          <div className="flex gap-3 mt-4">
            <Button onClick={handleEditExpense} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={() => { setEditExpense(null); setFormData({ ...EMPTY_FORM }); }}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle>All Expenses ({expenses.length})</CardTitle>
          <CardDescription>Business expenses with GST — from database</CardDescription>
        </CardHeader>
        <CardContent>
          {fetching ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No expenses yet</p>
              <p className="text-sm">Click "Add Expense" to create your first entry!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{expense.expenseId}</p>
                      <p className="text-sm text-gray-700 mt-1">{expense.description}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <Badge variant="outline">{expense.category}</Badge>
                        <span className="text-xs text-gray-600">{expense.paymentMode}</span>
                        {expense.vendor && <span className="text-xs text-gray-500">📦 {expense.vendor}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Base: ₹{parseFloat(expense.amount || 0).toLocaleString('en-IN')}</p>
                      {parseFloat(expense.gstAmount || 0) > 0 && (
                        <p className="text-sm text-gray-600">GST: ₹{parseFloat(expense.gstAmount || 0).toLocaleString('en-IN')}</p>
                      )}
                      <p className="text-sm font-bold text-gray-900">Total: ₹{parseFloat(expense.totalAmount || expense.amount || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">
                        {expense.paymentDate ? format(new Date(expense.paymentDate), 'dd MMM yyyy') : '—'}
                      </p>
                      <Badge variant={expense.status === 'paid' ? 'default' : 'secondary'} className="mt-2">
                        {expense.status === 'paid' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                        {expense.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(expense)} title="Edit">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 border-red-200"
                        onClick={() => handleDeleteExpense(expense.expenseId, expense.description)}
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Shared Expense Form Fields
function ExpenseForm({ formData, setFormData }: { formData: any; setFormData: (d: any) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Category *</Label>
        <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {['Materials', 'Salaries', 'Utilities', 'Transportation', 'Marketing', 'Rent', 'Others'].map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Payment Mode *</Label>
        <Select value={formData.paymentMode} onValueChange={(v) => setFormData({ ...formData, paymentMode: v })}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Select mode" /></SelectTrigger>
          <SelectContent>
            {['Cash', 'Bank Transfer', 'Cheque', 'Online', 'UPI'].map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Label>Description *</Label>
        <Input className="mt-2" placeholder="Enter expense description" value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div>
        <Label>Amount (₹) *</Label>
        <Input className="mt-2" type="number" placeholder="Enter amount" value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
      </div>
      <div>
        <Label>GST Rate (%)</Label>
        <Select value={formData.gstRate} onValueChange={(v) => setFormData({ ...formData, gstRate: v })}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[['0', '0% (No GST)'], ['5', '5%'], ['12', '12%'], ['18', '18%'], ['28', '28%']].map(([v, l]) => (
              <SelectItem key={v} value={v}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Vendor</Label>
        <Input className="mt-2" placeholder="Vendor name" value={formData.vendor}
          onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} />
      </div>
      <div>
        <Label>Invoice Number</Label>
        <Input className="mt-2" placeholder="Invoice/Bill number" value={formData.invoiceNumber}
          onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })} />
      </div>
      <div>
        <Label>Payment Date *</Label>
        <Input className="mt-2" type="date" value={formData.paymentDate}
          onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })} />
      </div>
      {formData.amount && (
        <div className="col-span-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800">💰 GST Calculation:</p>
          <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
            <div><span className="text-gray-600">Base:</span> <strong>₹{parseFloat(formData.amount || 0).toLocaleString('en-IN')}</strong></div>
            <div><span className="text-gray-600">GST ({formData.gstRate}%):</span> <strong>₹{((parseFloat(formData.amount || 0) * parseFloat(formData.gstRate || 0)) / 100).toLocaleString('en-IN')}</strong></div>
            <div><span className="text-gray-600">Total:</span> <strong className="text-green-700">₹{(parseFloat(formData.amount || 0) * (1 + parseFloat(formData.gstRate || 0) / 100)).toLocaleString('en-IN')}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sales & Purchase Register Component
function SalesPurchaseRegister() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Register */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Register</CardTitle>
          <CardDescription>Daily/Monthly/Annual sales records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { month: 'February 2026', sales: 7935000, invoices: 18, gst: 1428300 },
                { month: 'January 2026', sales: 7450000, invoices: 16, gst: 1341000 },
                { month: 'December 2025', sales: 8120000, invoices: 21, gst: 1461600 },
                { month: 'November 2025', sales: 7680000, invoices: 19, gst: 1382400 },
              ].map((record, idx) => (
                <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{record.month}</p>
                    <Badge variant="outline">{record.invoices} Invoices</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Sales Amount</p>
                      <p className="font-bold text-green-600">₹{(record.sales / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-gray-600">GST Collected</p>
                      <p className="font-bold text-gray-900">₹{(record.gst / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Register */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Register</CardTitle>
          <CardDescription>Daily/Monthly/Annual purchase records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { month: 'February 2026', purchases: 2845200, bills: 34, gst: 512136 },
                { month: 'January 2026', purchases: 2650000, bills: 31, gst: 477000 },
                { month: 'December 2025', purchases: 2980000, bills: 38, gst: 536400 },
                { month: 'November 2025', purchases: 2720000, bills: 33, gst: 489600 },
              ].map((record, idx) => (
                <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{record.month}</p>
                    <Badge variant="outline">{record.bills} Bills</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Purchase Amount</p>
                      <p className="font-bold text-red-600">₹{(record.purchases / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-gray-600">GST Paid</p>
                      <p className="font-bold text-gray-900">₹{(record.gst / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// GST Management Component
function GSTManagement() {
  return (
    <div className="space-y-6">
      {/* GST Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Output GST (Sales)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹14,28,300</div>
            <p className="text-xs text-gray-600 mt-1">GST Collected (Feb 2026)</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Input GST (Purchase)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹5,12,136</div>
            <p className="text-xs text-gray-600 mt-1">GST Paid (Feb 2026)</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Net GST Payable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹9,16,164</div>
            <p className="text-xs text-gray-600 mt-1">To be paid (Feb 2026)</p>
          </CardContent>
        </Card>
      </div>

      {/* GST Returns */}
      <Card>
        <CardHeader>
          <CardTitle>GST Returns Filing</CardTitle>
          <CardDescription>GSTR-1, GSTR-3B, and annual returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'GSTR-1', period: 'February 2026', dueDate: '2026-03-11', status: 'pending', amount: 1428300 },
              { type: 'GSTR-3B', period: 'February 2026', dueDate: '2026-03-20', status: 'pending', amount: 916164 },
              { type: 'GSTR-1', period: 'January 2026', dueDate: '2026-02-11', status: 'filed', amount: 1341000 },
              { type: 'GSTR-3B', period: 'January 2026', dueDate: '2026-02-20', status: 'filed', amount: 864000 },
            ].map((gstr, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    gstr.status === 'filed' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <FileCheck className={`h-5 w-5 ${
                      gstr.status === 'filed' ? 'text-green-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{gstr.type}</p>
                    <p className="text-sm text-gray-700 mt-1">{gstr.period}</p>
                    <p className="text-xs text-gray-600 mt-1">Due: {format(new Date(gstr.dueDate), 'dd MMM yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{(gstr.amount / 100000).toFixed(2)}L</p>
                  </div>
                  <Badge variant={gstr.status === 'filed' ? 'default' : 'secondary'}>
                    {gstr.status === 'filed' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                    {gstr.status}
                  </Badge>
                  {gstr.status === 'pending' && (
                    <Button size="sm" className="gap-1">
                      <FileCheck className="h-3 w-3" />
                      File Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Compliance Center Component
function ComplianceCenter() {
  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">MCA Filings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <Badge variant="default">Up to date</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">TDS Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">!</div>
              <Badge variant="secondary">Due Soon</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">PF/ESI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <Badge variant="default">Paid</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Labour Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <Badge variant="default">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Calendar</CardTitle>
          <CardDescription>Upcoming statutory filings and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { task: 'TDS Return - Q4 FY 2025-26', dueDate: '2026-02-15', status: 'pending', priority: 'high', amount: 125000 },
              { task: 'PF Payment - February 2026', dueDate: '2026-03-15', status: 'pending', priority: 'medium', amount: 85000 },
              { task: 'ESI Payment - February 2026', dueDate: '2026-03-21', status: 'pending', priority: 'medium', amount: 32000 },
              { task: 'Professional Tax - Q4', dueDate: '2026-03-31', status: 'pending', priority: 'low', amount: 12000 },
              { task: 'Labour Welfare Fund', dueDate: '2026-03-31', status: 'pending', priority: 'low', amount: 5000 },
            ].map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    task.priority === 'high' ? 'bg-red-100' :
                    task.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <FileCheck className={`h-5 w-5 ${
                      task.priority === 'high' ? 'text-red-600' :
                      task.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{task.task}</p>
                    <p className="text-sm text-gray-600 mt-1">Due: {format(new Date(task.dueDate), 'dd MMM yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{task.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                    {task.priority}
                  </Badge>
                  <Button size="sm" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statutory Registers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Registers</CardTitle>
            <CardDescription>PF, ESI, and labour compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { register: 'PF Register', employees: 24, lastUpdated: '2026-02-08', status: 'updated' },
                { register: 'ESI Register', employees: 18, lastUpdated: '2026-02-08', status: 'updated' },
                { register: 'Attendance Register', employees: 24, lastUpdated: '2026-02-09', status: 'updated' },
                { register: 'Wage Register', employees: 24, lastUpdated: '2026-02-05', status: 'pending' },
              ].map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{reg.register}</p>
                    <p className="text-xs text-gray-600 mt-1">{reg.employees} Employees</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Last Updated</p>
                    <p className="text-xs font-semibold text-gray-900">{format(new Date(reg.lastUpdated), 'dd MMM yyyy')}</p>
                    <Badge variant={reg.status === 'updated' ? 'default' : 'secondary'} className="mt-1">
                      {reg.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Deductions (TDS)</CardTitle>
            <CardDescription>Quarterly TDS summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { section: '194C - Contractors', amount: 85000, deducted: 8500, quarter: 'Q4 FY25-26' },
                { section: '194J - Professional Fees', amount: 120000, deducted: 12000, quarter: 'Q4 FY25-26' },
                { section: '194I - Rent', amount: 240000, deducted: 24000, quarter: 'Q4 FY25-26' },
              ].map((tds, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{tds.section}</p>
                    <Badge variant="outline">{tds.quarter}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Payment Amount</p>
                      <p className="font-bold text-gray-900">₹{tds.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">TDS Deducted</p>
                      <p className="font-bold text-blue-600">₹{tds.deducted.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Financial Reports Component
function FinancialReports() {
  return (
    <div className="space-y-6">
      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>Generate comprehensive financial statements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <FileText className="h-4 w-4" />
              P&L Statement
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <BarChart3 className="h-4 w-4" />
              Balance Sheet
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              <TrendingUp className="h-4 w-4" />
              Cash Flow
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Calculator className="h-4 w-4" />
              Trial Balance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profit & Loss Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Statement</CardTitle>
          <CardDescription>FY 2025-26 (Apr 2025 - Feb 2026)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Revenue Section */}
            <div className="border-b pb-4">
              <p className="font-bold text-gray-900 mb-3">Revenue</p>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">Sales Revenue</p>
                  <p className="font-semibold text-gray-900">₹45,28,500</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Other Income</p>
                  <p className="font-semibold text-gray-900">₹1,25,000</p>
                </div>
                <div className="flex justify-between font-bold text-green-600 pt-2 border-t">
                  <p>Total Revenue</p>
                  <p>₹46,53,500</p>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="border-b pb-4">
              <p className="font-bold text-gray-900 mb-3">Expenses</p>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">Salaries & Wages</p>
                  <p className="font-semibold text-gray-900">₹12,50,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Materials & Supplies</p>
                  <p className="font-semibold text-gray-900">₹8,45,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Rent & Utilities</p>
                  <p className="font-semibold text-gray-900">₹3,20,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Transportation</p>
                  <p className="font-semibold text-gray-900">₹1,85,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Marketing & Advertising</p>
                  <p className="font-semibold text-gray-900">₹1,50,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Other Expenses</p>
                  <p className="font-semibold text-gray-900">₹95,200</p>
                </div>
                <div className="flex justify-between font-bold text-red-600 pt-2 border-t">
                  <p>Total Expenses</p>
                  <p>₹28,45,200</p>
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Net Profit (Before Tax)</p>
                <p className="text-2xl font-bold text-blue-600">₹18,08,300</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">Profit Margin: 38.9%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Revenue vs Expenses (Last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: 'Sep 2025', revenue: 6850000, expenses: 4250000 },
                { month: 'Oct 2025', revenue: 7250000, expenses: 4580000 },
                { month: 'Nov 2025', revenue: 7680000, expenses: 4820000 },
                { month: 'Dec 2025', revenue: 8120000, expenses: 5150000 },
                { month: 'Jan 2026', revenue: 7450000, expenses: 4680000 },
                { month: 'Feb 2026', revenue: 7935000, expenses: 4965200 },
              ].map((data, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{data.month}</p>
                    <p className="text-sm font-bold text-blue-600">Profit: ₹{((data.revenue - data.expenses) / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-6 bg-green-500 rounded" style={{ width: `${(data.revenue / 10000000) * 100}%` }} />
                    <div className="flex-1 h-6 bg-red-500 rounded" style={{ width: `${(data.expenses / 10000000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Financial Ratios</CardTitle>
            <CardDescription>Performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { ratio: 'Gross Profit Margin', value: '38.9%', status: 'good' },
                { ratio: 'Operating Expense Ratio', value: '61.1%', status: 'average' },
                { ratio: 'Current Ratio', value: '2.45', status: 'good' },
                { ratio: 'Debt-to-Equity Ratio', value: '0.35', status: 'good' },
                { ratio: 'Return on Investment', value: '24.5%', status: 'excellent' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{item.ratio}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    <Badge variant={item.status === 'excellent' || item.status === 'good' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
