import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roomName, setRoomName] = useState("Lobby");

  return (
    <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, roomName, setRoomName }}>
      {children}
    </ChatContext.Provider>
  );
};
