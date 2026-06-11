# HumouR 프론트엔드 문서

`Final_project_web`의 화면 구조, 라우팅, 데이터 계층, API client, mock/real backend 전환 방식을 정리합니다.

> 기본 실행은 mock API 모드입니다. `VITE_USE_MOCK_API=false`로 전환하면 [`src/api/backendClient.ts`](../src/api/backendClient.ts)의 axios client가 `/api/{endpoint}/`를 호출합니다.

## 읽는 순서

| Part | 내용 |
|------|------|
| [00-overview](./00-overview/project-overview.md) | 프로젝트 목적, 범위, 기술 스택 |
| [01-getting-started](./01-getting-started/development-environment.md) | 설치, 실행, 환경 변수, mock/real API 모드 |
| [02-architecture](./02-architecture/README.md) | 디렉터리 구조, 데이터 흐름, 공통 응답 형식 |
| [03-frontend](./03-frontend/) | 라우팅, 레이아웃, 컴포넌트 구조 |
| [06-api](./06-api/api-reference.md) | axios client, CSRF, API Key, endpoint 매핑 |
| [08-features](./08-features/) | 화면별 API 사용 정리 |

## 핵심 소스

| 파일 | 역할 |
|------|------|
| [`src/main.tsx`](../src/main.tsx) | React root, `AppQueryProvider`, `BrowserRouter` |
| [`src/App.tsx`](../src/App.tsx) | React Router 라우팅, 테마, `runApiAction`, `DocumentChatFab` |
| [`src/api/appDataService.ts`](../src/api/appDataService.ts) | dashboard·auth 데이터 조합 및 adapter 매핑 |
| [`src/api/backendClient.ts`](../src/api/backendClient.ts) | axios, CSRF·API Key, mock/real 전환, `apiClient` |
| [`src/api/queryClient.ts`](../src/api/queryClient.ts) | TanStack Query 기본 옵션 |
| [`src/hooks/useMockAppData.ts`](../src/hooks/useMockAppData.ts) | React Query 기반 초기 데이터 로딩 래퍼 |
| [`src/data/apiMockData.ts`](../src/data/apiMockData.ts) | `ApiResponse<T>` 타입과 mock fixture |
| [`src/api/adapters.ts`](../src/api/adapters.ts) | snake_case API 데이터 → UI 모델 |
| [`src/data/mockData.tsx`](../src/data/mockData.tsx) | `AppRoute`, 메뉴, palette, `ChatMessage` |
| [`src/styles.css`](../src/styles.css) | 디자인 토큰, 레이아웃, 사이드바 pin 스타일 |

## 화면별 문서

| 화면 | 라우트 | 문서 |
|------|--------|------|
| 대시보드 | `/dashboard` | [dashboard.md](./08-features/dashboard.md) |
| 관리자 | `/admin` | [admin.md](./08-features/admin.md) |
| 회사 정보 | `/company` | [company.md](./08-features/company.md) |
| JD 관리 | `/jd` | [jd.md](./08-features/jd.md) |
| 자기소개서 | `/cover-letter` | [cover-letter.md](./08-features/cover-letter.md) |
| AI 문서 검색 | `/chat` | [chat.md](./08-features/chat.md) |
| 마이페이지 | `/mypage` | [mypage.md](./08-features/mypage.md) |
| 모집 공고 | `/recruitment-post` | [recruitment-post.md](./08-features/recruitment-post.md) |
| 자소서 포맷 | `/cover-letter-template` | [cover-letter-template.md](./08-features/cover-letter-template.md) |
| 인증 | `/login`, `/signup`, `/password-reset` | [auth.md](./08-features/auth.md) |

## 참고 자료

| 문서 | 내용 |
|------|------|
| [about_frontend.md](./about_frontend.md) | 프론트엔드·백엔드 협업 일반 참고 |
| [api-spec-addendum.md](./06-api/api-spec-addendum.md) | backend에 추가되면 좋은 endpoint 제안 |
| [db-column-gap-notes.md](./06-api/db-column-gap-notes.md) | 화면 요구 데이터와 DB/API 컬럼 차이 |
