import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Admin from "./admin.jsx";
import Installer from "./Installer.jsx";

const path = window.location.pathname;
const isAdmin = path.startsWith("/admin");
const isInstaller = path.startsWith("/installer") || path.startsWith("/portal");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : isInstaller ? <Installer /> : <App />}
  </React.StrictMode>
);
