import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Avatar, Button, Space, Tooltip } from 'antd';
import { CloseOutlined, MessageOutlined, MinusOutlined } from '@ant-design/icons';
import { ChatWindowPanel } from './ChatWindowPanel';
import type { AnalysisReportData } from '../../api/adapters';
import type { ChatMessage } from '../../data/mockData';

type FloatingChatAssistantProps = {
  report: AnalysisReportData;
  chatMessages: ChatMessage[];
  chatInput: string;
  loadingKey: string | null;
  setChatInput: (value: string) => void;
  sendChatMessage: () => void;
};

const floatingButtonSize = 54;
const floatingPanelMaxWidth = 400;
const floatingPanelMaxHeight = 560;
const floatingMargin = 12;

type FloatingPosition = {
  x: number;
  y: number;
};

function getOpenBounds() {
  return {
    width: Math.min(floatingPanelMaxWidth, window.innerWidth - 32),
    height: Math.min(floatingPanelMaxHeight, window.innerHeight - 32),
  };
}

function clampPosition(nextX: number, nextY: number, width: number, height: number) {
  const maxX = Math.max(floatingMargin, window.innerWidth - width - floatingMargin);
  const maxY = Math.max(floatingMargin, window.innerHeight - height - floatingMargin);

  return {
    x: Math.min(Math.max(nextX, floatingMargin), maxX),
    y: Math.min(Math.max(nextY, floatingMargin), maxY),
  };
}

function clampForState(nextPosition: FloatingPosition, nextIsOpen: boolean) {
  const bounds = nextIsOpen ? getOpenBounds() : { width: floatingButtonSize, height: floatingButtonSize };

  return clampPosition(nextPosition.x, nextPosition.y, bounds.width, bounds.height);
}

export function FloatingChatAssistant({
  report,
  chatMessages,
  chatInput,
  loadingKey,
  setChatInput,
  sendChatMessage,
}: FloatingChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 28, y: 28 });
  const dragStateRef = useRef({
    didDrag: false,
    height: 54,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    width: 54,
  });
  const quickQuestions = report.exampleQuestions.slice(0, 2);

  useEffect(() => {
    const syncPositionToViewport = () => setPosition((current) => clampForState(current, isOpen));

    window.addEventListener('resize', syncPositionToViewport);
    return () => window.removeEventListener('resize', syncPositionToViewport);
  }, [isOpen]);

  const beginDrag = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget.closest('.floating-chat') as HTMLElement | null;
    const bounds = target?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    dragStateRef.current = {
      didDrag: false,
      height: bounds.height,
      offsetX: event.clientX - bounds.right,
      offsetY: event.clientY - bounds.bottom,
      startX: event.clientX,
      startY: event.clientY,
      width: bounds.width,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const dragState = dragStateRef.current;
    const movedX = Math.abs(event.clientX - dragState.startX);
    const movedY = Math.abs(event.clientY - dragState.startY);

    if (movedX > 4 || movedY > 4) {
      dragState.didDrag = true;
    }

    const nextRight = window.innerWidth - event.clientX + dragState.offsetX;
    const nextBottom = window.innerHeight - event.clientY + dragState.offsetY;
    setPosition(clampPosition(nextRight, nextBottom, dragState.width, dragState.height));
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const toggleChat = () => {
    if (dragStateRef.current.didDrag) {
      dragStateRef.current.didDrag = false;
      return;
    }

    setIsOpen((current) => {
      const nextIsOpen = !current;
      setPosition((currentPosition) => clampForState(currentPosition, nextIsOpen));
      return nextIsOpen;
    });
  };

  return (
    <div className={`floating-chat ${isOpen ? 'open' : ''}`} style={{ right: position.x, bottom: position.y }}>
      {isOpen && (
        <section className="floating-chat-panel" aria-label="HumouR AI 채팅">
          <div
            className="floating-chat-header"
            onPointerDown={beginDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
          >
            <div className="floating-chat-title">
              <Avatar size={34} src="/assets/humour-app-icon.png" />
              <span>
                <strong>HumouR AI</strong>
                <small>
                  {report.applicantName} · {report.jobTitle}
                </small>
              </span>
            </div>
            <Button aria-label="채팅 닫기" type="text" icon={<MinusOutlined />} onClick={() => setIsOpen(false)} />
          </div>
          <Space className="floating-chat-prompts" wrap>
            {quickQuestions.map((question) => (
              <Button key={question} size="small" onClick={() => setChatInput(question)}>
                {question}
              </Button>
            ))}
          </Space>
          <ChatWindowPanel
            chatMessages={chatMessages}
            chatInput={chatInput}
            loadingKey={loadingKey}
            setChatInput={setChatInput}
            sendChatMessage={sendChatMessage}
          />
        </section>
      )}
      <Tooltip title={isOpen ? '채팅 닫기' : 'HumouR AI 열기'}>
        <Button
          aria-label={isOpen ? 'HumouR AI 채팅 닫기' : 'HumouR AI 채팅 열기'}
          className="floating-chat-button"
          shape="circle"
          type="primary"
          icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
          onClick={toggleChat}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
        />
      </Tooltip>
    </div>
  );
}
