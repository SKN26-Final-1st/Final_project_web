# 컴포넌트 맵

도메인 폴더별 **역할**만 정리합니다. 페이지별 API는 [08-features](../08-features/README.md)를 참고하세요.

## dashboard/

| 파일 | 기능 |
|------|------|
| `DashboardMetrics.tsx` | 상단 4개 지표 카드 |
| `ApplicantReviewTable.tsx` | 지원자 검토 테이블 |
| `AnalysisSummaryPanel.tsx` | 도넛 차트 + 인사이트 카드 |
| `TaskListPanel.tsx` | 할 일 목록 |

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
| `ReportContextPanel.tsx` | 리포트 탭·예시 질문 |
| `ChatWindowPanel.tsx` | 메시지 목록 + 입력 |

## mypage/

| 파일 | 기능 |
|------|------|
| `ProfileSummaryCard.tsx` | 아바타·이메일·크레딧 |
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

ECharts 래퍼 (`EChart.tsx`, `DonutChart.tsx` 등). 대시보드 분석 요약에서 사용.
