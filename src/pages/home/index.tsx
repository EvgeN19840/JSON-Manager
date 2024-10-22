import { FC } from "react";
import { Box } from "@mui/material";

// ** Components
import {
  Dialogs,
  Grids,
  ImportExportButtons,
  TabsComponent,
} from "./components";

export const Home: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 72px)",
        overflow: "hidden", 
        mt:9
      }}
    >
      <TabsComponent />
      <ImportExportButtons />
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Grids />
      </Box>
      <Dialogs />
    </Box>
  );
};
