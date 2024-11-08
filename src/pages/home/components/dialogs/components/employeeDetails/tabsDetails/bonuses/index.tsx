// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IBonuses } from "@/const/types";

export const BonusesTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const bonusesData = dataForDialog?.bonuses as IBonuses[];

  return (
    <Box>
      {bonusesData && bonusesData.length > 0 ? (
        bonusesData.map((bonus) => (
          <Box
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              marginBottom: 2,
            }}
          >
            <Typography>Effective Date: {bonus.effectiveDate}</Typography>
            <Typography>Amount: {bonus.amount}</Typography>
            <Typography>Currency Code: {bonus.currencyCode}</Typography>
            <Typography>Reason: {bonus.reason}</Typography>
            <Typography>Comment: {bonus.comment}</Typography>
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
          <Typography>No bonus data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
