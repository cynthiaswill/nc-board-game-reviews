import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../contexts/ChatContext";
import ChatWindow from "./ChatWindow";
import useWindowDimensions from "../hooks/WindowDimentions";
import { UserContext } from "../contexts/UserContext";
import io from "socket.io-client";

const socket = io("https://nc-games-board.herokuapp.com/");

export default function Chat() {
  const { user, isLogged } = useContext(UserContext);
  const { isChatOpen, setIsChatOpen, roomName } = useContext(ChatContext);
  const location = useLocation();
  const { width } = useWindowDimensions();
  let username = isLogged ? user.username : "anonymous";

  const joinChat = () => {
    socket.emit("joinRoom", { username, roomName });
  };

  return (
    <>
      <div>
        {isChatOpen ? (
          <>
            <ChatWindow socket={socket} username={username} joinChat={joinChat} />
          </>
        ) : (
          <>
            <button
              className={
                width < 812 || location.pathname.slice(0, 8) !== "/reviews"
                  ? "chat-opener-narrow"
                  : "chat-opener"
              }
              onClick={() => {
                setIsChatOpen(true);
                joinChat();
              }}
            >
              <i className="far fa-comments" /> Live Chat
            </button>
          </>
        )}
      </div>
    </>
  );
}
