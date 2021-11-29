import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { ErrorProvider } from "./contexts/ErrorContext";

ReactDOM.render(
  <React.StrictMode>
    <ErrorProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
