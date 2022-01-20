import { createContext, useState } from "react";

export const CatQueriesContext = createContext();

export const CatQueriesProvider = ({ children }) => {
  const [catQueries, setCatQueries] = useState({
    sort: "created_at",
    order: "desc",
    limit: 10,
    p: 1,
    category: "",
  });

  return (
    <CatQueriesContext.Provider value={{ catQueries, setCatQueries }}>
      {children}
    </CatQueriesContext.Provider>
  );
};
