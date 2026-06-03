import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { InlineLoading } from '../common/InlineLoading';
import type { ChatMessage } from '../../data/mockData';

type ChatWindowPanelProps = {
  chatMessages: ChatMessage[];
  chatInput: string;
  loadingKey: string | null;
  setChatInput: (value: string) => void;
  sendChatMessage: () => void;
};

export function ChatWindowPanel({
  chatMessages,
  chatInput,
  loadingKey,
  setChatInput,
  sendChatMessage,
}: ChatWindowPanelProps) {
  return (
    <>
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
        <Button type="primary" icon={<SendOutlined />} disabled={loadingKey === 'chat'} onClick={sendChatMessage}>
          전송
        </Button>
      </div>
    </>
  );
}
