import { Avatar, Button, Progress } from 'antd';
import { FileTextOutlined, MoreOutlined, TeamOutlined } from '@ant-design/icons';
import type { DashboardData } from '../../api/adapters';
import type { Navigate, ShowAlert, ThemeMode } from '../../types/app';
import { DashboardBarChart } from '../charts/DashboardBarChart';
import { DashboardLineChart } from '../charts/DashboardLineChart';
import { DonutChart } from '../charts/DonutChart';
import { statusTag } from '../../utils/statusTag';
import type { DashboardViewModel } from './dashboardViewModel';

type DashboardOverviewGridProps = {
  dashboard: DashboardData;
  mode: ThemeMode;
  navigate: Navigate;
  showAlert: ShowAlert;
  viewModel: DashboardViewModel;
};

function getInitial(name: string) {
  return name.trim().slice(0, 1);
}

export function DashboardOverviewGrid({
  dashboard,
  mode,
  navigate,
  showAlert,
  viewModel,
}: DashboardOverviewGridProps) {
  const { metrics, reviewStats } = viewModel;

  return (
    <section className="dashboard-card-grid" aria-label="채용 현황 요약">
      <article className="dashboard-score-card">
        <div className="score-card-top">
          <span>Review Queue</span>
          <FileTextOutlined />
        </div>
        <div className="score-card-metric-row" aria-label="검토 우선순위 요약">
          <span>
            <strong>{reviewStats.recommended}</strong>
            <small>면접 추천</small>
          </span>
          <span>
            <strong>{reviewStats.followUp}</strong>
            <small>추가 질문</small>
          </span>
        </div>
        <strong>
          {metrics.newApplicants.value}
          {metrics.newApplicants.suffix}
        </strong>
        <span>오늘 우선 검토할 신규 지원자</span>
        <div className="score-card-footer">
          <span>{metrics.newApplicants.change}</span>
          <span>평균 적합도 {reviewStats.averageFit}%</span>
        </div>
      </article>

      <article className="dashboard-panel-card dashboard-line-panel">
        <div className="panel-card-header">
          <div>
            <span className="panel-kicker">Pipeline</span>
            <h2>지원자 유입 추이</h2>
          </div>
          <span className="panel-value">
            {metrics.newApplicants.value}
            {metrics.newApplicants.suffix}
          </span>
        </div>
        <DashboardLineChart ariaLabel="월별 지원자 유입 추이 선 차트" data={viewModel.candidateTrend} mode={mode} />
      </article>

      <article className="dashboard-panel-card dashboard-bar-panel">
        <div className="panel-card-header">
          <div>
            <span className="panel-kicker">Report</span>
            <h2>분석 리포트 처리량</h2>
          </div>
          <Button type="text" aria-label="분석 리포트 더 보기" icon={<MoreOutlined />} />
        </div>
        <DashboardBarChart ariaLabel="월별 분석 리포트 처리량 막대 차트" data={viewModel.reportTrend} mode={mode} />
        <div className="dashboard-legend">
          <span>
            <i className="legend-dot primary" />
            완료
          </span>
          <span>
            <i className="legend-dot muted" />
            검토 대기
          </span>
        </div>
      </article>

      <article className="dashboard-panel-card dashboard-efficiency-panel">
        <div className="panel-card-header">
          <div>
            <span className="panel-kicker">Matching</span>
            <h2>평균 적합도</h2>
          </div>
        </div>
        <DonutChart data={dashboard.analysisSummary} mode={mode} />
        <div className="dashboard-legend compact">
          <span>
            <i className="legend-dot primary" />
            적합
          </span>
          <span>
            <i className="legend-dot muted" />
            검토 필요
          </span>
        </div>
      </article>

      <article className="dashboard-panel-card dashboard-queue-panel">
        <div className="panel-card-header">
          <div>
            <span className="panel-kicker">Applicant Queue</span>
            <h2>우선 검토 후보</h2>
          </div>
          <Button type="text" aria-label="지원자 상세 보기" icon={<TeamOutlined />} onClick={() => navigate('/cover-letter')} />
        </div>
        <div className="applicant-queue-list">
          {viewModel.priorityApplicants.map((applicant) => (
            <div className="applicant-queue-item" key={applicant.key}>
              <Avatar className="queue-avatar">{getInitial(applicant.name)}</Avatar>
              <span className="queue-copy">
                <strong>{applicant.name}</strong>
                <small>
                  {applicant.role} · {applicant.stage}
                </small>
              </span>
              <span className="queue-fit">
                <Progress percent={applicant.fit} size="small" showInfo={false} />
                <strong>{applicant.fit}%</strong>
              </span>
              {statusTag(applicant.status, applicant.statusCode)}
            </div>
          ))}
        </div>
      </article>

      <article className="dashboard-panel-card dashboard-insight-panel">
        <div className="panel-card-header">
          <div>
            <span className="panel-kicker">Signals</span>
            <h2>분석 신호</h2>
          </div>
          <Button
            type="text"
            aria-label="분석 신호 더 보기"
            icon={<MoreOutlined />}
            onClick={() => showAlert({ type: 'info', message: '분석 신호 상세는 API 연동 단계에서 연결합니다.' })}
          />
        </div>
        <div className="insight-signal-list">
          {dashboard.insightCards.map((insight) => (
            <div className="insight-signal-item" key={insight.title}>
              <i className={`insight-dot ${insight.tone}`} />
              <span>
                <strong>{insight.title}</strong>
                <small>{insight.detail}</small>
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
