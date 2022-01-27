import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [pattern, setPattern] = useState(null);

  return (
    <SearchContext.Provider value={{ pattern, setPattern }}>
      {children}
    </SearchContext.Provider>
  );
};
