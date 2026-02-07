import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { User, PaginationState } from '@/types';
import { format } from 'date-fns';

interface UsersTableProps {
  users: User[];
  pagination: PaginationState;
  loading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({
  users,
  pagination,
  loading,
  onPageChange,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/50">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td><Skeleton className="h-4 w-32" /></td>
                  <td><Skeleton className="h-4 w-40" /></td>
                  <td><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td><Skeleton className="h-4 w-24" /></td>
                  <td><Skeleton className="h-8 w-20 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">No users found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-muted/50">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-medium">{user.name}</td>
                <td className="text-muted-foreground">{user.email}</td>
                <td>
                  <span className={user.role === 'admin' ? 'role-admin' : 'role-user'}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={user.status === 'active' ? 'status-active' : 'status-inactive'}>
                    {user.status}
                  </span>
                </td>
                <td className="text-muted-foreground">
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                      className="h-8 w-8"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="h-8 w-8"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
