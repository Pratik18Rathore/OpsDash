import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { delay } from '../utils/mockData';
import { AlertCircle, Loader2, Mail, Lock } from 'lucide-react';

export default function Login() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }

    dispatch(loginStart());

    // Simulate API call
    await delay(1000);

    // Mock login validation
    if (email === 'admin@company.com' && password === 'admin123') {
      dispatch(
        loginSuccess({
          id: '1',
          name: 'John Smith',
          email: 'admin@company.com',
          role: 'admin',
        })
      );
    } else if (email === 'user@company.com' && password === 'user123') {
      dispatch(
        loginSuccess({
          id: '2',
          name: 'Sarah Johnson',
          email: 'user@company.com',
          role: 'user',
        })
      );
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your OpsDash account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Demo credentials:</p>
            <div className="space-y-1 text-xs">
              <p><strong className="text-foreground">Admin:</strong> admin@company.com / admin123</p>
              <p><strong className="text-foreground">User:</strong> user@company.com / user123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 bg-sidebar items-center justify-center p-8 mb-20">
        <div className="max-w-md  text-center">
          <div className="w-16 h-16 rounded-2xl bg-sidebar-primary flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-sidebar-primary-foreground">O</span>
          </div>
          <h2 className="text-2xl font-semibold text-sidebar-foreground mb-4">
            OpsDash
          </h2>
          <p className="text-sidebar-muted">
            Your centralized operations dashboard for managing users, data, and analytics with powerful role-based access control.
          </p>
        </div>
      </div>
    </div>
  );
}
