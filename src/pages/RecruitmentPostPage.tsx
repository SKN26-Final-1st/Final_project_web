import type { Key } from 'react';
import { Button, Col, Empty, Row, Space, Table, Tag } from 'antd';
import { DownloadOutlined, FileSearchOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { jdList, recruitmentPreview } from '../data/mockData';
import type { KeySetter, RunMockAction, ShowAlert } from '../types/app';
import { statusTag } from '../utils/statusTag';

type RecruitmentPostPageProps = {
  selectedRows: Key[];
  postGenerated: boolean;
  loadingKey: string | null;
  setSelectedRows: KeySetter;
  setPostGenerated: (value: boolean) => void;
  runMockAction: RunMockAction;
  showAlert: ShowAlert;
};

export function RecruitmentPostPage({
  selectedRows,
  postGenerated,
  loadingKey,
  setSelectedRows,
  setPostGenerated,
  runMockAction,
  showAlert,
}: RecruitmentPostPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="Recruitment Post"
        title="모집 공고 작성"
        description="복수 JD를 선택하고 생성된 모집 공고 미리보기와 PDF 다운로드 흐름을 확인합니다."
        actions={
          <Space wrap>
            <Button
              icon={<FileSearchOutlined />}
              type="primary"
              disabled={!selectedRows.length}
              onClick={() =>
                runMockAction('post-generate', { type: 'success', message: '모집 공고를 생성했습니다.' }, () => setPostGenerated(true))
              }
            >
              {loadingKey === 'post-generate' ? <InlineLoading label="생성 중" /> : '공고 생성'}
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => showAlert({ type: 'info', message: 'PDF 다운로드 목업을 실행했습니다.' })}>
              PDF
            </Button>
          </Space>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={13}>
          <SectionCard title="JD 선택">
            <Table
              rowKey="id"
              pagination={false}
              dataSource={jdList}
              rowSelection={{
                selectedRowKeys: selectedRows,
                onChange: (keys) => setSelectedRows(keys),
              }}
              columns={[
                { title: '직무', dataIndex: 'title' },
                { title: '팀', dataIndex: 'team' },
                { title: '상태', dataIndex: 'status', render: statusTag },
                { title: '적합도', dataIndex: 'fit', render: (value: number) => `${value}%` },
              ]}
            />
          </SectionCard>
        </Col>
        <Col xs={24} xl={11}>
          <SectionCard title="선택 요약">
            {selectedRows.length ? (
              <Space wrap>
                {jdList
                  .filter((item) => selectedRows.includes(item.id))
                  .map((item) => (
                    <Tag className="large-tag" key={item.id}>
                      {item.title}
                    </Tag>
                  ))}
              </Space>
            ) : (
              <Empty description="선택한 JD가 없습니다." />
            )}
          </SectionCard>
        </Col>
        <Col span={24}>
          <SectionCard title="공고 미리보기">
            {postGenerated ? (
              <div className="document-preview">
                <h2>{recruitmentPreview.title}</h2>
                {recruitmentPreview.sections.map((section) => (
                  <p key={section}>{section}</p>
                ))}
              </div>
            ) : (
              <Empty description="생성된 공고가 없습니다." />
            )}
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
