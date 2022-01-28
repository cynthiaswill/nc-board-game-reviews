import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [pattern, setPattern] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider value={{ pattern, setPattern, isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
};
