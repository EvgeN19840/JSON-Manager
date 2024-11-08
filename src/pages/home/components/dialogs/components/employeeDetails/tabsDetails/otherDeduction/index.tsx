// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IOtherDeduction } from "@/const/types";

export const OtherDeductionTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const otherDeductionData = dataForDialog?.otherDeductions as IOtherDeduction[];

  return (
    <Box>
      {otherDeductionData && otherDeductionData.length > 0 ? (
        otherDeductionData.map((deduction) => (
          <Box
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              marginBottom: 2,
            }}
          >
            <Typography>Name: {deduction.name}</Typography>
            <Typography>Value: {deduction.value}</Typography>
            <Typography>Currency Code: {deduction.currencyCode}</Typography>
            <Typography>Start Date: {deduction.startDate}</Typography>
            <Typography>End Date: {deduction.endDate}</Typography>
            <Typography>
              Payroll Operation Frequency: {deduction.payrollOperationFrequency}
            </Typography>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10rem",
            textAlign: "center",
          }}
        >
          <Typography>No deduction data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
