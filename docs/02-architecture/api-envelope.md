# API 공통 응답 형식

모든 목업 응답은 [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts)의 `ApiResponse<T>`를 따릅니다.

## 응답 래퍼

```json
{
  "status_code": 200,
  "message": "사람이 읽는 결과 메시지",
  "data": {},
  "meta": {
    "page": 1,
    "page_size": 20,
    "total_count": 3,
    "requested_at": "2026-06-03T09:00:00+09:00"
  }
}
```

| 필드 | 설명 |
|------|------|
| `status_code` | HTTP와 별도 비즈니스 코드(목업은 200 위주). 4xx/5xx 시 프론트는 Alert `error` |
| `message` | 토스트/Alert 문구 |
| `data` | 실제 payload (snake_case) |
| `meta` | 선택. 페이지네이션·요청 시각 |

## 상태 코드 enum (`status_code` in data rows)

지원자·JD·자소서 행 등에 쓰이는 `StatusCode` ([`apiMockData.ts`](../../src/data/apiMockData.ts)):

`analysis_done`, `analysis_pending`, `draft`, `interview_recommended`, `needs_followup`, `on_hold`, `valid`, `missing_answer`, `normal`

UI는 [`src/utils/statusTag.tsx`](../../src/utils/statusTag.tsx)에서 `status_code` → Ant Design Tag 색으로 매핑합니다.

## Django 권장 사항

1. **JSON 필드는 snake_case** — `adapters.ts`가 camelCase로 변환합니다.
2. **에러도 동일 래퍼** — `status_code` ≥ 400, `message`, 선택적 `data` (검증 오류 상세).
3. **인증** — 목업 미구현. 연동 시 `Authorization` 또는 세션 쿠키는 메인 Django 프로젝트 정책에 따름 (**needs verification**).

## 어댑터

[`src/api/adapters.ts`](../../src/api/adapters.ts): 예) `applicant_name` → `name`, `delta_label` → `change`.

Django가 snake_case를 유지하면 프론트 매핑 레이어를 그대로 사용할 수 있습니다.
