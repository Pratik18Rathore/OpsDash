import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';
import type { DashboardStats } from '@/types';
import { Skeleton } from '../ui/skeleton';

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers ?? 0,
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      label: 'Active Users',
      value: stats?.activeUsers ?? 0,
      icon: UserCheck,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      label: 'New This Month',
      value: stats?.newUsersThisMonth ?? 0,
      icon: UserPlus,
      change: '+18%',
      changeType: 'positive' as const,
    },
    {
      label: 'Total Activities',
      value: stats?.totalActivities ?? 0,
      icon: Activity,
      change: '+8%',
      changeType: 'positive' as const,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stats-card">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="stats-card animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {card.label}
            </span>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <card.icon size={20} className="text-primary" />
            </div>
          </div>
          <div className="text-3xl font-semibold text-foreground mb-1">
            {card.value.toLocaleString()}
          </div>
          <div className="text-xs text-success font-medium">
            {card.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
}
