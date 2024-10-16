import { ReactNode, useState } from "react";

import { ModalContext } from "../modalContext";
import { IDialog } from "@/pages/home/components/importExportButtons/types";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [source, setSource] = useState<IDialog>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  
  return (
    <ModalContext.Provider
      value={{
        source,
        setSource,
        isDialogOpen,
        setDialogOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
