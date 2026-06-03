import { Button, Col, Form, Input, Progress, Row, Space, Tag } from 'antd';
import { DeleteOutlined, FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { jdList, type JdItem } from '../data/mockData';
import type { Navigate, RunMockAction, ShowAlert } from '../types/app';
import { statusTag } from '../utils/statusTag';

const { TextArea } = Input;

type JdPageProps = {
  selectedJdId: string;
  selectedJd: JdItem;
  loadingKey: string | null;
  setSelectedJdId: (id: string) => void;
  runMockAction: RunMockAction;
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function JdPage({
  selectedJdId,
  selectedJd,
  loadingKey,
  setSelectedJdId,
  runMockAction,
  navigate,
  showAlert,
}: JdPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="JD Management"
        title="JD 관리"
        description="JD 목록과 작성 폼을 좌우로 배치해 저장, 삭제, 분석 요청 흐름을 확인합니다."
        actions={
          <Space wrap>
            <Button icon={<DeleteOutlined />} onClick={() => showAlert({ type: 'warning', message: '삭제 확인 목업을 표시했습니다.' })}>
              삭제
            </Button>
            <Button
              type="primary"
              icon={<FileSearchOutlined />}
              disabled={loadingKey === 'jd-analysis'}
              onClick={() =>
                runMockAction(
                  'jd-analysis',
                  { type: 'success', message: 'JD 분석 요청이 완료되었습니다.' },
                  () => navigate('/cover-letter'),
                )
              }
            >
              {loadingKey === 'jd-analysis' ? <InlineLoading label="분석 중" /> : '분석 요청'}
            </Button>
          </Space>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={8}>
          <SectionCard title="JD 목록">
            <div className="jd-list">
              {jdList.map((item) => (
                <button
                  className={`jd-card ${selectedJdId === item.id ? 'active' : ''}`}
                  key={item.id}
                  onClick={() => setSelectedJdId(item.id)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.team}</span>
                  <div>
                    {statusTag(item.status)}
                    <Tag color="blue">Fit {item.fit}%</Tag>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </Col>
        <Col xs={24} xl={16}>
          <SectionCard title="JD 작성/수정">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="직무명">
                    <Input value={selectedJd.title} readOnly />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="소속 팀">
                    <Input value={selectedJd.team} readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="직무 요약">
                <TextArea rows={4} value={selectedJd.summary} readOnly />
              </Form.Item>
              <Form.Item label="기술 스택">
                <Space wrap>
                  {selectedJd.stack.map((stack) => (
                    <Tag className="large-tag" key={stack}>
                      {stack}
                    </Tag>
                  ))}
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => showAlert({ type: 'info', message: '기술 스택 추가 입력은 API 연동 단계에서 저장됩니다.' })}
                  >
                    추가
                  </Button>
                </Space>
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <div className="mini-panel">
                    <span className="form-stat-label">분석 적합도</span>
                    <Progress percent={selectedJd.fit} />
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="mini-panel">
                    <span className="form-stat-label">요구 경력</span>
                    <strong>{selectedJd.requiredExperience}</strong>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="mini-panel">
                    <span className="form-stat-label">고용 형태</span>
                    <strong>{selectedJd.employmentType}</strong>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="inline-action-box">
                    <span>모집 공고 작성 화면으로 연결</span>
                    <Button onClick={() => navigate('/recruitment-post')} type="primary" ghost>
                      공고 작성
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
