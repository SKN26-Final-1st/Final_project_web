# 디렉터리 구조

```text
src/
├── main.tsx                 # 앱 진입
├── App.tsx                  # 라우트·전역 상태·mock 액션
├── api/
│   ├── adapters.ts          # API snake_case → UI 모델
│   └── mockClient.ts        # 목 API (→ Django HTTP로 교체 예정)
├── data/
│   ├── apiMockData.ts       # Django 응답 JSON 계약 샘플
│   └── mockData.tsx         # 라우트·메뉴·테마 팔레트
├── hooks/
│   └── useMockAppData.ts    # 초기 GET 병렬 로드
├── pages/                   # 화면 단위 컨테이너
├── components/              # 도메인·공통 UI
│   ├── common/
│   ├── layout/
│   ├── dashboard/
│   ├── company/
│   ├── jd/
│   ├── cover-letter/
│   ├── chat/
│   ├── mypage/
│   ├── recruitment/
│   └── charts/
├── types/app.ts             # Navigate, RunMockAction 등
└── utils/
    ├── routes.ts            # 해시 → AppRoute
    └── statusTag.tsx        # status_code → 태그 UI
```

## 페이지 ↔ 폴더

| `pages/` | `components/` |
|----------|----------------|
| `DashboardPage.tsx` | `dashboard/` |
| `CompanyPage.tsx` | `company/` |
| `JdPage.tsx` | `jd/` |
| `CoverLetterPage.tsx` | `cover-letter/` |
| `ChatPage.tsx` | `chat/` |
| `MyPage.tsx` | `mypage/` |
| `RecruitmentPostPage.tsx` | `recruitment/` |
| `CoverLetterTemplatePage.tsx` | (페이지 내 List) |
| `AuthPages.tsx` | `layout/AuthScreen.tsx` |
