import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div>
        {isChatOpen ? (
          <ChatWindow
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            className="chat-window-container"
          />
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
