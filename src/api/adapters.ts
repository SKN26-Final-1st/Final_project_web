import type {
  analysisReportApiResponse,
  authDefaultsApiResponse,
  companyApiResponse,
  companyChoicesApiResponse,
  coverLetterDraftApiResponse,
  coverLettersApiResponse,
  dashboardApiResponse,
  jobDescriptionsApiResponse,
  notificationsApiResponse,
  recruitmentPostApiResponse,
  StatusCode,
  userProfileApiResponse,
} from '../data/apiMockData';
import type { ChatMessage } from '../data/mockData';

type ApiData<T> = T extends { data: infer Data } ? Data : never;

export type MetricItem = {
  label: string;
  value: number;
  suffix: string;
  change: string;
};

export type ApplicantRow = {
  key: string;
  name: string;
  role: string;
  fit: number;
  stage: string;
  status: string;
  statusCode: StatusCode;
};

export type InsightCard = {
  title: string;
  detail: string;
  tone: 'primary' | 'accent' | 'warning';
};

export type AnalysisSummary = {
  centerValue: number;
  centerLabel: string;
  segments: {
    label: string;
    value: number;
    colorKey: 'primary' | 'accent' | 'track' | 'warning';
  }[];
};

export type DashboardData = {
  metrics: MetricItem[];
  applicants: ApplicantRow[];
  insightCards: InsightCard[];
  analysisSummary: AnalysisSummary;
  tasks: string[];
  creditPercent: number;
};

export type CompanyProfile = {
  name: string;
  industry: string;
  size: string;
  location: string;
  introduction: string;
  values: string[];
  benefits: string[];
  completion: number;
};

export type CompanyChoices = {
  employeeSizeOptions: string[];
  notificationChannels: {
    value: string;
    label: string;
  }[];
};

export type JdItem = {
  id: string;
  title: string;
  team: string;
  status: string;
  statusCode: StatusCode;
  fit: number;
  stack: string[];
  summary: string;
  requiredExperience: string;
  employmentType: string;
};

export type CoverLetterDraft = {
  applicantName: string;
  body: string;
  sampleFileName: string;
  uploadHint: string;
};

export type CoverLetterRow = {
  key: string;
  applicant: string;
  jd: string;
  status: string;
  statusCode: StatusCode;
  score: number;
};

export type AnalysisReportData = {
  reportId: string;
  applicantName: string;
  jobTitle: string;
  tabs: ApiData<typeof analysisReportApiResponse>['tabs'];
  exampleQuestions: string[];
  chatMessages: ChatMessage[];
};

export type RecruitmentPreview = ApiData<typeof recruitmentPostApiResponse>;

export type TemplateQuestion = {
  title: string;
  guide: string;
};

export type UserProfile = {
  displayName: string;
  roleName: string;
  email: string;
  avatarUrl: string;
  companyName: string;
  lastLoginText: string;
  notificationChannel: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
};

export type NotificationsData = {
  unreadCount: number;
  items: NotificationItem[];
};

export type AuthDefaults = ApiData<typeof authDefaultsApiResponse>;

export function mapDashboard(data: ApiData<typeof dashboardApiResponse>): DashboardData {
  const metrics = data.metrics.map((item) => ({
    label: item.label,
    value: item.value,
    suffix: item.suffix,
    change: item.delta_label,
  }));

  const creditMetric = data.metrics.find((item) => item.metric_key === 'credits');

  return {
    metrics,
    applicants: data.applicants.map((item) => ({
      key: item.id,
      name: item.applicant_name,
      role: item.job_title,
      fit: item.fit_score,
      stage: item.review_stage,
      status: item.status_label,
      statusCode: item.status_code,
    })),
    insightCards: data.insights.map((item) => ({
      title: item.title,
      detail: item.detail,
      tone: item.tone,
    })),
    analysisSummary: {
      centerValue: data.analysis_summary.center_value,
      centerLabel: data.analysis_summary.center_label,
      segments: data.analysis_summary.segments.map((segment) => ({
        label: segment.label,
        value: segment.value,
        colorKey: segment.color_key,
      })),
    },
    tasks: data.tasks.map((task) => task.title),
    creditPercent: creditMetric?.value ?? 0,
  };
}

export function mapCompany(data: ApiData<typeof companyApiResponse>): CompanyProfile {
  return {
    name: data.name,
    industry: data.industry,
    size: data.employee_size,
    location: data.location,
    introduction: data.introduction,
    values: data.core_values,
    benefits: data.benefits,
    completion: data.profile_completion,
  };
}

export function mapCompanyChoices(data: ApiData<typeof companyChoicesApiResponse>): CompanyChoices {
  return {
    employeeSizeOptions: data.employee_size_options,
    notificationChannels: data.notification_channels,
  };
}

export function mapJdList(data: ApiData<typeof jobDescriptionsApiResponse>): JdItem[] {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    team: item.team_name,
    status: item.status_label,
    statusCode: item.status_code,
    fit: item.fit_score,
    stack: item.tech_stacks,
    summary: item.summary,
    requiredExperience: item.required_experience,
    employmentType: item.employment_type,
  }));
}

export function mapCoverLetterDraft(data: ApiData<typeof coverLetterDraftApiResponse>): CoverLetterDraft {
  return {
    applicantName: data.applicant_name,
    body: data.body,
    sampleFileName: data.sample_file_name,
    uploadHint: data.upload_hint,
  };
}

export function mapCoverLetterRows(data: ApiData<typeof coverLettersApiResponse>): CoverLetterRow[] {
  return data.rows.map((row) => ({
    key: row.id,
    applicant: row.applicant_name,
    jd: row.job_title,
    status: row.status_label,
    statusCode: row.status_code,
    score: row.analysis_score,
  }));
}

export function mapAnalysisReport(data: ApiData<typeof analysisReportApiResponse>): AnalysisReportData {
  return {
    reportId: data.report_id,
    applicantName: data.applicant_name,
    jobTitle: data.job_title,
    tabs: data.tabs,
    exampleQuestions: data.example_questions,
    chatMessages: data.chat_messages,
  };
}

export function mapTemplateQuestions(data: { questions: { title: string; guide: string }[] }): TemplateQuestion[] {
  return data.questions.map((question) => ({
    title: question.title,
    guide: question.guide,
  }));
}

export function mapUserProfile(data: ApiData<typeof userProfileApiResponse>): UserProfile {
  return {
    displayName: data.display_name,
    roleName: data.role_name,
    email: data.email,
    avatarUrl: data.avatar_url,
    companyName: data.company_name,
    lastLoginText: formatLastLogin(data.last_login_at),
    notificationChannel: data.notification_channel,
  };
}

export function mapNotifications(data: ApiData<typeof notificationsApiResponse>): NotificationsData {
  return {
    unreadCount: data.unread_count,
    items: data.items.map((item) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      createdAt: item.created_at,
      isRead: item.is_read,
    })),
  };
}

function formatLastLogin(isoDate: string) {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
