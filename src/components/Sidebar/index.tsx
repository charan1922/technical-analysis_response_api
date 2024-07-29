import { Button, Layout, Menu, MenuProps } from "antd";
import {
  MessageOutlined,
  SettingOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AnalysisModal from "./AnalysisModal";

const { Sider } = Layout;

interface ISidebar {
  collapsed: boolean;
  onCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  threadIds: any;
  initiateNewChat: any;
}

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = ({
  collapsed,
  onCollapse,
  threadIds,
  initiateNewChat,
}: ISidebar) => {
  const { threadId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState(threadId || "");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleSubmit = (analysisName: string) => {
    initiateNewChat(analysisName);
  };

  useEffect(() => {
    if (threadId) setCurrent(threadId);
  }, [threadId]);

  const items: MenuItem[] = [
    // {
    //   label: <span onClick={() => setIsModalVisible(true)}>New Analysis</span>,
    //   key: "newAnalysis",
    //   icon: <PlusOutlined />,
    // },
    ...(threadIds || []).map(
      ({
        threadId,
        analysisName,
      }: {
        threadId: string;
        analysisName: string;
      }) => ({
        label: <Link to={`/c/${threadId}`}>{analysisName}</Link>,
        key: threadId,
        icon: <MessageOutlined />,
      })
    ),
  ];

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <>
        <Button
          type="text"
          onClick={() => setIsModalVisible(true)}
          style={{ margin: 16, color: "#FFF", fontSize: 14 }}
        >
          <PlusOutlined />
          {collapsed ? "" : "New Analysis"}
        </Button>
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          items={items}
          selectedKeys={[current]}
        />

        <AnalysisModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onSubmit={handleSubmit}
        />
      </>
    </Sider>
  );
};

export default Sidebar;
