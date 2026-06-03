# 모집 공고 (`#/recruitment-post`)

## 화면 역할

복수 JD를 선택해 **모집 공고 문구 생성**·미리보기·PDF 다운로드(목)를 확인합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/RecruitmentPostPage.tsx`](../../src/pages/RecruitmentPostPage.tsx) | 생성·PDF 액션 |
| [`src/components/recruitment/JdSelectionPanel.tsx`](../../src/components/recruitment/JdSelectionPanel.tsx) | Table rowSelection |
| [`src/components/recruitment/SelectedJdSummary.tsx`](../../src/components/recruitment/SelectedJdSummary.tsx) | 선택 JD 태그 요약 |
| [`src/components/recruitment/RecruitmentPreviewPanel.tsx`](../../src/components/recruitment/RecruitmentPreviewPanel.tsx) | title + sections 렌더 |
| [`src/App.tsx`](../../src/App.tsx) | `selectedRowKeys`, `postGenerated` |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `recruitmentPostApiResponse` |

## Django API

### `GET /api/v1/recruitment-posts/preview/`

마지막 생성 결과 또는 기본 미리보기.

**응답 `data`**:

```json
{
  "title": "Frontend Engineer 채용 공고",
  "sections": [
    "HumouR Labs는 AI 기반 HR...",
    "주요 업무는...",
    "React, TypeScript..."
  ]
}
```

### `POST /api/v1/recruitment-posts/generate/`

**요청**:

```json
{
  "jd_ids": ["jd-fe", "jd-be"]
}
```

목업: [`generateRecruitmentPost(jdIds)`](../../src/api/mockClient.ts).

**응답 `data`**:

```json
{ "jd_ids": ["jd-fe", "jd-be"] }
```

**응답 `message`**: 예) `모집 공고를 생성했습니다.`

프론트: `postGenerated = true` 후 기존 `recruitmentPreview` 데이터 표시.  
실서비스에서는 동일 POST 응답에 `title`/`sections`를 포함하거나, POST 후 `GET preview` 재호출 권장 (**needs verification**).

### `GET /api/v1/recruitment-posts/export/pdf/`

목업은 JSON만 반환:

```json
{ "file_name": "recruitment-post.pdf" }
```

실제 연동 시 `Content-Type: application/pdf` 바이너리 또는 presigned URL이 자연스럽습니다.

## 목업 한계

- 생성해도 `recruitmentPreview` 내용은 초기 로드값 고정
- JD 선택 변경 시 미리보기 자동 갱신 없음
