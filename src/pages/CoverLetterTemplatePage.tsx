import { Button, Col, Divider, Empty, List, Row, Space, Tag } from 'antd';
import { DownloadOutlined, FileSearchOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { templateQuestions, type JdItem } from '../data/mockData';
import type { RunMockAction, ShowAlert } from '../types/app';

type CoverLetterTemplatePageProps = {
  selectedJd: JdItem;
  templateGenerated: boolean;
  loadingKey: string | null;
  setTemplateGenerated: (value: boolean) => void;
  runMockAction: RunMockAction;
  showAlert: ShowAlert;
};

export function CoverLetterTemplatePage({
  selectedJd,
  templateGenerated,
  loadingKey,
  setTemplateGenerated,
  runMockAction,
  showAlert,
}: CoverLetterTemplatePageProps) {
  return (
    <>
      <PageTitle
        eyebrow="Cover Letter Template"
        title="자기소개서 포맷 작성"
        description="JD 요약을 바탕으로 자기소개서 문항과 작성 가이드 생성 결과를 표시합니다."
        actions={
          <Space wrap>
            <Button
              type="primary"
              icon={<FileSearchOutlined />}
              onClick={() =>
                runMockAction('template-generate', { type: 'success', message: '자기소개서 문항을 생성했습니다.' }, () => setTemplateGenerated(true))
              }
            >
              {loadingKey === 'template-generate' ? <InlineLoading label="생성 중" /> : '문항 생성'}
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => showAlert({ type: 'info', message: '문서 다운로드 목업을 실행했습니다.' })}>
              문서
            </Button>
          </Space>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={8}>
          <SectionCard title="JD 요약">
            <strong>{selectedJd.title}</strong>
            <p className="muted">{selectedJd.summary}</p>
            <Divider />
            <Space wrap>
              {selectedJd.stack.map((stack) => (
                <Tag key={stack}>{stack}</Tag>
              ))}
            </Space>
          </SectionCard>
        </Col>
        <Col xs={24} xl={16}>
          <SectionCard title="문항 및 작성 가이드">
            {templateGenerated ? (
              <List
                dataSource={templateQuestions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} description={item.guide} />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="생성된 문항이 없습니다." />
            )}
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
