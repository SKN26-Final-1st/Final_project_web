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

export const metrics = [
  { label: '진행 중 공고', value: 3, suffix: '건', change: '+1 이번 주' },
  { label: '신규 지원자', value: 28, suffix: '명', change: '+12.5%' },
  { label: '분석 리포트', value: 52, suffix: '개', change: '완료율 91%' },
  { label: '분석 크레딧', value: 78, suffix: '%', change: '월간 잔여' },
];

export const applicants = [
  {
    key: 'a1',
    name: '김서연',
    role: 'Frontend Engineer',
    fit: 92,
    status: '면접 추천',
    stage: '1차 검토',
  },
  {
    key: 'a2',
    name: '이도윤',
    role: 'Backend Engineer',
    fit: 86,
    status: '추가 질문',
    stage: 'AI 분석',
  },
  {
    key: 'a3',
    name: '박민재',
    role: 'Data Analyst',
    fit: 78,
    status: '보류',
    stage: '서류 검토',
  },
  {
    key: 'a4',
    name: '최하린',
    role: 'Product Manager',
    fit: 88,
    status: '면접 추천',
    stage: '리포트 완료',
  },
];

export const insightCards = [
  {
    title: 'Frontend JD',
    detail: 'React·TypeScript 경험을 가진 지원자의 적합도가 높게 분포합니다.',
    tone: 'primary',
  },
  {
    title: 'Culture Fit',
    detail: '협업 문항에서 “문제 정의” 키워드가 강한 후보군을 우선 검토하세요.',
    tone: 'accent',
  },
  {
    title: 'Risk',
    detail: '자기소개서 누락 행 2건이 있어 업로드 데이터 확인이 필요합니다.',
    tone: 'warning',
  },
];

export const tasks = [
  'JD 분석 요청 2건 승인',
  '자기소개서 Excel 오류 행 확인',
  '마케팅 직군 공고 미리보기 공유',
  '면접 추천 후보자 4명 검토',
];

export const companyProfile = {
  name: 'HumouR Labs',
  industry: 'AI 기반 HR 채용 보조 시스템',
  size: '51-200명',
  location: 'Seoul, KR',
  values: ['데이터 기반 의사결정', '투명한 피드백', '빠른 실험', '책임 있는 AI'],
  benefits: ['자율 출퇴근', '교육비 지원', '리모트 협업', '채용 리서치 세미나'],
  completion: 82,
};

export const jdList = [
  {
    id: 'jd-fe',
    title: 'Frontend Engineer',
    team: 'Product Platform',
    status: '분석 완료',
    fit: 91,
    stack: ['React', 'TypeScript', 'Testing', 'Design System'],
    summary: '복잡한 HR 워크플로를 빠르게 이해하고 안정적인 UI로 구현합니다.',
  },
  {
    id: 'jd-be',
    title: 'Backend Engineer',
    team: 'AI Workflow',
    status: '분석 대기',
    fit: 74,
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'LLM Ops'],
    summary: '채용 데이터 파이프라인과 분석 API를 안정적으로 운영합니다.',
  },
  {
    id: 'jd-da',
    title: 'Data Analyst',
    team: 'People Analytics',
    status: '작성 중',
    fit: 68,
    stack: ['SQL', 'Python', 'Dashboard', 'Statistics'],
    summary: '지원자 경험과 채용 성과 지표를 정량적으로 분석합니다.',
  },
];

export type JdItem = (typeof jdList)[number];

export const coverLetterRows = [
  {
    key: 'row1',
    applicant: '김서연',
    jd: 'Frontend Engineer',
    status: '정상',
    score: 92,
  },
  {
    key: 'row2',
    applicant: '이도윤',
    jd: 'Backend Engineer',
    status: '질문 누락',
    score: 0,
  },
  {
    key: 'row3',
    applicant: '최하린',
    jd: 'Product Manager',
    status: '정상',
    score: 88,
  },
];

export const reportTabs = [
  {
    key: 'summary',
    label: '요약',
    title: '지원자 핵심 요약',
    content: 'React 기반 대규모 폼 구현 경험과 협업 문항의 구체성이 돋보입니다.',
  },
  {
    key: 'fit',
    label: '적합도',
    title: '직무 적합도',
    content: '기술 스택 일치도 92%, 문제 해결 경험 86%, 커뮤니케이션 88%입니다.',
  },
  {
    key: 'risk',
    label: '리스크',
    title: '검토 필요 항목',
    content: '최근 프로젝트에서 테스트 자동화 경험을 추가 질문으로 확인하세요.',
  },
];

export const exampleQuestions = [
  '이 지원자의 강점 3가지를 알려줘',
  '면접에서 확인할 리스크 질문을 추천해줘',
  'JD와 자기소개서의 불일치 항목은?',
  '최종 검토 의견을 5줄로 정리해줘',
];

export const initialChatMessages: ChatMessage[] = [
  {
    role: 'assistant' as const,
    text: '김서연 지원자의 분석 리포트가 준비되었습니다. 궁금한 항목을 선택해 주세요.',
  },
  {
    role: 'user' as const,
    text: '프론트엔드 직무 적합도를 요약해줘.',
  },
  {
    role: 'assistant' as const,
    text: 'React·TypeScript 경험과 UI 상태 관리 역량이 JD 요구사항과 높게 일치합니다.',
  },
];

export const recruitmentPreview = {
  title: 'Frontend Engineer 채용 공고',
  sections: [
    'HumouR Labs는 AI 기반 HR 채용 보조 시스템을 함께 고도화할 프론트엔드 엔지니어를 찾습니다.',
    '주요 업무는 채용 워크플로 UI, 분석 리포트 대시보드, 공통 디자인 시스템 개선입니다.',
    'React, TypeScript, 접근성, 대규모 폼 설계 경험을 중요하게 봅니다.',
  ],
};

export const templateQuestions = [
  {
    title: '문항 1. 문제 해결 경험',
    guide: '복잡한 UI 요구사항을 구조화하고 해결한 경험을 STAR 방식으로 작성합니다.',
  },
  {
    title: '문항 2. 협업 방식',
    guide: '디자이너, 백엔드, 데이터 담당자와 의사결정을 맞춘 사례를 구체화합니다.',
  },
  {
    title: '문항 3. 책임 있는 AI 이해',
    guide: '채용 도메인에서 편향과 개인정보를 고려한 경험이나 관점을 설명합니다.',
  },
];
