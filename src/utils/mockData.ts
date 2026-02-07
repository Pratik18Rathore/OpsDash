import type { User, Activity, DashboardStats, ChartDataPoint } from '../types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-01T14:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-05T16:00:00Z',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2023-12-10T10:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@company.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-11-01T08:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-28T14:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z',
  },
  {
    id: '7',
    name: 'David Brown',
    email: 'david.b@company.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2023-10-15T09:00:00Z',
    updatedAt: '2023-12-20T15:00:00Z',
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    email: 'jennifer.t@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-02T11:00:00Z',
    updatedAt: '2024-02-04T09:00:00Z',
  },
  {
    id: '9',
    name: 'James Martinez',
    email: 'james.m@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-10T13:00:00Z',
    updatedAt: '2024-01-30T14:00:00Z',
  },
  {
    id: '10',
    name: 'Amanda Garcia',
    email: 'amanda.g@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-03T08:30:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '3',
    userName: 'Michael Chen',
    action: 'Updated profile settings',
    createdAt: '2024-02-05T09:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Smith',
    action: 'Added new user to the system',
    createdAt: '2024-02-05T09:15:00Z',
  },
  {
    id: '3',
    userId: '2',
    userName: 'Sarah Johnson',
    action: 'Logged in successfully',
    createdAt: '2024-02-05T09:00:00Z',
  },
  {
    id: '4',
    userId: '5',
    userName: 'Robert Wilson',
    action: 'Modified user permissions',
    createdAt: '2024-02-05T08:45:00Z',
  },
  {
    id: '5',
    userId: '6',
    userName: 'Lisa Anderson',
    action: 'Exported data report',
    createdAt: '2024-02-05T08:30:00Z',
  },
];

// Mock stats
export const mockStats: DashboardStats = {
  totalUsers: 156,
  activeUsers: 142,
  newUsersThisMonth: 23,
  totalActivities: 1247,
};

// Mock chart data (last 7 days)
export const mockChartData: ChartDataPoint[] = [
  { name: 'Mon', users: 145, active: 132 },
  { name: 'Tue', users: 148, active: 138 },
  { name: 'Wed', users: 150, active: 140 },
  { name: 'Thu', users: 152, active: 139 },
  { name: 'Fri', users: 154, active: 142 },
  { name: 'Sat', users: 155, active: 130 },
  { name: 'Sun', users: 156, active: 142 },
];

// Simulate async API call
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

