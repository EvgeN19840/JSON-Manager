import { CustomDialog } from "@/shared/components/customDialog";
import { EditForm } from "./components/editForm";
import { EditDialogProps } from "./components/editForm/types";
import { useModal } from "@/hooks/useModal";

export const EditDialog: React.FC<EditDialogProps> = ({ employee }) => {
  const { isEditDialogOpen} = useModal();

  const renderContent = () => {
    return <EditForm employee={employee} />;
  };

  return (
    <CustomDialog open={isEditDialogOpen} >
      {renderContent()}
    </CustomDialog>
  );
};
