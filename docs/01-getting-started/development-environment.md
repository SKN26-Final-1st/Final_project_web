# 개발 환경

UI 목업을 로컬에서 띄우고 해시 라우트로 화면을 돌려보는 방법입니다.

## 사전 요구

- Node.js (LTS 권장)
- npm

## 설치·실행

```bash
npm install
npm run dev
```

| 항목 | 값 |
|------|-----|
| 개발 서버 | `http://127.0.0.1:5173` (`vite --host 127.0.0.1`) |
| 패키지명 | `humour-ui-mockup` ([`package.json`](../../package.json)) |
| 화면 이동 | 해시 라우팅 — 예: `#/dashboard`, `#/company`, `#/login` |

브라우저에서 주소 뒤에 해시만 바꿔도 [`routes.ts`](../../src/utils/routes.ts)가 라우트를 동기화합니다. 알 수 없는 해시는 `#/dashboard`로 폴백합니다.

## 기타 스크립트

```bash
npm run build   # tsc --noEmit + vite build → dist/
npm run lint    # ESLint
npm run preview # dist 미리보기 (127.0.0.1)
```

## 진입점

| 파일 | 역할 |
|------|------|
| [`index.html`](../../index.html) | `#root`, 파비콘 `/assets/humour-app-icon.png` |
| [`src/main.tsx`](../../src/main.tsx) | React 마운트, `antd/dist/reset.css`, `styles.css` |
| [`src/App.tsx`](../../src/App.tsx) | 라우팅, 라이트/다크 테마, `useMockAppData`, `mockClient` 액션 |

## 목업 데이터 확인

앱 기동 시 [`useMockAppData`](../../src/hooks/useMockAppData.ts)가 `mockClient` GET 11건을 병렬 호출합니다. 로딩 중에는 `PageLoading`, 실패 시 `PageError`가 표시됩니다.

정적 이미지는 [`public/assets/`](../../public/assets/)에 두면 빌드 없이 `/assets/...`로 참조됩니다.
