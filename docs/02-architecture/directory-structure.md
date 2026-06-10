# 디렉터리 구조

실제 저장소 기준 트리입니다. UI 목업 연습용이므로 `src/pages` + `src/components` 중심으로 구성되어 있습니다.

## 루트

```text
web_design_playground/
├── public/
│   └── assets/                 # HumouR PNG (Vite → /assets/...)
│       ├── humour-app-icon.png
│       ├── humour-logo-dark.png
│       └── humour-logo-light.png
├── src/                        # 애플리케이션 소스 (아래 상세)
├── docs/                       # 이 위키
├── index.html                  # 파비콘, Vite 진입
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── README.md
└── LICENSE
```

`.gitignore`로 제외되는 대표 경로: `node_modules/`, `dist/`, `.superpowers/`, `qa-screenshots/`, `.env*`.

## `src/`

```text
src/
├── main.tsx                    # React 루트, antd reset.css, styles.css
├── App.tsx                     # 해시 라우트, 테마, mock 액션, 페이지 스위치
├── styles.css                  # 레이아웃·인증·사이드바 등 전역 스타일
├── api/
│   ├── adapters.ts             # API snake_case → UI 모델
│   └── mockClient.ts           # 목 API (→ Django HTTP로 교체 예정)
├── data/
│   ├── apiMockData.ts          # Django 응답 JSON 계약 샘플
│   └── mockData.tsx            # AppRoute, mainMenu, utilityRoutes, authMenu, palette
├── hooks/
│   └── useMockAppData.ts       # 초기 GET 11건 병렬 로드
├── pages/                      # 화면 단위 컨테이너
│   ├── DashboardPage.tsx
│   ├── CompanyPage.tsx
│   ├── JdPage.tsx
│   ├── CoverLetterPage.tsx
│   ├── ChatPage.tsx
│   ├── MyPage.tsx
│   ├── RecruitmentPostPage.tsx
│   ├── CoverLetterTemplatePage.tsx
│   └── AuthPages.tsx           # Login, Signup, PasswordReset
├── components/
│   ├── common/                 # PageTitle, SectionCard, PageState, MetricCard, …
│   ├── layout/                 # AppShell, SidebarNav, TopHeader, AuthScreen, …
│   ├── dashboard/
│   ├── company/
│   ├── jd/
│   ├── cover-letter/
│   ├── chat/
│   ├── mypage/
│   ├── recruitment/
│   └── charts/                 # EChart, DonutChart, DashboardLine/BarChart, chartAdapters, chartTheme
├── types/
│   └── app.ts                  # ThemeMode, AlertState, RunMockAction, …
└── utils/
    ├── routes.ts               # 해시 → AppRoute, authRoutes
    └── statusTag.tsx           # status_code → Ant Design Tag
```

## 페이지 ↔ 컴포넌트 폴더

| `pages/` | `components/` |
|----------|----------------|
| `DashboardPage.tsx` | `dashboard/` |
| `CompanyPage.tsx` | `company/` |
| `JdPage.tsx` | `jd/` |
| `CoverLetterPage.tsx` | `cover-letter/` |
| `ChatPage.tsx` | `chat/` |
| `MyPage.tsx` | `mypage/` |
| `RecruitmentPostPage.tsx` | `recruitment/` |
| `CoverLetterTemplatePage.tsx` | (페이지 내 List 위주) |
| `AuthPages.tsx` | `layout/AuthScreen.tsx` |

## `docs/`

```text
docs/
├── README.md                   # 위키 목차
├── about_frontend.md           # 협업 일반 참고 (레포 구현과 별개)
├── 00-overview/
├── 01-getting-started/
├── 02-architecture/
├── 03-frontend/
├── 06-api/
└── 08-features/                # 페이지별 Django JSON + 파일 맵
```
