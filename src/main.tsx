import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { theme } from "./customTheme";
import { ThemeProvider } from "@mui/material";
import { NotificationProvider } from "./context/snackBar/provider";
import { TabProvider } from "./context/tabs/provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <TabProvider>
          <App />
        </TabProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
