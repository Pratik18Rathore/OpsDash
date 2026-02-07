import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, PaginationState, UsersFilters } from '@/types';

interface UsersState {
  list: User[];
  selectedUser: User | null;
  pagination: PaginationState;
  filters: UsersFilters;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  selectedUser: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    role: '',
    status: '',
  },
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[]; pagination: PaginationState }>) => {
      state.loading = false;
      state.list = action.payload.users;
      state.pagination = action.payload.pagination;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<UsersFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.list.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.list.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
      state.pagination.total -= 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  setFilters,
  setPage,
  selectUser,
  addUser,
  updateUser,
  deleteUser,
  clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
