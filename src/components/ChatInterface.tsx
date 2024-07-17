import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Flex, Layout, Menu, Typography } from 'antd';
import { MessageOutlined, SettingOutlined, PlusOutlined, UserOutlined, OpenAIOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import InputArea from './InputArea';
import axios from 'axios';
import Sidebar from './Sidebar';

const { Header, Content, Footer, Sider } = Layout;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [response, setResponse] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null); // Added state for threadId

  // useEffect(() => {
  //   axios.get('http://localhost:9000/thread')
  //     .then(response => {
  //       setThreadId(response.data.threadId); // Assuming the API returns an object with an 'id' field
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the thread data:', error);
  //     });
  // }, []); 

  const handleSendMessage = async (message: string) => {
    try {
      const res = await axios.post('http://localhost:9000/message', { message, threadId });
      setMessages(res.data.messages);
    } catch (error) {
      console.error('Error communicating with server:', error);
      setResponse('Something went wrong');
    }
  };

  console.log(messages, ":messages")

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout style={{ backgroundColor: "#FFF" }}>
        <Header>AI</Header>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}>
          {messages.map((msg: any, index) => {
            return (
              <>
                <Flex justify="flex-start" gap="large">
                  <Avatar style={{ backgroundColor: msg.runId ? "#1677ff" : '#87d068' }} icon={msg.runId ? <OpenAIOutlined /> : <UserOutlined />} />
                  <Flex gap="middle" vertical>
                    <Typography.Title level={5}>
                      {msg.runId ? "Assistant" : "User"}
                    </Typography.Title>
                    <ChatMessage key={index} message={msg.messageText} />
                  </Flex>
                </Flex>
                <Divider />
              </>
            )
          })}
        </Content>
        <Footer style={{ backgroundColor: "#FFF" }}>
          <InputArea onSendMessage={handleSendMessage} />
        </Footer>
      </Layout>
    </Layout >
  );
};

export default ChatInterface;