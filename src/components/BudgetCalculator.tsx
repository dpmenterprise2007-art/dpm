import { useState } from 'react';
import { X, Calculator, Home, Building2, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BudgetCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetCalculator({ isOpen, onClose }: BudgetCalculatorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    area: '',
    name: '',
    phone: '',
    location: '',
  });
  const [estimate, setEstimate] = useState<number | null>(null);

  const projectTypes = [
    { id: 'residential', name: 'Residential', icon: Home, rate: 1800 },
    { id: 'office', name: 'Office/Corporate', icon: Building2, rate: 2200 },
    { id: 'commercial', name: 'Commercial/Showroom', icon: Store, rate: 2500 },
  ];

  const calculateEstimate = () => {
    const selectedType = projectTypes.find(t => t.id === formData.projectType);
    if (selectedType && formData.area) {
      const area = parseFloat(formData.area);
      const baseEstimate = area * selectedType.rate;
      const minEstimate = baseEstimate * 0.9;
      const maxEstimate = baseEstimate * 1.1;
      setEstimate(Math.round((minEstimate + maxEstimate) / 2));
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    // Send lead to backend
    try {
      await fetch('/api/forms/budget-calculator/POST', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimate,
          timestamp: new Date().toISOString(),
        }),
      });
      
      // Show success and close
      alert('Thank you! Our team will contact you within 24 hours.');
      onClose();
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Something went wrong. Please call us at +91 99309 98063');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border-4 border-[#D4AF37] animate-in fade-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[#D4AF37]" />
            <div>
              <h2 className="text-3xl font-extrabold">🎁 FREE Budget Calculator</h2>
              <p className="text-base text-white/90 font-semibold">Join 500+ Happy Clients - Get Instant Estimate!</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Step 1: Select Your Project Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setFormData({ ...formData, projectType: type.id });
                          setStep(2);
                        }}
                        className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                      >
                        <Icon className="w-12 h-12 text-[#002147] group-hover:text-[#D4AF37] transition-colors" />
                        <span className="font-semibold text-gray-900">{type.name}</span>
                        <span className="text-sm text-gray-500">₹{type.rate}/sq ft</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Step 2: Tell Us About Your Project</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area">Area (Square Feet) *</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="e.g., 1000"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">WhatsApp Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., Virar, Mumbai"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={calculateEstimate}
                  disabled={!formData.area || !formData.name || !formData.phone || !formData.location}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#C19B2B] text-gray-900"
                >
                  Calculate Budget
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && estimate && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <Calculator className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">🎉 Your Estimated Budget</h3>
                <div className="text-5xl font-black text-[#D4AF37] mb-4">
                  ₹{estimate.toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  This is an approximate estimate. Our team will contact you within 24 hours with a detailed quotation.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type:</span>
                  <span className="font-semibold text-gray-900">
                    {projectTypes.find(t => t.id === formData.projectType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-semibold text-gray-900">{formData.area} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900">{formData.location}</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-[#002147] hover:bg-[#003366] text-white"
                size="lg"
              >
                Get Detailed Quotation
              </Button>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-[#D4AF37]' : s < step ? 'w-2 bg-green-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
