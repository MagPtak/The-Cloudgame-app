import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserDataProvider from "./contexts/UserDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserDataProvider>
    <App />
  </UserDataProvider>
);

reportWebVitals();
