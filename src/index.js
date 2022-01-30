import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { ParticleProvider } from "./contexts/ParticleContext";
import { AuthorProvider } from "./contexts/AuthorContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { CatQueriesProvider } from "./contexts/CatQueriesContext";
import { ChatProvider } from "./contexts/ChatContext";
import { SearchProvider } from "./contexts/SearchContext";
import { OnlineUsersProvider } from "./contexts/OnlineUsersContext";

ReactDOM.render(
  <React.StrictMode>
    <ErrorProvider>
      <UserProvider>
        <ParticleProvider>
          <AuthorProvider>
            <CategoriesProvider>
              <CategoryProvider>
                <CatQueriesProvider>
                  <ChatProvider>
                    <SearchProvider>
                      <OnlineUsersProvider>
                        <BrowserRouter>
                          <App />
                        </BrowserRouter>
                      </OnlineUsersProvider>
                    </SearchProvider>
                  </ChatProvider>
                </CatQueriesProvider>
              </CategoryProvider>
            </CategoriesProvider>
          </AuthorProvider>
        </ParticleProvider>
      </UserProvider>
    </ErrorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
