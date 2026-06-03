import { Button, Col, Divider, List, Progress, Row, Space, Table } from 'antd';
import { CheckCircleOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { DonutChart } from '../components/charts/DonutChart';
import { MetricCard } from '../components/common/MetricCard';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { analysisSummary, applicants, insightCards, metrics, tasks } from '../data/mockData';
import type { Navigate, ShowAlert } from '../types/app';
import type { ThemeMode } from '../types/app';
import { statusTag } from '../utils/statusTag';

type DashboardPageProps = {
  mode: ThemeMode;
  navigate: Navigate;
  showAlert: ShowAlert;
};

export function DashboardPage({ mode, navigate, showAlert }: DashboardPageProps) {
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
              onClick={() => showAlert({ type: 'info', message: '대시보드 데이터를 새로고침했습니다.' })}
            >
              새로고침
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/jd')}>
              새 채용 공고
            </Button>
          </Space>
        }
      />

      <Row gutter={[22, 22]}>
        {metrics.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.label}>
            <MetricCard item={item} />
          </Col>
        ))}
      </Row>

      <Row gutter={[22, 22]} className="section-row">
        <Col xs={24} xl={15}>
          <SectionCard
            title="지원자 검토 목록"
            extra={
              <Button
                type="link"
                onClick={() => showAlert({ type: 'info', message: '지원자 상세 목록 화면은 API 연동 단계에서 연결됩니다.' })}
              >
                자세히
              </Button>
            }
          >
            <Table
              size="middle"
              pagination={false}
              scroll={{ x: 640 }}
              dataSource={applicants}
              columns={[
                { title: '지원자', dataIndex: 'name' },
                { title: '지원 직무', dataIndex: 'role' },
                {
                  title: '적합도',
                  dataIndex: 'fit',
                  render: (value: number) => <Progress percent={value} size="small" />,
                },
                { title: '단계', dataIndex: 'stage' },
                { title: '상태', dataIndex: 'status', render: statusTag },
              ]}
            />
          </SectionCard>
        </Col>
        <Col xs={24} xl={9}>
          <SectionCard title="분석 요약">
            <DonutChart data={analysisSummary} mode={mode} />
            <Divider />
            <List
              dataSource={insightCards}
              renderItem={(item) => (
                <List.Item>
                  <div className={`insight-dot ${item.tone}`} />
                  <List.Item.Meta title={item.title} description={item.detail} />
                </List.Item>
              )}
            />
          </SectionCard>
        </Col>
      </Row>

      <SectionCard title="오늘의 작업" className="section-row">
        <Row gutter={[16, 16]}>
          {tasks.map((task) => (
            <Col xs={24} md={12} xl={6} key={task}>
              <div className="task-item">
                <CheckCircleOutlined />
                <span>{task}</span>
              </div>
            </Col>
          ))}
        </Row>
      </SectionCard>
    </>
  );
}
