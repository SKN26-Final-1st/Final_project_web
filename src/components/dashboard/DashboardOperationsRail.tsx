import { Avatar, Button, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import type { UserProfile } from '../../api/adapters';
import type { Navigate } from '../../types/app';
import type { DashboardActionItem, DashboardViewModel } from './dashboardViewModel';

type DashboardOperationsRailProps = {
  navigate: Navigate;
  profile: UserProfile;
  viewModel: DashboardViewModel;
};

const actionIconClassNames: Record<DashboardActionItem['tone'], string> = {
  primary: 'primary',
  accent: 'accent',
  warning: 'warning',
  muted: 'muted',
};

export function DashboardOperationsRail({ navigate, profile, viewModel }: DashboardOperationsRailProps) {
  const { metrics, reviewStats } = viewModel;

  return (
    <aside className="dashboard-right-rail" aria-label="프로필과 운영 우선순위">
      <div className="rail-actions">
        <Tooltip title="설정">
          <Button aria-label="설정" shape="circle" icon={<SettingOutlined />} onClick={() => navigate('/mypage')} />
        </Tooltip>
        <Tooltip title="로그아웃">
          <Button aria-label="로그아웃" shape="circle" icon={<CloseOutlined />} onClick={() => navigate('/login')} />
        </Tooltip>
      </div>

      <section className="rail-profile">
        <Avatar size={64} src={profile.avatarUrl} />
        <h2>{profile.displayName}</h2>
        <p>
          {profile.companyName} · {profile.roleName}
        </p>
      </section>

      <section className="rail-summary-card">
        <div className="rail-stat-grid">
          <span>
            <strong>
              {metrics.activeJobs.value}
              {metrics.activeJobs.suffix}
            </strong>
            <small>진행 공고</small>
          </span>
          <span>
            <strong>{reviewStats.recommended}</strong>
            <small>면접 추천</small>
          </span>
        </div>
        <small>{metrics.activeJobs.change}</small>
      </section>

      <section className="rail-priority-list">
        <div className="recent-heading">
          <h2>운영 우선순위</h2>
          <TeamOutlined />
        </div>
        <div className="recent-list">
          {viewModel.actionItems.map((item) => (
            <div className="recent-item" key={item.id}>
              <span className={`activity-icon ${actionIconClassNames[item.tone]}`}>
                <CheckCircleOutlined />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <em>{item.badge}</em>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
