import type { ReactNode } from 'react';
import { Button, Col, Flex, Form, Input, Row, Steps, Upload } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined, UploadOutlined } from '@ant-design/icons';
import { AuthScreen } from '../components/layout/AuthScreen';
import type { Navigate, ShowAlert, ThemeMode } from '../types/app';

type AuthPageBaseProps = {
  mode: ThemeMode;
  navigate: Navigate;
  themeSwitch: ReactNode;
};

type LoginPageProps = AuthPageBaseProps;

export function LoginPage({ mode, navigate, themeSwitch }: LoginPageProps) {
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
            <Input defaultValue="humour.admin" />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input.Password defaultValue="password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Button type="primary" block icon={<LoginOutlined />} onClick={() => navigate('/dashboard')}>
            로그인
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

export function SignupPage({ mode, navigate, themeSwitch, showAlert }: SignupPageProps) {
  return (
    <AuthScreen
      mode={mode}
      nav={navigate}
      themeSwitch={themeSwitch}
      title="회사와 지원자 데이터를 한 곳에서 관리하는 채용 보조 시스템"
      cardTitle="회원가입"
      card={
        <Form layout="vertical">
          <Row gutter={12}>
            <Col span={16}>
              <Form.Item label="아이디">
                <Input defaultValue="humour.recruiter" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="확인">
                <Button block onClick={() => showAlert({ type: 'success', message: '사용 가능한 아이디입니다.' })}>
                  중복 확인
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="이메일">
            <Input defaultValue="recruiter@humour.ai" />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input.Password />
          </Form.Item>
          <Form.Item label="프로필 이미지">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>이미지 선택</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" block onClick={() => showAlert({ type: 'success', message: '가입 완료 상태를 표시했습니다.' })}>
            가입 완료
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

export function PasswordResetPage({ mode, navigate, themeSwitch, resetStep, setResetStep, showAlert }: PasswordResetPageProps) {
  const stepContents = [
    <Form.Item label="아이디" key="id">
      <Input defaultValue="humour.admin" />
    </Form.Item>,
    <Form.Item label="본인확인 질문" key="question">
      <Input defaultValue="첫 번째 채용 프로젝트 이름은?" />
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
      title="단계형 재설정 플로우로 인증 화면 상태를 확인합니다"
      cardTitle="비밀번호 찾기"
      card={
        <div>
          <Steps size="small" current={resetStep} items={[{ title: 'ID' }, { title: '질문' }, { title: '변경' }]} />
          <div className="step-panel">{stepContents[resetStep]}</div>
          <Button
            type="primary"
            block
            onClick={() => {
              if (resetStep < 2) {
                setResetStep((current) => current + 1);
                return;
              }
              showAlert({ type: 'success', message: '비밀번호 재설정이 완료되었습니다.' });
              navigate('/login');
            }}
          >
            {resetStep < 2 ? '다음' : '재설정 완료'}
          </Button>
        </div>
      }
    />
  );
}
