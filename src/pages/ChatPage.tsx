import type { Dispatch, SetStateAction } from 'react';
import { Button, Col, Row } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ChatWindowPanel } from '../components/chat/ChatWindowPanel';
import { ReportContextPanel } from '../components/chat/ReportContextPanel';
import { PageTitle } from '../components/common/PageTitle';
import { SectionCard } from '../components/common/SectionCard';
import type { AnalysisReportData } from '../api/adapters';
import type { ChatMessage } from '../data/mockData';

type ChatPageProps = {
  report: AnalysisReportData;
  chatMessages: ChatMessage[];
  chatInput: string;
  loadingKey: string | null;
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setChatInput: (value: string) => void;
  sendChatMessage: () => void;
};

export function ChatPage({
  report,
  chatMessages,
  chatInput,
  loadingKey,
  setChatMessages,
  setChatInput,
  sendChatMessage,
}: ChatPageProps) {
  return (
    <>
      <PageTitle
        eyebrow="AI Chat"
        title="분석 리포트 기반 채팅"
        description="리포트 요약, 예시 질문, 사용자 메시지와 임시 AI 응답 흐름을 확인합니다."
        actions={
          <Button icon={<ReloadOutlined />} onClick={() => setChatMessages(report.chatMessages)}>
            대화 초기화
          </Button>
        }
      />
      <Row gutter={[22, 22]}>
        <Col xs={24} xl={9}>
          <SectionCard title="리포트 컨텍스트">
            <ReportContextPanel report={report} setChatInput={setChatInput} />
          </SectionCard>
        </Col>
        <Col xs={24} xl={15}>
          <SectionCard title="채팅">
            <ChatWindowPanel
              chatMessages={chatMessages}
              chatInput={chatInput}
              loadingKey={loadingKey}
              setChatInput={setChatInput}
              sendChatMessage={sendChatMessage}
            />
          </SectionCard>
        </Col>
      </Row>
    </>
  );
}
