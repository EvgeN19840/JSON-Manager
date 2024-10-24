// ** React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App";

// ** MUI
import { ThemeProvider } from "@mui/material";

// ** Context
import { theme } from "./customTheme";
import { NotificationProvider } from "./context/snackBar/provider";
import { DataStateProvider } from "./context/dataState/provider";
import { ModalProvider } from "./context/modal/provider";
import { TabsProvider } from "./context/tabs/provider";

// Styles
import "./index.css";

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
