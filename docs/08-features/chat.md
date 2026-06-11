# AI 문서 검색 (`/chat`)

## 화면 역할

JD, 지원서, 분석 리포트, 면접 질문 데이터를 바탕으로 질문하는 UI입니다. 전체 화면 워크스페이스와 전역 플로팅 위젯이 동일한 채팅 상태를 공유합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/ChatPage.tsx`](../../src/pages/ChatPage.tsx) | 2열 레이아웃, 대화 초기화 |
| [`src/components/chat/DocumentSearchContextPanel.tsx`](../../src/components/chat/DocumentSearchContextPanel.tsx) | 문서 컬렉션·검색 범위·빠른 질문 |
| [`src/components/chat/ChatWindowPanel.tsx`](../../src/components/chat/ChatWindowPanel.tsx) | 메시지·전송 UI |
| [`src/components/chat/DocumentChatFab.tsx`](../../src/components/chat/DocumentChatFab.tsx) | 전역 FAB·플로팅 위젯 (`/chat` 제외) |
| [`src/App.tsx`](../../src/App.tsx) | `chatMessages`, `sendChatMessage`, `runApiAction` |
| [`src/api/backendClient.ts`](../../src/api/backendClient.ts) | `sendChatMessage(question, messages)` |

## 채팅 상태 흐름

1. `App.tsx`가 `chatMessages`, `chatInput` 상태를 관리
2. 메시지가 비어 있으면 `data.analysisReport.chatMessages`를 초기값으로 사용
3. 전송 시 user 메시지를 state에 추가한 뒤 `apiClient.sendChatMessage(trimmed, nextChatMessages)` 호출
4. 응답 assistant 메시지를 state에 append

FAB와 `/chat` 페이지는 동일 state를 공유합니다.

## mock 모드

`VITE_USE_MOCK_API=true`(기본)에서는 네트워크 요청 없이 로컬 안내 응답을 반환합니다.

## real API 모드

`VITE_USE_MOCK_API=false`일 때 `POST /api/chat/` 호출.

프론트 요청 body:

```json
{
  "chat": [
    { "role": "user", "message": "이 지원자의 리스크 알려줘" },
    { "role": "agent", "message": "이전 assistant 답변" }
  ]
}
```

- UI `assistant` → backend `agent`
- UI `text` → backend `message`

응답 envelope에 `response` 객체가 있어야 합니다:

```json
{
  "response": {
    "role": "agent",
    "message": "답변 텍스트"
  }
}
```

## 컨텍스트 데이터 출처

채팅 UI 컨텍스트(리포트, 면접 질문 등)는 초기 `loadAppData`에서 가져옵니다.

| 목적 | real API endpoint |
|------|-------------------|
| 분석 리포트 | `POST /api/report/get/` |
| 면접 질문 | `POST /api/question/get/` |

## 검증 스크립트

플로팅 위젯 UI 캡처:

```bash
node scripts/verify-document-chat-widget.mjs
```

## 관련 문서

- [API 레퍼런스](../06-api/api-reference.md)
- [api-spec-addendum.md](../06-api/api-spec-addendum.md)
