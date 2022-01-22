// export default function ChatWindow({ isChatOpen, setIsChatOpen }) {
//   return <>chat window</>;
// }
import "../styles/Chat.css";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { CategoryContext } from "../contexts/CategoryContext";
import io from "socket.io-client";
import { getHistory } from "../utils/api";
import useWindowDimensions from "../hooks/WindowDimentions";

const socket = io("localhost:8000");

export default function ChatWindow() {
  const { user, isLogged } = useContext(UserContext);
  const { category } = useContext(CategoryContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  const scrollRef = useRef();
  let username = user.username;
  let title = category.slug;
  if (category.slug === "All category") {
    title = "Lobby";
  } else {
    title = category.slug;
  }

  useEffect(() => {
    // getHistory(title)
    //   .then(({ data }) => {
    //     setMessages([...data.messages]);
    //   })
    //   .catch((err) => {
    //     console.dir(err);
    //   });
    if (isLogged) {
      socket.emit("joinRoom", { username, title });
    } else {
      let username = "anonymous";
      socket.emit("joinRoom", { username, title });
    }

    socket.on("message", (data) => {
      let temp = messages;

      temp.push({
        username: data.username,
        messageBody: data.messageBody,
        dateCreated: new Date(),
      });
      setMessages([...temp]);
    });
  }, [title, setMessages]);

  const sendData = () => {
    if (messageBody !== "") {
      socket.emit("chat", messageBody);
      setMessageBody("");
    }
  };

  const roomContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    overflow: "hidden",
    borderRadius: "10px",
    border: "solid 1px",
    backgroundColor: "rgba(180, 180, 180, 0.75)",
    zIndex: 5000,
    position: "fixed",
    bottom: "5px",
  };

  const roomContainerStyleNarrow = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    overflow: "hidden",
    borderRadius: "10px",
    border: "solid 1px",
    backgroundColor: "rgba(180, 180, 180, 0.75)",
    position: "fixed",
    zIndex: 5000,
    bottom: "5px",
    right: "10px",
  };

  const { width } = useWindowDimensions();

  return (
    <div style={width > 811 ? roomContainerStyle : roomContainerStyleNarrow}>
      <div className="chat">
        <div className="usernameContainer">
          <span className="roomTitle">
            {user.username}{" "}
            <span style={{ fontSize: 16, color: "#4A403A" }}>in {title}</span>
          </span>
        </div>
        <div
          ref={scrollRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollRef.current.scrollToEnd({ animated: true });
          }}
          className="chatMessage"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            if (msg.username === username) {
              return (
                <div key={msg._id} className="message">
                  <div className="messageInnerLeft">
                    <span
                      style={{
                        backgroundColor: "#99A799",
                        fontSize: 20,
                        borderRadius: 10,
                        padding: 10,
                        color: "white",
                        overflow: "hidden",
                      }}
                    >
                      {msg.messageBody}
                    </span>
                  </div>
                  <div className="messageInnerLeft">
                    <span style={{ fontStyle: "italic", color: "#4A403A" }}>
                      by {msg.username}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={msg._id} className="messageRight">
                  <div className="messageInnerRight">
                    <span
                      style={{
                        backgroundColor: "#C37B89",
                        fontSize: 20,
                        borderRadius: 10,
                        padding: 10,
                        color: "white",
                        overflow: "hidden",
                      }}
                    >
                      {msg.messageBody}{" "}
                    </span>
                  </div>
                  <div className="messageInnerRight">
                    <span style={{ fontStyle: "italic", color: "#4A403A" }}>
                      by {msg.username}
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="sender">
          <input
            className="send"
            placeholder="enter your message..."
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}
          />
          <button
            onClick={() => {
              sendData();
            }}
            className="sendButton"
          >
            <span
              style={{
                fontSize: 15,
                alignSelf: "center",
                color: "white",
                textShadow: "0 0 4px black, 0 0 5px black",
              }}
            >
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
