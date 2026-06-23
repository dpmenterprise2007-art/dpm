import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, User, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function DashboardLoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // email or userId
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seedLoading, setSeedLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your User ID / Email and password.');
      return;
    }

    setLoading(true);
    try {
      const isEmail = identifier.includes('@');
      const body = isEmail
        ? { email: identifier.trim(), password }
        : { userId: identifier.trim(), password };

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.');
        return;
      }

      // Store user info in sessionStorage for UI use
      sessionStorage.setItem('dpm_user', JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/dashboard/admin-portal');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDirector = async () => {
    setSeedLoading(true);
    try {
      const res = await fetch('/api/auth/seed-director', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        if (data.alreadyExists) {
          toast.info('Director account already exists. Use your existing credentials.');
        } else {
          toast.success('Default director account created! Check credentials below.');
          setIdentifier('DPM_DIR_01');
        }
      }
    } catch {
      toast.error('Failed to initialize account.');
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001a3a] flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Dashboard Login | DPM Enterprise</title>
        <meta name="description" content="Secure director login for DPM Enterprise dashboard." />
        <link rel="canonical" href="https://www.dpmenterprise.in/dashboard/login" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="relative w-full max-w-md"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 mb-4">
            <Shield className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">DPM Enterprise</h1>
          <p className="text-white/40 text-sm mt-1 font-medium">Admin Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-black text-white mb-1">Sign In</h2>
          <p className="text-white/40 text-sm mb-7">Enter your User ID or email to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifier */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm font-semibold">User ID or Email</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="DPM_DIR_01 or email@domain.com"
                  className="pl-10 bg-white/8 border-white/15 text-white placeholder:text-white/25 focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/20 h-11"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-11 bg-white/8 border-white/15 text-white placeholder:text-white/25 focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/20 h-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"
              >
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#D4AF37] hover:bg-[#c9a227] text-[#001a3a] font-black text-sm rounded-xl transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs font-medium">First time setup?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Seed director button */}
          <Button
            variant="outline"
            onClick={handleSeedDirector}
            disabled={seedLoading}
            className="w-full h-10 border-white/15 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white text-sm rounded-xl"
          >
            {seedLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Shield className="h-4 w-4 mr-2" />
            )}
            Initialize Default Director Account
          </Button>

          {/* Default credentials hint */}
          <div className="mt-5 bg-[#D4AF37]/8 border border-[#D4AF37]/20 rounded-xl p-4">
            <p className="text-[#D4AF37] text-xs font-black mb-2 uppercase tracking-wider">Default Credentials</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">User ID</span>
                <span className="text-white/80 font-mono font-semibold">DPM_DIR_01</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Email</span>
                <span className="text-white/80 font-mono font-semibold">director@dpmenterprise.in</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Password</span>
                <span className="text-white/80 font-mono font-semibold">DPM@Admin2024</span>
              </div>
            </div>
            <p className="text-white/30 text-[11px] mt-3">
              Click "Initialize" above first if logging in for the first time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          DPM Enterprise &copy; {new Date().getFullYear()} &mdash; Secure Admin Portal
        </p>
      </motion.div>
    </div>
  );
}
