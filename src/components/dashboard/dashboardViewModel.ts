import type {
  ApplicantRow,
  DashboardData,
  DashboardTask,
  DashboardTrend,
  MetricItem,
  NotificationsData,
  NotificationItem,
} from '../../api/adapters';
import { type TrendChartData, toTrendChartData } from '../charts/chartAdapters';

type DashboardMetricGroup = {
  activeJobs: MetricItem;
  newApplicants: MetricItem;
  reports: MetricItem;
  credits: MetricItem;
};

export type DashboardActionItem = {
  id: string;
  title: string;
  detail: string;
  badge: string;
  tone: 'primary' | 'accent' | 'warning' | 'muted';
  kind: 'notification' | 'task';
};

export type DashboardReviewStats = {
  total: number;
  recommended: number;
  followUp: number;
  onHold: number;
  averageFit: number;
};

export type DashboardViewModel = {
  metrics: DashboardMetricGroup;
  candidateTrend: TrendChartData;
  reportTrend: TrendChartData;
  topApplicants: ApplicantRow[];
  priorityApplicants: ApplicantRow[];
  actionItems: DashboardActionItem[];
  reviewStats: DashboardReviewStats;
  creditTone: 'normal' | 'warning';
};

const metricFallbacks: Record<keyof DashboardMetricGroup, { key: string; label: string; suffix: string }> = {
  activeJobs: { key: 'active_jobs', label: '진행 중 공고', suffix: '건' },
  newApplicants: { key: 'new_applicants', label: '신규 지원자', suffix: '명' },
  reports: { key: 'reports', label: '분석 리포트', suffix: '개' },
  credits: { key: 'credits', label: '분석 크레딧', suffix: '%' },
};

const taskPriorityRank: Record<DashboardTask['priority'], number> = {
  high: 1,
  medium: 2,
  low: 3,
};

const taskPriorityLabel: Record<DashboardTask['priority'], string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

const applicantStatusRank: Partial<Record<ApplicantRow['statusCode'], number>> = {
  interview_recommended: 0,
  needs_followup: 1,
  on_hold: 2,
};

function emptyMetric(metric: keyof DashboardMetricGroup): MetricItem {
  const fallback = metricFallbacks[metric];

  return {
    key: fallback.key,
    label: fallback.label,
    value: 0,
    suffix: fallback.suffix,
    change: '데이터 없음',
  };
}

function findMetric(metrics: MetricItem[], metric: keyof DashboardMetricGroup) {
  const fallback = metricFallbacks[metric];

  return metrics.find((item) => item.key === fallback.key) ?? metrics.find((item) => item.label === fallback.label) ?? emptyMetric(metric);
}

function findTrend(trends: DashboardTrend[], key: string, fallbackMetric: MetricItem): TrendChartData {
  const trend = trends.find((item) => item.key === key);

  if (trend) {
    return toTrendChartData(trend);
  }

  return {
    labels: ['현재'],
    values: [fallbackMetric.value],
    name: fallbackMetric.label,
    unit: fallbackMetric.suffix,
  };
}

function compareApplicantsByAction(left: ApplicantRow, right: ApplicantRow) {
  const leftRank = applicantStatusRank[left.statusCode] ?? 9;
  const rightRank = applicantStatusRank[right.statusCode] ?? 9;

  if (leftRank !== rightRank) {
    return leftRank - rightRank;
  }

  return right.fit - left.fit;
}

function getReviewStats(applicants: ApplicantRow[]): DashboardReviewStats {
  const totalFit = applicants.reduce((sum, applicant) => sum + applicant.fit, 0);

  return {
    total: applicants.length,
    recommended: applicants.filter((applicant) => applicant.statusCode === 'interview_recommended').length,
    followUp: applicants.filter((applicant) => applicant.statusCode === 'needs_followup').length,
    onHold: applicants.filter((applicant) => applicant.statusCode === 'on_hold').length,
    averageFit: applicants.length ? Math.round(totalFit / applicants.length) : 0,
  };
}

function notificationToActionItem(notification: NotificationItem): DashboardActionItem & { rank: number; time: number } {
  return {
    id: notification.id,
    title: notification.title,
    detail: notification.body,
    badge: notification.isRead ? '읽음' : '신규',
    tone: notification.isRead ? 'muted' : 'accent',
    kind: 'notification',
    rank: notification.isRead ? 4 : 0,
    time: Date.parse(notification.createdAt) || 0,
  };
}

function taskToActionItem(task: DashboardTask): DashboardActionItem & { rank: number; time: number } {
  return {
    id: task.id,
    title: task.title,
    detail: '오늘의 채용 운영 작업',
    badge: taskPriorityLabel[task.priority],
    tone: task.priority === 'high' ? 'warning' : 'primary',
    kind: 'task',
    rank: taskPriorityRank[task.priority],
    time: 0,
  };
}

function stripActionSortFields(item: DashboardActionItem & { rank: number; time: number }): DashboardActionItem {
  return {
    id: item.id,
    title: item.title,
    detail: item.detail,
    badge: item.badge,
    tone: item.tone,
    kind: item.kind,
  };
}

function getActionItems(dashboard: DashboardData, notifications: NotificationsData): DashboardActionItem[] {
  return [...notifications.items.map(notificationToActionItem), ...dashboard.tasks.map(taskToActionItem)]
    .sort((left, right) => left.rank - right.rank || right.time - left.time)
    .slice(0, 5)
    .map(stripActionSortFields);
}

export function buildDashboardViewModel(dashboard: DashboardData, notifications: NotificationsData): DashboardViewModel {
  const metrics = {
    activeJobs: findMetric(dashboard.metrics, 'activeJobs'),
    newApplicants: findMetric(dashboard.metrics, 'newApplicants'),
    reports: findMetric(dashboard.metrics, 'reports'),
    credits: findMetric(dashboard.metrics, 'credits'),
  };

  return {
    metrics,
    candidateTrend: findTrend(dashboard.trends, 'candidate_flow', metrics.newApplicants),
    reportTrend: findTrend(dashboard.trends, 'report_throughput', metrics.reports),
    topApplicants: [...dashboard.applicants].sort((left, right) => right.fit - left.fit).slice(0, 4),
    priorityApplicants: [...dashboard.applicants].sort(compareApplicantsByAction).slice(0, 3),
    actionItems: getActionItems(dashboard, notifications),
    reviewStats: getReviewStats(dashboard.applicants),
    creditTone: metrics.credits.value < 30 ? 'warning' : 'normal',
  };
}
