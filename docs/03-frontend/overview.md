# 프론트엔드 개요

## 레이아웃

| 파일 | 역할 |
|------|------|
| [`src/components/layout/AppShell.tsx`](../../src/components/layout/AppShell.tsx) | 인증 제외 화면: 사이드바 + 헤더 + 콘텐츠 |
| [`src/components/layout/SidebarNav.tsx`](../../src/components/layout/SidebarNav.tsx) | `mainMenu` 기반 네비게이션 |
| [`src/components/layout/TopHeader.tsx`](../../src/components/layout/TopHeader.tsx) | 상단 바 |
| [`src/components/layout/CreditSummary.tsx`](../../src/components/layout/CreditSummary.tsx) | 분석 크레딧 % 표시 |
| [`src/components/layout/NotificationButton.tsx`](../../src/components/layout/NotificationButton.tsx) | 알림 드롭다운 |
| [`src/components/layout/AuthScreen.tsx`](../../src/components/layout/AuthScreen.tsx) | 로그인·가입·비밀번호 레이아웃 |

## 공통 UI

| 파일 | 역할 |
|------|------|
| [`PageTitle.tsx`](../../src/components/common/PageTitle.tsx) | 페이지 eyebrow·제목·액션 슬롯 |
| [`SectionCard.tsx`](../../src/components/common/SectionCard.tsx) | 카드 래퍼 |
| [`PageState.tsx`](../../src/components/common/PageState.tsx) | `PageLoading`, `PageError`, `EmptyState` |
| [`MetricCard.tsx`](../../src/components/common/MetricCard.tsx) | 대시보드 지표 카드 |
| [`InlineLoading.tsx`](../../src/components/common/InlineLoading.tsx) | 버튼 내 로딩 |

## 테마·브랜딩

- `App.tsx`: Ant Design `ConfigProvider` + 라이트/다크 `Switch` (`data-theme` on `.app-root`)
- 색상 토큰: [`src/data/mockData.tsx`](../../src/data/mockData.tsx) `palette` (primary `#2563EB`, accent `#14B8A6` 등)
- 폰트: `Pretendard, Noto Sans KR, system-ui, sans-serif`
- 로고·아이콘: [`public/assets/`](../../public/assets/) — `/assets/humour-logo-*.png`, `humour-app-icon.png`
- 전역 스타일: [`src/styles.css`](../../src/styles.css) (사이드바, 인증 카드, 채팅 버블 등)

## 차트 (`components/charts/`)

| 파일 | 역할 |
|------|------|
| `EChart.tsx` | ECharts React 래퍼 |
| `DonutChart.tsx` | 대시보드 적합도 도넛 |
| `chartAdapters.ts` | API/목 데이터 → 시리즈 변환 |
| `chartTheme.ts` | 라이트/다크 색상 |

[`AnalysisSummaryPanel.tsx`](../../src/components/dashboard/AnalysisSummaryPanel.tsx)에서 `mode`에 따라 테마를 넘깁니다.
