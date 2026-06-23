import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  MessageCircle,
  Mail,
  Share2,
  AlertCircle,
  Save,
  RefreshCw,
  Clock,
  Zap,
} from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { toast } from 'sonner';

interface AutomationConfig {
  whatsapp: {
    enabled: boolean;
    phoneNumber: string;
    apiKey: string;
    autoReply: boolean;
    replyTemplate: string;
  };
  email: {
    enabled: boolean;
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  socialMedia: {
    enabled: boolean;
    postsPerDay: number;
    postTimes: string[];
    platforms: {
      facebook: boolean;
      instagram: boolean;
      linkedin: boolean;
      twitter: boolean;
    };
    autoGenerate: boolean;
  };
}

export default function AutomationSettingsPage() {
  const [config, setConfig] = useState<AutomationConfig>({
    whatsapp: {
      enabled: false,
      phoneNumber: '+91',
      apiKey: '',
      autoReply: true,
      replyTemplate:
        'नमस्ते! DPM Enterprise में आपका स्वागत है। हम जल्द ही आपसे संपर्क करेंगे। धन्यवाद!',
    },
    email: {
      enabled: false,
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'info@dpmenterprise.in',
      fromName: 'DPM Enterprise',
    },
    socialMedia: {
      enabled: false,
      postsPerDay: 2,
      postTimes: ['10:00', '16:00'],
      platforms: {
        facebook: true,
        instagram: true,
        linkedin: false,
        twitter: false,
      },
      autoGenerate: true,
    },
  });

  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/automation/config');
      if (response.ok) {
        const data = await response.json();
        if (data.config) {
          setConfig(data.config);
        }
      }
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/automation/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        toast.success('Configuration saved successfully!');
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      toast.error('Failed to save configuration');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async (service: 'whatsapp' | 'email' | 'social') => {
    setTesting(service);
    try {
      const serviceKey = service === 'social' ? 'socialMedia' : service;
      const response = await fetch(`/api/automation/test/${service}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config[serviceKey as keyof AutomationConfig]),
      });

      if (response.ok) {
        toast.success(`${service.toUpperCase()} connection test successful!`);
      } else {
        throw new Error('Connection test failed');
      }
    } catch (error) {
      toast.error(`${service.toUpperCase()} connection test failed`);
    } finally {
      setTesting(null);
    }
  };

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Automation Settings | DPM Enterprise</title>
        <meta name="description" content="Automation settings for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/automation-settings" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary" />
                Automation Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Configure WhatsApp, Email, and Social Media automation
              </p>
            </div>
            <Button onClick={saveConfig} disabled={saving} size="lg">
              {saving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Auto-Reply</p>
                  </div>
                </div>
                {config.whatsapp.enabled ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground">SMTP Config</p>
                  </div>
                </div>
                {config.email.enabled ? (
                  <Badge className="bg-blue-500">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Share2 className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-semibold">Social Media</p>
                    <p className="text-sm text-muted-foreground">
                      {config.socialMedia.postsPerDay} posts/day
                    </p>
                  </div>
                </div>
                {config.socialMedia.enabled ? (
                  <Badge className="bg-purple-500">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Tabs */}
        <Tabs defaultValue="whatsapp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="whatsapp">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="mr-2 h-4 w-4" />
              Social Media
            </TabsTrigger>
          </TabsList>

          {/* WhatsApp Configuration */}
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Auto-Reply Configuration</CardTitle>
                <CardDescription>
                  Automatically respond to WhatsApp messages from leads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whatsapp-enabled" className="text-base">
                      Enable WhatsApp Auto-Reply
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send replies to new WhatsApp messages
                    </p>
                  </div>
                  <Switch
                    id="whatsapp-enabled"
                    checked={config.whatsapp.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        whatsapp: { ...config.whatsapp, enabled: checked },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">WhatsApp Business Number</Label>
                  <Input
                    id="whatsapp-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={config.whatsapp.phoneNumber}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        whatsapp: { ...config.whatsapp, phoneNumber: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api">WhatsApp API Key</Label>
                  <Input
                    id="whatsapp-api"
                    type="password"
                    placeholder="Enter your WhatsApp Business API key"
                    value={config.whatsapp.apiKey}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        whatsapp: { ...config.whatsapp, apiKey: e.target.value },
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Get your API key from WhatsApp Business Platform
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-template">Auto-Reply Template</Label>
                  <textarea
                    id="whatsapp-template"
                    className="w-full min-h-[100px] p-3 border rounded-md"
                    value={config.whatsapp.replyTemplate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        whatsapp: { ...config.whatsapp, replyTemplate: e.target.value },
                      })
                    }
                  />
                </div>

                <Button
                  onClick={() => testConnection('whatsapp')}
                  disabled={testing === 'whatsapp' || !config.whatsapp.apiKey}
                  variant="outline"
                >
                  {testing === 'whatsapp' ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Configuration */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email SMTP Configuration</CardTitle>
                <CardDescription>
                  Configure SMTP settings for automated email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-enabled" className="text-base">
                      Enable Email Automation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send automated emails to leads and customers
                    </p>
                  </div>
                  <Switch
                    id="email-enabled"
                    checked={config.email.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        email: { ...config.email, enabled: checked },
                      })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.gmail.com"
                      value={config.email.smtpHost}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, smtpHost: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      placeholder="587"
                      value={config.email.smtpPort}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, smtpPort: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input
                    id="smtp-user"
                    placeholder="your-email@gmail.com"
                    value={config.email.smtpUser}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        email: { ...config.email, smtpUser: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="App password or SMTP password"
                    value={config.email.smtpPassword}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        email: { ...config.email, smtpPassword: e.target.value },
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    For Gmail, use an App Password (not your regular password)
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      placeholder="info@dpmenterprise.in"
                      value={config.email.fromEmail}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, fromEmail: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      placeholder="DPM Enterprise"
                      value={config.email.fromName}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          email: { ...config.email, fromName: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={() => testConnection('email')}
                  disabled={testing === 'email' || !config.email.smtpUser}
                  variant="outline"
                >
                  {testing === 'email' ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Configuration */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Automation</CardTitle>
                <CardDescription>
                  Automatically generate and post content to social media
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="social-enabled" className="text-base">
                      Enable Social Media Automation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      AI will generate and post content automatically
                    </p>
                  </div>
                  <Switch
                    id="social-enabled"
                    checked={config.socialMedia.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        socialMedia: { ...config.socialMedia, enabled: checked },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="posts-per-day">Posts Per Day</Label>
                  <Input
                    id="posts-per-day"
                    type="number"
                    min="1"
                    max="10"
                    value={config.socialMedia.postsPerDay}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialMedia: {
                          ...config.socialMedia,
                          postsPerDay: parseInt(e.target.value) || 2,
                        },
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    AI will generate {config.socialMedia.postsPerDay} posts daily
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Posting Times</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {config.socialMedia.postTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => {
                            const newTimes = [...config.socialMedia.postTimes];
                            newTimes[index] = e.target.value;
                            setConfig({
                              ...config,
                              socialMedia: { ...config.socialMedia, postTimes: newTimes },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Active Platforms</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                          f
                        </div>
                        <span>Facebook</span>
                      </div>
                      <Switch
                        checked={config.socialMedia.platforms.facebook}
                        onCheckedChange={(checked) =>
                          setConfig({
                            ...config,
                            socialMedia: {
                              ...config.socialMedia,
                              platforms: { ...config.socialMedia.platforms, facebook: checked },
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          IG
                        </div>
                        <span>Instagram</span>
                      </div>
                      <Switch
                        checked={config.socialMedia.platforms.instagram}
                        onCheckedChange={(checked) =>
                          setConfig({
                            ...config,
                            socialMedia: {
                              ...config.socialMedia,
                              platforms: { ...config.socialMedia.platforms, instagram: checked },
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
                          in
                        </div>
                        <span>LinkedIn</span>
                      </div>
                      <Switch
                        checked={config.socialMedia.platforms.linkedin}
                        onCheckedChange={(checked) =>
                          setConfig({
                            ...config,
                            socialMedia: {
                              ...config.socialMedia,
                              platforms: { ...config.socialMedia.platforms, linkedin: checked },
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-black flex items-center justify-center text-white font-bold">
                          𝕏
                        </div>
                        <span>Twitter / X</span>
                      </div>
                      <Switch
                        checked={config.socialMedia.platforms.twitter}
                        onCheckedChange={(checked) =>
                          setConfig({
                            ...config,
                            socialMedia: {
                              ...config.socialMedia,
                              platforms: { ...config.socialMedia.platforms, twitter: checked },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">AI Content Generation</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate engaging posts about interior design
                    </p>
                  </div>
                  <Switch
                    checked={config.socialMedia.autoGenerate}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        socialMedia: { ...config.socialMedia, autoGenerate: checked },
                      })
                    }
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Automation Schedule</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Posts will be generated at {config.socialMedia.postTimes.join(', ')} daily
                        and published to {Object.values(config.socialMedia.platforms).filter(Boolean).length}{' '}
                        active platform(s)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end mt-8">
          <Button onClick={saveConfig} disabled={saving} size="lg">
            {saving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving Configuration...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </Dashboard>
  );
}
