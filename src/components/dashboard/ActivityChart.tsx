import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '@/types';
import { Skeleton } from '../ui/skeleton';

interface ActivityChartProps {
  data: ChartDataPoint[];
  loading: boolean;
}

export function ActivityChart({ data, loading }: ActivityChartProps) {
  if (loading) {
    return (
      <div className="stats-card h-[350px]">
        <Skeleton className="h-5 w-32 mb-4" />
        <Skeleton className="h-[280px] w-full" />
      </div>
    );
  }

  return (
    <div className="stats-card h-[350px] animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">User Activity</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 100%)',
              border: '1px solid hsl(214, 32%, 91%)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: 'hsl(222, 47%, 11%)', fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="hsl(221, 83%, 53%)"
            strokeWidth={2}
            fill="url(#colorUsers)"
            name="Total Users"
          />
          <Area
            type="monotone"
            dataKey="active"
            stroke="hsl(142, 71%, 45%)"
            strokeWidth={2}
            fill="url(#colorActive)"
            name="Active Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
