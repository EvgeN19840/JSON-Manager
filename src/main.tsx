import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { theme } from "./customTheme";
import { ThemeProvider } from "@mui/material";
import { NotificationProvider } from "./context/snackBar/provider";

import { DataStateProvider } from "./context/dataState/provider";
import { ModalProvider } from "./context/modal/provider";
import { TabsProvider } from "./context/tabs/provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataStateProvider>
        <NotificationProvider>
          <ModalProvider>
            <TabsProvider>
              <App />
            </TabsProvider>
          </ModalProvider>
        </NotificationProvider>
      </DataStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
