# 관리자 (`/admin`)

## 화면 역할

개별 스타트업 관리자가 면접방, 비밀번호 정책, LLM 질문 생성량, 포인트 사용량과 가드레일을 확인하는 운영 목업 화면입니다.

## 관련 파일

| 파일 | 기능 |
|------|------|
| [`src/pages/AdminPage.tsx`](../../src/pages/AdminPage.tsx) | 관리자 운영 화면 렌더링, 면접방/비밀번호/LLM 사용량 목업 액션 |
| [`src/api/adapters.ts`](../../src/api/adapters.ts) | `mapAdmin`으로 dashboard source에서 `AdminData` 생성 |
| [`src/hooks/useMockAppData.ts`](../../src/hooks/useMockAppData.ts) | `admin` 데이터를 `App`에 공급 |
| [`src/App.tsx`](../../src/App.tsx) | `/admin` 보호 라우트 렌더링 |

## 현재 데이터 흐름

관리자 전용 backend endpoint는 아직 없습니다. 현재 화면은 [`apiClient.getDashboard`](../../src/api/backendClient.ts)가 조합한 dashboard source를 `mapAdmin`에서 관리자 UI 모델로 변환해 사용합니다.

| 목적 | 현재 source |
|------|-------------|
| 회사명·대표 HR | `account/get`, `compinfo/get` 조합 |
| 진행 중 JD 수 | `jd/get` |
| 검토 대기·분석 중 지원자 | `resume/get` |
| 평균 점수 | `report/get` |
| 크레딧·구독 상태 | `account/get` |

## 현재 화면 액션

아래 액션은 아직 backend에 저장하지 않고 `showAlert`로 목업 상태만 표시합니다.

- LLM 사용 한도 조정
- 면접방 생성
- 정책 변경 내역 조회
- 전체 면접방 보기
- 면접방 비밀번호 복사
- 비밀번호 정책 편집
- LLM 사용 로그 다운로드

회사 프로필 수정 버튼은 기존 `navigate('/company')` 흐름으로 회사 정보 화면으로 이동합니다.

## 추가 명세 필요

- 관리자 전용 dashboard endpoint
- 면접방 생성·수정·삭제 endpoint
- 면접방 비밀번호 발급·만료·복사 감사 로그 endpoint
- LLM 사용량/포인트 차감 로그 endpoint
- 회사별 LLM 질문 생성 한도와 가드레일 정책 endpoint
