# API 레퍼런스

프론트엔드는 [`src/api/backendClient.ts`](../../src/api/backendClient.ts)의 `apiClient`를 통해 데이터를 가져오고 액션을 실행합니다. 페이지 컴포넌트는 axios를 직접 호출하지 않고 `apiClient.*` 메서드만 사용합니다.

## 실행 모드

| 모드 | 조건 | 동작 |
|------|------|------|
| mock API | 기본값 또는 `VITE_USE_MOCK_API=true` | 로컬 mock 데이터와 성공 응답 사용 |
| real API | `VITE_USE_MOCK_API=false` | axios client로 `/api/{endpoint}/` 호출 |

환경 변수: [development-environment.md](../01-getting-started/development-environment.md)

## axios 공통 설정

```ts
const httpClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

request interceptor:

1. `VITE_API_KEY`가 있으면 `X-API-Key` 헤더 추가
2. POST 요청이면 쿠키 `csrftoken` 확인
3. 토큰이 없으면 `GET /api/csrf/` 호출
4. `X-CSRFToken` 헤더 추가

## 응답 계약

- backend 성공: `{ "error": false, "data": ... }`
- backend 실패: `{ "error": true, "message": "..." }`

`backendClient.ts`는 UI 내부 `ApiResponse<T>`로 감쌉니다.

```ts
type ApiResponse<T> = {
  error: boolean;
  message?: string;
  data: T;
  meta?: {
    requested_at: string;
    page?: number;
    page_size?: number;
    total_count?: number;
  };
};
```

자세한 envelope 설명: [api-envelope.md](../02-architecture/api-envelope.md)

## client method 매핑

| `apiClient` 메서드 | real API endpoint / action | mock 모드 |
|--------------------|----------------------------|-----------|
| `getDashboard` | `account/get`, `compinfo/get`, `jd/get`, `resume/get`, `report/get`, `question/get` 조합 | `apiMockData` dashboard source |
| `getCompanyProfile` | `compinfo/get` | `companyApiResponse.data` |
| `getJobDescriptions` | `jd/get` | `jobDescriptionsApiResponse.data` |
| `getCoverLetterDraft` | dashboard source의 첫 resume | mock resume |
| `getCoverLetters` | dashboard source의 resumes | mock resumes |
| `getAnalysisReport` | dashboard source의 첫 report | mock report |
| `getRecruitmentPreview` | dashboard source에서 프론트 조합 | mock company/JD 조합 |
| `getCoverLetterTemplate` | dashboard source의 questions | mock questions |
| `getUserProfile` | `account/get` | `authDefaultsApiResponse.data` |
| `getAuthDefaults` | 로컬 기본값 | `authDefaultsApiResponse.data` |
| `login` | `POST /api/login/` | 성공 응답 |
| `logout` | `POST /api/logout/` | 성공 응답 |
| `checkSignupId(username)` | `POST /api/checkuser/` | `{ available: true }` |
| `completeSignup` | `POST /api/signin/` | 성공 응답 |
| `getPasswordQuestion(username)` | `POST /api/passqestion/` | mock verification_question |
| `resetPassword(username, answer)` | `POST /api/passreset/` | mock 임시 비밀번호 |
| `saveCompanyProfile` | `compinfo/modify` | 성공 응답 |
| `saveUserProfile` | `account/modify` | 성공 응답 |
| `requestJobAnalysis` | `resume/analize` | 성공 응답 |
| `requestCoverLetterAnalysis` | `resume/analize` | 성공 응답 |
| `uploadCoverLetters` | 추가 명세 필요 | mock resume count |
| `sendChatMessage(question, messages)` | `POST /api/chat/` | 로컬 안내 응답 |
| `generateRecruitmentPost` | 추가 명세 필요 | 성공 응답 |
| `downloadRecruitmentPdf` | 추가 명세 필요 | 성공 응답 |
| `generateCoverLetterTemplate` | 추가 명세 필요 | 성공 응답 |
| `downloadTemplateDocument` | 추가 명세 필요 | 성공 응답 |

## 인증 endpoint

### `GET /api/csrf/`

쿠키 기반 세션 인증에서 POST 요청 전 CSRF 쿠키를 발급받습니다.

### `POST /api/login/`

요청:

```json
{
  "username": "admin",
  "password": "1234"
}
```

### `POST /api/signin/`

요청:

```json
{
  "username": "admin",
  "password": "1234",
  "name": "administrator",
  "verification_question": "좋아하는 색깔은?",
  "verification_answer": "파랑"
}
```

### `POST /api/checkuser/`

회원가입 ID 중복 확인. 프론트는 응답 envelope의 `valid` 필드를 `available`로 변환합니다.

```json
{
  "username": "admin"
}
```

### `POST /api/passqestion/`

비밀번호 재설정 1단계 — 본인확인 질문 조회.

```json
{
  "username": "admin"
}
```

응답 envelope에 `verification_question` 문자열이 포함되어야 합니다.

### `POST /api/passreset/`

비밀번호 재설정 2단계 — 답변 검증 후 임시 비밀번호 발급.

```json
{
  "username": "admin",
  "verification_answer": "파랑"
}
```

응답 envelope에 `password` 문자열이 포함되어야 합니다.

### `POST /api/chat/`

real API 모드 채팅. 프론트는 UI `ChatMessage[]`를 backend 형식으로 변환해 전달합니다.

요청:

```json
{
  "chat": [
    { "role": "user", "message": "이 지원자의 리스크 알려줘" },
    { "role": "agent", "message": "..." }
  ]
}
```

응답 envelope에 `response: { role, message }` 객체가 포함되어야 합니다. 프론트는 `role: agent` → `assistant`, `message` → `text`로 변환합니다.

## 화면용 파생 데이터

프론트엔드는 DB/API에 없는 표시용 필드를 [`src/api/adapters.ts`](../../src/api/adapters.ts)와 [`src/api/appDataService.ts`](../../src/api/appDataService.ts)에서만 계산합니다.

- dashboard 지표: `Account.credit`, `JobDescription.status`, `Resume.status/reviewed`, `AnalysisReport.overall_grade`
- JD 평균 점수: 해당 JD와 연결된 resume/report 기준
- 지원서 상태 라벨: `Resume.status`, `Resume.reviewed`
- 리포트 탭: `AnalysisReport` 컬럼을 화면 탭으로 묶음
- 면접 질문 템플릿: `InterviewQuestion.question`, `InterviewQuestion.purpose`
- 모집 공고 미리보기: `appDataService`에서 company + JD 텍스트 조합

추가 API 제안: [api-spec-addendum.md](./api-spec-addendum.md)
DB/API 컬럼 차이: [db-column-gap-notes.md](./db-column-gap-notes.md)
