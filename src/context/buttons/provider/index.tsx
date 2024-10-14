import { ReactNode, useState } from "react";
import { ButtonContext } from "../buttonContext";
import { IButtons } from "../types";

export const ButtonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [source, setSource] = useState<IButtons | null>(null);
  const handleClickOpenFromGrid = (actionType: IButtons) => {

    setSource(actionType);

    setOpenDialog(true);
  };

  const hasData = false;

  return (
    <ButtonContext.Provider
      value={{
        handleClickOpenFromGrid,
        openDialog,
        setOpenDialog,
        source,
        hasData,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};
