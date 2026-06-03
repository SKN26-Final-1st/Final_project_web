# API 레퍼런스 (목업 계약)

Django 구현 시 아래 **JSON `data` 구조**를 기준으로 맞춥니다.  
**URL 경로**는 제안안이며, 실제 메인 백엔드와 통일해야 합니다 (**needs verification**).

공통 래퍼: [api-envelope.md](../02-architecture/api-envelope.md).

## GET — 초기 로드 (`useMockAppData`)

| mockClient | 제안 메서드·경로 | `data` 타입 참조 |
|------------|------------------|------------------|
| `getDashboard` | `GET /api/v1/dashboard/` | `dashboardApiResponse` |
| `getCompanyProfile` | `GET /api/v1/companies/me/` | `companyApiResponse` |
| `getCompanyChoices` | `GET /api/v1/companies/choices/` | `companyChoicesApiResponse` |
| `getJobDescriptions` | `GET /api/v1/job-descriptions/` | `jobDescriptionsApiResponse` |
| `getCoverLetterDraft` | `GET /api/v1/cover-letters/draft/` | `coverLetterDraftApiResponse` |
| `getCoverLetters` | `GET /api/v1/cover-letters/` | `coverLettersApiResponse` |
| `getAnalysisReport` | `GET /api/v1/analysis-reports/current/` | `analysisReportApiResponse` |
| `getRecruitmentPreview` | `GET /api/v1/recruitment-posts/preview/` | `recruitmentPostApiResponse` |
| `getCoverLetterTemplate` | `GET /api/v1/cover-letter-templates/` | `coverLetterTemplateApiResponse` |
| `getUserProfile` | `GET /api/v1/users/me/` | `userProfileApiResponse` |
| `getNotifications` | `GET /api/v1/notifications/` | `notificationsApiResponse` |
| `getAuthDefaults` | `GET /api/v1/auth/defaults/` | `authDefaultsApiResponse` |

샘플 전문: [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts).

## POST / PATCH — 사용자 액션

| mockClient | 제안 메서드·경로 | 요청 body (권장) | 응답 `data` (목업) |
|------------|------------------|------------------|---------------------|
| `login` | `POST /api/v1/auth/login/` | 아래 auth 문서 | `{ "authenticated": true }` |
| `checkSignupId` | `POST /api/v1/auth/signup/check-username/` | `{ "username": "..." }` | `{ "available": true }` |
| `completeSignup` | `POST /api/v1/auth/signup/` | signup 필드 | `{ "created": true }` |
| `resetPassword` | `POST /api/v1/auth/password-reset/` | reset 필드 | `{ "reset": true }` |
| `saveCompanyProfile` | `PATCH /api/v1/companies/me/` | company 필드 | `{ "updated_at": "ISO8601" }` |
| `requestJobAnalysis` | `POST /api/v1/job-descriptions/{id}/analyze/` | 없음 또는 `{}` | `{ "jd_id": "..." }` |
| `uploadCoverLetters` | `POST /api/v1/cover-letters/upload/` | `multipart/form-data` file | `{ "uploaded_count": N }` |
| `requestCoverLetterAnalysis` | `POST /api/v1/cover-letters/analyze/` | `{ "jd_id": "..." }` | `{ "jd_id": "..." }` |
| `sendChatMessage` | `POST /api/v1/analysis-reports/{id}/chat/` | `{ "question": "..." }` | `{ "role": "assistant", "text": "..." }` |
| `saveUserProfile` | `PATCH /api/v1/users/me/` | profile 필드 | `{ "updated_at": "ISO8601" }` |
| `generateRecruitmentPost` | `POST /api/v1/recruitment-posts/generate/` | `{ "jd_ids": ["..."] }` | `{ "jd_ids": [...] }` |
| `downloadRecruitmentPdf` | `GET /api/v1/recruitment-posts/export/pdf/` | query 또는 body TBD | `{ "file_name": "..." }` |
| `generateCoverLetterTemplate` | `POST /api/v1/cover-letter-templates/generate/` | `{ "jd_id": "..." }` | `{ "jd_id": "..." }` |
| `downloadTemplateDocument` | `GET /api/v1/cover-letter-templates/export/` | TBD | `{ "file_name": "..." }` |

페이지별 상세·파일 맵: [08-features](../08-features/README.md).
