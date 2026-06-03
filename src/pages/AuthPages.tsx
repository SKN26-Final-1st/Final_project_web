import type { ReactNode } from 'react';
import { Button, Col, Flex, Form, Input, Row, Steps, Upload } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined, UploadOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { AuthScreen } from '../components/layout/AuthScreen';
import type { AuthDefaults } from '../api/adapters';
import { mockClient } from '../api/mockClient';
import type { Navigate, RunMockAction, ShowAlert, ThemeMode } from '../types/app';

type AuthPageBaseProps = {
  mode: ThemeMode;
  navigate: Navigate;
  themeSwitch: ReactNode;
  loadingKey: string | null;
  authDefaults?: AuthDefaults;
  runMockAction: RunMockAction;
};

type LoginPageProps = AuthPageBaseProps;

export function LoginPage({ mode, navigate, themeSwitch, loadingKey, authDefaults, runMockAction }: LoginPageProps) {
  return (
    <AuthScreen
      mode={mode}
      nav={navigate}
      themeSwitch={themeSwitch}
      title="채용 데이터 입력부터 분석 리포트와 질의응답까지"
      cardTitle="로그인"
      card={
        <Form layout="vertical">
          <Form.Item label="아이디">
            <Input defaultValue={authDefaults?.login.username ?? ''} />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input.Password
              defaultValue={authDefaults?.login.password ?? ''}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Button
            type="primary"
            block
            icon={loadingKey === 'login' ? undefined : <LoginOutlined />}
            disabled={loadingKey === 'login'}
            onClick={() => void runMockAction('login', mockClient.login, () => navigate('/dashboard'))}
          >
            {loadingKey === 'login' ? <InlineLoading label="로그인 중" /> : '로그인'}
          </Button>
          <Flex justify="space-between" className="auth-links">
            <Button type="link" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
            <Button type="link" onClick={() => navigate('/password-reset')}>
              비밀번호 찾기
            </Button>
          </Flex>
        </Form>
      }
    />
  );
}

type SignupPageProps = AuthPageBaseProps & {
  showAlert: ShowAlert;
};

export function SignupPage({
  mode,
  navigate,
  themeSwitch,
  loadingKey,
  authDefaults,
  runMockAction,
}: SignupPageProps) {
  return (
    <AuthScreen
      mode={mode}
      nav={navigate}
      themeSwitch={themeSwitch}
      title="회사와 지원자 데이터를 한곳에서 관리하는 채용 보조 시스템"
      cardTitle="회원가입"
      card={
        <Form layout="vertical">
          <Row gutter={12}>
            <Col span={16}>
              <Form.Item label="아이디">
                <Input defaultValue={authDefaults?.signup.username ?? ''} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="확인">
                <Button
                  block
                  disabled={loadingKey === 'signup-check'}
                  onClick={() => void runMockAction('signup-check', mockClient.checkSignupId)}
                >
                  중복 확인
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="이메일">
            <Input defaultValue={authDefaults?.signup.email ?? ''} />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input.Password />
          </Form.Item>
          <Form.Item label="프로필 이미지">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>이미지 선택</Button>
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            block
            disabled={loadingKey === 'signup-complete'}
            onClick={() => void runMockAction('signup-complete', mockClient.completeSignup)}
          >
            {loadingKey === 'signup-complete' ? <InlineLoading label="가입 중" /> : '가입 완료'}
          </Button>
        </Form>
      }
    />
  );
}

type PasswordResetPageProps = AuthPageBaseProps & {
  resetStep: number;
  setResetStep: (step: number | ((current: number) => number)) => void;
  showAlert: ShowAlert;
};

export function PasswordResetPage({
  mode,
  navigate,
  themeSwitch,
  loadingKey,
  authDefaults,
  runMockAction,
  resetStep,
  setResetStep,
}: PasswordResetPageProps) {
  const stepContents = [
    <Form.Item label="아이디" key="id">
      <Input defaultValue={authDefaults?.password_reset.username ?? ''} />
    </Form.Item>,
    <Form.Item label="본인확인 질문" key="question">
      <Input defaultValue={authDefaults?.password_reset.security_question ?? ''} />
    </Form.Item>,
    <Form.Item label="새 비밀번호" key="password">
      <Input.Password />
    </Form.Item>,
  ];

  return (
    <AuthScreen
      mode={mode}
      nav={navigate}
      themeSwitch={themeSwitch}
      title="단계형 재설정 플로우로 인증 화면 상태를 확인합니다."
      cardTitle="비밀번호 찾기"
      card={
        <div>
          <Steps size="small" current={resetStep} items={[{ title: 'ID' }, { title: '질문' }, { title: '변경' }]} />
          <div className="step-panel">{stepContents[resetStep]}</div>
          <Button
            type="primary"
            block
            disabled={loadingKey === 'password-reset'}
            onClick={() => {
              if (resetStep < 2) {
                setResetStep((current) => current + 1);
                return;
              }
              void runMockAction('password-reset', mockClient.resetPassword, () => navigate('/login'));
            }}
          >
            {loadingKey === 'password-reset' ? <InlineLoading label="재설정 중" /> : resetStep < 2 ? '다음' : '재설정 완료'}
          </Button>
        </div>
      }
    />
  );
}
