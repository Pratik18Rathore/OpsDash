import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { 
  fetchUsersStart, 
  fetchUsersSuccess, 
  setFilters, 
  setPage,
  deleteUser as deleteUserAction,
  updateUser as updateUserAction,
  addUser as addUserAction
} from '../features/users/userSlice';
import { mockUsers, delay } from '../utils/mockData';
import { UsersTable } from '../components/users/UsersTable';
import { UsersFilters } from '../components/users/UsersFilters';
import { UserDialog } from '../components/users/UserDialog';
import { DeleteUserDialog } from '../components/users/DeleteUserDialog';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import type { User } from '@/types';
import { Navigate } from 'react-router-dom';

export default function Users() {
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { list, pagination, filters, loading } = useAppSelector((state) => state.users);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const isAdmin = authUser?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      dispatch(fetchUsersStart());
      await delay(600);

      // Filter and paginate mock data
      let filteredUsers = [...mockUsers];

      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (u) =>
            u.name.toLowerCase().includes(search) ||
            u.email.toLowerCase().includes(search)
        );
      }

      if (filters.role) {
        filteredUsers = filteredUsers.filter((u) => u.role === filters.role);
      }

      if (filters.status) {
        filteredUsers = filteredUsers.filter((u) => u.status === filters.status);
      }

      const total = filteredUsers.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const start = (pagination.page - 1) * pagination.limit;
      const paginatedUsers = filteredUsers.slice(start, start + pagination.limit);

      dispatch(
        fetchUsersSuccess({
          users: paginatedUsers,
          pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total,
            totalPages,
          },
        })
      );
    };

    fetchData();
  }, [dispatch, filters, pagination.page, pagination.limit, isAdmin]);

  // Redirect non-admins after hooks
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleCreateUser = async (userData: Partial<User>) => {
    await delay(500);
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'user',
      status: userData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addUserAction(newUser));
    setIsCreateOpen(false);
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (!editingUser) return;
    await delay(500);
    const updatedUser: User = {
      ...editingUser,
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    dispatch(updateUserAction(updatedUser));
    setEditingUser(null);
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    await delay(500);
    dispatch(deleteUserAction(deletingUser.id));
    setDeletingUser(null);
  };

  return (
    <div>
      <Header title="User Management" description="Manage all users in the system" />
      <div className="page-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <UsersFilters
            filters={filters}
            onFiltersChange={(newFilters) => dispatch(setFilters(newFilters))}
          />
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add User
          </Button>
        </div>

        <UsersTable
          users={list}
          pagination={pagination}
          loading={loading}
          onPageChange={(page) => dispatch(setPage(page))}
          onEdit={setEditingUser}
          onDelete={setDeletingUser}
        />

        <UserDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSubmit={handleCreateUser}
          title="Add New User"
        />

        <UserDialog
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSubmit={handleUpdateUser}
          user={editingUser || undefined}
          title="Edit User"
        />

        <DeleteUserDialog
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          onConfirm={handleDeleteUser}
          userName={deletingUser?.name || ''}
        />
      </div>
    </div>
  );
}
