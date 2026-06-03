# 마이페이지 (`#/mypage`)

## 화면 역할

담당자 프로필, 계정·알림 설정, 보안 UI, 회사 요약·크레딧을 표시합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/MyPage.tsx`](../../src/pages/MyPage.tsx) | 프로필 저장 → `saveUserProfile` |
| [`src/components/mypage/ProfileSummaryCard.tsx`](../../src/components/mypage/ProfileSummaryCard.tsx) | 아바타·역할·크레딧 |
| [`src/components/mypage/AccountSettingsForm.tsx`](../../src/components/mypage/AccountSettingsForm.tsx) | `display_name`, `notification_channel` |
| [`src/components/mypage/SecuritySettingsForm.tsx`](../../src/components/mypage/SecuritySettingsForm.tsx) | 비밀번호 UI(목) |
| [`src/components/mypage/CompanySummaryPanel.tsx`](../../src/components/mypage/CompanySummaryPanel.tsx) | 회사 요약 → `#/company` |
| [`src/data/apiMockData.ts`](../../src/data/apiMockData.ts) | `userProfileApiResponse` |

대시보드 `metrics` 중 `credits` → `creditPercent`를 헤더·프로필 카드에 공유합니다.

## Django API

### `GET /api/v1/users/me/`

**응답 `data`**:

```json
{
  "id": "user-001",
  "display_name": "채용 담당자",
  "role_name": "People Team",
  "email": "recruiter@humour.ai",
  "avatar_url": "/assets/humour-app-icon.png",
  "company_name": "HumouR Labs",
  "last_login_at": "2026-06-03T13:42:00+09:00",
  "notification_channel": "email"
}
```

`notification_channel` 값은 `GET /companies/choices/`의 `notification_channels[].value`와 일치.

### `PATCH /api/v1/users/me/` (저장 — 권장 요청)

```json
{
  "display_name": "채용 담당자",
  "notification_channel": "email"
}
```

비밀번호 변경은 `SecuritySettingsForm`에 UI만 있음 — 별도 `POST /auth/password-change/` 등 **needs verification**.

**응답 `data`** (목업):

```json
{ "updated_at": "2026-06-03T14:00:00+09:00" }
```

## 레이아웃 공통 데이터

| 소스 | 용도 |
|------|------|
| `company` (GET companies/me) | `CompanySummaryPanel` |
| `companyChoices` | 알림 Radio 옵션 |
| `dashboard.creditPercent` | 크레딧 Progress |
