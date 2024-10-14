import { ReactNode, useState } from "react";
import { ITypeJSON } from "@/const/types";
import { DataStateContext } from "../dataStateContext";



export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<string | null>(null);

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        openDialog,
        setOpenDialog,
        parsedData,
        setParsedData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};
