import { Badge, Button, Space, Tooltip } from 'antd';
import { BellOutlined, MoreOutlined, ReloadOutlined } from '@ant-design/icons';
import type { NotificationsData } from '../../api/adapters';
import type { ShowAlert } from '../../types/app';

type DashboardToolbarProps = {
  notifications: NotificationsData;
  reloadData: () => Promise<void>;
  showAlert: ShowAlert;
};

export function DashboardToolbar({ notifications, reloadData, showAlert }: DashboardToolbarProps) {
  return (
    <div className="dashboard-toolbar">
      <Space className="dashboard-toolbar-actions">
        <Tooltip title="알림">
          <Badge count={notifications.unreadCount} size="small">
            <Button aria-label="알림 확인" shape="circle" icon={<BellOutlined />} />
          </Badge>
        </Tooltip>
        <Tooltip title="데이터 새로고침">
          <Button
            aria-label="대시보드 새로고침"
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={() =>
              void reloadData().then(() => showAlert({ type: 'info', message: '대시보드 데이터를 새로고침했습니다.' }))
            }
          />
        </Tooltip>
        <Tooltip title="더 보기">
          <Button aria-label="더 보기" shape="circle" icon={<MoreOutlined />} />
        </Tooltip>
      </Space>
    </div>
  );
}
