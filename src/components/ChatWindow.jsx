// export default function ChatWindow({ isChatOpen, setIsChatOpen }) {
//   return <>chat window</>;
// }
import "../styles/Chat.css";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { CategoryContext } from "../contexts/CategoryContext";
import io from "socket.io-client";
import { getHistory } from "../utils/api";
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

  return (
    <div className="chatRoomContainer">
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
            placeholder="enter your message"
            value={messageBody}
            onChangeText={setMessageBody}
          />
          <button onPress={sendData} className="sendButton">
            <span style={{ fontSize: 20, alignSelf: "center", color: "white" }}>
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
