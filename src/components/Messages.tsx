import React, { useEffect, useRef } from "react";
import "./Messages/Messages.css";
import CustomMarkdown from "../shared/CustomMarkdown";

const Message = ({ role, text }: { role: string; text: string }) => {
  return (
    <div className={`message ${role}`}>
      <div className="message-bubble">
        {role === "assistant" ? <CustomMarkdown>{text}</CustomMarkdown> : text}
      </div>
    </div>
  );
};

const Messages = ({ messages }: { messages: any[] }) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages" ref={messagesContainerRef}>
      {messages.map((msg, index) => (
        <Message key={index} role={msg.role} text={msg.messageText} />
      ))}
    </div>
  );
};

export default Messages;
