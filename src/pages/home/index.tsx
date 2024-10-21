// ** React
import { FC } from "react";

// ** Components
import { Dialogs, Grids, ImportExportButtons, TabsComponent } from "./components";

export const Home: FC = () => {
  return (
    <>
      <TabsComponent />
      <ImportExportButtons />
      <Grids />
      <Dialogs />
    </>
  );
};
