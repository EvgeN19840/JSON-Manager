// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IDepositAccount } from "@/const/types";

export const DepositAccountTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const depositAccountData = dataForDialog as IDepositAccount;

  return (
    <Box>
      {depositAccountData ? (
        <Box sx={{ width: "100%", padding: 2, border: "1px solid #ccc" }}>
          <Typography>
            Order Number: {depositAccountData.orderNumber}
          </Typography>
          <Typography>Bank: {depositAccountData.bank}</Typography>
          <Typography>
            Account Name: {depositAccountData.accountName}
          </Typography>
          <Typography>
            Account Number: {depositAccountData.accountNumber}
          </Typography>
          <Typography>
            Currency Code: {depositAccountData.currencyCode}
          </Typography>
          <Typography>
            Account Type: {depositAccountData.accountType}
          </Typography>
          <Typography>
            Transit Number: {depositAccountData.transitNumber}
          </Typography>
          <Typography>
            Deposit Amount:{" "}
            {depositAccountData.depositAmount !== null
              ? depositAccountData.depositAmount
              : "N/A"}
          </Typography>
          <Typography>
            Description: {depositAccountData.description || "N/A"}
          </Typography>
          <Typography>
            Custom Bamboo Table Row ID:{" "}
            {depositAccountData.customBambooTalbeRowId}
          </Typography>
          <Typography>
            Is Percent Value: {depositAccountData.isPercentValue ? "Yes" : "No"}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
