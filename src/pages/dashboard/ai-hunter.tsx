import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Crosshair,
  Zap,
  Brain,
  RefreshCw,
  Play,
  CheckCircle,
  AlertTriangle,
  Clock,
  Flame,
  Target,
  Bot,
  Activity,
  MessageSquare,
  Calendar,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface HunterAction {
  leadId: string;
  action: string;
  priority: string;
  reason: string;
  suggestedMessage?: string;
  followUpDate?: string;
}

interface HunterResult {
  summary: {
    totalLeadsScanned: number;
    autoScored: number;
    hotLeadsFound: number;
    followUpsScheduled: number;
    overdueFollowUps: number;
    staleLeads: number;
    actionsGenerated: number;
  };
  actions: HunterAction[];
  timestamp: string;
}

interface PipelineResult {
  processed: number;
  updated: number;
  results: Array<{ leadId: string; name: string; actions: string[] }>;
  timestamp: string;
}

const PRIORITY_COLOR: Record<string, string> = {
  URGENT: 'bg-red-100 text-red-700 border-red-300',
  HIGH: 'bg-orange-100 text-orange-700 border-orange-300',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  LOW: 'bg-blue-100 text-blue-700 border-blue-300',
};

const ACTION_ICON: Record<string, React.ReactNode> = {
  AUTO_SCORED_HOT: <Flame className="w-4 h-4 text-red-500" />,
  FOLLOWUP_OVERDUE: <AlertTriangle className="w-4 h-4 text-orange-500" />,
  FOLLOWUP_SCHEDULED: <Calendar className="w-4 h-4 text-green-500" />,
  STALE_WARM_LEAD: <Clock className="w-4 h-4 text-yellow-500" />,
};

export default function AIHunterPage() {
  const [hunterResult, setHunterResult] = useState<HunterResult | null>(null);
  const [pipelineResult, setPipelineResult] = useState<PipelineResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [pipelining, setPipelining] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastRun, setLastRun] = useState<string | null>(null);

  async function runHunterScan() {
    setScanning(true);
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + 12, 90)), 400);
    try {
      const res = await fetch('/api/ai/hunter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'scan' }),
      });
      const data = await res.json();
      clearInterval(interval);
      setProgress(100);
      if (data.success) {
        setHunterResult(data);
        setLastRun(new Date().toLocaleTimeString('en-IN'));
        toast.success(`Hunter scan complete — ${data.summary.actionsGenerated} actions generated`);
      } else {
        toast.error(data.error || 'Scan failed');
      }
    } catch {
      clearInterval(interval);
      toast.error('Hunter scan failed');
    } finally {
      setScanning(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }

  async function runAutoPipeline() {
    setPipelining(true);
    try {
      const res = await fetch('/api/ai/auto-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'full' }),
      });
      const data = await res.json();
      if (data.success) {
        setPipelineResult(data);
        toast.success(`Pipeline complete — ${data.updated} leads updated`);
      } else {
        toast.error(data.error || 'Pipeline failed');
      }
    } catch {
      toast.error('Pipeline failed');
    } finally {
      setPipelining(false);
    }
  }

  async function runBothAI() {
    await runHunterScan();
    await runAutoPipeline();
  }

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet><meta name="robots" content="noindex,nofollow" /><title>AI Hunter | DPM Enterprise</title><meta name="description" content="AI Hunter dashboard." /><link rel="canonical" href="https://www.dpmenterprise.in/dashboard/ai-hunter" /></Helmet>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Crosshair className="w-7 h-7 text-red-600" />
              AI Hunter Control
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Autonomous lead hunting, scoring, follow-up scheduling & pipeline automation
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoMode(p => !p)}
              className={autoMode ? 'border-green-400 text-green-600 bg-green-50' : ''}
            >
              <Activity className={`w-4 h-4 mr-2 ${autoMode ? 'animate-pulse text-green-500' : ''}`} />
              {autoMode ? 'Auto ON' : 'Auto Mode'}
            </Button>
            <Button
              size="sm"
              onClick={runBothAI}
              disabled={scanning || pipelining}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Run Full AI Scan
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        {scanning && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>AI Hunter scanning all leads...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow cursor-pointer" onClick={runHunterScan}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Crosshair className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold">AI Hunter Scan</p>
                  <p className="text-xs text-muted-foreground">Find hot leads & overdue follow-ups</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={scanning}
                onClick={e => { e.stopPropagation(); runHunterScan(); }}
              >
                {scanning ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {scanning ? 'Scanning...' : 'Run Hunter'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50 hover:shadow-md transition-shadow cursor-pointer" onClick={runAutoPipeline}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Auto Pipeline</p>
                  <p className="text-xs text-muted-foreground">Score → assign → schedule follow-ups</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={pipelining}
                onClick={e => { e.stopPropagation(); runAutoPipeline(); }}
              >
                {pipelining ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                {pipelining ? 'Running...' : 'Run Pipeline'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">AI Status</p>
                  <p className="text-xs text-muted-foreground">Last run & system health</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Hunter Run</span>
                  <span className="font-medium">{lastRun || 'Not run yet'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auto Mode</span>
                  <Badge className={autoMode ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                    {autoMode ? 'ON' : 'OFF'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Engine</span>
                  <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hunter">
          <TabsList>
            <TabsTrigger value="hunter">
              <Crosshair className="w-4 h-4 mr-2" />
              Hunter Results
            </TabsTrigger>
            <TabsTrigger value="pipeline">
              <Zap className="w-4 h-4 mr-2" />
              Pipeline Results
            </TabsTrigger>
            <TabsTrigger value="automation">
              <Bot className="w-4 h-4 mr-2" />
              Automation Rules
            </TabsTrigger>
          </TabsList>

          {/* Hunter Results */}
          <TabsContent value="hunter" className="space-y-4 mt-4">
            {!hunterResult ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Crosshair className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground">Run the AI Hunter to see results</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={runHunterScan} disabled={scanning}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Hunter Scan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Leads Scanned', value: hunterResult.summary.totalLeadsScanned, color: 'text-blue-600' },
                    { label: 'Auto Scored', value: hunterResult.summary.autoScored, color: 'text-green-600' },
                    { label: 'HOT Found', value: hunterResult.summary.hotLeadsFound, color: 'text-red-600' },
                    { label: 'Follow-ups Set', value: hunterResult.summary.followUpsScheduled, color: 'text-purple-600' },
                    { label: 'Overdue', value: hunterResult.summary.overdueFollowUps, color: 'text-orange-600' },
                    { label: 'Stale Leads', value: hunterResult.summary.staleLeads, color: 'text-yellow-600' },
                    { label: 'Actions', value: hunterResult.summary.actionsGenerated, color: 'text-indigo-600' },
                    { label: 'Timestamp', value: new Date(hunterResult.timestamp).toLocaleTimeString('en-IN'), color: 'text-gray-600' },
                  ].map(s => (
                    <Card key={s.label} className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Action List */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Hunter Actions ({hunterResult.actions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                    {hunterResult.actions.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        All leads are up to date — no actions needed
                      </div>
                    ) : (
                      hunterResult.actions.map((action, i) => (
                        <div key={i} className="p-3 rounded-lg border hover:bg-muted/20 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="mt-0.5">{ACTION_ICON[action.action] || <Activity className="w-4 h-4" />}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-xs text-muted-foreground">{action.leadId}</span>
                                  <Badge className={`text-xs border ${PRIORITY_COLOR[action.priority] || ''}`}>
                                    {action.priority}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">{action.action.replace(/_/g, ' ')}</Badge>
                                </div>
                                <p className="text-sm mt-1">{action.reason}</p>
                                {action.suggestedMessage && (
                                  <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground border-l-2 border-blue-400">
                                    <MessageSquare className="w-3 h-3 inline mr-1" />
                                    {action.suggestedMessage}
                                  </div>
                                )}
                                {action.followUpDate && (
                                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Follow-up: {new Date(action.followUpDate).toLocaleString('en-IN')}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs shrink-0" asChild>
                              <a href={`/dashboard/leads`}>
                                <ArrowRight className="w-3 h-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Pipeline Results */}
          <TabsContent value="pipeline" className="space-y-4 mt-4">
            {!pipelineResult ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground">Run the Auto Pipeline to see results</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={runAutoPipeline} disabled={pipelining}>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Auto Pipeline
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Leads Processed', value: pipelineResult.processed, color: 'text-blue-600' },
                    { label: 'Leads Updated', value: pipelineResult.updated, color: 'text-green-600' },
                    { label: 'Run At', value: new Date(pipelineResult.timestamp).toLocaleTimeString('en-IN'), color: 'text-gray-600' },
                  ].map(s => (
                    <Card key={s.label} className="bg-muted/30">
                      <CardContent className="p-4 text-center">
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Pipeline Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                    {pipelineResult.results.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{r.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{r.leadId}</span>
                        </div>
                        <div className="space-y-0.5">
                          {r.actions.map((a, j) => (
                            <p key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                              {a}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Automation Rules */}
          <TabsContent value="automation" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Auto Lead Scoring',
                  desc: 'Automatically scores all unscored leads based on budget, timeline, project type, and company data',
                  status: 'Active',
                  icon: <Brain className="w-5 h-5 text-purple-600" />,
                  color: 'border-purple-200 bg-purple-50/50',
                },
                {
                  title: 'Follow-up Scheduler',
                  desc: 'Auto-schedules follow-up for new leads within 6 hours of submission',
                  status: 'Active',
                  icon: <Calendar className="w-5 h-5 text-blue-600" />,
                  color: 'border-blue-200 bg-blue-50/50',
                },
                {
                  title: 'Hot Lead Escalation',
                  desc: 'Flags and escalates hot leads with overdue follow-ups as URGENT',
                  status: 'Active',
                  icon: <Flame className="w-5 h-5 text-red-600" />,
                  color: 'border-red-200 bg-red-50/50',
                },
                {
                  title: 'Stale Lead Re-engagement',
                  desc: 'Identifies warm leads older than 7 days and generates re-engagement messages',
                  status: 'Active',
                  icon: <RefreshCw className="w-5 h-5 text-orange-600" />,
                  color: 'border-orange-200 bg-orange-50/50',
                },
                {
                  title: 'Duplicate Detection',
                  desc: 'Real-time phone and email deduplication on all form submissions',
                  status: 'Active',
                  icon: <Shield className="w-5 h-5 text-green-600" />,
                  color: 'border-green-200 bg-green-50/50',
                },
                {
                  title: 'WhatsApp Auto-Reply',
                  desc: 'AI-powered intent detection and auto-reply for incoming WhatsApp messages',
                  status: 'Needs API Key',
                  icon: <MessageSquare className="w-5 h-5 text-yellow-600" />,
                  color: 'border-yellow-200 bg-yellow-50/50',
                },
              ].map(rule => (
                <Card key={rule.title} className={`${rule.color} border`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{rule.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">{rule.title}</p>
                          <Badge className={rule.status === 'Active' ? 'bg-green-100 text-green-700 text-xs' : 'bg-yellow-100 text-yellow-700 text-xs'}>
                            {rule.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{rule.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}
