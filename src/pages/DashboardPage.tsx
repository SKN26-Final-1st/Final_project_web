import { useMemo } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { DashboardData, NotificationsData, UserProfile } from '../api/adapters';
import { DashboardOperationsRail } from '../components/dashboard/DashboardOperationsRail';
import { DashboardOverviewGrid } from '../components/dashboard/DashboardOverviewGrid';
import { DashboardToolbar } from '../components/dashboard/DashboardToolbar';
import { buildDashboardViewModel } from '../components/dashboard/dashboardViewModel';
import type { Navigate, ShowAlert, ThemeMode } from '../types/app';

type DashboardPageProps = {
  dashboard: DashboardData;
  mode: ThemeMode;
  profile: UserProfile;
  notifications: NotificationsData;
  navigate: Navigate;
  showAlert: ShowAlert;
  reloadData: () => Promise<void>;
};

export function DashboardPage({
  dashboard,
  mode,
  profile,
  notifications,
  navigate,
  showAlert,
  reloadData,
}: DashboardPageProps) {
  const viewModel = useMemo(() => buildDashboardViewModel(dashboard, notifications), [dashboard, notifications]);

  return (
    <div className="dashboard-composition">
      <main className="dashboard-main-panel">
        <DashboardToolbar notifications={notifications} reloadData={reloadData} showAlert={showAlert} />

        <div className="dashboard-title-row">
          <div>
            <span className="dashboard-eyebrow">HumouR Overview</span>
            <h1>채용 현황 대시보드</h1>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/jd')}>
            새 채용 공고
          </Button>
        </div>

        <DashboardOverviewGrid
          dashboard={dashboard}
          mode={mode}
          navigate={navigate}
          showAlert={showAlert}
          viewModel={viewModel}
        />
      </main>

      <DashboardOperationsRail navigate={navigate} profile={profile} viewModel={viewModel} />
    </div>
  );
}
