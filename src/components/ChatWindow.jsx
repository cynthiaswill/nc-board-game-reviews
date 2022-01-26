import "../styles/Chat.css";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChatContext } from "../contexts/ChatContext";
import { useLocation } from "react-router-dom";
import { CategoriesContext } from "../contexts/CategoriesContext";
import useWindowDimensions from "../hooks/WindowDimentions";
import { getHistory } from "../utils/api";
import ChatAuthorIcon from "./ChatAuthorIcon";
import io from "socket.io-client";

const socket = io("https://nc-games-board.herokuapp.com/");

export default function ChatWindow() {
  const { user, isLogged } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { isChatOpen, setIsChatOpen, roomName, setRoomName } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const location = useLocation();
  const { width } = useWindowDimensions();
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const username = user.username || "anonymous";
  const oneDay = 60 * 60 * 24 * 1000;
  const oneWeek = 7 * oneDay;
  const now = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    getHistory(roomName)
      .then(({ data }) => {
        setMessages([
          ...data.history,
          {
            welcome: true,
            username,
            roomName,
            messageBody: `👋 Hello ${username}, Welcome to chat room "${roomName}"!`,
          },
        ]);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [roomName, isChatOpen, user, username]);

  useEffect(() => {
    socket.emit("joinRoom", { username, roomName });
  }, [roomName, username]);

  useEffect(() => {
    socket.on("message", (data) => {
      let temp = messages;

      temp.push({
        username: data.username,
        messageBody: data.messageBody,
        dateCreated: new Date().toISOString(),
      });
      setMessages([...temp]);
    });

    scrollToBottom();
  }, [setMessages, messages]);

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
    maxHeight: "95vh",
    overflow: "hidden",
    borderRadius: "10px",
    border: "solid 1px",
    backgroundColor: "rgba(180, 180, 180, 0.65)",
    zIndex: 5000,
    position: "fixed",
    bottom: "5px",
  };

  const roomContainerStyleNarrow = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    maxHeight: "95vh",
    overflow: "hidden",
    borderRadius: "10px",
    border: "solid 1px",
    backgroundColor: "rgba(180, 180, 180, 0.65)",
    position: "fixed",
    zIndex: 5000,
    bottom: "5px",
    right: "10px",
  };

  return (
    <div
      style={
        width > 811 && location.pathname.slice(0, 8) === "/reviews"
          ? roomContainerStyle
          : roomContainerStyleNarrow
      }
    >
      <div className="chat">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
          <div className="usernameContainer">
            <div style={{ height: 25, overflow: "hidden" }}>
              <img
                src={
                  user.avatar_url || "http://cdn.onlinewebfonts.com/svg/img_181369.png"
                }
                alt={user.username}
                style={{ height: "20px", borderRadius: "5px" }}
              />
              <span className="roomTitle" style={{ fontSize: 14 }}>
                {user.username}{" "}
                <span style={{ fontSize: 13, color: "darkblue" }}>in {roomName}</span>
              </span>
            </div>

            <select
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              style={{ backgroundColor: "rgba(180,180,180,0.5)", borderRadius: 5 }}
              value={roomName}
            >
              <option key="Lobby" value="Lobby" default>
                Lobby
              </option>
              {categories.map((category) => {
                return (
                  <option
                    key={category.slug}
                    value={category.slug}
                  >{`${category.slug}`}</option>
                );
              })}
            </select>
          </div>
          <button
            onClick={() => {
              setIsChatOpen(false);
            }}
            style={{ backgroundColor: "rgba(128, 128, 128, 0.75)", marginTop: 2 }}
          >
            <i
              className="fas fa-angle-down"
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          </button>
        </div>
        <div className="chatMessage">
          {messages.map((msg) => {
            const timePassed = now.getTime() - new Date(msg.dateCreated).getTime();
            const timeStamp = msg.welcome
              ? null
              : timePassed < oneDay
              ? msg.dateCreated.toString().slice(11, 16)
              : timePassed < oneWeek
              ? weekdays[new Date(msg.dateCreated).getDay()]
              : new Date(msg.dateCreated).getDate() +
                " " +
                months[new Date(msg.dateCreated).getMonth()];

            if (msg.username === user.username) {
              return (
                <div key={msg._id} className="message">
                  <div className="messageInnerLeft">
                    <div
                      style={{
                        backgroundColor: "slategrey",
                        fontSize: 12,
                        borderRadius: 10,
                        padding: 5,
                        color: "white",
                        overflow: "hidden",
                      }}
                    >
                      {msg.messageBody}
                      &nbsp;&nbsp;&nbsp;
                      <span className="timestamp">
                        <div>{timeStamp}</div>
                      </span>
                    </div>
                  </div>
                  <div className="messageInnerLeft">
                    <img
                      src={
                        user.avatar_url ||
                        "http://cdn.onlinewebfonts.com/svg/img_181369.png"
                      }
                      alt=""
                      style={{
                        height: 15,
                        borderRadius: "50%",
                        visibility: msg.welcome ? "hidden" : "visible",
                      }}
                    />
                    <span
                      style={{
                        fontStyle: "italic",
                        color: "#4A403A",
                        fontSize: 10,
                        visibility: msg.welcome ? "hidden" : "visible",
                      }}
                    >
                      by {msg.username}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={msg._id} className="messageRight">
                  <div className="messageInnerRight">
                    <div
                      style={{
                        backgroundColor: "#C37B89",
                        fontSize: 12,
                        borderRadius: 10,
                        padding: 5,
                        color: "white",
                        overflow: "hidden",
                      }}
                    >
                      {msg.messageBody}
                      &nbsp;&nbsp;&nbsp;
                      <span className="timestamp">
                        <div>{timeStamp}</div>
                      </span>
                    </div>
                  </div>
                  <div className="messageInnerRight">
                    <span
                      style={{
                        fontStyle: "italic",
                        color: "#4A403A",
                        fontSize: 10,
                        visibility: msg.welcome ? "hidden" : "visible",
                      }}
                    >
                      by {msg.username}
                    </span>
                    {msg.welcome ? null : <ChatAuthorIcon msg={msg} />}
                  </div>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="sender">
          <input
            className="send"
            placeholder="enter your message..."
            value={messageBody}
            onChange={(e) => {
              isLogged
                ? setMessageBody(e.target.value)
                : setMessageBody("You have to log in first!");
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && isLogged) {
                sendData();
              }
            }}
          />
          <button
            onClick={() => {
              sendData();
            }}
            className="sendButton"
            disabled={!isLogged}
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
