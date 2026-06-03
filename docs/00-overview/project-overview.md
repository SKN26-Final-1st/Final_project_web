# 프로젝트 개요

## 목적

SKN26 파이널 **HumouR** 채용 보조 서비스의 **UI·레이아웃 목업** 저장소입니다. Ant Design 기반으로 대시보드, JD, 자기소개서, AI 채팅, 인증 화면 등을 해시 라우팅으로 탐색합니다.

## 현재 백엔드 연동 상태

- **실제 HTTP 호출 없음.** `mockClient`가 `apiMockData.ts`의 JSON을 지연 후 반환합니다.
- Django 연동 시 `mockClient`를 `fetch`/axios 클라이언트로 교체하고, **응답 `data` 필드의 snake_case 키**를 그대로 유지하면 `adapters.ts` 매핑을 재사용할 수 있습니다.
- 폼 **저장·로그인** 등 mutation은 UI에서 값을 수집해 API로 보내지 않고, 성공 메시지만 목업합니다. 문서의 **요청 JSON**은 Django 구현 시 프론트가 보낼 **권장 계약**입니다.

## 기술 스택

- React 19 + TypeScript + Vite 7
- Ant Design 5
- 해시 라우팅: `#/dashboard`, `#/jd` … (`src/utils/routes.ts`)

## 관련 문서

- [개발 환경](../01-getting-started/development-environment.md)
- [데이터 흐름](../02-architecture/data-flow.md)
- [API 레퍼런스](../06-api/api-reference.md)
