import React, { useState } from "react";
import { Input, Button, Upload, Space } from "antd";
import {
  CloudUploadOutlined,
  FileAddOutlined,
  FileOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  inputDisabled: boolean;
  setInputDisabled: (disabled: boolean) => void;
  scrollToBottom: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  onSendMessage,
  inputDisabled,
  setInputDisabled,
  scrollToBottom,
}) => {
  const [message, setMessage] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
    setInputDisabled(true);
    scrollToBottom();
  };

  const handleRemove = (file: any) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <>
      <div style={{ maxWidth: 500, marginBottom: 10 }}>
        <Upload
          fileList={fileList}
          onRemove={handleRemove}
          beforeUpload={() => false}
          showUploadList={{ showRemoveIcon: true }}
          listType="text"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Type your message..."
          style={{
            flex: 1,
            marginRight: "10px",
            height: 42,
            borderRadius: "20px",
            border: "1px solid #d1d1d1",
            padding: "0 15px",
            fontSize: "15px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          style={{
            height: 42,
            width: 50,
            borderRadius: "50%",
            backgroundColor: "#0078d4",
            border: "none",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <SendOutlined style={{ fontSize: "18px", color: "#fff" }} />
        </Button>
      </div>
    </>
  );
};

export default InputArea;
