import React from 'react';
import { Card } from 'antd';

interface ChatMessageProps {
  message: string;
  sender: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
        padding: '10px 0',
      }}
    >
      <Card
        style={{
          borderRadius: '15px',
          padding: '10px',
          maxWidth: '60%',
          backgroundColor: sender === 'user' ? '#10a37f' : '#40414F',
          color: '#d1d5db',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message}
      </Card>
    </div>
  );
};

export default ChatMessage;

