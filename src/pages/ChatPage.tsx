import type { Dispatch, SetStateAction } from 'react';
import { Avatar, Button, Col, Divider, Input, Row, Space, Tabs } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { InlineLoading } from '../components/common/InlineLoading';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import { exampleQuestions, initialChatMessages, reportTabs, type ChatMessage } from '../data/mockData';

type ChatPageProps = {
  chatMessages: ChatMessage[];
  chatInput: string;
  loadingKey: string | null;
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setChatInput: (value: string) => void;
  sendChatMessage: () => void;
};

export function ChatPage({ chatMessages, chatInput, loadingKey, setChatMessages, setChatInput, sendChatMessage }: ChatPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="AI Chat"
        title="분석 리포트 기반 채팅"
        description="리포트 요약, 예시 질문, 사용자 메시지와 임시 AI 응답 흐름을 확인합니다."
        actions={<Button icon={<ReloadOutlined />} onClick={() => setChatMessages(initialChatMessages)}>대화 초기화</Button>}
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={9}>
          <SectionCard title="리포트 컨텍스트">
            <div className="context-card">
              <Avatar size={56} src="/assets/humour-app-icon.png" />
              <div>
                <strong>김서연 · Frontend Engineer</strong>
                <span>분석 리포트 #HR-2408</span>
              </div>
            </div>
            <Tabs
              items={reportTabs.map((tab) => ({
                key: tab.key,
                label: tab.label,
                children: (
                  <div className="report-panel">
                    <strong>{tab.title}</strong>
                    <p>{tab.content}</p>
                  </div>
                ),
              }))}
            />
            <Divider />
            <Space wrap>
              {exampleQuestions.map((question) => (
                <Button key={question} size="small" onClick={() => setChatInput(question)}>
                  {question}
                </Button>
              ))}
            </Space>
          </SectionCard>
        </Col>
        <Col xs={24} xl={15}>
          <SectionCard title="채팅">
            <div className="chat-window">
              {chatMessages.map((message, index) => (
                <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
                  <span>{message.role === 'assistant' ? 'HumouR AI' : '채용 담당자'}</span>
                  <p>{message.text}</p>
                </div>
              ))}
              {loadingKey === 'chat' && (
                <div className="chat-bubble assistant">
                  <span>HumouR AI</span>
                  <InlineLoading label="답변 생성 중" />
                </div>
              )}
            </div>
            <div className="chat-input-row">
              <Input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onPressEnter={sendChatMessage}
                placeholder="리포트에 대해 질문하기"
              />
              <Button type="primary" icon={<SendOutlined />} onClick={sendChatMessage}>
                전송
              </Button>
            </div>
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
