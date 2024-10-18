import { FC } from "react";
import { TabsComponent } from "@/context/tabs/tabsComponent";
import { Grids, ImportExportButtons, ImportExportDialog } from "./components";

export const Home: FC = () => {
  return (
    <>
      <TabsComponent />
      <ImportExportButtons />
      <Grids />
      <ImportExportDialog />
    </>
  );
};
