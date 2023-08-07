import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { UserProductContextProvier } from "./Context/UserProductContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserProductContextProvier>
        <App />
      </UserProductContextProvier>
    </AuthContextProvider>
  </React.StrictMode>
);
