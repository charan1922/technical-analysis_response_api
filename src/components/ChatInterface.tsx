import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Divider, Flex, Layout, Menu, Space, Spin, Typography } from 'antd';
import { MessageOutlined, SettingOutlined, PlusOutlined, UserOutlined, OpenAIOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import InputArea from './InputArea';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [response, setResponse] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null); // Added state for threadId
  const [threadIds, setThreadIds] = useState([]);
  const [loader, setLoader] = useState(false);

  const { threadId: threadIdFromParams } = useParams();
  const navigate = useNavigate();


  const initiateNewChat = (analysisName: string) => {
    axios.get(`http://localhost:9000/thread/new?name=${analysisName}`)
      .then(response => {
        const threadId = response.data.threadId
        setThreadId(threadId);
        const navigateFirstChat = true;
        getThreadsList(navigateFirstChat);
      })
      .catch(error => {

        console.error('There was an error fetching the thread data:', error);
      });
  }


  function getThreadsList(navigateFirstChat = false) {
    axios.get('http://localhost:9000/thread/allThreads')
      .then(response => {
        setThreadIds(response.data);

        if (navigateFirstChat) {
          const threadId = response.data?.[0]?.threadId
          navigate(`/c/${threadId}`);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the thread data:', error);
      });
  }

  function getMessagesList(threadId: string) {
    axios.get(`http://localhost:9000/thread/${threadId}/messages`)
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(error => {
        console.error('There was an error fetching the thread data:', error);
      });
  }

  useEffect(() => {
    getThreadsList();
  }, []);

  useEffect(() => {
    if (threadIdFromParams) {
      getMessagesList(threadIdFromParams);
    }
  }, [threadIdFromParams]);

  const handleSendMessage = async (message: string) => {

    const msg: any = {
      messageText: message,
      msgId: "",
      runId: null,
      thread_id: threadIdFromParams
    }

    setMessages([...messages, msg]);

    setLoader(true);
    try {
      const res = await axios.post('http://localhost:9000/message', { message, threadId: threadIdFromParams });
      setMessages(res.data.messages);
    } catch (error) {
      console.error('Error communicating with server:', error);
      setResponse('Something went wrong');
    } finally {
      setLoader(false);
    }
  };






  const previousScrollHeightRef = useRef(0);

  useEffect(() => {
    const contentElement = document.getElementById('content');
    if (contentElement && contentElement.scrollHeight !== previousScrollHeightRef.current) {
      contentElement.scrollTop = contentElement.scrollHeight;
      previousScrollHeightRef.current = contentElement.scrollHeight;
    }
  }, [messages]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} threadIds={threadIds} initiateNewChat={initiateNewChat} />
      <Layout style={{ backgroundColor: "#FFF" }}>
        <Header>AI</Header>
        <Content id="content"
          style={{
            margin: '24px 16px',
            padding: 24,
            height: "calc(100% - 24px)",
            overflowX: "auto"
          }}>
          {messages.map((msg: any, index: React.Key | null | undefined) => {
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
          <Flex justify='center' align='center' style={{ marginBottom: 5 }}>
            {loader && <Spin tip="Loading..." />}
          </Flex>
          <InputArea onSendMessage={handleSendMessage} />
        </Footer>
      </Layout>
    </Layout >
  );
};

export default ChatInterface;


