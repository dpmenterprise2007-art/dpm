import { useState, useEffect } from 'react';
import { LogOut, Shield } from 'lucide-react';
import Dashboard from '@/layouts/Dashboard';
import { dpmDashboardNav } from '@/lib/dashboard-nav';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
  className?: string;
}

function logout() {
  fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
    sessionStorage.removeItem('dpm_user');
    window.location.href = '/dashboard/login';
  });
}

export default function DashboardShell({ children, className }: DashboardShellProps) {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('dpm_user');
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch { /* ignore */ }
    }
  }, []);

  const config = {
    ...dpmDashboardNav,
    sidebar: {
      ...dpmDashboardNav.sidebar,
      footer: (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-[#001a3a] flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name ?? 'Director'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.role ?? 'director'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      ),
    },
    header: {
      ...dpmDashboardNav.header,
      user: {
        name: user?.name ?? 'Director',
        email: user?.email ?? 'admin@dpmenterprise.in',
        initials: user?.name ? user.name.slice(0, 2).toUpperCase() : 'DPM',
      },
    },
  };

  return (
    <Dashboard config={config} className={className}>
      {children}
    </Dashboard>
  );
}
