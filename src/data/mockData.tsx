import type { ReactNode } from 'react';
import {
  BankOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FormOutlined,
  IdcardOutlined,
  MessageOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  analysisReportApiResponse,
  companyApiResponse,
  coverLettersApiResponse,
  coverLetterTemplateApiResponse,
  dashboardApiResponse,
  jobDescriptionsApiResponse,
  recruitmentPostApiResponse,
} from './apiMockData';

export type AppRoute =
  | '/dashboard'
  | '/company'
  | '/jd'
  | '/cover-letter'
  | '/chat'
  | '/mypage'
  | '/recruitment-post'
  | '/cover-letter-template'
  | '/login'
  | '/signup'
  | '/password-reset';

export type MenuItem = {
  route: AppRoute;
  label: string;
  description: string;
  icon: ReactNode;
};

export type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

export const palette = {
  primary: '#2563EB',
  accent: '#14B8A6',
  dark: '#1E3A8A',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
};

export const mainMenu: MenuItem[] = [
  {
    route: '/dashboard',
    label: '대시보드',
    description: '채용/지원자/분석 현황 요약',
    icon: <DashboardOutlined />,
  },
  {
    route: '/company',
    label: '회사 정보',
    description: '회사 프로필과 분석 기준',
    icon: <BankOutlined />,
  },
  {
    route: '/jd',
    label: 'JD 관리',
    description: '직무기술서 작성/분석 요청',
    icon: <ProfileOutlined />,
  },
  {
    route: '/cover-letter',
    label: '자기소개서',
    description: '단건 입력과 Excel 업로드',
    icon: <FileTextOutlined />,
  },
  {
    route: '/chat',
    label: '채팅',
    description: '리포트 기반 질의응답',
    icon: <MessageOutlined />,
  },
  {
    route: '/mypage',
    label: '마이페이지',
    description: '프로필/보안/회사 요약',
    icon: <UserOutlined />,
  },
  {
    route: '/recruitment-post',
    label: '모집 공고',
    description: '복수 JD 기반 공고 미리보기',
    icon: <FileDoneOutlined />,
  },
  {
    route: '/cover-letter-template',
    label: '자소서 포맷',
    description: 'JD 기반 문항/가이드 생성',
    icon: <FormOutlined />,
  },
];

export const authMenu: MenuItem[] = [
  {
    route: '/login',
    label: '로그인',
    description: '목업 인증 전환',
    icon: <IdcardOutlined />,
  },
  {
    route: '/signup',
    label: '회원가입',
    description: 'ID 중복 확인과 프로필 업로드',
    icon: <UserOutlined />,
  },
  {
    route: '/password-reset',
    label: '비밀번호 찾기',
    description: '단계형 재설정',
    icon: <FileTextOutlined />,
  },
];

export const mockApiResponses = {
  dashboard: dashboardApiResponse,
  company: companyApiResponse,
  jobDescriptions: jobDescriptionsApiResponse,
  coverLetters: coverLettersApiResponse,
  analysisReport: analysisReportApiResponse,
  recruitmentPost: recruitmentPostApiResponse,
  coverLetterTemplate: coverLetterTemplateApiResponse,
};

export const metrics = dashboardApiResponse.data.metrics.map((item) => ({
  label: item.label,
  value: item.value,
  suffix: item.suffix,
  change: item.delta_label,
}));

export const applicants = dashboardApiResponse.data.applicants.map((item) => ({
  key: item.id,
  name: item.applicant_name,
  role: item.job_title,
  fit: item.fit_score,
  status: item.status_label,
  stage: item.review_stage,
}));

export const insightCards = dashboardApiResponse.data.insights.map((item) => ({
  title: item.title,
  detail: item.detail,
  tone: item.tone,
}));

export const analysisSummary = {
  centerValue: dashboardApiResponse.data.analysis_summary.center_value,
  centerLabel: dashboardApiResponse.data.analysis_summary.center_label,
  segments: dashboardApiResponse.data.analysis_summary.segments.map((segment) => ({
    label: segment.label,
    value: segment.value,
    colorKey: segment.color_key,
  })),
};

export const tasks = dashboardApiResponse.data.tasks.map((task) => task.title);

export const companyProfile = {
  name: companyApiResponse.data.name,
  industry: companyApiResponse.data.industry,
  size: companyApiResponse.data.employee_size,
  location: companyApiResponse.data.location,
  introduction: companyApiResponse.data.introduction,
  values: companyApiResponse.data.core_values,
  benefits: companyApiResponse.data.benefits,
  completion: companyApiResponse.data.profile_completion,
};

export const jdList = jobDescriptionsApiResponse.data.map((item) => ({
  id: item.id,
  title: item.title,
  team: item.team_name,
  status: item.status_label,
  fit: item.fit_score,
  stack: item.tech_stacks,
  summary: item.summary,
  requiredExperience: item.required_experience,
  employmentType: item.employment_type,
}));

export type JdItem = (typeof jdList)[number];

export const coverLetterRows = coverLettersApiResponse.data.rows.map((row) => ({
  key: row.id,
  applicant: row.applicant_name,
  jd: row.job_title,
  status: row.status_label,
  score: row.analysis_score,
}));

export const reportTabs = analysisReportApiResponse.data.tabs;

export const exampleQuestions = analysisReportApiResponse.data.example_questions;

export const initialChatMessages: ChatMessage[] = analysisReportApiResponse.data.chat_messages;

export const recruitmentPreview = recruitmentPostApiResponse.data;

export const templateQuestions = coverLetterTemplateApiResponse.data.questions.map((question) => ({
  title: question.title,
  guide: question.guide,
}));
