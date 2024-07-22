import { Layout, Menu } from 'antd';
import { MessageOutlined, SettingOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface ISidebar {
    collapsed: boolean;
    onCollapse: React.Dispatch<React.SetStateAction<boolean>>;
    threadIds: any;
    initiateNewChat: any
}

const Sidebar = ({ collapsed, onCollapse, threadIds, initiateNewChat }: ISidebar) => {
    const location = useLocation();
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                <Menu.Item key="new-chat" icon={<PlusOutlined />} onClick={initiateNewChat}>
                    New Chat
                </Menu.Item>

                {(threadIds || []).map(({ threadId }: { threadId: string }) => (
                    <Menu.Item key={threadId} icon={<MessageOutlined />}>
                        <Link to={`/c/${threadId}`}>{threadId}</Link>
                    </Menu.Item>
                ))}

                <Menu.Divider />
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;