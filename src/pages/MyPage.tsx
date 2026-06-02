import { Avatar, Button, Col, Divider, Form, Input, List, Progress, Radio, Row, Statistic, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { companyProfile, palette } from '../data/mockData';
import type { Navigate, ShowAlert } from '../types/app';

type MyPageProps = {
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function MyPage({ navigate, showAlert }: MyPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="My Page"
        title="마이페이지"
        description="프로필, 계정 수정, 보안 설정과 회사 정보 요약을 한 화면에서 관리합니다."
        actions={
          <Button type="primary" icon={<SaveOutlined />} onClick={() => showAlert({ type: 'success', message: '프로필 수정사항을 저장했습니다.' })}>
            저장
          </Button>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={8}>
          <SectionCard title="프로필">
            <div className="profile-card">
              <Avatar size={76} src="/assets/humour-app-icon.png" />
              <strong>채용 담당자</strong>
              <span>HumouR Labs · People Team</span>
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>프로필 이미지 변경</Button>
              </Upload>
            </div>
            <Divider />
            <List
              dataSource={['recruiter@humour.ai', '마지막 로그인 2026.06.03', '분석 크레딧 78%']}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </SectionCard>
        </Col>
        <Col xs={24} xl={16}>
          <Row gutter={[22, 22]}>
            <Col xs={24} lg={12}>
              <SectionCard title="계정 정보">
                <Form layout="vertical">
                  <Form.Item label="담당자명">
                    <Input defaultValue="채용 담당자" />
                  </Form.Item>
                  <Form.Item label="알림 수신">
                    <Radio.Group defaultValue="email">
                      <Radio value="email">이메일</Radio>
                      <Radio value="none">끄기</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </SectionCard>
            </Col>
            <Col xs={24} lg={12}>
              <SectionCard title="보안 설정">
                <Form layout="vertical">
                  <Form.Item label="현재 비밀번호">
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="새 비밀번호">
                    <Input.Password />
                  </Form.Item>
                </Form>
              </SectionCard>
            </Col>
            <Col span={24}>
              <SectionCard title="회사 정보 요약" extra={<Button type="link" onClick={() => navigate('/company')}>수정</Button>}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Statistic title="회사명" value={companyProfile.name} />
                  </Col>
                  <Col xs={24} md={8}>
                    <Statistic title="규모" value={companyProfile.size} />
                  </Col>
                  <Col xs={24} md={8}>
                    <Progress percent={companyProfile.completion} strokeColor={palette.accent} />
                  </Col>
                </Row>
              </SectionCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
