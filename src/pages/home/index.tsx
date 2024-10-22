// ** React
import { FC } from "react";

// ** Components
import {
  Dialogs,
  Grids,
  ImportExportButtons,
  TabsComponent,
} from "./components";
import { Box } from "@mui/material";

export const Home: FC = () => {
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <TabsComponent />
        <ImportExportButtons />
        <Grids />
        <Dialogs />
      </Box>
    </>
  );
};
