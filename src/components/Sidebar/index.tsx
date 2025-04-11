import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import AnalysisModal from "./AnalysisModal";

const { Sider } = Layout;

const Sidebar = ({ threadIds, initiateNewChat }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSubmit = (analysisName: string) => {
    initiateNewChat(analysisName);
  };

  return (
    <>
      <Sider width={300} className="sidebar">
        <div className="sidebar-header">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="new-chat-button"
          >
            New Chat
          </Button>
        </div>
        <Menu theme="dark" mode="inline" className="conversation-list">
          {(threadIds || []).map(({ threadId, analysisName }: any) => (
            <Menu.Item key={threadId}>
              <Link to={`/c/${threadId}`}>{analysisName}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <AnalysisModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Sidebar;
