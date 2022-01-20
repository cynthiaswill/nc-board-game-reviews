import { createContext, useState } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [author, setAuthor] = useState("");

  return (
    <AuthorContext.Provider value={{ author, setAuthor }}>
      {children}
    </AuthorContext.Provider>
  );
};
