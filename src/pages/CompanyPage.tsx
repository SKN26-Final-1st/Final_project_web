import { Button, Col, Divider, Form, Input, List, Progress, Row, Select, Space, Tag } from 'antd';
import { CheckCircleOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { companyProfile, palette } from '../data/mockData';
import type { RunMockAction, ShowAlert } from '../types/app';

const { TextArea } = Input;

type CompanyPageProps = {
  loadingKey: string | null;
  runMockAction: RunMockAction;
  showAlert: ShowAlert;
};

export function CompanyPage({ loadingKey, runMockAction, showAlert }: CompanyPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="Company"
        title="회사 정보 입력"
        description="회사 프로필과 핵심 가치를 JD·자기소개서 분석 기준으로 관리합니다."
        actions={
          <Space wrap>
            <Button icon={<ReloadOutlined />} onClick={() => showAlert({ type: 'info', message: '입력값을 초기화했습니다.' })}>
              초기화
            </Button>
            <Button
              type="primary"
              icon={loadingKey === 'company-save' ? undefined : <SaveOutlined />}
              onClick={() =>
                runMockAction('company-save', {
                  type: 'success',
                  message: '회사 정보가 저장되었습니다.',
                  description: '저장된 값은 mockData 기준으로 데모 화면에 반영됩니다.',
                })
              }
            >
              {loadingKey === 'company-save' ? <InlineLoading label="저장 중" /> : '저장'}
            </Button>
          </Space>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={15}>
          <SectionCard title="회사 프로필">
            <Form layout="vertical" initialValues={companyProfile}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="회사명" name="name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="산업군" name="industry">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="규모" name="size">
                    <Select options={['1-50명', '51-200명', '201-500명', '500명 이상'].map((value) => ({ value }))} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="위치" name="location">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="회사 소개">
                <TextArea rows={5} defaultValue="AI 기반 HR 채용 보조 시스템으로 채용 담당자의 검토 흐름을 빠르게 만듭니다." />
              </Form.Item>
              <Form.Item label="핵심 가치">
                <Space wrap>
                  {companyProfile.values.map((value) => (
                    <Tag className="large-tag" closable key={value}>
                      {value}
                    </Tag>
                  ))}
                  <Button icon={<PlusOutlined />} size="small">
                    태그 추가
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </SectionCard>
        </Col>
        <Col xs={24} xl={9}>
          <SectionCard title="입력 완성도">
            <Progress percent={companyProfile.completion} strokeColor={palette.accent} />
            <Divider />
            <List
              dataSource={companyProfile.benefits}
              renderItem={(item) => (
                <List.Item>
                  <CheckCircleOutlined className="success-icon" />
                  {item}
                </List.Item>
              )}
            />
            <Button
              block
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => showAlert({ type: 'info', message: '수정 완료 상태로 전환했습니다.' })}
            >
              수정 완료
            </Button>
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
