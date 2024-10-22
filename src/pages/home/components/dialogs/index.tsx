// ** Components
import { CustomDialog } from "@/shared/components/customDialog";
import { ExportDataComponent, ImportDataComponent, EditUserName,EditBenefits } from "./components";

// ** Hooks
import { useModal } from "@/hooks/useModal";

export const Dialogs: React.FC = () => {
  const { typeModal, isDialogOpen, closeDialog } = useModal();

  const renderContent = () => {
    switch (typeModal) {
      case "Export data":
        return <ExportDataComponent />;
      case "Import data":
        return <ImportDataComponent />;
      case 'Edit user':
        return <EditUserName />
      case 'Edit benefits':
        return <EditBenefits/>
    }
  };

  return <CustomDialog onClose={closeDialog} open={isDialogOpen} children={renderContent()} />;
};
