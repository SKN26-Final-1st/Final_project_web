import { Button, Col, Row, Space } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { AnalysisSummaryPanel } from '../components/dashboard/AnalysisSummaryPanel';
import { ApplicantReviewTable } from '../components/dashboard/ApplicantReviewTable';
import { DashboardMetrics } from '../components/dashboard/DashboardMetrics';
import { TaskListPanel } from '../components/dashboard/TaskListPanel';
import { PageTitle } from '../components/common/PageTitle';
import type { DashboardData } from '../api/adapters';
import type { Navigate, ShowAlert, ThemeMode } from '../types/app';

type DashboardPageProps = {
  dashboard: DashboardData;
  mode: ThemeMode;
  navigate: Navigate;
  showAlert: ShowAlert;
  reloadData: () => Promise<void>;
};

export function DashboardPage({ dashboard, mode, navigate, showAlert, reloadData }: DashboardPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="Dashboard"
        title="채용 현황 대시보드"
        description="채용 공고, 지원자, AI 분석 리포트 상태를 한 화면에서 확인합니다."
        actions={
          <Space wrap>
            <Button
              icon={<ReloadOutlined />}
              onClick={() =>
                void reloadData().then(() => showAlert({ type: 'info', message: '대시보드 데이터를 새로고침했습니다.' }))
              }
            >
              새로고침
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/jd')}>
              새 채용 공고
            </Button>
          </Space>
        }
      />

      <DashboardMetrics metrics={dashboard.metrics} />

      <Row gutter={[22, 22]} className="section-row">
        <Col xs={24} xl={15}>
          <ApplicantReviewTable applicants={dashboard.applicants} showAlert={showAlert} />
        </Col>
        <Col xs={24} xl={9}>
          <AnalysisSummaryPanel
            analysisSummary={dashboard.analysisSummary}
            insightCards={dashboard.insightCards}
            mode={mode}
          />
        </Col>
      </Row>

      <TaskListPanel tasks={dashboard.tasks} />
    </>
  );
}
