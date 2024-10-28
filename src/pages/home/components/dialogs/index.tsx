// ** Components
import { CustomDialog } from "@/shared/components/customDialog";
import {
  ExportDataComponent,
  ImportDataComponent,
  EditUserName,
  EditBenefits,
  TabsDetails,
} from "./components";

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
      case "Edit user":
        return <EditUserName />;
      case "Edit benefits":
        return <EditBenefits />;
      case "Details":
        return <TabsDetails />;
      case "Details benefit data":
        return "Details benefit data";
      default:
        return null;
    }
  };

  const maxWidth = typeModal === "Details" ? "xl" : "sm";

  return (
    <CustomDialog onClose={closeDialog} open={isDialogOpen} maxWidth={maxWidth}>
      {renderContent()}
    </CustomDialog>
  );
};
