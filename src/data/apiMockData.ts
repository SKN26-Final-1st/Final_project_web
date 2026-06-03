export type ApiResponse<T> = {
  status_code: number;
  message: string;
  data: T;
  meta?: {
    page?: number;
    page_size?: number;
    total_count?: number;
    requested_at: string;
  };
};

export const dashboardApiResponse = {
  status_code: 200,
  message: 'dashboard summary loaded',
  meta: {
    requested_at: '2026-06-03T09:00:00+09:00',
  },
  data: {
    metrics: [
      { metric_key: 'active_jobs', label: '진행 중 공고', value: 3, suffix: '건', delta_label: '+1 이번 주' },
      { metric_key: 'new_applicants', label: '신규 지원자', value: 28, suffix: '명', delta_label: '+12.5%' },
      { metric_key: 'reports', label: '분석 리포트', value: 52, suffix: '개', delta_label: '완료율 91%' },
      { metric_key: 'credits', label: '분석 크레딧', value: 78, suffix: '%', delta_label: '월간 잔여' },
    ],
    applicants: [
      {
        id: 'app-001',
        applicant_name: '김서연',
        job_title: 'Frontend Engineer',
        fit_score: 92,
        review_stage: '1차 검토',
        status_code: 'interview_recommended',
        status_label: '면접 추천',
      },
      {
        id: 'app-002',
        applicant_name: '이도윤',
        job_title: 'Backend Engineer',
        fit_score: 86,
        review_stage: 'AI 분석',
        status_code: 'needs_followup',
        status_label: '추가 질문',
      },
      {
        id: 'app-003',
        applicant_name: '박민재',
        job_title: 'Data Analyst',
        fit_score: 78,
        review_stage: '서류 검토',
        status_code: 'on_hold',
        status_label: '보류',
      },
      {
        id: 'app-004',
        applicant_name: '최하린',
        job_title: 'Product Manager',
        fit_score: 88,
        review_stage: '리포트 완료',
        status_code: 'interview_recommended',
        status_label: '면접 추천',
      },
    ],
    insights: [
      {
        insight_key: 'frontend_jd',
        title: 'Frontend JD',
        detail: 'React·TypeScript 경험을 가진 지원자의 적합도가 높게 분포합니다.',
        tone: 'primary',
      },
      {
        insight_key: 'culture_fit',
        title: 'Culture Fit',
        detail: '협업 문항에서 “문제 정의” 키워드가 강한 후보군을 우선 검토하세요.',
        tone: 'accent',
      },
      {
        insight_key: 'data_risk',
        title: 'Risk',
        detail: '자기소개서 누락 행 2건이 있어 업로드 데이터 확인이 필요합니다.',
        tone: 'warning',
      },
    ],
    analysis_summary: {
      chart_type: 'donut',
      center_value: 86,
      center_label: '평균 적합도',
      segments: [
        { label: '적합', value: 86, color_key: 'primary' },
        { label: '검토 필요', value: 14, color_key: 'track' },
      ],
    },
    tasks: [
      { id: 'task-001', title: 'JD 분석 요청 2건 승인', priority: 'high' },
      { id: 'task-002', title: '자기소개서 Excel 오류 행 확인', priority: 'high' },
      { id: 'task-003', title: '마케팅 직군 공고 미리보기 공유', priority: 'medium' },
      { id: 'task-004', title: '면접 추천 후보자 4명 검토', priority: 'medium' },
    ],
  },
} satisfies ApiResponse<{
  metrics: {
    metric_key: string;
    label: string;
    value: number;
    suffix: string;
    delta_label: string;
  }[];
  applicants: {
    id: string;
    applicant_name: string;
    job_title: string;
    fit_score: number;
    review_stage: string;
    status_code: string;
    status_label: string;
  }[];
  insights: {
    insight_key: string;
    title: string;
    detail: string;
    tone: 'primary' | 'accent' | 'warning';
  }[];
  analysis_summary: {
    chart_type: 'donut';
    center_value: number;
    center_label: string;
    segments: {
      label: string;
      value: number;
      color_key: 'primary' | 'accent' | 'track' | 'warning';
    }[];
  };
  tasks: {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}>;

export const companyApiResponse = {
  status_code: 200,
  message: 'company profile loaded',
  data: {
    id: 'company-001',
    name: 'HumouR Labs',
    industry: 'AI 기반 HR 채용 보조 시스템',
    employee_size: '51-200명',
    location: 'Seoul, KR',
    introduction: 'AI 기반 HR 채용 보조 시스템으로 채용 담당자의 검토 흐름을 빠르게 만듭니다.',
    core_values: ['데이터 기반 의사결정', '투명한 피드백', '빠른 실험', '책임 있는 AI'],
    benefits: ['자율 출퇴근', '교육비 지원', '리모트 협업', '채용 리서치 세미나'],
    profile_completion: 82,
  },
} satisfies ApiResponse<{
  id: string;
  name: string;
  industry: string;
  employee_size: string;
  location: string;
  introduction: string;
  core_values: string[];
  benefits: string[];
  profile_completion: number;
}>;

export const jobDescriptionsApiResponse = {
  status_code: 200,
  message: 'job descriptions loaded',
  meta: {
    page: 1,
    page_size: 20,
    total_count: 3,
    requested_at: '2026-06-03T09:00:00+09:00',
  },
  data: [
    {
      id: 'jd-fe',
      title: 'Frontend Engineer',
      team_name: 'Product Platform',
      status_code: 'analysis_done',
      status_label: '분석 완료',
      fit_score: 91,
      tech_stacks: ['React', 'TypeScript', 'Testing', 'Design System'],
      summary: '복잡한 HR 워크플로를 빠르게 이해하고 안정적인 UI로 구현합니다.',
      required_experience: '3년 이상',
      employment_type: '정규직',
    },
    {
      id: 'jd-be',
      title: 'Backend Engineer',
      team_name: 'AI Workflow',
      status_code: 'analysis_pending',
      status_label: '분석 대기',
      fit_score: 74,
      tech_stacks: ['Python', 'FastAPI', 'PostgreSQL', 'LLM Ops'],
      summary: '채용 데이터 파이프라인과 분석 API를 안정적으로 운영합니다.',
      required_experience: '4년 이상',
      employment_type: '정규직',
    },
    {
      id: 'jd-da',
      title: 'Data Analyst',
      team_name: 'People Analytics',
      status_code: 'draft',
      status_label: '작성 중',
      fit_score: 68,
      tech_stacks: ['SQL', 'Python', 'Dashboard', 'Statistics'],
      summary: '지원자 경험과 채용 성과 지표를 정량적으로 분석합니다.',
      required_experience: '2년 이상',
      employment_type: '정규직',
    },
  ],
} satisfies ApiResponse<
  {
    id: string;
    title: string;
    team_name: string;
    status_code: string;
    status_label: string;
    fit_score: number;
    tech_stacks: string[];
    summary: string;
    required_experience: string;
    employment_type: string;
  }[]
>;

export const coverLettersApiResponse = {
  status_code: 200,
  message: 'cover letter preview loaded',
  data: {
    rows: [
      {
        id: 'cover-001',
        applicant_name: '김서연',
        job_title: 'Frontend Engineer',
        status_code: 'valid',
        status_label: '정상',
        analysis_score: 92,
      },
      {
        id: 'cover-002',
        applicant_name: '이도윤',
        job_title: 'Backend Engineer',
        status_code: 'missing_answer',
        status_label: '질문 누락',
        analysis_score: 0,
      },
      {
        id: 'cover-003',
        applicant_name: '최하린',
        job_title: 'Product Manager',
        status_code: 'valid',
        status_label: '정상',
        analysis_score: 88,
      },
    ],
  },
} satisfies ApiResponse<{
  rows: {
    id: string;
    applicant_name: string;
    job_title: string;
    status_code: string;
    status_label: string;
    analysis_score: number;
  }[];
}>;

export const analysisReportApiResponse = {
  status_code: 200,
  message: 'analysis report loaded',
  data: {
    report_id: 'HR-2408',
    applicant_name: '김서연',
    job_title: 'Frontend Engineer',
    tabs: [
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
    ],
    example_questions: [
      '이 지원자의 강점 3가지를 알려줘',
      '면접에서 확인할 리스크 질문을 추천해줘',
      'JD와 자기소개서의 불일치 항목은?',
      '최종 검토 의견을 5줄로 정리해줘',
    ],
    chat_messages: [
      {
        role: 'assistant',
        text: '김서연 지원자의 분석 리포트가 준비되었습니다. 궁금한 항목을 선택해 주세요.',
      },
      {
        role: 'user',
        text: '프론트엔드 직무 적합도를 요약해줘.',
      },
      {
        role: 'assistant',
        text: 'React·TypeScript 경험과 UI 상태 관리 역량이 JD 요구사항과 높게 일치합니다.',
      },
    ],
  },
} satisfies ApiResponse<{
  report_id: string;
  applicant_name: string;
  job_title: string;
  tabs: {
    key: string;
    label: string;
    title: string;
    content: string;
  }[];
  example_questions: string[];
  chat_messages: {
    role: 'assistant' | 'user';
    text: string;
  }[];
}>;

export const recruitmentPostApiResponse = {
  status_code: 200,
  message: 'recruitment post generated',
  data: {
    title: 'Frontend Engineer 채용 공고',
    sections: [
      'HumouR Labs는 AI 기반 HR 채용 보조 시스템을 함께 고도화할 프론트엔드 엔지니어를 찾습니다.',
      '주요 업무는 채용 워크플로 UI, 분석 리포트 대시보드, 공통 디자인 시스템 개선입니다.',
      'React, TypeScript, 접근성, 대규모 폼 설계 경험을 중요하게 봅니다.',
    ],
  },
} satisfies ApiResponse<{
  title: string;
  sections: string[];
}>;

export const coverLetterTemplateApiResponse = {
  status_code: 200,
  message: 'cover letter template generated',
  data: {
    questions: [
      {
        id: 'question-001',
        title: '문항 1. 문제 해결 경험',
        guide: '복잡한 UI 요구사항을 구조화하고 해결한 경험을 STAR 방식으로 작성합니다.',
      },
      {
        id: 'question-002',
        title: '문항 2. 협업 방식',
        guide: '디자이너, 백엔드, 데이터 담당자와 의사결정을 맞춘 사례를 구체화합니다.',
      },
      {
        id: 'question-003',
        title: '문항 3. 책임 있는 AI 이해',
        guide: '채용 도메인에서 편향과 개인정보를 고려한 경험이나 관점을 설명합니다.',
      },
    ],
  },
} satisfies ApiResponse<{
  questions: {
    id: string;
    title: string;
    guide: string;
  }[];
}>;
