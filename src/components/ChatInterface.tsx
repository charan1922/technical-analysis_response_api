import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MessageOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import InputArea from './InputArea';

const { Header, Content, Footer, Sider } = Layout;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PlusOutlined />}>
            New Chat
          </Menu.Item>
          <Menu.Item key="2" icon={<MessageOutlined />}>
            Recent Chats
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>AI</Header>
        <Content>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} sender={msg.sender} />
          ))}
        </Content>
        <Footer>
          <InputArea onSendMessage={handleSendMessage} />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChatInterface;
