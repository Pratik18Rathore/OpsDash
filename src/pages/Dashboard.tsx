import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchDashboardStart, fetchDashboardSuccess } from '../features/dashboard/dashboardSlice';
import { mockStats, mockActivities, mockChartData, delay } from '@/utils/mockData';
import { StatsCards } from '../components/dashboard/StatsCards';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { stats, activities, chartData, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDashboardStart());
      await delay(800);
      dispatch(
        fetchDashboardSuccess({
          stats: mockStats,
          activities: mockActivities,
          chartData: mockChartData,
        })
      );
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header title="Dashboard" description="Overview of your operations" />
      <div className="page-container">
        <StatsCards stats={stats} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <ActivityChart data={chartData} loading={loading} />
          </div>
          <div>
            <RecentActivity activities={activities} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
