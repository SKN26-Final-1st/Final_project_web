# 디렉터리 구조

`Final_project_web`의 실제 파일 구조 기준 문서입니다.

## 루트

```text
Final_project_web/
├── public/
│   └── assets/                 # HumouR PNG assets
├── src/                        # 애플리케이션 소스
├── scripts/
│   └── verify-document-chat-widget.mjs
├── docs/                       # 프로젝트 문서
├── .env.example                # VITE_USE_MOCK_API, VITE_API_KEY 예시
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── README.md
└── LICENSE
```

`.gitignore` 제외 대상: `node_modules/`, `dist/`, `.superpowers/`, `qa-screenshots/`, `.env*`.

## `src/`

```text
src/
├── main.tsx                    # React root, AppQueryProvider, BrowserRouter
├── App.tsx                     # React Router, 테마, runApiAction, DocumentChatFab
├── styles.css                  # 디자인 토큰, 레이아웃, 사이드바 pin
├── vite-env.d.ts               # VITE_USE_MOCK_API, VITE_API_KEY 타입
├── api/
│   ├── adapters.ts             # API snake_case → UI 모델
│   ├── appDataService.ts       # loadAppData, AppData 타입
│   ├── backendClient.ts        # axios client, CSRF, API Key, mock/real 전환
│   ├── queryClient.ts          # TanStack Query 기본 옵션
│   ├── queryKeys.ts            # 쿼리 키 상수
│   └── queryOptions.ts         # appData query options
├── providers/
│   └── AppQueryProvider.tsx    # QueryClientProvider
├── hooks/
│   ├── useAppDataQuery.ts      # loadAppData useQuery hook
│   └── useMockAppData.ts       # App.tsx용 loading/error/reload 래퍼
├── data/
│   ├── apiMockData.ts          # ApiResponse 타입, mock fixture
│   └── mockData.tsx            # AppRoute, mainMenu, authMenu, palette
├── pages/                      # 화면 단위 컨테이너
├── components/                 # layout, dashboard, charts, chat 등
├── types/
│   └── app.ts
└── utils/
    ├── routes.ts
    └── statusTag.tsx
```

## 페이지와 컴포넌트

| `pages/` | 관련 `components/` |
|----------|--------------------|
| `DashboardPage.tsx` | `dashboard/`, `charts/` |
| `AdminPage.tsx` | 페이지 내부 관리자 운영 패널 중심 |
| `CompanyPage.tsx` | `company/` |
| `JdPage.tsx` | `jd/` |
| `CoverLetterPage.tsx` | `cover-letter/` |
| `ChatPage.tsx` | `chat/` |
| `MyPage.tsx` | `mypage/` |
| `RecruitmentPostPage.tsx` | `recruitment/` |
| `CoverLetterTemplatePage.tsx` | 페이지 내부 리스트 중심 |
| `AuthPages.tsx` | `layout/AuthScreen.tsx` |

전역 플로팅 채팅 위젯 `DocumentChatFab`는 `App.tsx`에서 `AppShell.assistantFab`로 주입됩니다. `/chat` 화면에서는 중복 표시를 피하기 위해 숨깁니다.

## `api/`

| 파일 | 역할 |
|------|------|
| `backendClient.ts` | axios 인스턴스, CSRF·API Key interceptor, mock/real 전환, `apiClient` export |
| `appDataService.ts` | dashboard·authDefaults 병렬 조회 후 adapter로 `AppData` 생성 |
| `adapters.ts` | backend payload → 대시보드, 회사, JD, 리포트 등 UI 모델 |
| `queryClient.ts` | QueryClient 기본 staleTime, retry, gcTime |
| `queryKeys.ts` | `appData`, `dashboard`, `jobDescriptions` 등 쿼리 키 |
| `queryOptions.ts` | `appDataQueryOptions()` |

## `docs/`

```text
docs/
├── README.md
├── about_frontend.md
├── 00-overview/
├── 01-getting-started/
├── 02-architecture/
├── 03-frontend/
├── 06-api/
├── 08-features/
└── superpowers/
```
