import { Header } from '../components/layout/Header';
import { useAppSelector } from '../hooks/useAppDispatch';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header title="Profile" description="Your account information" />
      <div className="page-container">
        <div className="max-w-2xl animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="mt-1">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User size={18} />
                <span className="text-sm">User ID: {user.id}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Shield size={18} />
                <span className="text-sm">
                  {user.role === 'admin' ? 'Full administrative access' : 'Standard user access'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar size={18} />
                <span className="text-sm">Member since: January 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
