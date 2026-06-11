# 프론트엔드

HumouR 프론트엔드의 라우팅, 레이아웃, 컴포넌트 계층 문서입니다. 초기 데이터는 TanStack React Query(`useMockAppData` → `loadAppData`)로 로드하고, 사용자 액션은 [`src/api/backendClient.ts`](../../src/api/backendClient.ts)의 `apiClient`를 통해 처리합니다.

기본 실행은 mock API 모드이며, `VITE_USE_MOCK_API=false`에서 axios client로 전환됩니다.

| 문서 | 내용 |
|------|------|
| [overview.md](./overview.md) | 레이아웃, 테마, 차트, DocumentChatFab 개요 |
| [pages-and-routes.md](./pages-and-routes.md) | React Router 라우팅과 `App.tsx` 분기 |
| [components.md](./components.md) | `components/` 폴더별 역할 |

화면별 API 매핑은 [08-features](../08-features/README.md)를 참고합니다.
