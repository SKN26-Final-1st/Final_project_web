import { Avatar, Button, Divider, List, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UserProfile } from '../../api/adapters';

type ProfileSummaryCardProps = {
  profile: UserProfile;
};

export function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
  return (
    <>
      <div className="profile-card">
        <Avatar size={76} src={profile.avatarUrl} />
        <strong>{profile.displayName}</strong>
        <span>
          {profile.companyName} · {profile.roleName}
        </span>
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>프로필 이미지 변경</Button>
        </Upload>
      </div>
      <Divider />
      <List
        dataSource={[profile.email, `마지막 로그인 ${profile.lastLoginText}`, `알림 채널 ${profile.notificationChannel}`]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
}
