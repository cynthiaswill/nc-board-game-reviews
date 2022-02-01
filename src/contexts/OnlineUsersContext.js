import { useEffect, createContext, useState } from "react";
import { getOnlineUsers } from "../utils/api";

export const OnlineUsersContext = createContext();

export const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getOnlineUsers().then(({ data }) => {
      setOnlineUsers([...data.list.onlineUsers]);
    });
  }, []);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
