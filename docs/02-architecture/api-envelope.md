# API 공통 응답 형식

backend 연동은 Django 명세의 `{ error, data, message }` 구조를 기준으로 합니다. 프론트엔드는 [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts)의 `ApiResponse<T>`로 한 번 감싸 Alert와 화면 로직을 일관되게 처리합니다.

## backend 응답

조회 성공:

```json
{
  "error": false,
  "data": {}
}
```

오류:

```json
{
  "error": true,
  "message": "오류 메시지"
}
```

## 프론트엔드 내부 응답

[`src/data/apiMockData.ts`](../../src/data/apiMockData.ts):

```ts
type ApiResponse<T> = {
  error: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    page_size?: number;
    total_count?: number;
    requested_at: string;
  };
};
```

예:

```json
{
  "error": false,
  "message": "대시보드 데이터를 불러왔습니다.",
  "data": {},
  "meta": {
    "requested_at": "2026-06-09T09:00:00+09:00"
  }
}
```

| 필드 | 설명 |
|------|------|
| `error` | `true`이면 실패. [`App.tsx`](../../src/App.tsx) `runApiAction`이 error Alert 표시 |
| `message` | Ant Design Alert에 표시되는 문구 |
| `data` | 실제 payload |
| `meta` | 선택값. 요청 시각, 페이지 정보 등 |

## axios 처리 규칙

[`src/api/backendClient.ts`](../../src/api/backendClient.ts):

1. `axios.create({ baseURL: '/api', withCredentials: true })`로 client 생성
2. `VITE_API_KEY`가 있으면 `X-API-Key` 헤더 추가
3. POST 요청 전 쿠키의 `csrftoken` 확인, 없으면 `GET /api/csrf/` 호출
4. `X-CSRFToken` 헤더 추가
5. backend envelope를 파싱해 `error: true`이면 `Error` throw
6. 성공 시 `toApiResponse(message, data)`로 `ApiResponse<T>` 생성

## 상태 코드 enum

지원자, JD, 자소서 행 상태에 쓰는 `StatusCode`는 [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts)에 정의되어 있습니다.

`prepare`, `on_going`, `closed`, `onqueue`, `processing`, `done`, `reviewed`, `needs_review`, `grade_a`, `grade_b`, `grade_c`, `grade_d`, `grade_f`, `normal`

UI 표시 변환은 [`src/utils/statusTag.tsx`](../../src/utils/statusTag.tsx)가 담당합니다.

## 데이터 변환

[`src/api/adapters.ts`](../../src/api/adapters.ts)는 backend snake_case 필드를 UI 모델에 맞게 변환합니다.

예:

- `job_name` → `title`
- `overall_grade` → 화면용 점수
- `company_info` → 회사 프로필 카드 데이터

초기 로드 시 [`src/api/appDataService.ts`](../../src/api/appDataService.ts)의 `loadAppData`가 adapter 함수들을 한 번에 호출합니다.
