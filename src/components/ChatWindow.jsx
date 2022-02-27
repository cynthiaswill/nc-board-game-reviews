import "../styles/Chat.css";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChatContext } from "../contexts/ChatContext";
import { useLocation, Link } from "react-router-dom";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import useWindowDimensions from "../hooks/WindowDimentions";
import { getHistory, getUsers, getOnlineUsers, updateOnlineUsers } from "../utils/api";
import ChatAuthorIcon from "./ChatAuthorIcon";
import OnlineUsersStatus from "./OnlineUsersStatus";
import io from "socket.io-client";

const socket = io("https://nc-games-board.herokuapp.com/");

export default function ChatWindow() {
  const { user, isLogged } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { isChatOpen, setIsChatOpen, roomName, setRoomName } = useContext(ChatContext);
  const { onlineUsers, setOnlineUsers } = useContext(OnlineUsersContext);
  const [viewMode, setViewMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [users, setUsers] = useState([]);
  const [onlineToggle, setOnlineToggle] = useState(true);
  const [offlineToggle, setOfflineToggle] = useState(true);
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
    isChatOpen &&
      getHistory(roomName)
        .then(({ data }) => {
          setMessages([
            ...data.history,
            {
              dateCreated: new Date().toISOString(),
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
    !onlineUsers.includes(username) &&
      setOnlineUsers((current) => [...current, username]);
    updateOnlineUsers(onlineUsers);
  }, [roomName, username]);

  useEffect(() => {
    getOnlineUsers().then(({ data }) => {
      data.list.onlineUsers && setOnlineUsers([...data.list.onlineUsers]);
    });
  }, [viewMode, setOnlineUsers]);

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
  }, [setMessages, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, viewMode]);

  const sendData = () => {
    if (messageBody !== "") {
      socket.emit("chat", messageBody);
      setMessageBody("");
    }
  };

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => console.dir(err));
  }, []);

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
    animation: "slide-in 1s ease",
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
    animation: "slide-in 1s ease",
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="usernameContainer">
            <div
              style={{
                height: 25,
                overflow: "hidden",
              }}
            >
              <img
                src={
                  user.avatar_url || "https://cdn.onlinewebfonts.com/svg/img_181369.png"
                }
                alt={user.username}
                style={{ height: "20px", borderRadius: "5px" }}
              />
              <span className="roomTitle" style={{ fontSize: 14, flexGrow: 1 }}>
                {user.username}{" "}
                <span style={{ fontSize: 13, color: "darkblue" }}>in {roomName}</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <select
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
                style={{
                  backgroundColor: "rgba(180,180,180,0.5)",
                  borderRadius: 5,
                  flexGrow: 1,
                }}
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
              <button
                className="viewModeInChat"
                onClick={() => {
                  viewMode === "chat" ? setViewMode("users") : setViewMode("chat");
                }}
              >
                <i
                  className="far fa-comments"
                  style={
                    viewMode === "chat"
                      ? { color: "blue", fontWeight: "bold", fontSize: 14 }
                      : { fontSize: 10 }
                  }
                />{" "}
                /{" "}
                <i
                  className="fas fa-user-friends"
                  style={
                    viewMode === "users"
                      ? { color: "blue", fontWeight: "bold", fontSize: 14 }
                      : { fontSize: 10 }
                  }
                />
                {viewMode === "chat" && (
                  <span className="viewModeChatTooltip">switch to online users list</span>
                )}
                {viewMode === "users" && (
                  <span className="viewModeUsersTooltip">switch to chat room</span>
                )}
              </button>
            </div>
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
        {viewMode === "chat" ? (
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

              if (msg.username === user.username || msg.welcome) {
                return (
                  <div key={msg._id || msg.dateCreated} className="message">
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
                          "https://cdn.onlinewebfonts.com/svg/img_181369.png"
                        }
                        alt=""
                        style={{
                          height: 15,
                          borderRadius: "50%",
                          visibility: msg.welcome ? "hidden" : "visible",
                        }}
                      />
                      <Link to={`/users/${msg.username}`} className="name-link-in-chat">
                        <span
                          style={{
                            fontStyle: "italic",
                            color: "#4A403A",
                            fontSize: 10,
                            visibility: msg.welcome ? "hidden" : "visible",
                          }}
                        >
                          {msg.username}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={msg._id || msg.dateCreated} className="messageRight">
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
                      <Link to={`/users/${msg.username}`} className="name-link-in-chat">
                        <span
                          style={{
                            fontStyle: "italic",
                            color: "#4A403A",
                            fontSize: 10,
                            visibility: msg.welcome ? "hidden" : "visible",
                          }}
                        >
                          {msg.username}
                        </span>
                      </Link>
                      {msg.welcome ? null : <ChatAuthorIcon msg={msg} />}
                    </div>
                  </div>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="onlineStatus">
            <div ref={messagesEndRef} />
            <div className="friendList">
              <div className="friendListTitle">
                <div
                  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                  <i
                    className="fa fa-circle"
                    style={{ color: "limegreen", fontSize: 10 }}
                  />
                  &nbsp;
                  <div style={{ fontSize: 14, color: "blue" }}>
                    {" "}
                    {onlineUsers.length} online users:
                  </div>
                </div>
                <button
                  onClick={() => {
                    onlineToggle ? setOnlineToggle(false) : setOnlineToggle(true);
                  }}
                >
                  <i
                    className={onlineToggle ? "fas fa-angle-up" : "fas fa-angle-down"}
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      alignSelf: "flex-end",
                    }}
                  />
                </button>
              </div>
              {onlineToggle &&
                onlineUsers.map((name) => {
                  return (
                    <OnlineUsersStatus
                      key={name}
                      name={name}
                      onlineToggle={onlineToggle}
                    />
                  );
                })}
            </div>
            <div className="friendList">
              <div className="friendListTitle">
                <div
                  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                  <i className="fa fa-circle" style={{ color: "red", fontSize: 10 }} />
                  &nbsp;
                  <div style={{ fontSize: 14 }}>
                    {" "}
                    {onlineUsers.includes("anonymous")
                      ? users.length - onlineUsers.length + 1
                      : users.length - onlineUsers.length}{" "}
                    offline users:
                  </div>
                </div>
                <button
                  onClick={() => {
                    offlineToggle ? setOfflineToggle(false) : setOfflineToggle(true);
                  }}
                >
                  <i
                    className={offlineToggle ? "fas fa-angle-up" : "fas fa-angle-down"}
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      alignSelf: "flex-end",
                    }}
                  />
                </button>
              </div>
              {offlineToggle &&
                users.map((user) => {
                  const name = user.username;
                  return !onlineUsers.includes(name) ? (
                    <OnlineUsersStatus
                      key={name}
                      name={name}
                      offlineToggle={offlineToggle}
                    />
                  ) : null;
                })}
            </div>
          </div>
        )}

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
