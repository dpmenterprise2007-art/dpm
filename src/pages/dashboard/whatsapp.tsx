import { useState, useEffect, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  MessageSquare,
  Send,
  Users,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  Zap,
  Radio,
  Inbox,
  Phone,
  Clock,
  Copy,
  AlertCircle,
  Wifi,
  WifiOff,
  Bot,
  ExternalLink,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface WaMessage {
  id: number;
  messageId: string;
  phone: string;
  name: string;
  message: string;
  reply: string | null;
  type: string;
  status: string;
  aiGenerated: boolean;
  sentAt: string;
}

interface ConnectionStatus {
  connected: boolean;
  phoneNumber?: string;
  businessName?: string;
  qualityRating?: string;
  error?: string;
  checking: boolean;
}

// ─── Message Templates ────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    label: '👋 Welcome',
    message: `Namaste! 🙏 DPM Enterprise mein aapka swagat hai!

Hum provide karte hain:
✓ Residential Interior Design
✓ Corporate Office Design
✓ Modular Kitchen
✓ Furniture Manufacturing
✓ Turnkey Solutions

Apna project discuss karne ke liye reply karein ya call karein: +91 99309 98063`,
  },
  {
    label: '🏠 Project Offer',
    message: `DPM Enterprise — Special Offer! 🎉

Is mahine ke liye:
✅ FREE Site Visit & Consultation
✅ 3D Design Preview
✅ Transparent Pricing
✅ On-Time Delivery Guarantee

500+ successful projects | 15+ years experience

Aaj hi contact karein: +91 99309 98063
Website: https://dpmenterprise.in`,
  },
  {
    label: '🏛️ Government Projects',
    message: `DPM Enterprise — Government & Defense Specialist 🏛️

Hum handle karte hain:
✓ GeM Portal registered vendor
✓ Government office interiors
✓ Defense & Navy projects
✓ Municipal corporation work

All documentation & compliance handled.

Contact: +91 99309 98063 | info@dpmenterprise.in`,
  },
  {
    label: '📋 Follow-up',
    message: `Namaste! 🙏

DPM Enterprise ki taraf se follow-up.

Aapke project ke baare mein discuss karna tha. Kya aap available hain ek quick call ke liye?

📞 +91 99309 98063
📧 info@dpmenterprise.in

Hum aapki help karne ke liye taiyar hain! ✅`,
  },
  {
    label: '⭐ Testimonial Request',
    message: `Namaste! 🙏

DPM Enterprise mein aapka project complete hua — dhanyavaad! 🎉

Kya aap hamare baare mein ek short review de sakte hain?

Aapka feedback hamare liye bahut important hai aur doosre customers ki help karta hai.

Google Review: https://g.page/dpmenterprise

Thank you! 🙏`,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhatsAppDashboard() {
  const [messages, setMessages] = useState<WaMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [connection, setConnection] = useState<ConnectionStatus>({ connected: false, checking: true });

  // Send single
  const [sendTo, setSendTo] = useState('');
  const [sendName, setSendName] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Broadcast
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastLimit, setBroadcastLimit] = useState('20');
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<{ sent: number; failed: number; total: number } | null>(null);

  // ── Check connection ────────────────────────────────────────────────────────

  const checkConnection = useCallback(async () => {
    setConnection(prev => ({ ...prev, checking: true }));
    try {
      const res = await fetch('/api/whatsapp/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setConnection({
          connected: true,
          phoneNumber: data.phoneNumber,
          businessName: data.businessName,
          qualityRating: data.qualityRating,
          checking: false,
        });
      } else {
        setConnection({ connected: false, error: data.error || data.message, checking: false });
      }
    } catch {
      setConnection({ connected: false, error: 'Network error', checking: false });
    }
  }, []);

  // ── Fetch messages ──────────────────────────────────────────────────────────

  const fetchMessages = useCallback(async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch('/api/whatsapp/messages?limit=100');
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    fetchMessages();
  }, [checkConnection, fetchMessages]);

  // ── Send single message ─────────────────────────────────────────────────────

  const handleSend = async () => {
    if (!sendTo || !sendMessage) {
      toast.error('Phone number and message are required');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: sendTo, message: sendMessage, name: sendName, type: 'manual' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`✅ Message sent to ${sendTo}`);
        setSendTo('');
        setSendName('');
        setSendMessage('');
        fetchMessages();
      } else {
        toast.error('Send failed: ' + (data.error || data.details?.message || 'Unknown error'));
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSending(false);
    }
  };

  // ── Broadcast ───────────────────────────────────────────────────────────────

  const handleBroadcast = async () => {
    if (!broadcastMessage) {
      toast.error('Message is required');
      return;
    }
    if (!confirm(`Send this message to up to ${broadcastLimit} leads from your database?`)) return;

    setBroadcasting(true);
    setBroadcastResult(null);
    try {
      const res = await fetch('/api/whatsapp/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: broadcastMessage, filter: { limit: parseInt(broadcastLimit) } }),
      });
      const data = await res.json();
      if (data.success) {
        setBroadcastResult({ sent: data.sent, failed: data.failed, total: data.total });
        toast.success(`📢 Broadcast complete: ${data.sent}/${data.total} sent`);
        fetchMessages();
      } else {
        toast.error('Broadcast failed: ' + (data.error || ''));
      }
    } catch {
      toast.error('Network error');
    } finally {
      setBroadcasting(false);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'incoming': return 'bg-blue-100 text-blue-700';
      case 'auto-reply': return 'bg-purple-100 text-purple-700';
      case 'broadcast': return 'bg-orange-100 text-orange-700';
      case 'manual': return 'bg-green-100 text-green-700';
      case 'follow-up': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch { return ts; }
  };

  const incomingCount = messages.filter(m => m.type === 'incoming').length;
  const sentCount = messages.filter(m => m.type !== 'incoming').length;
  const broadcastCount = messages.filter(m => m.type === 'broadcast').length;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 p-6">
      <Helmet>
        <title>WhatsApp Business | DPM Enterprise</title>
        <meta name="description" content="WhatsApp Business management for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/whatsapp" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">WhatsApp Business</h1>
              <p className="text-gray-600 font-medium">Send messages, broadcast to leads, view inbox</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { checkConnection(); fetchMessages(); }}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Connection Status Banner */}
      <Card className={`mb-6 border-2 ${connection.connected ? 'border-green-300 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {connection.checking ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : connection.connected ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <div>
                {connection.checking ? (
                  <p className="font-semibold text-gray-600">Checking connection...</p>
                ) : connection.connected ? (
                  <>
                    <p className="font-bold text-green-700">✅ Connected — {connection.businessName}</p>
                    <p className="text-sm text-green-600">
                      {connection.phoneNumber} · Quality: {connection.qualityRating || 'N/A'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-red-700">❌ Not Connected</p>
                    <p className="text-sm text-red-600">{connection.error || 'Add WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID secrets'}</p>
                  </>
                )}
              </div>
            </div>
            {!connection.connected && !connection.checking && (
              <div className="flex items-center gap-2">
                <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Meta Console
                  </Button>
                </a>
                <Button size="sm" onClick={checkConnection} variant="outline">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-2 border-blue-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Received</p>
                <p className="text-2xl font-black text-blue-600">{incomingCount}</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Sent</p>
                <p className="text-2xl font-black text-green-600">{sentCount}</p>
              </div>
              <Send className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Broadcasts</p>
                <p className="text-2xl font-black text-orange-600">{broadcastCount}</p>
              </div>
              <Radio className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-purple-200">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Total</p>
                <p className="text-2xl font-black text-purple-600">{messages.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="send">
        <TabsList className="mb-6 grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="send">
            <Send className="h-4 w-4 mr-1" />Send
          </TabsTrigger>
          <TabsTrigger value="broadcast">
            <Radio className="h-4 w-4 mr-1" />Broadcast
          </TabsTrigger>
          <TabsTrigger value="inbox">
            <Inbox className="h-4 w-4 mr-1" />Inbox
          </TabsTrigger>
          <TabsTrigger value="setup">
            <Zap className="h-4 w-4 mr-1" />Setup
          </TabsTrigger>
        </TabsList>

        {/* ── Send Tab ──────────────────────────────────────────────────────── */}
        <TabsContent value="send">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-green-600" />
                  Send Message
                </CardTitle>
                <CardDescription>Send a WhatsApp message to any number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    className="mt-1"
                    placeholder="919930998063 (with country code, no +)"
                    value={sendTo}
                    onChange={e => setSendTo(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Include country code: 91 for India</p>
                </div>
                <div>
                  <Label>Recipient Name</Label>
                  <Input
                    className="mt-1"
                    placeholder="Rajesh Kumar"
                    value={sendName}
                    onChange={e => setSendName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Message *</Label>
                  <Textarea
                    className="mt-1"
                    rows={6}
                    placeholder="Type your message here..."
                    value={sendMessage}
                    onChange={e => setSendMessage(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">{sendMessage.length} characters</p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
                  onClick={handleSend}
                  disabled={sending || !connection.connected}
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
                {!connection.connected && (
                  <p className="text-xs text-red-500 text-center">Connect WhatsApp API first (Setup tab)</p>
                )}
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Message Templates
                </CardTitle>
                <CardDescription>Click to load a template into the message box</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {TEMPLATES.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-semibold text-gray-700">{t.label}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        setSendMessage(t.message);
                        toast.success('Template loaded!');
                      }}
                    >
                      <Copy className="h-3 w-3" />
                      Use
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Broadcast Tab ─────────────────────────────────────────────────── */}
        <TabsContent value="broadcast">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-orange-600" />
                  Broadcast to Leads
                </CardTitle>
                <CardDescription>Send one message to multiple leads from your database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    <strong>Important:</strong> Only send to leads who have opted in to receive WhatsApp messages. Unsolicited messages may get your number flagged.
                  </p>
                </div>

                <div>
                  <Label>Max Recipients</Label>
                  <Input
                    className="mt-1"
                    type="number"
                    min="1"
                    max="100"
                    value={broadcastLimit}
                    onChange={e => setBroadcastLimit(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Fetches leads from your database (max 100)</p>
                </div>

                <div>
                  <Label>Broadcast Message *</Label>
                  <Textarea
                    className="mt-1"
                    rows={8}
                    placeholder="Type your broadcast message..."
                    value={broadcastMessage}
                    onChange={e => setBroadcastMessage(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 gap-2"
                  onClick={handleBroadcast}
                  disabled={broadcasting || !connection.connected}
                >
                  {broadcasting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Radio className="h-4 w-4" />}
                  {broadcasting ? `Sending to ${broadcastLimit} leads...` : `Broadcast to ${broadcastLimit} Leads`}
                </Button>

                {broadcastResult && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p className="font-bold text-gray-800">Broadcast Results</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="font-bold">{broadcastResult.sent} sent</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-500">
                        <XCircle className="h-4 w-4" />
                        <span className="font-bold">{broadcastResult.failed} failed</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span className="font-bold">{broadcastResult.total} total</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Broadcast Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Broadcast Templates
                </CardTitle>
                <CardDescription>Ready-to-use broadcast messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {TEMPLATES.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-semibold text-gray-700">{t.label}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        setBroadcastMessage(t.message);
                        toast.success('Template loaded!');
                      }}
                    >
                      <Copy className="h-3 w-3" />
                      Use
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Inbox Tab ─────────────────────────────────────────────────────── */}
        <TabsContent value="inbox">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Inbox className="h-5 w-5 text-blue-600" />
                    Message History
                  </CardTitle>
                  <CardDescription>All incoming and outgoing WhatsApp messages</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchMessages}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">No messages yet</p>
                  <p className="text-sm">Messages will appear here once you start sending or receiving</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {messages.map(msg => (
                    <div key={msg.id} className={`p-4 rounded-lg border ${msg.type === 'incoming' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="font-bold text-gray-900 text-sm">{msg.name}</span>
                          <span className="text-xs text-gray-500">{msg.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {msg.aiGenerated && (
                            <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">AI</Badge>
                          )}
                          <Badge className={`${getTypeColor(msg.type)} border-0 text-xs`}>
                            {msg.type}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(msg.sentAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                      {msg.reply && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Auto-reply sent:</p>
                          <p className="text-sm text-purple-700 whitespace-pre-wrap">{msg.reply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Setup Tab ─────────────────────────────────────────────────────── */}
        <TabsContent value="setup">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Setup Guide
                </CardTitle>
                <CardDescription>Step-by-step WhatsApp Business API setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Create Meta Developer App',
                    desc: 'Go to developers.facebook.com → Create App → Business type',
                    link: 'https://developers.facebook.com/apps',
                    linkText: 'Open Meta Console',
                  },
                  {
                    step: '2',
                    title: 'Add WhatsApp Product',
                    desc: 'In your app dashboard → Add Product → WhatsApp → Set up',
                  },
                  {
                    step: '3',
                    title: 'Get Access Token & Phone Number ID',
                    desc: 'WhatsApp → API Setup → Copy "Temporary access token" and "Phone number ID"',
                  },
                  {
                    step: '4',
                    title: 'Add Secrets',
                    desc: 'Add WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_WEBHOOK_VERIFY_TOKEN in Settings → Secrets',
                  },
                  {
                    step: '5',
                    title: 'Configure Webhook',
                    desc: 'In Meta Console → WhatsApp → Configuration → Webhook URL:',
                    code: `https://9j515avjk1.preview.c24.airoapp.ai/api/whatsapp/webhook`,
                  },
                  {
                    step: '6',
                    title: 'Subscribe to messages',
                    desc: 'In Webhook fields → Subscribe to "messages" field',
                  },
                ].map(item => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                      {item.code && (
                        <div className="mt-1 flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-800 break-all">{item.code}</code>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0"
                            onClick={() => { navigator.clipboard.writeText(item.code!); toast.success('Copied!'); }}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="mt-1 h-6 text-xs gap-1">
                            <ExternalLink className="h-3 w-3" />
                            {item.linkText}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Connection Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-green-600" />
                  Connection Test
                </CardTitle>
                <CardDescription>Verify your WhatsApp API credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${connection.connected ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  {connection.checking ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Checking connection...</span>
                    </div>
                  ) : connection.connected ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-bold">Connected!</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="text-gray-500">Business:</span> <strong>{connection.businessName}</strong></p>
                        <p><span className="text-gray-500">Phone:</span> <strong>{connection.phoneNumber}</strong></p>
                        <p><span className="text-gray-500">Quality:</span> <strong>{connection.qualityRating}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        <span className="font-bold">Not Connected</span>
                      </div>
                      <p className="text-sm text-red-600">{connection.error}</p>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full gap-2"
                  variant="outline"
                  onClick={checkConnection}
                  disabled={connection.checking}
                >
                  {connection.checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Test Connection
                </Button>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-800 mb-1">Webhook URL for Meta Console:</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-blue-700 font-mono break-all flex-1">
                      https://9j515avjk1.preview.c24.airoapp.ai/api/whatsapp/webhook
                    </code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText('https://9j515avjk1.preview.c24.airoapp.ai/api/whatsapp/webhook');
                        toast.success('Webhook URL copied!');
                      }}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">Auto-Reply is Active</p>
                  <p className="text-xs text-yellow-700">
                    When a customer messages your WhatsApp number, the system automatically detects intent (greeting, pricing, services, portfolio) and replies in Hindi or English.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
