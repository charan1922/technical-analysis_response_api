import React from "react";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import "./AppLayout.css";

const { Header, Content } = Layout;

const AppLayout: React.FC<any> = ({ children }: any) => {
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
