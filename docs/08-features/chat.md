# 분석 리포트 채팅 (`#/chat`)

## 화면 역할

지원자 분석 리포트 탭·예시 질문을 보고, 리포트 맥락에서 AI에게 질문합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/ChatPage.tsx`](../../src/pages/ChatPage.tsx) | 2열 레이아웃, 대화 초기화 |
| [`src/components/chat/ReportContextPanel.tsx`](../../src/components/chat/ReportContextPanel.tsx) | 탭·예시 질문 → 입력창 채우기 |
| [`src/components/chat/ChatWindowPanel.tsx`](../../src/components/chat/ChatWindowPanel.tsx) | 메시지·전송 UI |
| [`src/App.tsx`](../../src/App.tsx) | `chatMessages`, `chatInput`, `sendChatMessage` → `mockClient.sendChatMessage` |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `analysisReportApiResponse` |

## Django API

### `GET /api/v1/analysis-reports/current/` (또는 `/{report_id}/`)

**응답 `data`**:

```json
{
  "report_id": "HR-2408",
  "applicant_name": "김서연",
  "job_title": "Frontend Engineer",
  "tabs": [
    {
      "key": "summary",
      "label": "요약",
      "title": "지원자 핵심 요약",
      "content": "..."
    }
  ],
  "example_questions": [
    "이 지원자의 강점 3가지를 알려줘"
  ],
  "chat_messages": [
    { "role": "assistant", "text": "..." },
    { "role": "user", "text": "..." }
  ]
}
```

`role`: `assistant` | `user`

초기 메시지: `chat_messages`가 비어 있지 않으면 `App`이 이를 채팅 상태로 사용합니다.

### `POST /api/v1/analysis-reports/{report_id}/chat/`

**요청**:

```json
{
  "question": "프론트엔드 직무 적합도를 요약해줘."
}
```

목업: [`mockClient.sendChatMessage(question)`](../../src/api/mockClient.ts) — 질문 문자열만 전달.

**응답 `data`** (어시스턴트 메시지 1건):

```json
{
  "role": "assistant",
  "text": "React·TypeScript 경험과..."
}
```

프론트 동작:

1. 전송 시 로컬에 `{ "role": "user", "text": question }` 즉시 추가  
2. API 성공 후 `data`를 메시지 배열에 append  

**응답 `message`**: 예) `AI 답변을 추가했습니다.`

## 목업 한계

- `report_id` 고정 목 데이터, 지원자·JD 선택 UI 없음
- 스트리밍(SSE) 미구현 — 단일 JSON 응답 가정
