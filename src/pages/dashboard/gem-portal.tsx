import React, { useState, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Upload, FileText, Calculator, FileCheck, Download, CheckCircle, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function GeMPortalDashboard() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [tenderId, setTenderId] = useState<number | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [boqData, setBoqData] = useState<any>(null);
  const [bidData, setBidData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload Tender PDF
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('tenderPdf', file);
      formData.append('tenderNumber', `GEM-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`);
      formData.append('category', 'Furniture');

      const response = await fetch('/api/gem/tenders/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setTenderId(result.data.tenderId);
        toast.success(`Tender uploaded! ID: ${result.data.tenderId}`);
        setActiveTab('analyze');
      } else {
        toast.error(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze Tender
  const handleAnalyzeTender = async () => {
    if (!tenderId) {
      toast.error('Please upload a tender first');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/gem/tenders/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenderId }),
      });

      const result = await response.json();

      if (result.success) {
        setAnalysisData(result.data.analysis);
        toast.success(`Tender analysed! Win Probability: ${result.data.analysis.recommendation.winProbability}`);
        setActiveTab('boq');
      } else {
        toast.error(`Analysis failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate BOQ Pricing
  const handleCalculateBOQ = async () => {
    if (!analysisData) {
      toast.error('Please analyze tender first');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/gem/boq/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenderId: analysisData.tenderDetails.tenderNumber,
          pricingStrategy: 'balanced',
          boqItems: analysisData.boqItems,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setBoqData(result.data);
        toast.success(`BOQ calculated! Grand Total: ₹${result.data.summary.grandTotal.toLocaleString('en-IN')}`);
        setActiveTab('bid');
      } else {
        toast.error(`BOQ calculation failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Bid
  const handleGenerateBid = async () => {
    if (!tenderId || !boqData) {
      toast.error('Please complete BOQ calculation first');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/gem/bids/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenderId,
          boqData: boqData.summary,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setBidData(result.data);
        toast.success(`Bid generated! Number: ${result.data.bidNumber}`);
        setActiveTab('documents');
      } else {
        toast.error(`Bid generation failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // AI Quick Analysis (no upload needed)
  const [aiTenderTitle, setAiTenderTitle] = useState('');
  const [aiDepartment, setAiDepartment] = useState('');
  const [aiBudget, setAiBudget] = useState('');
  const [aiRequirements, setAiRequirements] = useState('');
  const [aiAnalysisType, setAiAnalysisType] = useState<'tender' | 'boq' | 'bid'>('tender');
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIAnalysis = async () => {
    if (!aiTenderTitle) {
      toast.error('Tender title required');
      return;
    }
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/ai/gem-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: aiAnalysisType,
          tenderTitle: aiTenderTitle,
          department: aiDepartment,
          budget: aiBudget ? parseInt(aiBudget) : undefined,
          requirements: aiRequirements,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data.analysis);
        toast.success(`✅ AI ${aiAnalysisType} analysis complete!`);
      } else {
        toast.error(data.error || data.message || 'AI analysis failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Dashboard config={{ sidebar: dpmDashboardNav.sidebar, header: dpmDashboardNav.header }}>
      <Helmet>
        <title>GeM Portal | DPM Enterprise</title>
        <meta name="description" content="GeM portal management for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/gem-portal" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">GeM Tender Automation Portal</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered tender analysis, BOQ pricing, and bid generation system
          </p>
        </div>

        {/* AI Quick Analysis */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Quick Analysis — No Upload Needed
            </CardTitle>
            <CardDescription>Enter tender details and get instant GPT-powered analysis, BOQ, or bid document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Tender Title *</label>
                <input
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. Office Furniture Supply & Installation"
                  value={aiTenderTitle}
                  onChange={e => setAiTenderTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Department</label>
                <input
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. Ministry of Defence, NMMC"
                  value={aiDepartment}
                  onChange={e => setAiDepartment(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Budget (₹)</label>
                <input
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. 2500000"
                  type="number"
                  value={aiBudget}
                  onChange={e => setAiBudget(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Analysis Type</label>
                <select
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={aiAnalysisType}
                  onChange={e => setAiAnalysisType(e.target.value as 'tender' | 'boq' | 'bid')}
                >
                  <option value="tender">Tender Analysis (Win probability, strategy)</option>
                  <option value="boq">BOQ Generation (Itemised cost breakdown)</option>
                  <option value="bid">Bid Document (Full proposal writing)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Requirements / Scope</label>
              <textarea
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={3}
                placeholder="Describe the work scope, items required, special conditions..."
                value={aiRequirements}
                onChange={e => setAiRequirements(e.target.value)}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
              onClick={handleAIAnalysis}
              disabled={aiLoading}
            >
              {aiLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Analysing with AI...</> : <><Sparkles className="h-4 w-4" />Run AI Analysis</>}
            </Button>

            {/* AI Result */}
            {aiResult && (
              <div className="mt-4 p-4 bg-white border-2 border-purple-200 rounded-xl space-y-3">
                <p className="font-bold text-purple-800 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> AI Analysis Result
                </p>
                {aiAnalysisType === 'tender' && (
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                      <span className="font-semibold">Win Probability:</span>
                      <Badge className={aiResult.winProbability >= 70 ? 'bg-green-100 text-green-700' : aiResult.winProbability >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>
                        {aiResult.winProbability}%
                      </Badge>
                      <Badge className={aiResult.recommendation === 'GO' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}>
                        {aiResult.recommendation}
                      </Badge>
                    </div>
                    {aiResult.summary && <p className="text-gray-700">{aiResult.summary}</p>}
                    {aiResult.bidStrategy && <p><span className="font-semibold">Strategy:</span> {aiResult.bidStrategy}</p>}
                    {aiResult.advantages?.length > 0 && (
                      <div><span className="font-semibold">Advantages:</span>
                        <ul className="list-disc ml-4">{aiResult.advantages.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul>
                      </div>
                    )}
                    {aiResult.recommendedBidAmount && (
                      <p><span className="font-semibold">Recommended Bid:</span> ₹{aiResult.recommendedBidAmount.toLocaleString('en-IN')}</p>
                    )}
                  </div>
                )}
                {aiAnalysisType === 'boq' && aiResult.items && (
                  <div className="space-y-2 text-sm overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border px-2 py-1 text-left">Item</th>
                          <th className="border px-2 py-1">Unit</th>
                          <th className="border px-2 py-1">Qty</th>
                          <th className="border px-2 py-1">Rate</th>
                          <th className="border px-2 py-1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aiResult.items.map((item: any, i: number) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="border px-2 py-1">{item.description}</td>
                            <td className="border px-2 py-1 text-center">{item.unit}</td>
                            <td className="border px-2 py-1 text-center">{item.quantity}</td>
                            <td className="border px-2 py-1 text-right">₹{item.unitRate?.toLocaleString('en-IN')}</td>
                            <td className="border px-2 py-1 text-right font-semibold">₹{item.totalWithGst?.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="font-bold text-right text-green-700">Grand Total: ₹{aiResult.grandTotal?.toLocaleString('en-IN')}</p>
                  </div>
                )}
                {aiAnalysisType === 'bid' && (
                  <div className="space-y-3 text-sm">
                    {aiResult.coverLetter && (
                      <div>
                        <p className="font-semibold text-gray-800">Cover Letter:</p>
                        <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">{aiResult.coverLetter}</p>
                      </div>
                    )}
                    {aiResult.technicalApproach && (
                      <div>
                        <p className="font-semibold text-gray-800">Technical Approach:</p>
                        <p className="text-gray-700">{aiResult.technicalApproach}</p>
                      </div>
                    )}
                    {aiResult.whyUs?.length > 0 && (
                      <div>
                        <p className="font-semibold text-gray-800">Why DPM Enterprise:</p>
                        <ul className="list-disc ml-4">{aiResult.whyUs.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  uploadedFile ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {uploadedFile ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-medium">Upload</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div className={`h-full bg-green-500 transition-all ${
                  analysisData ? 'w-full' : uploadedFile ? 'w-1/2' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  analysisData ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {analysisData ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="font-medium">Analyze</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div className={`h-full bg-green-500 transition-all ${
                  boqData ? 'w-full' : analysisData ? 'w-1/2' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  boqData ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {boqData ? <CheckCircle className="w-5 h-5" /> : '3'}
                </div>
                <span className="font-medium">BOQ</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div className={`h-full bg-green-500 transition-all ${
                  bidData ? 'w-full' : boqData ? 'w-1/2' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  bidData ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {bidData ? <CheckCircle className="w-5 h-5" /> : '4'}
                </div>
                <span className="font-medium">Bid</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="analyze" disabled={!uploadedFile}>
              <FileText className="w-4 h-4 mr-2" />
              Analyze
            </TabsTrigger>
            <TabsTrigger value="boq" disabled={!analysisData}>
              <Calculator className="w-4 h-4 mr-2" />
              BOQ Pricing
            </TabsTrigger>
            <TabsTrigger value="bid" disabled={!boqData}>
              <FileCheck className="w-4 h-4 mr-2" />
              Generate Bid
            </TabsTrigger>
            <TabsTrigger value="documents" disabled={!bidData}>
              <Download className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Upload Tender */}
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Tender PDF</CardTitle>
                <CardDescription>
                  Upload GeM tender PDF for automatic text extraction and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Drop tender PDF here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Maximum file size: 50MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="tender-upload"
                    disabled={isLoading}
                  />
                  <Button
                    disabled={isLoading}
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    {isLoading ? 'Uploading...' : 'Select PDF File'}
                  </Button>
                </div>

                {uploadedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-green-900">File uploaded successfully!</p>
                        <p className="text-sm text-green-700 mt-1">
                          {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                        {tenderId && (
                          <p className="text-sm text-green-700 mt-1">
                            Tender ID: <span className="font-mono font-bold">{tenderId}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Analyze Tender */}
          <TabsContent value="analyze" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Tender Analysis</CardTitle>
                <CardDescription>
                  Extract structured data and get participation recommendation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!analysisData ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-4">Ready to analyze tender</p>
                    <Button onClick={handleAnalyzeTender} disabled={isLoading} size="lg">
                      {isLoading ? 'Analyzing...' : 'Start AI Analysis'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`border-2 rounded-lg p-6 ${
                      analysisData.recommendation.shouldParticipate === 'Yes'
                        ? 'border-green-500 bg-green-50'
                        : analysisData.recommendation.shouldParticipate === 'No'
                        ? 'border-red-500 bg-red-50'
                        : 'border-yellow-500 bg-yellow-50'
                    }`}>
                      <div className="flex items-start gap-4">
                        <TrendingUp className={`w-8 h-8 ${
                          analysisData.recommendation.shouldParticipate === 'Yes'
                            ? 'text-green-600'
                            : analysisData.recommendation.shouldParticipate === 'No'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`} />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">
                            Recommendation: {analysisData.recommendation.shouldParticipate}
                          </h3>
                          <p className="mb-3">{analysisData.recommendation.reason}</p>
                          <div className="flex items-center gap-4">
                            <Badge variant={analysisData.recommendation.winProbability === 'High' ? 'default' : 'secondary'}>
                              Win Probability: {analysisData.recommendation.winProbability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tender Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Tender Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Title:</span>
                            <p className="font-medium">{analysisData.tenderDetails.title}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Organization:</span>
                            <p className="font-medium">{analysisData.tenderDetails.organization}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Department:</span>
                            <p className="font-medium">{analysisData.tenderDetails.department}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Financial Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Estimated Value:</span>
                            <p className="font-medium text-lg">₹{analysisData.financial.estimatedValue.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">EMD Amount:</span>
                            <p className="font-medium">₹{analysisData.financial.emdAmount.toLocaleString('en-IN')}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* BOQ Items Preview */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">BOQ Items ({analysisData.boqItems.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysisData.boqItems.slice(0, 3).map((item: any, idx: number) => (
                            <div key={idx} className="border rounded p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium">{item.description}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Qty: {item.quantity} {item.unit} | Rate: ₹{item.estimatedRate.toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {analysisData.boqItems.length > 3 && (
                            <p className="text-sm text-muted-foreground text-center">
                              +{analysisData.boqItems.length - 3} more items
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: BOQ Pricing */}
          <TabsContent value="boq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>BOQ Pricing Calculator</CardTitle>
                <CardDescription>
                  Smart pricing with category-specific margins and GST calculation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!boqData ? (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-4">Ready to calculate BOQ pricing</p>
                    <Button onClick={handleCalculateBOQ} disabled={isLoading} size="lg">
                      {isLoading ? 'Calculating...' : 'Calculate BOQ Pricing'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="grid grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground">Total Items</p>
                          <p className="text-2xl font-bold">{boqData.summary.totalItems}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground">Bid Amount</p>
                          <p className="text-2xl font-bold">₹{(boqData.summary.totalBidAmount / 100000).toFixed(2)}L</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground">GST (18%)</p>
                          <p className="text-2xl font-bold">₹{(boqData.summary.totalGst / 100000).toFixed(2)}L</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground">Grand Total</p>
                          <p className="text-2xl font-bold text-green-600">₹{(boqData.summary.grandTotal / 100000).toFixed(2)}L</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Items Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Detailed Pricing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Item</th>
                                <th className="text-left p-2">Category</th>
                                <th className="text-right p-2">Qty</th>
                                <th className="text-right p-2">Our Rate</th>
                                <th className="text-right p-2">Margin %</th>
                                <th className="text-right p-2">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {boqData.items.map((item: any, idx: number) => (
                                <tr key={idx} className="border-b">
                                  <td className="p-2">{item.description}</td>
                                  <td className="p-2">
                                    <Badge variant="outline">{item.category}</Badge>
                                  </td>
                                  <td className="text-right p-2">{item.quantity} {item.unit}</td>
                                  <td className="text-right p-2">₹{item.ourRate.toLocaleString('en-IN')}</td>
                                  <td className="text-right p-2">{item.marginPercent}%</td>
                                  <td className="text-right p-2 font-medium">₹{item.totalAmount.toLocaleString('en-IN')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Generate Bid */}
          <TabsContent value="bid" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Bid Documents</CardTitle>
                <CardDescription>
                  AI-powered technical proposal, cover letter, and compliance documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!bidData ? (
                  <div className="text-center py-12">
                    <FileCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-4">Ready to generate bid documents</p>
                    <Button onClick={handleGenerateBid} disabled={isLoading} size="lg">
                      {isLoading ? 'Generating...' : 'Generate Complete Bid'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-green-900 mb-2">
                            Bid Generated Successfully!
                          </h3>
                          <p className="text-green-700 mb-4">
                            Bid Number: <span className="font-mono font-bold">{bidData.bidNumber}</span>
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">Bid Amount:</span>
                              <p className="font-bold text-lg">₹{bidData.financial.totalBidAmount.toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                              <span className="text-green-700">GST (18%):</span>
                              <p className="font-bold text-lg">₹{bidData.financial.totalGst.toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                              <span className="text-green-700">Grand Total:</span>
                              <p className="font-bold text-lg text-green-600">₹{bidData.financial.grandTotal.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Technical Proposal
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {bidData.documents.technicalProposal.length} characters
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Cover Letter
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {bidData.documents.coverLetter.length} characters
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Methodology
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {bidData.documents.methodology.length} characters
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileCheck className="w-4 h-4" />
                            Compliance Sheet
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {bidData.documents.complianceSheet.length} criteria
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Download Documents */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Download Bid Documents</CardTitle>
                <CardDescription>
                  Download all generated documents for submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bidData && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-bold mb-4">Complete Bid Package Ready</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Technical Proposal</p>
                              <p className="text-sm text-muted-foreground">2000+ words</p>
                            </div>
                          </div>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Cover Letter</p>
                              <p className="text-sm text-muted-foreground">400+ words</p>
                            </div>
                          </div>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Methodology Document</p>
                              <p className="text-sm text-muted-foreground">1500+ words</p>
                            </div>
                          </div>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Compliance Sheet</p>
                              <p className="text-sm text-muted-foreground">10 criteria</p>
                            </div>
                          </div>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <Calculator className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">BOQ Pricing Sheet</p>
                              <p className="text-sm text-muted-foreground">Excel format</p>
                            </div>
                          </div>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <Button size="lg" className="w-full">
                          <Download className="w-5 h-5 mr-2" />
                          Download Complete Bid Package (ZIP)
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
}
