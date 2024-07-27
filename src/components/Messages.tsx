import React from 'react'
import { Avatar, Divider, Flex, Typography } from 'antd';
import { UserOutlined, OpenAIOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';

const Messages = ({ messages }: any) => {
    return (
        <>
            {messages.map((msg: any, index: React.Key | null | undefined) => {
                return (
                    <>
                        <Flex justify="flex-start" gap="large">
                            <Avatar style={{ backgroundColor: msg?.role === "assistant" ? "#1677ff" : '#87d068' }} icon={msg?.role === "assistant" ? <OpenAIOutlined /> : <UserOutlined />} />
                            <Flex gap="middle" vertical>
                                <Typography.Title level={5}>
                                    {msg?.role ? `${msg.role.charAt(0).toUpperCase()}${msg.role.slice(1)}` : ''}
                                </Typography.Title>
                                <ChatMessage key={index} message={msg?.messageText} />
                            </Flex>
                        </Flex>
                        <Divider />
                    </>
                )
            })}
        </>
    )
}

export default Messages