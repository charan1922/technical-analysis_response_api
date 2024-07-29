import { Layout, Menu, MenuProps } from "antd";
import {
  MessageOutlined,
  SettingOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
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
    if (e.key === "newAnalysis") {
      setIsModalVisible(true);
    }
    setCurrent(e.key);
  };

  const handleSubmit = (analysisName: string) => {
    initiateNewChat(analysisName);
  };

  const items: MenuItem[] = [
    {
      label: "New Analysis",
      key: "newAnalysis",
      icon: <PlusOutlined />,
    },
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

      // <Menu.Item key={threadId} icon={<MessageOutlined />}>
      //   <Link to={`/c/${threadId}`}>{analysisName || "New Analysis"}</Link>
      // </Menu.Item>
    ),
  ];

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
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
    </Sider>
  );
};

export default Sidebar;
