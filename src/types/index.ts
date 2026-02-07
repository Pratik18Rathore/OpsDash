// User types
export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Activity types
export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  createdAt: string;
}

// Dashboard stats
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalActivities: number;
}

// Chart data
export interface ChartDataPoint {
  name: string;
  users: number;
  active: number;
}

// Pagination
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Filters
export interface UsersFilters {
  search: string;
  role: UserRole | '';
  status: UserStatus | '';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
}
