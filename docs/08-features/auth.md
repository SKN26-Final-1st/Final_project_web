# 인증 (`#/login`, `#/signup`, `#/password-reset`)

## 화면 역할

로그인, 회원가입(아이디 중복 확인), 3단계 비밀번호 재설정 UI입니다. 인증 화면은 `AppShell` 없이 [`AuthScreen`](../../src/components/layout/AuthScreen.tsx)만 사용합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/AuthPages.tsx`](../../src/pages/AuthPages.tsx) | `LoginPage`, `SignupPage`, `PasswordResetPage` |
| [`src/components/layout/AuthScreen.tsx`](../../src/components/layout/AuthScreen.tsx) | 브랜딩·카드 레이아웃 |
| [`src/App.tsx`](../../src/App.tsx) | `renderAuthPage`, `resetStep` |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `authDefaultsApiResponse` |

`authDefaults`는 폼 `defaultValue`용이며, 프로덕션에서는 제거하거나 dev 전용 API로 제한하는 것이 좋습니다.

## Django API

### `GET /api/v1/auth/defaults/` (개발·목업용)

**응답 `data`**:

```json
{
  "login": {
    "username": "humour.admin",
    "password": "password"
  },
  "signup": {
    "username": "humour.recruiter",
    "email": "recruiter@humour.ai"
  },
  "password_reset": {
    "username": "humour.admin",
    "security_question": "첫 번째 채용 프로젝트 이름은?"
  }
}
```

### 로그인 — `POST /api/v1/auth/login/`

**권장 요청** (Form 필드 기준):

```json
{
  "username": "humour.admin",
  "password": "password"
}
```

**응답 `data`** (목업):

```json
{ "authenticated": true }
```

세션/JWT 발급 방식은 Django 쪽 정책 (**needs verification**).  
성공 후 프론트: `#/dashboard` 이동 (실제로는 토큰 저장 후 이동 필요).

### 아이디 중복 확인 — `POST /api/v1/auth/signup/check-username/`

**요청**:

```json
{ "username": "humour.recruiter" }
```

**응답 `data`**:

```json
{ "available": true }
```

### 회원가입 — `POST /api/v1/auth/signup/`

**권장 요청**:

```json
{
  "username": "humour.recruiter",
  "email": "recruiter@humour.ai",
  "password": "********"
}
```

프로필 이미지: Form에 `Upload` 있으나 `beforeUpload={() => false}` — 별도 `multipart` 업로드 API **needs verification**.

**응답 `data`**:

```json
{ "created": true }
```

### 비밀번호 재설정 — `POST /api/v1/auth/password-reset/`

3단계 UI (아이디 → 본인확인 질문 → 새 비밀번호). 마지막 단계에서만 API 호출.

**권장 요청** (통합 예):

```json
{
  "username": "humour.admin",
  "security_answer": "답변 텍스트",
  "new_password": "********"
}
```

단계별 엔드포인트 분리 여부는 백엔드 설계에 따름 (**needs verification**).

**응답 `data`**:

```json
{ "reset": true }
```

성공 후: `#/login`.

## 레이아웃 알림

인증 라우트에서도 `useMockAppData`는 실행되므로 `getNotifications` 등이 백그라운드에서 호출됩니다. Django 연동 시 인증 전용 최소 로드로 분리할지 검토하세요.
