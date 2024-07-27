import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  inputDisabled: any;
  setInputDisabled: any;
  scrollToBottom: any
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, inputDisabled, setInputDisabled, scrollToBottom }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
    setInputDisabled(true);
    scrollToBottom()
  };

  return (
    <div style={{ display: 'flex', margin: '24px 250px', }}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={handleSend}
        placeholder="Message Assistant..."
        style={{ flex: 1, marginRight: '10px', height: 45 }}
      />
      <Button style={{ height: 45 }} type="primary" icon={<SendOutlined />} onClick={handleSend} disabled={inputDisabled}>
        Send
      </Button>
    </div>
  );
};

export default InputArea;
