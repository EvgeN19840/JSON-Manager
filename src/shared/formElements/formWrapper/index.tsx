import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";
// ** Types
import { FormWrapperProps } from "./types";
import { IEmployee, ISystemBenefit } from "@/const/types";

export const FormWrapper = ({ onSubmit, children }: FormWrapperProps) => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployee | ISystemBenefit | null;
  };

  const title: string =
  dataForDialog && "eId" in dataForDialog
    ? `Edit: ${dataForDialog.firstName || ""} ${dataForDialog.lastName || ""}`
    : dataForDialog && "customBambooTalbeRowId" in dataForDialog
    ? ""
    : "Edit Benefit";

  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography align="center" variant="h6">
            {title}
          </Typography>
          {children}
        </Box>
      </form>
    </Box>
  );
};
