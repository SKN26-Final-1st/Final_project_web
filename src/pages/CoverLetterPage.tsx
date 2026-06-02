import { Button, Col, Divider, Empty, Form, Input, Row, Select, Table, Upload } from 'antd';
import { FileSearchOutlined, UploadOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { coverLetterRows, jdList } from '../data/mockData';
import type { Navigate, RunMockAction, ShowAlert } from '../types/app';
import { statusTag } from '../utils/statusTag';

const { TextArea } = Input;
const { Dragger } = Upload;

type CoverLetterPageProps = {
  selectedJdId: string;
  coverUploaded: boolean;
  analysisDone: boolean;
  loadingKey: string | null;
  setSelectedJdId: (id: string) => void;
  setCoverUploaded: (value: boolean) => void;
  setAnalysisDone: (value: boolean) => void;
  runMockAction: RunMockAction;
  showAlert: ShowAlert;
  navigate: Navigate;
};

export function CoverLetterPage({
  selectedJdId,
  coverUploaded,
  analysisDone,
  loadingKey,
  setSelectedJdId,
  setCoverUploaded,
  setAnalysisDone,
  runMockAction,
  showAlert,
  navigate,
}: CoverLetterPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="Cover Letter"
        title="자기소개서 입력"
        description="지원자 자기소개서 단건 입력과 Excel 업로드 미리보기 UI를 제공합니다."
        actions={
          <Button
            type="primary"
            icon={<FileSearchOutlined />}
            onClick={() =>
              runMockAction(
                'cover-analysis',
                { type: 'success', message: '자기소개서 분석이 완료되었습니다.' },
                () => setAnalysisDone(true),
              )
            }
          >
            {loadingKey === 'cover-analysis' ? <InlineLoading label="분석 중" /> : '분석 요청'}
          </Button>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={11}>
          <SectionCard title="단건 입력">
            <Form layout="vertical">
              <Form.Item label="분석 대상 JD">
                <Select
                  value={selectedJdId}
                  onChange={setSelectedJdId}
                  options={jdList.map((item) => ({ value: item.id, label: item.title }))}
                />
              </Form.Item>
              <Form.Item label="지원자명">
                <Input defaultValue="김서연" />
              </Form.Item>
              <Form.Item label="자기소개서 본문">
                <TextArea rows={9} defaultValue="프로덕트의 복잡한 입력 흐름을 안정적으로 설계하고, 디자인 시스템과 접근성을 함께 개선한 경험이 있습니다." />
              </Form.Item>
            </Form>
          </SectionCard>
        </Col>
        <Col xs={24} xl={13}>
          <SectionCard title="Excel 업로드 미리보기">
            <Dragger
              beforeUpload={() => {
                setCoverUploaded(true);
                showAlert({ type: 'success', message: '샘플 Excel 파일을 불러왔습니다.' });
                return false;
              }}
              showUploadList={false}
              className="upload-box"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">cover_letters_sample.xlsx</p>
              <p className="ant-upload-hint">파일 선택 시 목업 샘플 데이터가 표시됩니다.</p>
            </Dragger>
            <Divider />
            {coverUploaded ? (
              <Table
                pagination={false}
                dataSource={coverLetterRows}
                rowClassName={(record) => (record.status.includes('누락') ? 'warning-row' : '')}
                columns={[
                  { title: '지원자', dataIndex: 'applicant' },
                  { title: 'JD', dataIndex: 'jd' },
                  { title: '상태', dataIndex: 'status', render: statusTag },
                  { title: '점수', dataIndex: 'score' },
                ]}
              />
            ) : (
              <Empty description="업로드된 자기소개서가 없습니다." />
            )}
            {analysisDone && (
              <Button className="mt-16" type="primary" block onClick={() => navigate('/chat')}>
                채팅 화면에서 리포트 확인
              </Button>
            )}
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
