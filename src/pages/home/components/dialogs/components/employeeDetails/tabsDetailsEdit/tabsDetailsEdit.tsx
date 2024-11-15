import { Typography } from "@mui/material";

import { useModal } from "@/hooks/useModal";
import { EditDetailsBenefits } from "./editDetailsBenefits";
import { CustomDialog } from "@/shared/components/customDialog";

export const TabsDetailsEdit: React.FC = () => {
  const { typeModalDetailsEdit, isDialogOpen, closeDialog } = useModal();
  const renderTabContent = () => {
    switch (typeModalDetailsEdit) {
      case "Edit benefits details":
        return <EditDetailsBenefits />;
      case "Edit job":
        return "Edit job";
      case "Edit deposit accounts":
        return "Edit deposit accounts";
      case "Edit custom income":
        return "Edit custom income";
      case "Edit custom deductions":
        return "Edit custom deductions";
      case "Edit Bonus":
        return "Edit Bonus";
      default:
        return <Typography>Select a tab to view details.</Typography>;
    }
  };



  return (
    <CustomDialog onClose={closeDialog} open={isDialogOpen} maxWidth="sm">
      {renderTabContent()}
    </CustomDialog>
  );
};
