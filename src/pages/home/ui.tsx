import { FC } from "react";
import { ImportExportDialog } from "./components/importExportDialog";
import { ImportExportButtons } from "@/pages/home/components/importExportButtons";
import { TabsComponent } from "@/context/tabs/tabsComponent";
import { Grids } from "@/shared/components/grids";

export const Home: FC = () => {
  return (
    <>
      <TabsComponent />
      <ImportExportButtons  />
      <Grids />
      <ImportExportDialog />
    </>
  );
};
