// ** React
import { FC } from "react";

// ** MUI
import { Box } from "@mui/material";

// ** Components
import {
  Dialogs,
  Grids,
  ImportExportButtons,
  TabsComponent,
} from "./components";

// ** Hooks
import { useTabs } from "@/hooks/useTabs";

export const Home: FC = () => {
  const { activeTab } = useTabs();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 72px)",
        overflow: "hidden",
        mt: 9,
      }}
    >
      <TabsComponent />
      {activeTab !== "2" && <ImportExportButtons />}
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Grids />
      </Box>
      <Dialogs />
    </Box>
  );
};
