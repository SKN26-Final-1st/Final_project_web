# JD 관리 (`#/jd`)

## 화면 역할

JD 목록 선택, 상세 보기, **분석 요청** 후 자기소개서 화면으로 이동합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/JdPage.tsx`](../../src/pages/JdPage.tsx) | 삭제(목), 분석 요청, 2열 레이아웃 |
| [`src/components/jd/JdListPanel.tsx`](../../src/components/jd/JdListPanel.tsx) | 목록·선택 (`setSelectedJdId`) |
| [`src/components/jd/JdEditorPanel.tsx`](../../src/components/jd/JdEditorPanel.tsx) | JD 필드 표시(readOnly), 템플릿/자소서 이동 버튼 |
| [`src/App.tsx`](../../src/App.tsx) | `selectedJdIdOverride` 전역 JD 선택 |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `jobDescriptionsApiResponse` |

## Django API

### `GET /api/v1/job-descriptions/`

**메타** (페이지네이션 예):

```json
{
  "page": 1,
  "page_size": 20,
  "total_count": 3,
  "requested_at": "2026-06-03T09:00:00+09:00"
}
```

**응답 `data`**: 배열

```json
[
  {
    "id": "jd-fe",
    "title": "Frontend Engineer",
    "team_name": "Product Platform",
    "status_code": "analysis_done",
    "status_label": "분석 완료",
    "fit_score": 91,
    "tech_stacks": ["React", "TypeScript"],
    "summary": "...",
    "required_experience": "3년 이상",
    "employment_type": "정규직"
  }
]
```

### `POST /api/v1/job-descriptions/{id}/analyze/` (분석 요청)

**요청** (목업은 `jdId`만 함수 인자로 사용):

```json
{}
```

또는 `{ "jd_id": "jd-fe" }` (경로 param과 중복 시 생략 가능)

**응답 `data`**:

```json
{ "jd_id": "jd-fe" }
```

**응답 `message`**: 예) `JD 분석 요청이 완료되었습니다.`

성공 후 프론트: `navigate('/cover-letter')`.

### 향후 CRUD (UI 미연동)

`JdEditorPanel` 필드: `title`, `team_name`, `summary`, `tech_stacks`, `required_experience`, `employment_type`.  
저장·삭제 API는 Alert 목업만 있음 — Django `PUT/PATCH/DELETE` 스펙은 **needs verification**.

## 어댑터

[`mapJdList`](../../src/api/adapters.ts): `team_name` → `team`, `tech_stacks` → `stack`.
