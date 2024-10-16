import { CustomDialog } from "@/shared/components/customDialog";
import { EditForm } from "./components/editForm";
import { useModal } from "@/hooks/useModal";

export const EditDialog: React.FC= () => {
  const { isEditDialogOpen } = useModal();

  const renderContent = () => {
    return <EditForm  />;
  };

  return (
    <CustomDialog open={isEditDialogOpen}>
      {renderContent()}
    </CustomDialog>
  );
};
