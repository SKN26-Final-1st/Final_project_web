import type { ReactNode } from 'react';
import { Button, Layout, Select, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { NotificationButton } from './NotificationButton';
import type { NotificationsData } from '../../api/adapters';
import { mainMenu, type AppRoute } from '../../data/mockData';
import type { Navigate } from '../../types/app';

const { Header } = Layout;

type TopHeaderProps = {
  route: AppRoute;
  themeSwitch: ReactNode;
  notifications?: NotificationsData;
  navigate: Navigate;
};

export function TopHeader({ route, themeSwitch, notifications, navigate }: TopHeaderProps) {
  const routeLabel = mainMenu.find((item) => item.route === route)?.label ?? (route === '/chat' ? '채팅' : '화면');
  const routeOptions = [
    ...mainMenu.map((item) => ({ value: item.route, label: item.label })),
    ...(route === '/chat' ? [{ value: '/chat' as AppRoute, label: '채팅' }] : []),
  ];

  return (
    <Header className="top-header">
      <div className="top-title">
        <img src="/assets/humour-app-icon.png" alt="" />
        <span>{routeLabel}</span>
      </div>
      <Select
        className="mobile-route-select"
        value={route}
        onChange={(value) => navigate(value)}
        options={routeOptions}
        aria-label="화면 선택"
      />
      <Space>
        <NotificationButton notifications={notifications} />
        {themeSwitch}
        <Button className="logout-button" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
          <span className="logout-text">로그아웃</span>
        </Button>
      </Space>
    </Header>
  );
}
