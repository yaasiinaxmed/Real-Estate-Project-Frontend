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

// redux
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { UserInfoProvider } from "./context/UserInfo.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserInfoProvider>
          <MantineProvider>
            <App />
          </MantineProvider>
        </UserInfoProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
