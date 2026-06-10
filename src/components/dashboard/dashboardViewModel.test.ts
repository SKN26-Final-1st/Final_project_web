import type { DashboardData, NotificationsData } from '../../api/adapters';
import { buildDashboardViewModel } from './dashboardViewModel';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, received ${String(actual)}`);
  }
}

function assertDeepEqual<T>(actual: T, expected: T, message: string) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`${message}: expected ${expectedJson}, received ${actualJson}`);
  }
}

const dashboard: DashboardData = {
  metrics: [
    { key: 'reports', label: '분석 리포트', value: 12, suffix: '개', change: '완료율 80%' },
    { key: 'credits', label: '분석 크레딧', value: 22, suffix: '%', change: '주의' },
    { key: 'new_applicants', label: '신규 지원자', value: 9, suffix: '명', change: '+3' },
    { key: 'active_jobs', label: '진행 중 공고', value: 4, suffix: '건', change: '+1' },
  ],
  applicants: [
    {
      key: 'app-2',
      name: '이도윤',
      role: 'Backend Engineer',
      fit: 84,
      stage: 'AI 분석',
      status: '추가 질문',
      statusCode: 'needs_followup',
    },
    {
      key: 'app-1',
      name: '김서연',
      role: 'Frontend Engineer',
      fit: 93,
      stage: '1차 검토',
      status: '면접 추천',
      statusCode: 'interview_recommended',
    },
  ],
  insightCards: [],
  analysisSummary: {
    centerValue: 88,
    centerLabel: '평균 적합도',
    segments: [
      { label: '적합', value: 88, colorKey: 'primary' },
      { label: '검토 필요', value: 12, colorKey: 'track' },
    ],
  },
  tasks: [
    { id: 'task-low', title: '공고 미리보기 공유', priority: 'low' },
    { id: 'task-high', title: 'Excel 오류 행 확인', priority: 'high' },
    { id: 'task-medium', title: '후보자 2명 검토', priority: 'medium' },
  ],
  trends: [
    {
      key: 'report_throughput',
      labels: ['4월', '5월'],
      values: [8, 12],
      name: '분석 리포트',
      unit: '개',
    },
    {
      key: 'candidate_flow',
      labels: ['4월', '5월'],
      values: [5, 9],
      name: '지원자',
      unit: '명',
    },
  ],
  creditPercent: 22,
};

const notifications: NotificationsData = {
  unreadCount: 1,
  items: [
    {
      id: 'notice-read',
      title: '지난 리포트 확인',
      body: '읽은 알림입니다.',
      createdAt: '2026-06-03T09:00:00+09:00',
      isRead: true,
    },
    {
      id: 'notice-new',
      title: '신규 리포트 완료',
      body: '방금 분석이 완료되었습니다.',
      createdAt: '2026-06-04T09:00:00+09:00',
      isRead: false,
    },
  ],
};

const viewModel = buildDashboardViewModel(dashboard, notifications);

assertEqual(viewModel.metrics.activeJobs.value, 4, 'active jobs metric should come from metric key');
assertEqual(viewModel.metrics.newApplicants.value, 9, 'new applicants metric should come from metric key');
assertEqual(viewModel.metrics.reports.value, 12, 'reports metric should come from metric key');
assertEqual(viewModel.metrics.credits.value, 22, 'credits metric should come from metric key');

assertDeepEqual(viewModel.candidateTrend.values, [5, 9], 'candidate trend should come from dashboard trend data');
assertDeepEqual(viewModel.reportTrend.values, [8, 12], 'report trend should come from dashboard trend data');

assertDeepEqual(
  viewModel.actionItems.map((item) => item.id),
  ['notice-new', 'task-high', 'task-medium', 'task-low', 'notice-read'],
  'action rail should prioritize unread notifications and high-priority tasks',
);

assertEqual(viewModel.reviewStats.recommended, 1, 'review stats should count interview recommendations');
assertEqual(viewModel.reviewStats.followUp, 1, 'review stats should count follow-up candidates');
assertEqual(viewModel.priorityApplicants[0].key, 'app-1', 'priority applicants should sort by strongest action signal');
