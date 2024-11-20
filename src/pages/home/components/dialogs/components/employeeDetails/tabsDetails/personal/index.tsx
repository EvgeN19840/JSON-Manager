// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IEmployee } from "@/const/types";

// ** Utils
import { currentData } from "./utils";

export const PersonalTab: React.FC = () => {
  const { dataForDialog, handleClickOpenDialog } = useModal() as {
    dataForDialog: IEmployee | null;
    handleClickOpenDialog: (
      dialogName: string,
      data?: IEmployee | null
    ) => void;
  };
  const { setTypeModalDetailsEdit } = useModal();
  if (!dataForDialog) {
    return <Typography>No Employee Data Available</Typography>;
  }

  const handleDoubleClick = () => {
    handleClickOpenDialog("Edit Details", dataForDialog);
    setTypeModalDetailsEdit("Edit Personal");
  };

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
        cursor: "pointer",
      }}
    >
      {currentData(dataForDialog).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",

          }}
        >
          <Typography>{item.title}:</Typography>
          <Typography>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};
