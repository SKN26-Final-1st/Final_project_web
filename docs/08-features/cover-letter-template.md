# 자기소개서 템플릿 (`#/cover-letter-template`)

## 화면 역할

**전역 선택 JD**를 요약으로 보여 주고, JD 기반 **자소서 문항·가이드 생성**·문서 다운로드(목)를 제공합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/CoverLetterTemplatePage.tsx`](../../src/pages/CoverLetterTemplatePage.tsx) | JD 요약·문항 List·생성/다운로드 |
| [`src/App.tsx`](../../src/App.tsx) | `selectedJd`, `templateGenerated` |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `coverLetterTemplateApiResponse` |
| [`src/api/adapters.ts`](../../src/api/adapters.ts) | `mapTemplateQuestions` (`id`는 UI List에서 미사용) |

JD 선택은 `JdPage` / `CoverLetterPage`와 동일한 `selectedJdIdOverride`를 공유합니다.

## Django API

### `GET /api/v1/cover-letter-templates/`

생성된 문항 목록 (또는 빈 `questions`).

**응답 `data`**:

```json
{
  "questions": [
    {
      "id": "question-001",
      "title": "문항 1. 문제 해결 경험",
      "guide": "복잡한 UI 요구사항을..."
    }
  ]
}
```

### `POST /api/v1/cover-letter-templates/generate/`

**요청**:

```json
{
  "jd_id": "jd-fe"
}
```

**응답 `data`** (목업):

```json
{ "jd_id": "jd-fe" }
```

실서비스: 응답에 `questions` 배열을 포함하거나 POST 후 GET 재호출.

**응답 `message`**: 예) `자기소개서 문항을 생성했습니다.`

프론트: `templateGenerated = true` → `templateQuestions` List 표시.

### `GET /api/v1/cover-letter-templates/export/`

목업 JSON:

```json
{ "file_name": "cover-letter-template.docx" }
```

## 목업 한계

- 페이지 내 JD 변경 UI 없음 (`App`의 `selectedJd`만 사용)
- 생성 후에도 질문 내용은 초기 `getCoverLetterTemplate` 결과 고정
