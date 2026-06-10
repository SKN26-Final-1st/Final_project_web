# 컴포넌트 맵

도메인 폴더별 **역할**만 정리합니다. 페이지별 API는 [08-features](../08-features/README.md)를 참고하세요.

## dashboard/

| 파일 | 기능 |
|------|------|
| `dashboardViewModel.ts` | 대시보드 API 데이터와 알림을 운영 화면용 metric/trend/action/view state로 정규화 |
| `dashboardViewModel.test.ts` | metric key 조회, trend 매핑, 우선순위 정렬 테스트 |
| `DashboardToolbar.tsx` | 알림, 새로고침, 더 보기 |
| `DashboardOverviewGrid.tsx` | 검토 큐, 차트, 적합도, 후보 우선순위, 분석 신호 |
| `DashboardOperationsRail.tsx` | 프로필, 진행 공고, 운영 우선순위 |
| `DashboardMetrics.tsx` | 이전 상단 4개 지표 카드 패턴 |
| `ApplicantReviewTable.tsx` | 이전 지원자 검토 테이블 패턴 |
| `AnalysisSummaryPanel.tsx` | 이전 도넛 차트 + 인사이트 패턴 |
| `TaskListPanel.tsx` | 작업 목록 패턴 |

## company/

| 파일 | 기능 |
|------|------|
| `CompanyProfileForm.tsx` | 회사명·산업·규모·소개·핵심 가치 폼 |
| `CompanyCompletionPanel.tsx` | 프로필 완성도 % |

## jd/

| 파일 | 기능 |
|------|------|
| `JdListPanel.tsx` | JD 목록 선택 |
| `JdEditorPanel.tsx` | 선택 JD 상세(현재 readOnly) |

## cover-letter/

| 파일 | 기능 |
|------|------|
| `CoverLetterInputPanel.tsx` | JD 선택 + 지원자명 + 본문 |
| `CoverLetterUploadPanel.tsx` | Excel 드래그 업로드 + 미리보기 테이블 |

## chat/

| 파일 | 기능 |
|------|------|
| `FloatingChatAssistant.tsx` | 보호 화면 우하단 플로팅 AI 채팅 |
| `ReportContextPanel.tsx` | 리포트 탭·예시 질문 |
| `ChatWindowPanel.tsx` | 메시지 목록 + 입력 |

## mypage/

| 파일 | 기능 |
|------|------|
| `ProfileSummaryCard.tsx` | 아바타·이메일·최근 로그인 |
| `AnalysisCreditPanel.tsx` | 분석 크레딧 잔여율·충전 문의 |
| `AccountSettingsForm.tsx` | 담당자명·알림 채널 |
| `SecuritySettingsForm.tsx` | 비밀번호 변경 UI(목) |
| `CompanySummaryPanel.tsx` | 회사 요약 + 회사 페이지 이동 |

## recruitment/

| 파일 | 기능 |
|------|------|
| `JdSelectionPanel.tsx` | 체크박스 JD 다중 선택 |
| `SelectedJdSummary.tsx` | 선택 JD 요약 |
| `RecruitmentPreviewPanel.tsx` | 생성 공고 미리보기 |

## charts/

| 파일 | 기능 |
|------|------|
| `EChart.tsx` | ECharts 공통 래퍼 |
| `DonutChart.tsx` | 적합도 도넛 (대시보드) |
| `DashboardLineChart.tsx` | 대시보드 지원자 추이 선 차트 |
| `DashboardBarChart.tsx` | 대시보드 리포트 처리량 막대 차트 |
| `chartAdapters.ts` | 도넛·추이 차트 옵션과 API trend 데이터 변환 |
| `chartTheme.ts` | 라이트/다크 팔레트 |

대시보드 차트는 [`DashboardOverviewGrid.tsx`](../../src/components/dashboard/DashboardOverviewGrid.tsx)에서 사용합니다.
