// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";          // ✅ use App here instead of Game
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
