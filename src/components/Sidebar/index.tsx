import { useEffect, useState } from "react";
import { Button, Layout, Menu, message, Tooltip } from "antd";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import AnalysisModal from "./AnalysisModal";
import { API_BASE_URL } from "../../shared/constants";
const { Sider } = Layout;

const Sidebar = ({}: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [sessionIds, setSessionIds] = useState<
    { sessionId: string; analysisName: string }[]
  >([]);

  const getSessions = async () => {
    axios
      .get(`${API_BASE_URL}/session`)
      .then((response) => {
        setSessionIds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        message.error("Failed to fetch threads. Please try again later.");
      });
  };

  useEffect(() => {
    getSessions();
  }, []);

  const handleSubmit = () => {
    getSessions();
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/session/remove/${sessionId}`);
      message.success("Session deleted successfully");
      setSessionIds((prev) =>
        prev.filter((session) => session.sessionId !== sessionId)
      );
    } catch (error) {
      console.error("Error deleting session:", error);
      message.error("Failed to delete session. Please try again later.");
    }
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
          {(sessionIds || []).map(({ sessionId, analysisName }: any) => (
            <Menu.Item
              key={sessionId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginRight: "20px",
                }}
              >
                {analysisName}
              </span>
              <Tooltip title="Delete">
                <span
                  style={{ cursor: "pointer", color: "#d32f2f" }} // Updated color to a different red shade
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the Link
                    handleDeleteSession(sessionId);
                  }}
                >
                  <DeleteOutlined />
                </span>
              </Tooltip>
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
