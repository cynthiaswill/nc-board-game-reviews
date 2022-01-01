import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ErrorProvider } from "./contexts/ErrorContext";

ReactDOM.render(
  <React.StrictMode>
    <ErrorProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ErrorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
