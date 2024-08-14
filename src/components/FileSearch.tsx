import React, { useEffect } from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Col, Divider, Flex, List, message, Row, Upload } from "antd";
import ChatInterface from "./ChatInterface";
import { Card } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  //   multiple: true,
  method: "POST",
  //   accept: "",
  action: async (file: any): Promise<any> => {
    const data = new FormData();
    debugger;
    // if (file.length < 0) return;
    data.append("file", file);

    let status = "";
    await fetch("http://localhost:9000/files", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        debugger;
        status = res.statusText;
      })
      .catch((err) => {
        debugger;
        status = err.response.message;
      });

    return status;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const handleFileUpload = async (event: any) => {
  const formData = new FormData();
  if (event.target.files.length < 0) return;
  formData.append("file", event.target.files[0]);

  axios
    .post("http://localhost:9000/files", formData)
    .then(() => toast.success("File Uploaded Successfully!"))
    .catch((err) => {
      toast.error(err?.response?.data?.error, {
        position: "top-right",
        autoClose: 5000,
      });
    });
};

const FileSearch: React.FC = () => {
  const [files, setFiles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  function getAllFiles() {
    setLoading(true);
    axios
      .get("http://localhost:9000/files")
      .then((response) => {
        const filesArray = response?.data?.filesArray || [];
        setFiles(filesArray);
      })
      .catch((err) => {
        console.log(err, "error in getting files");
      })
      .finally(() => setLoading(false));
  }

  const handleFileDelete = async (fileId: any) => {
    axios
      .delete("http://localhost:9000/files", { data: { fileId } })
      .then(() => {
        getAllFiles();
      })
      .catch((err) => {
        console.log(err, "error in deleting files");
      });
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <Row style={{ height: "100vh", alignItems: "stretch" }}>
      <Col
        span={8}
        style={{
          display: "flex",
          flexDirection: "column",
          // height: "100vh",
          // alignItems: "stretch",
        }}
      >
        <Card
          style={{
            flex: 1,
            margin: 10,
            overflow: "scroll",
          }}
        >
          {files.length === 0 && <div>Attach files to test file search</div>}

          <Flex vertical>
            <List
              size="small"
              bordered
              loading={loading}
              dataSource={files}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFileDelete(item?.file_id)}
                    >
                      <DeleteOutlined />
                    </span>,
                  ]}
                >
                  {item?.filename}
                  <span style={{ marginLeft: "15px" }}>
                    {/* {" - "} */}
                    {/* {item?.status} */}
                  </span>
                </List.Item>
              )}
            />
            <div style={{ marginTop: "350px" }}>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                multiple
                onChange={handleFileUpload}
              />
            </div>

            {/* <div style={{ marginTop: "350px" }}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Dragger>
          </div> */}
          </Flex>
        </Card>
      </Col>
      <Col span={16} style={{ height: "99vh", alignItems: "stretch" }}>
        <ChatInterface isFileSearch={true} />
      </Col>
    </Row>
  );
};

export default FileSearch;
