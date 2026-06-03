import type { ReactNode } from 'react';
import { Layout } from 'antd';
import { SidebarNav } from './SidebarNav';
import { TopHeader } from './TopHeader';
import type { NotificationsData } from '../../api/adapters';
import type { AppRoute } from '../../data/mockData';
import type { Navigate, ShowAlert } from '../../types/app';

const { Content } = Layout;

type AppShellProps = {
  route: AppRoute;
  children: ReactNode;
  themeSwitch: ReactNode;
  creditPercent: number;
  notifications?: NotificationsData;
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function AppShell({
  route,
  children,
  themeSwitch,
  creditPercent,
  notifications,
  navigate,
  showAlert,
}: AppShellProps) {
  return (
    <Layout className="shell">
      <SidebarNav route={route} creditPercent={creditPercent} navigate={navigate} showAlert={showAlert} />
      <Layout>
        <TopHeader route={route} themeSwitch={themeSwitch} notifications={notifications} navigate={navigate} />
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
}
