import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../contexts/ChatContext";
import ChatWindow from "./ChatWindow";
import useWindowDimensions from "../hooks/WindowDimentions";
// import { getOnlineUsers } from "../utils/api";
// import { OnlineUsersContext } from "../contexts/OnlineUsersContext";

export default function Chat() {
  const { isChatOpen, setIsChatOpen } = useContext(ChatContext);
  // const { setOnlineUsers } = useContext(OnlineUsersContext);
  const location = useLocation();
  const { width } = useWindowDimensions();

  // const getOnlineStatus = () => {
  //   getOnlineUsers().then(({ data }) => {
  //     setOnlineUsers([...data.list.onlineUsers]);
  //   });
  // };

  return (
    <>
      <div>
        {isChatOpen ? (
          <>
            <ChatWindow />
          </>
        ) : (
          <>
            <button
              className={
                width > 811 && location.pathname.slice(0, 8) === "/reviews"
                  ? "chat-opener"
                  : "chat-opener-narrow"
              }
              onClick={() => {
                setIsChatOpen(true);
                // getOnlineStatus();
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
