import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Fast path: sessionStorage
    const cached = sessionStorage.getItem('dpm_user');
    if (cached) {
      setAuthed(true);
      setChecked(true);
      return;
    }
    // Validate cookie session with server
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) {
          sessionStorage.setItem('dpm_user', JSON.stringify(data.user));
          setAuthed(true);
        } else {
          navigate('/dashboard/login', { replace: true });
        }
      })
      .catch(() => navigate('/dashboard/login', { replace: true }))
      .finally(() => setChecked(true));
  }, [navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#001a3a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 mb-4">
            <Shield className="h-7 w-7 text-[#D4AF37]" />
          </div>
          <Loader2 className="h-5 w-5 text-[#D4AF37] animate-spin mx-auto mt-2" />
          <p className="text-white/30 text-sm mt-3">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (!authed) return null;

  return <>{children}</>;
}
