// ** Components
import { CustomDialog } from "@/shared/components/customDialog";
import {
  ExportDataComponent,
  ImportDataComponent,
  EditUserName,
  EditBenefits,
  TabsDetails,
  TabsDetailsEdit,
} from "./components";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { DuplicateEmployee } from "./components/duplicateEmployee";

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
      case "Edit Details":
        return <TabsDetailsEdit />;
      case "Duplicate":
        return <DuplicateEmployee />;

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
