import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search } from 'lucide-react';
import type { UsersFilters as FiltersType } from '@/types';

interface UsersFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: Partial<FiltersType>) => void;
}

export function UsersFilters({ filters, onFiltersChange }: UsersFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-10"
        />
      </div>
      <Select
        value={filters.role || 'all'}
        onValueChange={(value) => onFiltersChange({ role: value === 'all' ? '' : value as 'admin' | 'user' })}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.status || 'all'}
        onValueChange={(value) => onFiltersChange({ status: value === 'all' ? '' : value as 'active' | 'inactive' })}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
