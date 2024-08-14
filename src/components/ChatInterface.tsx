import React, { useEffect, useRef, useState } from "react";
import { Flex, Layout, Spin } from "antd";
import InputArea from "./InputArea";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Messages from "./Messages";
import loadingGif from "../assets/loading.gif";

const { Content, Footer } = Layout;
const streaming = true;
const ChatInterface: React.FC<any> = ({
  isFileSearch = false,
}: {
  isFileSearch: boolean;
}) => {
  const [messages, setMessages] = useState<any>([]);
  const [response, setResponse] = useState("");
  const [threadIds, setThreadIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { threadId: threadIdFromParams } = useParams();
  const navigate = useNavigate();

  function getThreadsList(navigateFirstChat = false) {
    axios
      .get("http://localhost:9000/thread/allThreads")
      .then((response) => {
        setThreadIds(response.data);

        if (navigateFirstChat) {
          const threadId = response.data?.[0]?.threadId;
          navigate(`/c/${threadId}`);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the thread data:", error);
      });
  }

  function getMessagesList(threadId: string) {
    axios
      .get(`http://localhost:9000/thread/${threadId}/messages`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error("There was an error fetching the thread data:", error);
      });
  }

  /*
    =======================
    === Utility Helpers ===
    =======================
  */

  // const appendMessage1 = (parsedData: any) => {
  //   setMessages((prevMessages: any) => [...prevMessages, parsedData]);
  // };

  const appendToLastMessage1 = (parsedData: any) => {
    setMessages((prevMessages: string | any[]) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const messageText = lastMessage.messageText?.includes("Loading...")
        ? parsedData.messageText
        : lastMessage.messageText + parsedData.messageText;

      const updatedLastMessage = {
        ...lastMessage,
        messageText,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  const handleSendMessage = async (message: string) => {
    const msg: any = [
      {
        messageText: message,
        msgId: "",
        role: "user",
        runId: null,
        thread_id: threadIdFromParams,
      },
      {
        messageText: `![Loading...](${loadingGif})`,
        msgId: "",
        role: "assistant",
        runId: null,
        thread_id: threadIdFromParams,
      },
    ];
    setMessages([...messages, ...msg]);
    setLoader(true);
    try {
      const fetchWithoutStream = async () => {
        const response = await axios.post("http://localhost:9000/message", {
          message,
          threadId: threadIdFromParams,
        });
        setMessages(response.data.messages);
      };

      const fetchStream = async () => {
        try {
          const response: any = await fetch("http://localhost:9000/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
              threadId: threadIdFromParams, // Replace with actual thread ID
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          const readStream = async () => {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const decodedValue = decoder.decode(value);
              const lines = decodedValue.split("\n").filter(Boolean);

              lines.forEach((line) => {
                if (line.startsWith("data: ")) {
                  const jsonData = line.substring(6);
                  try {
                    const parsedData = JSON.parse(jsonData);

                    if (parsedData?.role === "code") {
                      debugger;
                    }

                    if (parsedData?.role === "assistant") {
                      // appendMessage1(parsedData);
                    } else {
                      appendToLastMessage1(parsedData);
                    }
                  } catch (error) {
                    console.error("Error parsing line:", line);
                  }
                }
              });
            }
          };

          readStream().catch(console.error);
        } catch (error) {
          console.error("Error fetching stream:", error);
        }
      };

      if (streaming) {
        fetchStream();
      } else {
        fetchWithoutStream();
      }
    } catch (error) {
      console.error("Error communicating with server:", error);
      setResponse("Something went wrong");
    } finally {
      setInputDisabled(false);
      setLoader(false);
    }
  };

  /*
  =======================
  === Stream Handling End ===
  =======================
*/

  useEffect(() => {
    getThreadsList();
  }, []);

  useEffect(() => {
    if (threadIdFromParams) {
      getMessagesList(threadIdFromParams);
    }
  }, [threadIdFromParams]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1);
  }, [messages]);

  return (
    <>
      <Content
        style={{
          padding: 24,
          height: "calc(100% - 160px)",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            margin: isFileSearch ? "0px" : "0px 300px",
            maxWidth: 950,
          }}
        >
          <Messages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: "#FFF",
          padding: "0px 5px",
          margin:isFileSearch? "25px 50px 25px 50px" : "25px 280px 25px 280px",
        }}
      >
        <Flex justify="center" align="center" style={{ marginBottom: 5 }}>
          {loader && <Spin tip="Loading..." />}
        </Flex>
        <InputArea
          onSendMessage={handleSendMessage}
          setInputDisabled={setInputDisabled}
          inputDisabled={inputDisabled}
          scrollToBottom={scrollToBottom}
        />
        <Flex
          justify="center"
          align="center"
          style={{ marginTop: 5, color: "rgb(121 110 110)" }}
        >
          Assistant can make mistakes. Check important info.
        </Flex>
      </Footer>
    </>
  );
};

export default ChatInterface;
