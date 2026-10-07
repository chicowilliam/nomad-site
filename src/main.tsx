import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/dm-sans";
import "lenis/dist/lenis.css";
import "./styles/global.css";
import "./styles/evolution.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
