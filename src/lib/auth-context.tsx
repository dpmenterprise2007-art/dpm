/**
 * Auth context — provides current user + logout across all dashboard pages.
 * Checks /api/auth/session on mount to validate the httpOnly cookie.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setUser(data.user);
          sessionStorage.setItem('dpm_user', JSON.stringify(data.user));
          return;
        }
      }
      setUser(null);
      sessionStorage.removeItem('dpm_user');
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    // Fast path: check sessionStorage first to avoid flicker
    const cached = sessionStorage.getItem('dpm_user');
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch { /* ignore */ }
    }
    refresh().finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    sessionStorage.removeItem('dpm_user');
    window.location.href = '/dashboard/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
