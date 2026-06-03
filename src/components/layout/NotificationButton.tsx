import { Badge, Button, List, Popover, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import type { NotificationsData } from '../../api/adapters';

type NotificationButtonProps = {
  notifications?: NotificationsData;
};

export function NotificationButton({ notifications }: NotificationButtonProps) {
  const unreadCount = notifications?.unreadCount ?? 0;
  const items = notifications?.items ?? [];

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      title={`읽지 않은 알림 ${unreadCount}건`}
      content={
        <List
          className="notification-list"
          dataSource={items}
          locale={{ emptyText: '새 알림이 없습니다.' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Typography.Text strong>{item.title}</Typography.Text>}
                description={item.body}
              />
            </List.Item>
          )}
        />
      }
    >
      <Badge count={unreadCount} size="small">
        <Button aria-label="알림 확인" shape="circle" icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
}
