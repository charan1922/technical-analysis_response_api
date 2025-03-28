import React from "react";
import { Avatar, Divider, Flex, Typography } from "antd";
import { UserOutlined, OpenAIOutlined } from "@ant-design/icons";
import ChatMessage from "./ChatMessage";

type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const UserMessage = ({ text, role }: { text: string; role: string }) => {
  return (
    <>
      <Flex justify="flex-start" gap="large">
        <div>
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
        </div>
        <Flex gap="middle" vertical>
          <Typography.Title level={5}>
            {`${role.charAt(0).toUpperCase()}${role.slice(1)}`}
          </Typography.Title>
          <ChatMessage message={text} />
        </Flex>
      </Flex>
    </>
  );
};

const AssistantMessage = ({ role, text }: { text: string; role: string }) => {
  return (
    <>
      <Flex justify="flex-start" gap="large">
        <div>
          <Avatar
            style={{
              backgroundColor: "#1677ff",
            }}
            icon={<OpenAIOutlined />}
          />
        </div>
        <Flex gap="middle" vertical>
          <Typography.Title level={5}>
            {`${role.charAt(0).toUpperCase()}${role.slice(1)}`}
          </Typography.Title>
          <ChatMessage message={text} />
        </Flex>
      </Flex>
    </>
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        padding: "10px 16px",
        counterReset: "line",
      }}
    >
      {text.split("\n").map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

const Message = ({ role, text }: MessageProps) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} role={role} />;
    case "assistant":
      return <AssistantMessage text={text} role={role} />;
    // case "code":
    //   return <CodeMessage text={text} />;
    default:
      return null;
  }
};

const Messages = ({ messages }: any) => {
  return (
    <>
      {(messages || []).map((msg: any, index: React.Key | null | undefined) => {
        return (
          <>
            <Message key={index} role={msg?.role} text={msg?.messageText} />{" "}
            {messages.length - 1 !== index && msg?.role === "assistant" && (
              <Divider />
            )}
          </>
        );
      })}
    </>
  );
};

export default Messages;
