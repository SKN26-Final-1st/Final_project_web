import type { ReactNode } from 'react';
import { Layout } from 'antd';
import { SidebarNav } from './SidebarNav';
import type { NotificationsData } from '../../api/adapters';
import type { AppRoute } from '../../data/mockData';
import type { Navigate } from '../../types/app';

const { Content } = Layout;

type AppShellProps = {
  route: AppRoute;
  children: ReactNode;
  themeSwitch: ReactNode;
  notifications?: NotificationsData;
  navigate: Navigate;
};

export function AppShell({
  route,
  children,
  themeSwitch,
  notifications,
  navigate,
}: AppShellProps) {
  const routeClass = route.replace('/', '') || 'dashboard';
  const isDashboard = route === '/dashboard';

  return (
    <Layout className={`shell shell-${routeClass}`}>
      <SidebarNav route={route} themeSwitch={themeSwitch} notifications={notifications} navigate={navigate} />
      <Layout>
        <Content className="content">{isDashboard ? children : <div className="content-inner">{children}</div>}</Content>
      </Layout>
    </Layout>
  );
}
