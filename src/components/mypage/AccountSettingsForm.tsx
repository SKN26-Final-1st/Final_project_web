import { Form, Input, Radio } from 'antd';
import type { CompanyChoices, UserProfile } from '../../api/adapters';

type AccountSettingsFormProps = {
  profile: UserProfile;
  choices: CompanyChoices;
};

export function AccountSettingsForm({ profile, choices }: AccountSettingsFormProps) {
  return (
    <Form layout="vertical">
      <Form.Item label="담당자명">
        <Input defaultValue={profile.displayName} />
      </Form.Item>
      <Form.Item label="알림 수신">
        <Radio.Group defaultValue={profile.notificationChannel}>
          {choices.notificationChannels.map((channel) => (
            <Radio key={channel.value} value={channel.value}>
              {channel.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
