import React, { useEffect, useRef, useState } from "react";
import InputArea from "./InputArea";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Messages from "./Messages";
import loadingGif from "../assets/loading.gif";
import "./ChatInterface/ChatInterface.css";
import { API_BASE_URL } from "../shared/constants";

const ChatInterface: React.FC<any> = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { threadId: threadIdFromParams } = useParams();
  const navigate = useNavigate();

  function getThreadsList(navigateFirstChat = false) {
    axios
      .get(`${API_BASE_URL}/thread/allThreads`)
      .then((response) => {
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
    return axios
      .get(`${API_BASE_URL}/thread/${threadId}/messages`)
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
    scrollToBottom(); // Ensure scrolling after user sends a message

    try {
      const response = await axios.post(`${API_BASE_URL}/message`, {
        message,
        threadId: threadIdFromParams,
      });
      setMessages(response.data.messages);
      scrollToBottom(); // Ensure scrolling after assistant's response
      setInputDisabled(false);
    } catch (error) {
      console.error("Error communicating with server:", error);
    } finally {
      setInputDisabled(false);
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
      getMessagesList(threadIdFromParams).then(() => {
        scrollToBottom(); // Ensure scrolling after messages are loaded
      });
    }
  }, [threadIdFromParams]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Ensure scrolling happens after DOM updates
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages]);

  return (
    <div className="chat-interface">
      <div className="messages-container">
        <Messages messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <InputArea
          onSendMessage={handleSendMessage}
          setInputDisabled={setInputDisabled}
          inputDisabled={inputDisabled}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
