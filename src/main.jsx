import React from "react";
import ReactDOM from "react-dom/client";

// App.js
import App from "./App.jsx";

// css
import "./index.css";

// react-router-dom
import { BrowserRouter } from "react-router-dom";

// mantine ui
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
