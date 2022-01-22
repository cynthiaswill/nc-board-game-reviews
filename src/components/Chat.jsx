import { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import ChatWindow from "./ChatWindow";

export default function Chat() {
  const { isChatOpen, setIsChatOpen } = useContext(ChatContext);

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
              className="chat-opener"
              onClick={() => {
                setIsChatOpen(true);
              }}
            >
              <i className="far fa-comments" /> Live Chat
            </button>
            <button
              className="chat-opener-narrow"
              onClick={() => {
                setIsChatOpen(true);
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
