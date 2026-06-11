# 인증 (`/login`, `/signup`, `/password-reset`)

## 화면 역할

로그인, 회원가입, 비밀번호 재설정 UI입니다. 인증 화면은 `AppShell` 없이 [`AuthScreen`](../../src/components/layout/AuthScreen.tsx)을 사용합니다.

기본 실행은 mock API 모드입니다. real API 모드(`VITE_USE_MOCK_API=false`)에서는 axios로 backend 인증 action을 호출합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/AuthPages.tsx`](../../src/pages/AuthPages.tsx) | `LoginPage`, `SignupPage`, `PasswordResetPage` |
| [`src/components/layout/AuthScreen.tsx`](../../src/components/layout/AuthScreen.tsx) | 인증 화면 레이아웃 |
| [`src/api/backendClient.ts`](../../src/api/backendClient.ts) | mock/real 인증 action |
| [`src/App.tsx`](../../src/App.tsx) | `renderAuthPage`, 로그인 성공 후 `reload()` → `/dashboard` |

## mock 모드

기본값: `VITE_USE_MOCK_API=true` 또는 환경 변수 미설정.

| action | mock 응답 |
|--------|-----------|
| `apiClient.login` | `{ authenticated: true }` |
| `apiClient.checkSignupId` | `{ available: true }` |
| `apiClient.completeSignup` | `{ created: true }` |
| `apiClient.getPasswordQuestion` | mock `verification_question` |
| `apiClient.resetPassword` | `{ password: 'dallhksn' }` |

backend 서버 없이 `/login` → `/dashboard` 흐름과 회원가입·비밀번호 재설정 UI를 확인할 수 있습니다.

## real API 모드

PowerShell:

```powershell
$env:VITE_USE_MOCK_API='false'
npm.cmd run dev
```

### CSRF — `GET /api/csrf/`

POST 요청 전 쿠키의 `csrftoken`을 확인하고, 없으면 먼저 호출합니다.

### 로그인 — `POST /api/login/`

[`LoginPage`](../../src/pages/AuthPages.tsx) 폼 제출 → `apiClient.login(username, password)`.

```json
{
  "username": "admin",
  "password": "1234"
}
```

성공 후 `reload()`로 React Query 캐시를 갱신하고 `/dashboard`로 이동합니다.

### 회원가입 — ID 중복 확인 + `POST /api/signin/`

1. **중복 확인**: [`SignupPage`](../../src/pages/AuthPages.tsx)에서 입력한 username으로 `apiClient.checkSignupId(username)` → `POST /api/checkuser/`
2. **가입 완료**: 폼 제출 → `apiClient.completeSignup(body)` → `POST /api/signin/`

```json
{
  "username": "admin",
  "password": "1234",
  "name": "administrator",
  "verification_question": "좋아하는 색깔은?",
  "verification_answer": "파랑"
}
```

### 비밀번호 재설정 — 3단계 플로우

[`PasswordResetPage`](../../src/pages/AuthPages.tsx) + `App.tsx`의 `resetStep` 상태.

| 단계 | UI | API |
|------|-----|-----|
| 0 — ID | username 입력 | `apiClient.getPasswordQuestion(username)` → `POST /api/passqestion/` |
| 1 — 질문 | 본인확인 질문(읽기 전용) + 답변 입력 | `apiClient.resetPassword(username, answer)` → `POST /api/passreset/` |
| 2 — 변경 | 임시 비밀번호 표시(읽기 전용) | 없음. "로그인으로 이동" → `/login` |

## 초기 폼 기본값

인증 화면 initial value는 `useMockAppData` → `authDefaults`에서 옵니다. [`authDefaultsApiResponse`](../../src/data/apiMockData.ts)는 로그인용 username/password를 포함한 `Account` fixture입니다.

## 관련 문서

- [API 레퍼런스](../06-api/api-reference.md)
- [api-spec-addendum.md](../06-api/api-spec-addendum.md) — backend action 이름과 응답 필드 검증 참고
