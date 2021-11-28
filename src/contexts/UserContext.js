import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const isLogged = !!user.username;

  return (
    <UserContext.Provider value={{ user, setUser, isLogged }}>
      {children}
    </UserContext.Provider>
  );
};
