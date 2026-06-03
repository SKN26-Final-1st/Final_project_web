import { useEffect, useMemo, useState, type Key } from 'react';
import { Alert, App as AntApp, ConfigProvider, Switch, Tooltip, theme as antdTheme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { AppShell } from './components/layout/AppShell';
import { initialChatMessages, jdList, palette, type AppRoute } from './data/mockData';
import { LoginPage, PasswordResetPage, SignupPage } from './pages/AuthPages';
import { ChatPage } from './pages/ChatPage';
import { CompanyPage } from './pages/CompanyPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { CoverLetterTemplatePage } from './pages/CoverLetterTemplatePage';
import { DashboardPage } from './pages/DashboardPage';
import { JdPage } from './pages/JdPage';
import { MyPage } from './pages/MyPage';
import { RecruitmentPostPage } from './pages/RecruitmentPostPage';
import type { AlertState, ThemeMode } from './types/app';
import { authRoutes, readRouteFromHash } from './utils/routes';

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [route, setRoute] = useState<AppRoute>(readRouteFromHash);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatInput, setChatInput] = useState('');
  const [selectedJdId, setSelectedJdId] = useState(jdList[0].id);
  const [selectedRows, setSelectedRows] = useState<Key[]>([jdList[0].id]);
  const [coverUploaded, setCoverUploaded] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [postGenerated, setPostGenerated] = useState(true);
  const [templateGenerated, setTemplateGenerated] = useState(true);
  const [resetStep, setResetStep] = useState(0);

  useEffect(() => {
    const syncRoute = () => setRoute(readRouteFromHash());
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const selectedJd = jdList.find((item) => item.id === selectedJdId) ?? jdList[0];

  const themeConfig = useMemo(
    () => ({
      algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: palette.primary,
        colorInfo: palette.primary,
        colorSuccess: palette.accent,
        colorBgBase: mode === 'dark' ? palette.text : palette.background,
        colorTextBase: mode === 'dark' ? palette.card : palette.text,
        fontFamily: 'Pretendard, Noto Sans KR, system-ui, sans-serif',
        borderRadius: 12,
      },
      components: {
        Card: {
          borderRadiusLG: 22,
        },
        Button: {
          borderRadius: 12,
          controlHeight: 40,
        },
        Input: {
          borderRadius: 12,
        },
        Select: {
          borderRadius: 12,
        },
      },
    }),
    [mode],
  );

  const navigate = (nextRoute: AppRoute) => {
    window.history.pushState(null, '', `#${nextRoute}`);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showAlert = (nextAlert: AlertState) => {
    setAlert(nextAlert);
    window.setTimeout(() => setAlert(null), 3400);
  };

  const runMockAction = (
    key: string,
    nextAlert: AlertState,
    afterComplete?: () => void,
    duration = 720,
  ) => {
    if (loadingKey) {
      return;
    }
    setLoadingKey(key);
    window.setTimeout(() => {
      setLoadingKey(null);
      showAlert(nextAlert);
      afterComplete?.();
    }, duration);
  };

  const sendChatMessage = () => {
    if (loadingKey === 'chat') {
      return;
    }
    const trimmed = chatInput.trim();
    if (!trimmed) {
      showAlert({ type: 'warning', message: '빈 메시지는 전송할 수 없습니다.' });
      return;
    }
    setChatMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');
    runMockAction(
      'chat',
      { type: 'success', message: 'AI 답변이 추가되었습니다.' },
      () =>
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'JD 요구사항과 자기소개서 근거를 함께 보면 직무 적합도는 높고, 테스트 자동화 경험은 면접에서 확인하면 좋습니다.',
          },
        ]),
      560,
    );
  };

  const themeSwitch = (
    <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
      <Switch
        aria-label={mode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        checked={mode === 'dark'}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        onChange={(checked) => setMode(checked ? 'dark' : 'light')}
      />
    </Tooltip>
  );

  const renderPage = () => {
    switch (route) {
      case '/company':
        return <CompanyPage loadingKey={loadingKey} runMockAction={runMockAction} showAlert={showAlert} />;
      case '/jd':
        return (
          <JdPage
            selectedJdId={selectedJdId}
            selectedJd={selectedJd}
            loadingKey={loadingKey}
            setSelectedJdId={setSelectedJdId}
            runMockAction={runMockAction}
            navigate={navigate}
            showAlert={showAlert}
          />
        );
      case '/cover-letter':
        return (
          <CoverLetterPage
            selectedJdId={selectedJdId}
            coverUploaded={coverUploaded}
            analysisDone={analysisDone}
            loadingKey={loadingKey}
            setSelectedJdId={setSelectedJdId}
            setCoverUploaded={setCoverUploaded}
            setAnalysisDone={setAnalysisDone}
            runMockAction={runMockAction}
            showAlert={showAlert}
            navigate={navigate}
          />
        );
      case '/chat':
        return (
          <ChatPage
            chatMessages={chatMessages}
            chatInput={chatInput}
            loadingKey={loadingKey}
            setChatMessages={setChatMessages}
            setChatInput={setChatInput}
            sendChatMessage={sendChatMessage}
          />
        );
      case '/mypage':
        return <MyPage navigate={navigate} showAlert={showAlert} />;
      case '/recruitment-post':
        return (
          <RecruitmentPostPage
            selectedRows={selectedRows}
            postGenerated={postGenerated}
            loadingKey={loadingKey}
            setSelectedRows={setSelectedRows}
            setPostGenerated={setPostGenerated}
            runMockAction={runMockAction}
            showAlert={showAlert}
          />
        );
      case '/cover-letter-template':
        return (
          <CoverLetterTemplatePage
            selectedJd={selectedJd}
            templateGenerated={templateGenerated}
            loadingKey={loadingKey}
            setTemplateGenerated={setTemplateGenerated}
            runMockAction={runMockAction}
            showAlert={showAlert}
          />
        );
      case '/login':
        return <LoginPage mode={mode} navigate={navigate} themeSwitch={themeSwitch} />;
      case '/signup':
        return <SignupPage mode={mode} navigate={navigate} themeSwitch={themeSwitch} showAlert={showAlert} />;
      case '/password-reset':
        return (
          <PasswordResetPage
            mode={mode}
            navigate={navigate}
            themeSwitch={themeSwitch}
            resetStep={resetStep}
            setResetStep={setResetStep}
            showAlert={showAlert}
          />
        );
      case '/dashboard':
      default:
        return <DashboardPage mode={mode} navigate={navigate} showAlert={showAlert} />;
    }
  };

  const isAuth = authRoutes.includes(route);

  return (
    <ConfigProvider theme={themeConfig}>
      <AntApp>
        <div className="app-root" data-theme={mode}>
          {alert && (
            <div className="floating-alert">
              <Alert
                showIcon
                closable
                type={alert.type}
                message={alert.message}
                description={alert.description}
                onClose={() => setAlert(null)}
              />
            </div>
          )}
          {isAuth ? (
            renderPage()
          ) : (
            <AppShell route={route} themeSwitch={themeSwitch} navigate={navigate} showAlert={showAlert}>
              {renderPage()}
            </AppShell>
          )}
        </div>
      </AntApp>
    </ConfigProvider>
  );
}
