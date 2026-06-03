import { Button, Col, Form, Input, Progress, Row, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { JdItem } from '../../api/adapters';
import type { Navigate, ShowAlert } from '../../types/app';

const { TextArea } = Input;

type JdEditorPanelProps = {
  selectedJd: JdItem;
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function JdEditorPanel({ selectedJd, navigate, showAlert }: JdEditorPanelProps) {
  return (
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
  );
}
