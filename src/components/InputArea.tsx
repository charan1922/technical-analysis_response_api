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
          placeholder="Message Assistant..."
          style={{ flex: 1, marginRight: "10px", height: 45 }}
          // prefix={
          //   <Upload
          //     fileList={fileList}
          //     onChange={handleUploadChange}
          //     beforeUpload={() => false}
          //     showUploadList={false}
          //   >
          //     <Button icon={<CloudUploadOutlined />} type="link" size="large" />
          //     <Space />
          //   </Upload>
          // }
        />
        <Button
          style={{ height: 45, width: 60 }}
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={inputDisabled}
        />
      </div>
    </>
  );
};

export default InputArea;
