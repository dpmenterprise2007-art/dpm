import { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import {
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  Mail,
  TrendingUp,
  Eye,
  MousePointerClick,
  BarChart3,
  FileText,
  CheckCircle2,
  Download,
  Plus,
  Trash2,
  Copy,
  Youtube,
  MapPin,
  MessageCircle,
  ExternalLink,
  Share2,
  Sparkles,
  RefreshCw,
  Loader2,
  Users,
} from 'lucide-react';
import { format } from 'date-fns';

export default function MarketingHub() {
  const [activeTab, setActiveTab] = useState('social');

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>Marketing Hub | DPM Enterprise</title>
        <meta name="description" content="Marketing hub for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/marketing" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Hub</h1>
            <p className="text-gray-600 mt-1">Manage social media, email campaigns, and content</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Social Media Quick Links */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-600" />
              Social Media Hub - Quick Access
            </CardTitle>
            <CardDescription>Connect with DPM Enterprise on all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* WhatsApp Business */}
              <a
                href="https://wa.me/919930998063"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
                  <p className="text-xs text-gray-600">Business Chat</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
              </a>

              {/* LinkedIn Profile */}
              <a
                href="https://linkedin.com/in/dharmendra-suthar-dpm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">LinkedIn</p>
                  <p className="text-xs text-gray-600">Professional</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/dpmenterprise2007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                  <Instagram className="h-5 w-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Instagram</p>
                  <p className="text-xs text-gray-600">@dpmenterprise2007</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-pink-600" />
              </a>

              {/* Facebook Page */}
              <a
                href="https://facebook.com/dpmenterprise2007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Facebook</p>
                  <p className="text-xs text-gray-600">Business Page</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </a>

              {/* YouTube Channel */}
              <a
                href="https://youtube.com/@dpmenterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <Youtube className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">YouTube</p>
                  <p className="text-xs text-gray-600">Video Channel</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
              </a>

              {/* Google Business */}
              <a
                href="https://www.google.com/search?q=DPM+Enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all group"
              >
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Google</p>
                  <p className="text-xs text-gray-600">Business Profile</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange-600" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2K</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4%</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-3 w-3" />
                8 scheduled, 4 running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +18.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="social" className="gap-2">
              <Facebook className="h-4 w-4" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Campaigns
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              Content Library
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <SocialMediaManager />
          </TabsContent>

          {/* Email Campaigns Tab */}
          <TabsContent value="email" className="space-y-6">
            <EmailCampaignBuilder />
          </TabsContent>

          {/* Content Library Tab */}
          <TabsContent value="content" className="space-y-6">
            <ContentLibrary />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}

// AI Content Templates for DPM Enterprise
const AI_TEMPLATES = [
  {
    label: 'Project Showcase',
    content: '🏢 Excited to share our latest project! DPM Enterprise just completed a stunning interior transformation. From concept to completion, our team delivers excellence in every detail.\n\n✅ Premium materials\n✅ On-time delivery\n✅ Client satisfaction guaranteed\n\nLooking to transform your space? Contact us today!',
    hashtags: '#DPMEnterprise #InteriorDesign #CorporateInterior #NaViMumbai',
  },
  {
    label: 'Government Project',
    content: '🏛️ Proud to serve the nation! DPM Enterprise successfully delivered another government infrastructure project. Our GeM-registered team brings quality and compliance to every public sector assignment.\n\n🎯 GeM Registered\n🎯 ISO Certified\n🎯 Pan-India Delivery',
    hashtags: '#GeM #GovernmentProjects #DPMEnterprise #Infrastructure',
  },
  {
    label: 'Modular Kitchen',
    content: '🍳 Transform your kitchen into a masterpiece! Our modular kitchen solutions combine functionality with stunning aesthetics. Custom-designed to fit your space and lifestyle perfectly.\n\n💡 Smart storage solutions\n💡 Premium hardware\n💡 10-year warranty',
    hashtags: '#ModularKitchen #HomeInterior #DPMEnterprise #KitchenDesign',
  },
  {
    label: 'Special Offer',
    content: '🎉 LIMITED TIME OFFER! Get 15% off on all corporate interior projects booked this month. DPM Enterprise — your trusted partner for premium workspace solutions.\n\n📞 Call: +91 99309 98063\n🌐 dpmenterprise.in\n\nOffer valid till end of month!',
    hashtags: '#SpecialOffer #CorporateInterior #DPMEnterprise #InteriorDesign',
  },
  {
    label: 'Testimonial',
    content: '⭐⭐⭐⭐⭐ "DPM Enterprise transformed our office beyond expectations. Professional team, quality work, and delivered on time!" — Happy Client\n\nJoin 500+ satisfied clients who trust DPM Enterprise for their interior needs.',
    hashtags: '#ClientTestimonial #DPMEnterprise #InteriorDesign #HappyClients',
  },
];

// Social Media Manager Component
function SocialMediaManager() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [postContent, setPostContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [publishing, setPublishing] = useState(false);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [hashtags, setHashtags] = useState('');
  const [publishResults, setPublishResults] = useState<{ platform: string; success: boolean; postId?: string }[]>([]);

  useEffect(() => { fetchPublishedPosts(); }, []);

  const fetchPublishedPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await fetch('/api/social/auto-post/list');
      const data = await response.json();
      if (data.success) setPublishedPosts(data.posts || []);
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePublish = async () => {
    if (!postContent.trim()) {
      toast.error('Please enter post content');
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    setPublishing(true);
    setPublishResults([]);

    try {
      const hashtagsArray = hashtags.split(/\s+/).filter(h => h.startsWith('#'));
      const results: { platform: string; success: boolean; postId?: string }[] = [];

      for (const platform of selectedPlatforms) {
        const response = await fetch('/api/social/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            platform,
            content: postContent,
            hashtags: hashtagsArray,
            scheduledDate: selectedDate || new Date(),
          }),
        });
        const data = await response.json();
        results.push({ platform, success: data.success, postId: data.postId });
      }

      setPublishResults(results);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        toast.success(`✅ Published to ${successCount} platform${successCount > 1 ? 's' : ''}!${failCount > 0 ? ` (${failCount} failed)` : ''}`);
        setPostContent('');
        setHashtags('');
        setSelectedDate(undefined);
        fetchPublishedPosts();
      } else {
        toast.error('Failed to publish to all platforms');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Delete this post from history?')) return;
    try {
      const res = await fetch('/api/social/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('🗑️ Post deleted');
        fetchPublishedPosts();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const applyTemplate = (template: typeof AI_TEMPLATES[0]) => {
    setPostContent(template.content);
    setHashtags(template.hashtags);
    toast.success(`✨ Template applied: ${template.label}`);
  };

  const [aiTopic, setAiTopic] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) {
      toast.error('Enter a topic first');
      return;
    }
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-social-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          platform: selectedPlatforms[0] || 'instagram',
          tone: 'professional',
          language: 'hinglish',
          count: 1,
        }),
      });
      const data = await res.json();
      if (data.success && data.posts?.length > 0) {
        const post = data.posts[0];
        const content = post.content || '';
        const tags = Array.isArray(post.hashtags) ? post.hashtags.join(' ') : '';
        setPostContent(content);
        setHashtags(tags);
        toast.success('✨ AI content generated!');
      } else if (data.mockMode) {
        toast.error('OpenAI key not configured. Add OPENAI_API_KEY in Settings → Secrets.');
      } else {
        toast.error(data.error || 'AI generation failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setAiGenerating(false);
    }
  };

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Content Generator */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription>Generate real AI content with GPT or use quick templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Real AI Generate */}
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Topic likhein... e.g. modular kitchen offer, government project, Diwali discount"
              value={aiTopic}
              onChange={e => setAiTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAIGenerate()}
            />
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2 shrink-0"
              onClick={handleAIGenerate}
              disabled={aiGenerating}
            >
              {aiGenerating ? (
                <><RefreshCw className="h-4 w-4 animate-spin" />Generating...</>
              ) : (
                <><Sparkles className="h-4 w-4" />AI Generate</>
              )}
            </Button>
          </div>
          {/* Quick Templates */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-semibold">Quick Templates:</p>
            <div className="flex flex-wrap gap-2">
              {AI_TEMPLATES.map((template) => (
                <Button
                  key={template.label}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-purple-200 hover:bg-purple-100 hover:border-purple-400"
                  onClick={() => applyTemplate(template)}
                >
                  <Sparkles className="h-3 w-3 text-purple-500" />
                  {template.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Creator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
              <CardDescription>Publish posts across multiple platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Platform Selection */}
              <div>
                <Label>Select Platforms</Label>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          isSelected
                            ? `${platform.color} text-white border-transparent`
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {platform.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Post Content */}
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs text-purple-600 hover:text-purple-700"
                    onClick={() => setPostContent('')}
                  >
                    Clear
                  </Button>
                </div>
                <Textarea
                  id="post-content"
                  placeholder="What's on your mind? Or use a template above ↑"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[140px] mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">{postContent.length}/2000 characters</p>
              </div>

              {/* Image Upload */}
              <div>
                <Label>Add Image (optional)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <ImageIcon className="h-7 w-7 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Schedule Date (optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Post now'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  placeholder="#InteriorDesign #DPMEnterprise #CorporateInterior"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Space-separated hashtags</p>
              </div>

              {/* Publish Results */}
              {publishResults.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-gray-700">Publish Results:</p>
                  {publishResults.map((r) => (
                    <div key={r.platform} className="flex items-center gap-2 text-sm">
                      {r.success
                        ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                        : <span className="h-4 w-4 text-red-500">✗</span>}
                      <span className="capitalize">{r.platform}</span>
                      {r.success && <span className="text-xs text-gray-500">— {r.postId}</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handlePublish}
                  disabled={publishing}
                >
                  {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {publishing ? 'Publishing...' : `Publish to ${selectedPlatforms.length} Platform${selectedPlatforms.length !== 1 ? 's' : ''}`}
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => {
                  if (postContent) {
                    navigator.clipboard.writeText(postContent + '\n\n' + hashtags);
                    toast.success('Post content copied!');
                  }
                }}>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Published Posts History */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Published Posts</CardTitle>
                  <CardDescription>Posts saved in database</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={fetchPublishedPosts}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingPosts ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : publishedPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Send className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">No posts yet</p>
                  <p className="text-xs">Create your first post!</p>
                </div>
              ) : (
                publishedPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-3 space-y-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-gray-700 line-clamp-2 flex-1">{post.content}</p>
                      <Badge variant="default" className="bg-green-600 shrink-0">
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`${post.platform === 'facebook' ? 'bg-blue-600' : post.platform === 'instagram' ? 'bg-pink-600' : 'bg-blue-700'} p-1 rounded`}>
                        {post.platform === 'facebook' && <Facebook className="h-3 w-3 text-white" />}
                        {post.platform === 'instagram' && <Instagram className="h-3 w-3 text-white" />}
                        {post.platform === 'linkedin' && <Linkedin className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{post.platform}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {post.postedAt ? format(new Date(post.postedAt), 'dd MMM, HH:mm') : '—'}
                      </span>
                    </div>
                    {post.hashtags && (() => {
                      try {
                        const tags = JSON.parse(post.hashtags);
                        return Array.isArray(tags) && tags.length > 0
                          ? <p className="text-xs text-blue-600 truncate">{tags.join(' ')}</p>
                          : null;
                      } catch { return null; }
                    })()}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs gap-1 text-gray-500"
                        onClick={() => {
                          navigator.clipboard.writeText(post.content);
                          toast.success('Copied!');
                        }}
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs gap-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDeletePost(post.postId)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Email Campaign Builder Component
function EmailCampaignBuilder() {
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: '',
    subject: '',
    recipientEmail: '',
    body: '',
    template: '',
  });

  const EMAIL_TEMPLATES = [
    {
      name: 'Welcome Email',
      subject: 'Welcome to DPM Enterprise!',
      body: `Dear Valued Client,

Welcome to DPM Enterprise — your trusted partner for premium interior solutions!

We specialize in:
✅ Corporate & Office Interiors
✅ Government & GeM Projects
✅ Modular Kitchens & Residential
✅ Turnkey Solutions

Our team is ready to transform your space. Contact us at +91 99309 98063 or visit dpmenterprise.in.

Warm regards,
DPM Enterprise Team`,
    },
    {
      name: 'Project Showcase',
      subject: 'See Our Latest Interior Design Projects',
      body: `Dear Client,

We're excited to share our latest completed projects!

🏢 Corporate Office — Navi Mumbai (₹85L project)
🏛️ Government Building — CIDCO (₹1.2Cr project)
🍳 Modular Kitchen — Residential (₹12L project)

Each project reflects our commitment to quality, timely delivery, and client satisfaction.

Ready to start your project? Reply to this email or call +91 99309 98063.

Best regards,
DPM Enterprise`,
    },
    {
      name: 'Special Offer',
      subject: '🎉 Limited Time: 15% OFF on Corporate Interiors',
      body: `Dear Client,

For a limited time, DPM Enterprise is offering 15% discount on all corporate interior projects!

✨ Offer valid this month only
✨ Minimum project value: ₹5 Lakhs
✨ Includes design consultation + execution

Don't miss this opportunity to upgrade your workspace at the best price.

📞 Call: +91 99309 98063
🌐 dpmenterprise.in

Offer expires end of month!

DPM Enterprise Team`,
    },
  ];

  const applyTemplate = (template: typeof EMAIL_TEMPLATES[0]) => {
    setFormData(prev => ({ ...prev, subject: template.subject, body: template.body, campaignName: template.name }));
    toast.success(`Template applied: ${template.name}`);
  };

  const handleSendEmail = async () => {
    if (!formData.subject || !formData.body || !formData.recipientEmail) {
      toast.error('Subject, body, and recipient email are required');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/email/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: formData.campaignName || 'Manual Campaign',
          subject: formData.subject,
          recipients: [formData.recipientEmail],
          body: formData.body,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`✅ Email sent to ${formData.recipientEmail}!`);
        setShowForm(false);
        setFormData({ campaignName: '', subject: '', recipientEmail: '', body: '', template: '' });
      } else {
        toast.error('Send failed: ' + (data.error || data.message || 'Unknown error'));
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const campaigns = [
    { id: 1, name: 'Welcome Series', subject: 'Welcome to DPM Enterprise!', recipients: 245, sent: 245, opened: 168, clicked: 42, status: 'completed', sentDate: '2026-02-05' },
    { id: 2, name: 'Project Showcase', subject: 'See our latest interior design projects', recipients: 1200, sent: 1200, opened: 756, clicked: 189, status: 'completed', sentDate: '2026-02-07' },
    { id: 3, name: 'Special Offer - February', subject: '20% OFF on Modular Kitchen Design', recipients: 850, sent: 0, opened: 0, clicked: 0, status: 'scheduled', sentDate: '2026-02-12' },
  ];

  return (
    <div className="space-y-6">
      {/* Email Templates */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Email Templates
          </CardTitle>
          <CardDescription>Click to apply a template instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {EMAIL_TEMPLATES.map((t) => (
              <Button key={t.name} variant="outline" size="sm" className="gap-2 border-blue-200 hover:bg-blue-100"
                onClick={() => { applyTemplate(t); setShowForm(true); }}>
                <Mail className="h-3 w-3 text-blue-500" />
                {t.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Email Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Send emails to leads and clients</CardDescription>
            </div>
            <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4" />
              {showForm ? 'Cancel' : 'New Campaign'}
            </Button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="border-t pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input className="mt-2" placeholder="e.g. March Newsletter" value={formData.campaignName}
                    onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })} />
                </div>
                <div>
                  <Label>Recipient Email *</Label>
                  <Input className="mt-2" type="email" placeholder="client@example.com" value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Subject *</Label>
                <Input className="mt-2" placeholder="Email subject line" value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>
              <div>
                <Label>Email Body *</Label>
                <Textarea className="mt-2 min-h-[200px] font-mono text-sm" placeholder="Write your email content here..."
                  value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSendEmail} disabled={sending} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? 'Sending...' : 'Send Email'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        )}
        <CardContent className={showForm ? 'border-t pt-6' : ''}>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.subject}</p>
                  </div>
                  <Badge variant={campaign.status === 'completed' ? 'default' : 'secondary'}>{campaign.status}</Badge>
                </div>
                <div className="grid grid-cols-5 gap-4 mb-3">
                  <div><p className="text-xs text-gray-500">Recipients</p><p className="text-lg font-semibold">{campaign.recipients}</p></div>
                  <div><p className="text-xs text-gray-500">Sent</p><p className="text-lg font-semibold">{campaign.sent}</p></div>
                  <div>
                    <p className="text-xs text-gray-500">Opened</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {campaign.opened}
                      {campaign.sent > 0 && <span className="text-xs ml-1">({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Clicked</p>
                    <p className="text-lg font-semibold text-green-600">
                      {campaign.clicked}
                      {campaign.opened > 0 && <span className="text-xs ml-1">({((campaign.clicked / campaign.opened) * 100).toFixed(1)}%)</span>}
                    </p>
                  </div>
                  <div><p className="text-xs text-gray-500">Date</p><p className="text-sm font-medium">{campaign.sentDate}</p></div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" />View Report</Button>
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => {
                    setFormData(prev => ({ ...prev, campaignName: campaign.name + ' (copy)', subject: campaign.subject }));
                    setShowForm(true);
                    toast.success('Campaign duplicated — edit and send!');
                  }}><Copy className="h-3 w-3" />Duplicate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Content Library Component
function ContentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const contentItems = [
    { id: 1, type: 'image', title: 'Corporate Office Design', category: 'Projects', url: '/images/corporate-1.jpg' },
    { id: 2, type: 'image', title: 'Modular Kitchen', category: 'Products', url: '/images/kitchen-1.jpg' },
    { id: 3, type: 'template', title: 'Social Media Post - Offer', category: 'Templates', url: null },
    { id: 4, type: 'image', title: 'Residential Interior', category: 'Projects', url: '/images/residential-1.jpg' },
    { id: 5, type: 'template', title: 'Email Header Design', category: 'Templates', url: null },
    { id: 6, type: 'image', title: 'Government Project', category: 'Projects', url: '/images/government-1.jpg' },
  ];

  const filtered = contentItems.filter(item =>
    (filterType === 'all' || item.type === filterType) &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search content library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Images, templates, and media assets ({filtered.length} items)</CardDescription>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload Content
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  {item.type === 'image' ? (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  ) : (
                    <FileText className="h-12 w-12 text-gray-400" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8"><Eye className="h-3 w-3" /></Button>
                      <Button size="sm" variant="secondary" className="h-8"><Download className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{item.title}</h4>
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Analytics Dashboard Component
function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Total Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">125.4K</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-xs text-gray-600">75%</span>
            </div>
            <p className="text-xs text-green-600 mt-2">+15.3% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <MousePointerClick className="h-4 w-4" />
              Click-Through Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6.8%</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
              <span className="text-xs text-gray-600">68%</span>
            </div>
            <p className="text-xs text-green-600 mt-2">+2.4% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              New Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="text-xs text-gray-600">82%</span>
            </div>
            <p className="text-xs text-green-600 mt-2">+22.1% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2%</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '42%' }} />
              </div>
              <span className="text-xs text-gray-600">42%</span>
            </div>
            <p className="text-xs text-green-600 mt-2">+8.7% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>Engagement metrics across social media platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { platform: 'Facebook', icon: Facebook, color: 'bg-blue-600', reach: '45.2K', engagement: '8.4%', posts: 24 },
              { platform: 'Instagram', icon: Instagram, color: 'bg-pink-600', reach: '38.7K', engagement: '12.1%', posts: 32 },
              { platform: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', reach: '22.5K', engagement: '6.2%', posts: 18 },
            ].map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.platform} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`${platform.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{platform.platform}</h4>
                    <div className="flex gap-6 mt-1">
                      <span className="text-sm text-gray-600">
                        Reach: <span className="font-semibold text-gray-900">{platform.reach}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Engagement: <span className="font-semibold text-green-600">{platform.engagement}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Posts: <span className="font-semibold text-gray-900">{platform.posts}</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Your best performing posts this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                content: 'Transform your office space with our premium corporate interior solutions!',
                platform: 'LinkedIn',
                reach: '12.5K',
                engagement: '15.2%',
                date: '2026-02-05',
              },
              {
                content: 'New project alert! Modern showroom design completed in Navi Mumbai.',
                platform: 'Instagram',
                reach: '9.8K',
                engagement: '18.7%',
                date: '2026-02-07',
              },
              {
                content: 'Government project success! Proud to deliver quality interiors for CIDCO.',
                platform: 'Facebook',
                reach: '8.2K',
                engagement: '12.4%',
                date: '2026-02-06',
              },
            ].map((post, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <Badge variant="secondary">{post.platform}</Badge>
                    <span>Reach: {post.reach}</span>
                    <span className="text-green-600 font-semibold">Engagement: {post.engagement}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
