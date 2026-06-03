import type { ReactNode } from 'react';
import { Badge, Button, Layout, Progress, Select, Space, Tooltip } from 'antd';
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { mainMenu, palette, type AppRoute } from '../../data/mockData';
import type { Navigate, ShowAlert } from '../../types/app';

const { Header, Sider, Content } = Layout;

type AppShellProps = {
  route: AppRoute;
  children: ReactNode;
  themeSwitch: ReactNode;
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function AppShell({ route, children, themeSwitch, navigate, showAlert }: AppShellProps) {
  return (
    <Layout className="shell">
      <Sider className="sidebar" width={292} breakpoint="lg" collapsedWidth={0}>
        <button className="brand-button" onClick={() => navigate('/dashboard')} aria-label="대시보드로 이동">
          <img src="/assets/humour-logo-dark.png" alt="HumouR" />
        </button>
        <div className="side-section">
          <span className="side-label">Main menu</span>
          {mainMenu.map((item) => (
            <button
              key={item.route}
              className={`side-nav-item ${route === item.route ? 'active' : ''}`}
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="credit-card">
          <span>분석 크레딧</span>
          <Progress percent={78} strokeColor={palette.accent} />
          <Button
            size="small"
            type="primary"
            ghost
            onClick={() => showAlert({ type: 'info', message: '크레딧 충전 문의 상태를 표시했습니다.' })}
          >
            충전 문의
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header className="top-header">
          <div className="top-title">
            <img src="/assets/humour-app-icon.png" alt="" />
            <span>{mainMenu.find((item) => item.route === route)?.label}</span>
          </div>
          <Select
            className="mobile-route-select"
            value={route}
            onChange={(value) => navigate(value)}
            options={mainMenu.map((item) => ({ value: item.route, label: item.label }))}
            aria-label="화면 선택"
          />
          <Space>
            <Tooltip title="알림">
              <Badge dot>
                <Button
                  aria-label="알림 확인"
                  shape="circle"
                  icon={<BellOutlined />}
                  onClick={() => showAlert({ type: 'info', message: '읽지 않은 알림 3건이 있습니다.' })}
                />
              </Badge>
            </Tooltip>
            {themeSwitch}
            <Button className="logout-button" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
              <span className="logout-text">로그아웃</span>
            </Button>
          </Space>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
}
