// ** React
import { ReactNode, useState } from "react";

// ** Context
import { ModalContext } from "../modalContext";

// ** Hooks
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Types
import { IDataForDialog, IModalType, IModalTypeDetailsEdits } from "../types";
import { IEmployee, IEmployeeBenefit, ISystemBenefit } from "@/const/types";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data } = useDataStateContext();
  const [typeModal, setTypeModal] = useState<IModalType>(null);
  const [typeModalDetailsEdit, setTypeModalDetailsEdit] =
    useState<IModalTypeDetailsEdits>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dataForDialog, setDataForDialog] = useState<
    IDataForDialog | string | null
  >(null);
  const handleClickOpenDialog = (
    typeModal: IModalType,
    item?: IDataForDialog | IEmployee | ISystemBenefit
  ) => {
    switch (typeModal) {
      case "Export data":
        setDataForDialog(JSON.stringify(data, null, 2));
        break;
      case "Import data":
        setDataForDialog(null);
        break;
      case "Edit user":
        setDataForDialog(item as IEmployee[]);
        break;
      case "Edit benefits":
        setDataForDialog(item as ISystemBenefit[]);
        break;
      case "Details":
        setDataForDialog(item as IEmployee[]);
        break;
      case "Edit Details":
        setDataForDialog(item as IEmployeeBenefit[]);
        setTypeModalDetailsEdit("Edit benefits details");

        break;
    }
    setDialogOpen(true);
    setTypeModal(typeModal);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    // ** Возможно, тут нужен будет UseEffect и логика для удаления таймера )))0))0)
    setTimeout(() => {
      setTypeModal(null);
      setDataForDialog(null);
    }, 500);
  };

  return (
    <ModalContext.Provider
      value={{
        typeModal,
        typeModalDetailsEdit,
        closeDialog,
        dataForDialog,
        setTypeModal,
        setTypeModalDetailsEdit,
        isDialogOpen,
        setDialogOpen,
        handleClickOpenDialog,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
