import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import "./AppLayout.css";

const { Header, Content } = Layout;

const AppLayout: React.FC<any> = ({ children }: any) => {
  const [threadIds, setThreadIds] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/thread/allThreads`)
      .then((response) => {
        setThreadIds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
      });
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="app-title">Technical Analysis</div>
        </Header>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
