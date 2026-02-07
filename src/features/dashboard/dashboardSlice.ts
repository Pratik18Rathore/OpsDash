import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DashboardStats, Activity, ChartDataPoint } from '@/types';

interface DashboardState {
  stats: DashboardStats | null;
  activities: Activity[];
  chartData: ChartDataPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  activities: [],
  chartData: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (
      state,
      action: PayloadAction<{
        stats: DashboardStats;
        activities: Activity[];
        chartData: ChartDataPoint[];
      }>
    ) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.activities = action.payload.activities;
      state.chartData = action.payload.chartData;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDashboardStart, fetchDashboardSuccess, fetchDashboardFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
