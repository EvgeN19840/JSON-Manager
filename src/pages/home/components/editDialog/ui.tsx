
import { CustomDialog } from "@/shared/components/customDialog";
import { EditForm } from "./components/editForm";
import { EditDialogProps } from "./types";


export const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  employee,
  onSave,
}) => {
  
  const renderContent = () => {
    return (
      <EditForm
        onClose={onClose}
        employee={employee}
        onSave={onSave}
      />
    );
  };

  return (
    <CustomDialog open={open} onClose={onClose}>
      {renderContent()}
    </CustomDialog>
  );
};
