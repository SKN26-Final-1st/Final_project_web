# 대시보드 (`#/dashboard`)

## 화면 역할

채용 공고·지원자·AI 분석·크레딧·운영 우선순위를 한 화면에서 스캔하는 서비스형 운영 대시보드입니다.
첫 화면은 신규 지원자, 면접 추천, 추가 질문, 크레딧 위험, 처리해야 할 작업을 먼저 드러냅니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/DashboardPage.tsx`](../../src/pages/DashboardPage.tsx) | 대시보드 조립, 새 공고 이동 |
| [`src/components/dashboard/dashboardViewModel.ts`](../../src/components/dashboard/dashboardViewModel.ts) | metric/trend/task/notification → 화면용 운영 뷰모델 |
| [`src/components/dashboard/DashboardToolbar.tsx`](../../src/components/dashboard/DashboardToolbar.tsx) | 알림, 새로고침, 더 보기 |
| [`src/components/dashboard/DashboardOverviewGrid.tsx`](../../src/components/dashboard/DashboardOverviewGrid.tsx) | 검토 큐, 추이 차트, 적합도, 우선 후보, 분석 신호 |
| [`src/components/dashboard/DashboardOperationsRail.tsx`](../../src/components/dashboard/DashboardOperationsRail.tsx) | 프로필, 진행 공고, 운영 우선순위 |
| [`src/components/dashboard/dashboardViewModel.test.ts`](../../src/components/dashboard/dashboardViewModel.test.ts) | 뷰모델 정렬·집계 테스트 |
| [`src/hooks/useMockAppData.ts`](../../src/hooks/useMockAppData.ts) | `getDashboard` 호출 |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `dashboardApiResponse` |

알림은 동일 훅에서 로드한 `notifications`를 사용합니다. 분석 크레딧은 대시보드/사이드바가 아니라 마이페이지 사용량 관리 카드에서 표시합니다.

## Django API

### `GET /api/v1/dashboard/` (제안)

**응답 `data`** (`dashboardApiResponse.data`):

```json
{
  "metrics": [
    {
      "metric_key": "active_jobs",
      "label": "진행 중 공고",
      "value": 3,
      "suffix": "건",
      "delta_label": "+1 이번 주"
    }
  ],
  "trends": [
    {
      "trend_key": "candidate_flow",
      "labels": ["2월", "3월", "4월", "5월", "6월"],
      "values": [16, 21, 28, 34, 31],
      "name": "지원자",
      "unit": "명"
    }
  ],
  "applicants": [
    {
      "id": "app-001",
      "applicant_name": "김서연",
      "job_title": "Frontend Engineer",
      "fit_score": 92,
      "review_stage": "1차 검토",
      "status_code": "interview_recommended",
      "status_label": "면접 추천"
    }
  ],
  "insights": [
    {
      "insight_key": "frontend_jd",
      "title": "Frontend JD",
      "detail": "...",
      "tone": "primary"
    }
  ],
  "analysis_summary": {
    "chart_type": "donut",
    "center_value": 86,
    "center_label": "평균 적합도",
    "segments": [
      { "label": "적합", "value": 86, "color_key": "primary" }
    ]
  },
  "tasks": [
    { "id": "task-001", "title": "JD 분석 요청 2건 승인", "priority": "high" }
  ]
}
```

`tone`: `primary` | `accent` | `warning`
`priority`: `high` | `medium` | `low`
`metric_key` 예: `active_jobs`, `new_applicants`, `reports`, `credits` (`credits`는 마이페이지 사용량 관리에 사용)
`trend_key` 예: `candidate_flow`, `report_throughput`

### 새로고침

`DashboardPage`의 새로고침은 `useMockAppData.reload()` → 위 GET을 다시 호출합니다. Django에서는 동일 엔드포인트 재요청.

### 쓰기 API

이 페이지 전용 mutation 없음. 「새 채용 공고」는 `#/jd`로만 이동합니다.

## 어댑터

[`mapDashboard`](../../src/api/adapters.ts): `metric_key` → `key`, `delta_label` → `change`, `applicant_name` → `name`, `trend_key` → `key` 등.
[`buildDashboardViewModel`](../../src/components/dashboard/dashboardViewModel.ts): key 기반 metric 조회, trend fallback, 지원자 우선순위, 알림·작업 정렬을 담당합니다.
