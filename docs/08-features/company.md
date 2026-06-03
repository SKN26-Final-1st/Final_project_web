# 회사 정보 (`#/company`)

## 화면 역할

회사 프로필·핵심 가치·복지·입력 완성도를 편집·저장합니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/CompanyPage.tsx`](../../src/pages/CompanyPage.tsx) | 저장·초기화 액션, 2열 레이아웃 |
| [`src/components/company/CompanyProfileForm.tsx`](../../src/components/company/CompanyProfileForm.tsx) | Ant Form (`name`, `industry`, `size`, `location`, `introduction`) |
| [`src/components/company/CompanyCompletionPanel.tsx`](../../src/components/company/CompanyCompletionPanel.tsx) | `profile_completion` 표시 |
| [`src/api/mockClient.ts`](../../src/api/mockClient.ts) | `getCompanyProfile`, `getCompanyChoices`, `saveCompanyProfile` |

## Django API

### `GET /api/v1/companies/me/`

**응답 `data`**:

```json
{
  "id": "company-001",
  "name": "HumouR Labs",
  "industry": "AI 기반 HR 채용 보조 시스템",
  "employee_size": "51-200명",
  "location": "Seoul, KR",
  "introduction": "...",
  "core_values": ["데이터 기반 의사결정", "..."],
  "benefits": ["자율 출퇴근", "..."],
  "profile_completion": 82
}
```

프론트 Form 필드 `size` ↔ API `employee_size` ([`mapCompany`](../../src/api/adapters.ts)).

### `GET /api/v1/companies/choices/`

**응답 `data`**:

```json
{
  "employee_size_options": ["1-50명", "51-200명", "201-500명", "500명 이상"],
  "notification_channels": [
    { "value": "email", "label": "이메일" },
    { "value": "none", "label": "끄기" }
  ]
}
```

### `PATCH /api/v1/companies/me/` (저장 — 권장 요청)

목업은 body 없이 성공만 반환합니다. Django 연동 시 Form 값 기준 권장 body:

```json
{
  "name": "HumouR Labs",
  "industry": "AI 기반 HR 채용 보조 시스템",
  "employee_size": "51-200명",
  "location": "Seoul, KR",
  "introduction": "...",
  "core_values": ["..."],
  "benefits": ["..."]
}
```

**응답 `data`** (목업):

```json
{ "updated_at": "2026-06-03T14:00:00+09:00" }
```

**응답 `message`**: 예) `회사 정보가 저장되었습니다.`

## 목업 한계

- 「초기화」는 API 없이 Alert만 표시
- 핵심 가치 「태그 추가」는 Alert만 (`CompanyProfileForm`)
