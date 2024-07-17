import React from 'react';
import { Col, Row } from 'antd';
import Markdown from '../shared/CustomMarkdown';

interface ChatMessageProps {
  message: string;
  // sender: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <Row>
      <Col span={24}>
        <Markdown
        >
          {message}
        </Markdown>

      </Col>
    </Row>
  );
};

export default ChatMessage;

