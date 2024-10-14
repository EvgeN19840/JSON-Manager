import { ReactNode, useState } from "react";
import { TabContext } from "../tabContext";
import { ITabs } from "../types";

export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [source, setSource] = useState<ITabs | null>(null);
  const handleClickOpenFromGrid = (actionType: ITabs) => {

    setSource(actionType);

    setOpenDialog(true);
  };

  const hasData = false;

  return (
    <TabContext.Provider
      value={{
        handleClickOpenFromGrid,
        openDialog,
        setOpenDialog,
        source,
        hasData,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
