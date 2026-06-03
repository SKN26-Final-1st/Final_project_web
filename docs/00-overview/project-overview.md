# 프로젝트 개요

## 목적

SKN26 파이널 **HumouR** 채용 보조 서비스의 **UI·레이아웃 목업·디자인 연습** 저장소입니다.

- Ant Design으로 폼·테이블·카드·알림·사이드 레이아웃을 구성합니다.
- ECharts로 대시보드 적합도 도넛 차트를 표시합니다.
- 해시 라우팅(`#/dashboard`, `#/jd` …)으로 전체 화면 흐름을 탐색합니다.
- Django JSON API **계약**을 목 데이터로 고정해, 메인 백엔드 연동 시 필드명·래퍼를 맞출 수 있게 합니다.

**이 레포는 디자인·UI 실험용**이며, HumouR 메인 백엔드/배포 저장소와 분리되어 있습니다.

## 현재 백엔드 연동 상태

| 항목 | 상태 |
|------|------|
| HTTP / Django | **없음** — `mockClient`가 `apiMockData.ts`를 ~260ms 지연 후 반환 |
| 인증·세션 | **없음** — 로그인·가입은 UI + 성공 Alert만 |
| 폼 mutation | 입력값 **미전송** — `mockClient.*`가 고정 성공 메시지 반환 |
| 어댑터 | `adapters.ts`가 snake_case → camelCase (Django 연동 시 재사용 가능) |

연동 시: `mockClient`를 HTTP 클라이언트로 교체하고, 응답 `data`의 snake_case 키를 유지하면 됩니다. 문서의 **요청 JSON**은 Django 구현 시 프론트가 보낼 **권장 계약**입니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| UI | React 19, TypeScript, Ant Design 5 |
| 빌드 | Vite 7 (`package.json` name: `humour-ui-mockup`) |
| 차트 | ECharts 6 (`src/components/charts/`) |
| 라우팅 | 해시 (`src/utils/routes.ts`, `src/data/mockData.tsx`) |
| 스타일 | `src/styles.css`, Ant Design `ConfigProvider` 토큰 (`App.tsx`) |
| 폰트 | Pretendard, Noto Sans KR (테마 `fontFamily`) |

## 정적 자산

[`public/assets/`](../../public/assets/) — 브라우저 경로 `/assets/...`

- `humour-app-icon.png` — 파비콘, 아바타, 채팅
- `humour-logo-light.png` / `humour-logo-dark.png` — 인증·사이드바 로고

## 관련 문서

- [개발 환경](../01-getting-started/development-environment.md)
- [디렉터리 구조](../02-architecture/directory-structure.md)
- [데이터 흐름](../02-architecture/data-flow.md)
- [API 레퍼런스](../06-api/api-reference.md)
