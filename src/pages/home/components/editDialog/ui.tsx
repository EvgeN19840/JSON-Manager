
import { CustomDialog } from "@/shared/components/customDialog";
import { EditForm } from "./components/editForm";
import { EditDialogProps } from "./components/editForm/types";


export const EditDialog: React.FC<EditDialogProps> = ({
  employee,
}) => {

  
  const renderContent = () => {
    return (
      <EditForm
        employee={employee}
 
      />
    );
  };

  return (
    <CustomDialog  >
      {renderContent()}
    </CustomDialog>
  );
};
