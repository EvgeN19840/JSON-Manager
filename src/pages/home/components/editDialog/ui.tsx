
import { CustomDialog } from "@/shared/components/customDialog";
import { EditForm } from "./components/editForm";
import { EditDialogProps } from "./types";
import { useDataStateContext } from "@/hooks/useDataStateContext";


export const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  employee,

}) => {
  const { handleSave } = useDataStateContext();
  
  const renderContent = () => {
    return (
      <EditForm
        onClose={onClose}
        employee={employee}
        onSave={handleSave}
      />
    );
  };

  return (
    <CustomDialog open={open} onClose={onClose}>
      {renderContent()}
    </CustomDialog>
  );
};
