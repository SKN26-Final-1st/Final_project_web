# HumouR 프론트엔드 문서 (wiki)

**HumouR** UI 목업 저장소(`web_design_playground`)의 프론트엔드 전용 문서입니다.  
각 화면이 기대하는 **Django JSON API 형태**와 **관련 소스 파일 역할**을 코드(`src/data/apiMockData.ts`, `src/api/mockClient.ts`) 기준으로 정리했습니다.

> 실제 Django 백엔드 URL·인증 방식은 메인 프로젝트와 맞춰야 합니다. 아래 **엔드포인트 경로**는 연동 시 제안안이며, 응답/요청 **JSON 필드명(snake_case)** 은 목업 계약의 기준입니다.

## 읽는 순서

| Part | 내용 |
|------|------|
| [00-overview](./00-overview/project-overview.md) | 프로젝트 목적, 스택, 현재 연동 상태 |
| [01-getting-started](./01-getting-started/development-environment.md) | 설치·실행 |
| [02-architecture](./02-architecture/) | 디렉터리, 데이터 흐름, 공통 API 래퍼 |
| [03-frontend](./03-frontend/) | 라우팅, 컴포넌트 계층 |
| [06-api](./06-api/api-reference.md) | 전역 API 목록·공통 응답 형식 |
| [08-features](./08-features/) | **페이지별** Django JSON + 파일 맵 |

## 페이지별 기능 문서 (Django JSON + 파일)

| 화면 | 해시 라우트 | 문서 |
|------|-------------|------|
| 대시보드 | `#/dashboard` | [dashboard.md](./08-features/dashboard.md) |
| 회사 정보 | `#/company` | [company.md](./08-features/company.md) |
| JD 관리 | `#/jd` | [jd.md](./08-features/jd.md) |
| 자기소개서 | `#/cover-letter` | [cover-letter.md](./08-features/cover-letter.md) |
| 채팅 | `#/chat` | [chat.md](./08-features/chat.md) |
| 마이페이지 | `#/mypage` | [mypage.md](./08-features/mypage.md) |
| 모집 공고 | `#/recruitment-post` | [recruitment-post.md](./08-features/recruitment-post.md) |
| 자소서 템플릿 | `#/cover-letter-template` | [cover-letter-template.md](./08-features/cover-letter-template.md) |
| 로그인·가입·비밀번호 | `#/login` 등 | [auth.md](./08-features/auth.md) |

## 핵심 소스 (API 계약의 단일 진실)

| 파일 | 역할 |
|------|------|
| [`src/data/apiMockData.ts`](../src/data/apiMockData.ts) | Django가 맞춰야 할 **응답 JSON 스키마** 샘플 |
| [`src/api/mockClient.ts`](../src/api/mockClient.ts) | 화면에서 호출하는 **메서드 = 예상 API 동작** |
| [`src/api/adapters.ts`](../src/api/adapters.ts) | snake_case API → UI용 camelCase 변환 |
| [`src/hooks/useMockAppData.ts`](../src/hooks/useMockAppData.ts) | 앱 기동 시 GET 목록 일괄 로드 |
