import { ReactNode, useState } from "react";

import { ModalContext } from "../modalContext";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { IDialog } from "@/pages/home/components/importExportButtons/types";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, setParsedData } = useDataStateContext();
  const [source, setSource] = useState<IDialog>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);



  const handleClickOpenFromGrid = (actionType: IDialog) => {
    if (actionType === "Export data" && data) {
      setParsedData(JSON.stringify(data, null, 2));
    }
    setDialogOpen(true);
    setSource(actionType);
  };
  
  return (
    <ModalContext.Provider
      value={{
        source,
        setSource,
        isDialogOpen,
        setDialogOpen,
        isEditDialogOpen,
        setEditDialogOpen,
        handleClickOpenFromGrid
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
