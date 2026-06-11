# 프로젝트 개요

`Final_project_web`는 SKN26 파이널 프로젝트 **HumouR**의 프론트엔드 저장소입니다. 채용 담당자가 관리자 운영, 회사 정보, JD, 지원서, 분석 리포트, 면접 질문 흐름을 한 화면 제품처럼 탐색할 수 있도록 구성합니다.

## 목적

- React Router로 전체 화면 흐름을 검증합니다.
- TanStack React Query로 초기 앱 데이터를 캐시하고 재조회합니다.
- mock 모드로 backend 없이 UI를 확인하고, real API 모드로 로그인·회원가입·비밀번호 재설정·채팅 등 핵심 액션을 연동합니다.
- backend JSON API 계약(snake_case, `{ error, data, message }`)과 맞는 client·adapter 계층을 유지합니다.

## 현재 구현 범위

| 영역 | 구현 위치 | 요약 |
|------|-----------|------|
| 라우팅 | `src/App.tsx`, `src/utils/routes.ts` | `/dashboard`, `/login` 등 React Router 라우팅 |
| 서버 상태 | `src/providers/`, `src/api/query*.ts`, `src/hooks/` | TanStack Query + `loadAppData` |
| 레이아웃 | `src/components/layout/` | 사이드바(hover·pin), 모바일 헤더, 인증 화면 |
| 관리자 | `src/pages/AdminPage.tsx` | 면접방, API 키, LLM 사용량, 포인트 가드레일 목업 |
| 대시보드 | `src/components/dashboard/` | 지표, 지원자 테이블, 분석 요약 |
| 차트 | `src/components/charts/` | ECharts wrapper와 donut chart |
| AI 문서 검색 | `src/components/chat/`, `src/pages/ChatPage.tsx` | 플로팅 위젯과 전체 채팅 화면 |
| API client | `src/api/backendClient.ts` | axios, CSRF, API Key, mock/real 전환 |
| 데이터 변환 | `src/api/adapters.ts`, `src/api/appDataService.ts` | backend 데이터 → UI 모델 |

## API 연동 상태

| 항목 | 상태 |
|------|------|
| 기본 모드 | mock API. backend 없이 페이지 라우팅과 화면 확인 가능 |
| real API 모드 | `VITE_USE_MOCK_API=false`일 때 axios로 `/api/{endpoint}/` 호출 |
| 인증·세션 | 쿠키 기반 세션, `GET /api/csrf/` 후 `X-CSRFToken` 헤더 |
| API Key | `VITE_API_KEY` 설정 시 `X-API-Key` 헤더 추가 |
| 응답 계약 | backend `{ error, data, message }` → 프론트 `ApiResponse<T>` (`error`, `message`, `data`, `meta`) |

real API 모드에서 연동된 액션 예:

- 로그인·로그아웃 (`login`, `logout`)
- 회원가입 ID 중복 확인 (`checkuser`), 가입 (`signin`)
- 비밀번호 재설정 질문·임시 비밀번호 (`passqestion`, `passreset`)
- 채팅 (`chat`, 대화 히스토리 전달)
- 회사·계정·JD·지원서·리포트 CRUD 및 분석 요청

아직 mock 성공 응답만 반환하는 기능(문서 다운로드, 모집 공고 생성 등)은 [api-spec-addendum.md](../06-api/api-spec-addendum.md)에 정리되어 있습니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| UI | React 19, TypeScript, Ant Design 6, Ant Design X |
| 라우팅 | React Router 7 |
| 서버 상태 | TanStack React Query 5 |
| 빌드 | Vite 7 |
| HTTP client | Axios 1.17.0 |
| 차트 | ECharts 6 |
| 검증 | `npm run build`, `npm run lint`, Playwright 캡처 스크립트 |

## 정적 자산

[`public/assets/`](../../public/assets/)는 Vite public 경로 `/assets/...`로 참조합니다.

- `humour-app-icon.png`
- `humour-logo-light.png`
- `humour-logo-dark.png`

## 관련 문서

- [개발 환경](../01-getting-started/development-environment.md)
- [디렉터리 구조](../02-architecture/directory-structure.md)
- [데이터 흐름](../02-architecture/data-flow.md)
- [API 레퍼런스](../06-api/api-reference.md)
- [프론트엔드 개요](../03-frontend/overview.md)
