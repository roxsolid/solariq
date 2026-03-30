import React from "react";
import ReactDOM from "react-dom/client";
import App from "./solariq-v6.5.jsx";
import Admin from "./admin.jsx";

const isAdmin = window.location.pathname.startsWith("/admin");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </React.StrictMode>
);
