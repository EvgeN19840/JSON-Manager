import { FC } from "react";

import { ImportExportDialog } from "./components/importExportDialog";

import { ImportExportButtons } from "@/pages/home/components/importExportButtons";
import { IDialog } from "./components/importExportButtons/types";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { TabsComponent } from "@/context/tabs/tabsComponent";
import { useModal } from "@/hooks/useModal";
import { Grids } from "@/shared/components/grids";

export const Home: FC = () => {
  const { data, setParsedData } = useDataStateContext();
  const { setDialogOpen, setSource } = useModal();

  const handleClickOpenFromGrid = (actionType: IDialog) => {
    if (actionType === "Export data" && data) {
      setParsedData(JSON.stringify(data, null, 2));
    }
    setDialogOpen(true);
    setSource(actionType);
  };
  return (
    <>
      <TabsComponent />
      <ImportExportButtons handleClickOpenFromGrid={handleClickOpenFromGrid} />
      <Grids />
      <ImportExportDialog />
    </>
  );
};
