// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IDepositAccounts } from "@/const/types";

export const DepositAccountTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const depositAccountData =
    dataForDialog?.depositAccounts as IDepositAccounts[];

  return (
    <Box>
      {depositAccountData && depositAccountData.length > 0 ? (
        depositAccountData.map((accountData) => (
          <Box
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              marginBottom: 2,
            }}
          >
            <Typography>Order Number: {accountData.orderNumber}</Typography>
            <Typography>Bank: {accountData.bank}</Typography>
            <Typography>Account Name: {accountData.accountName}</Typography>
            <Typography>Account Number: {accountData.accountNumber}</Typography>
            <Typography>Currency Code: {accountData.currencyCode}</Typography>
            <Typography>Account Type: {accountData.accountType}</Typography>
            <Typography>Transit Number: {accountData.transitNumber}</Typography>
            <Typography>
              Deposit Amount:{" "}
              {accountData.depositAmount !== null
                ? accountData.depositAmount
                : "N/A"}
            </Typography>
            <Typography>
              Description: {accountData.description || "N/A"}
            </Typography>
            <Typography>
              Custom Bamboo Table Row ID: {accountData.customBambooTalbeRowId}
            </Typography>
            <Typography>
              Is Percent Value: {accountData.isPercentValue ? "Yes" : "No"}
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
          <Typography>No deposit accounts available.</Typography>
        </Box>
      )}
    </Box>
  );
};
