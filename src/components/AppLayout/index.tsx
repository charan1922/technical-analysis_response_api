import React, { useEffect, useRef, useState } from "react";
import { Avatar, Flex, Layout } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar";

const { Header } = Layout;
const AppLayout: React.FC<any> = ({ children }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [threadIds, setThreadIds] = useState([]);

  const { threadId: threadIdFromParams } = useParams();
  const navigate = useNavigate();

  const initiateNewChat = (analysisName: string) => {
    axios
      .get(`http://localhost:9000/thread/new?name=${analysisName}`)
      .then((response) => {
        const threadId = response.data.threadId;
        setThreadId(threadId);
        const navigateFirstChat = true;
        getThreadsList(navigateFirstChat);
      })
      .catch((error) => {
        console.error("There was an error fetching the thread data:", error);
      });
  };

  function getThreadsList(navigateFirstChat = false) {
    axios
      .get("http://localhost:9000/thread/allThreads")
      .then((response) => {
        setThreadIds(response.data);

        if (navigateFirstChat) {
          const threadId = response.data?.[0]?.threadId;
          navigate(`/c/${threadId}`);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the thread data:", error);
      });
  }

  function getMessagesList(threadId: string) {
    axios
      .get(`http://localhost:9000/thread/${threadId}/messages`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error("There was an error fetching the thread data:", error);
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

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        threadIds={threadIds}
        initiateNewChat={initiateNewChat}
      />
      <Layout style={{ backgroundColor: "#FFF" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <Flex
            align="center"
            style={{ color: "#FFF", fontSize: 20, fontWeight: 400 }}
          >
            Algorum Mystic
          </Flex>
          <Flex align="center">
            <Avatar
              style={{
                color: "#FFF",
              }}
              icon={<UserOutlined />}
            />
          </Flex>
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
