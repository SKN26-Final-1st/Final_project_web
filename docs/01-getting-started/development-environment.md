# 개발 환경

## 사전 요구

- Node.js (LTS 권장)
- npm

## 설치·실행

```bash
npm install
npm run dev
```

브라우저: `http://127.0.0.1:5173` — 해시로 화면 이동 (`#/dashboard`).

## 기타 스크립트

```bash
npm run build   # tsc + vite build
npm run lint    # ESLint
npm run preview # dist 미리보기
```

## 진입점

| 파일 | 역할 |
|------|------|
| [`src/main.tsx`](../../src/main.tsx) | React 루트 마운트, Ant Design reset CSS |
| [`src/App.tsx`](../../src/App.tsx) | 라우팅, 테마, 전역 데이터 로드, `mockClient` 액션 |
