import type { ReactNode } from 'react';
import { Button, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { NotificationButton } from './NotificationButton';
import type { NotificationsData } from '../../api/adapters';
import type { AppRoute } from '../../data/mockData';
import type { Navigate } from '../../types/app';
import { buildSidebarNavModel } from './sidebarNavModel';

type SidebarNavProps = {
  route: AppRoute;
  themeSwitch: ReactNode;
  notifications?: NotificationsData;
  navigate: Navigate;
};

export function SidebarNav({ route, themeSwitch, notifications, navigate }: SidebarNavProps) {
  const { menuItems, routeLabel } = buildSidebarNavModel(route);

  return (
    <aside className="sidebar" aria-label="사이드바">
      <div className="sidebar-panel">
        <div className="brand-area">
          <button className="brand-button" onClick={() => navigate('/dashboard')} aria-label="대시보드로 이동">
            <span className="brand-mark">
              <img src="/assets/humour-app-icon.png" alt="" />
            </span>
            <span className="brand-copy">
              <strong>HumouR</strong>
              <small>Recruiting CRM</small>
            </span>
          </button>
          <span className="sidebar-route-chip">{routeLabel}</span>
          <div className="brand-toolbar" aria-label="전역 도구">
            <NotificationButton notifications={notifications} />
            {themeSwitch}
            <Tooltip title="로그아웃">
              <Button
                aria-label="로그아웃"
                className="logout-button"
                icon={<LogoutOutlined />}
                shape="circle"
                onClick={() => navigate('/login')}
              />
            </Tooltip>
          </div>
        </div>
        <nav className="side-section" aria-label="주요 메뉴">
          <span className="side-label">Main menu</span>
          {menuItems.map((item) => (
            <button
              key={item.route}
              className={`side-nav-item ${route === item.route ? 'active' : ''}`}
              onClick={() => navigate(item.route)}
              title={item.label}
            >
              {item.icon}
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
