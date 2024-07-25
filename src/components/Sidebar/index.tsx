import { Layout, Menu } from 'antd';
import { MessageOutlined, SettingOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnalysisModal from './AnalysisModal';

const { Sider } = Layout;

interface ISidebar {
    collapsed: boolean;
    onCollapse: React.Dispatch<React.SetStateAction<boolean>>;
    threadIds: any;
    initiateNewChat: any
}

const Sidebar = ({ collapsed, onCollapse, threadIds, initiateNewChat }: ISidebar) => {
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleSubmit = (analysisName: string) => {
        initiateNewChat(analysisName);
    }

    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                <Menu.Item key="new-chat" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)
                }>
                    New Analysis
                </Menu.Item>

                {(threadIds || []).map(({ threadId, analysisName }: { threadId: string; analysisName: string; }) => (
                    <Menu.Item key={threadId} icon={<MessageOutlined />}>
                        <Link to={`/c/${threadId}`}>{analysisName || "New Analysis"}</Link>
                    </Menu.Item>
                ))}

                <Menu.Divider />
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
                <AnalysisModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} onSubmit={handleSubmit} />
            </Menu>
        </Sider>
    );
};

export default Sidebar;