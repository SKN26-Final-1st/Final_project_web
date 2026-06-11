# 개발 환경

HumouR 프론트엔드를 로컬에서 실행하고, mock API 모드와 real backend API 모드를 전환하는 방법입니다.

## 사전 요구사항

- Node.js LTS 권장
- npm

현재 주요 runtime dependency:

- React 19
- React Router 7
- TanStack React Query 5
- Ant Design 6
- Ant Design X
- ECharts 6
- Axios 1.17.0

## 설치와 실행

```bash
npm install
npm run dev
```

| 항목 | 값 |
|------|-----|
| 개발 서버 | `http://127.0.0.1:5173` (`vite --host 127.0.0.1`) |
| 저장소 폴더 | `Final_project_web` |
| npm 패키지명 | `humour-ui-mockup` ([`package.json`](../../package.json)) |
| 화면 이동 | React Router 라우팅. 예: `/dashboard`, `/company`, `/login` |

브라우저 pathname은 [`src/utils/routes.ts`](../../src/utils/routes.ts)가 `AppRoute`로 변환합니다. 알 수 없는 경로는 `/dashboard`로 처리합니다.

## 환경 변수

[`.env.example`](../../.env.example)를 복사해 `.env`를 만들거나 실행 시 변수를 지정합니다.

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `VITE_USE_MOCK_API` | mock (미설정 시 mock) | `false`이면 axios로 실제 backend 호출 |
| `VITE_API_KEY` | (비어 있음) | 설정 시 모든 요청에 `X-API-Key` 헤더 추가 |

타입 정의: [`src/vite-env.d.ts`](../../src/vite-env.d.ts)

## API 모드

기본값은 mock API 모드입니다. backend 없이도 로그인 후 `/dashboard`로 이동하고, 사이드 메뉴로 페이지 라우팅을 확인할 수 있습니다.

| 모드 | 설정 | 동작 |
|------|------|------|
| mock API | 기본값 또는 `VITE_USE_MOCK_API=true` | [`apiMockData.ts`](../../src/data/apiMockData.ts) 기반 로컬 응답 |
| real API | `VITE_USE_MOCK_API=false` | [`backendClient.ts`](../../src/api/backendClient.ts)가 `/api/{endpoint}/` 호출 |

PowerShell에서 real API 모드:

```powershell
Copy-Item .env.example .env
$env:VITE_USE_MOCK_API='false'
$env:VITE_API_KEY='your-api-key'   # 필요 시
npm.cmd run dev
```

real API 모드 axios 공통 설정:

- `baseURL: '/api'`
- `withCredentials: true`
- `Content-Type: application/json`
- POST 요청 전 `GET /api/csrf/` → `X-CSRFToken` 헤더
- `VITE_API_KEY`가 있으면 `X-API-Key` 헤더

## 기본 스크립트

```bash
npm run build   # tsc --noEmit && vite build
npm run lint    # ESLint
npm run preview # dist 미리보기
```

## UI 검증 스크립트

AI 문서 검색 플로팅 위젯은 Playwright로 캡처할 수 있습니다. 로컬 Chrome 또는 Edge가 필요합니다.

```bash
node scripts/verify-document-chat-widget.mjs
```

- 기본 포트: `5176` (`VERIFY_PORT` 환경 변수로 변경 가능)
- 캡처 저장: `qa-screenshots/` (`.gitignore` 대상)

## 진입점

| 파일 | 역할 |
|------|------|
| [`index.html`](../../index.html) | Vite HTML entry, favicon |
| [`src/main.tsx`](../../src/main.tsx) | React mount, `AppQueryProvider`, `BrowserRouter`, global CSS |
| [`src/App.tsx`](../../src/App.tsx) | 라우팅, 테마, `useMockAppData`, `runApiAction` |
| [`src/providers/AppQueryProvider.tsx`](../../src/providers/AppQueryProvider.tsx) | TanStack Query `QueryClientProvider` |
| [`src/api/backendClient.ts`](../../src/api/backendClient.ts) | mock/real API 전환과 axios client |
