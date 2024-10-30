// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IEmployeeBenefit } from "@/const/types";

export const BenefitsTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const benefitData = dataForDialog as IEmployeeBenefit;

  return (
    <Box>
      {benefitData ? (
        <Box sx={{ width: "100%", padding: 2, border: '1px solid #ccc' }}>
          <Typography>Name: {benefitData.name}</Typography>
          <Typography>Value: {benefitData.value}</Typography>
          <Typography>Currency Code: {benefitData.currencyCode}</Typography>
          <Typography>Company Value: {benefitData.companyValue}</Typography>
          <Typography>Company Currency Code: {benefitData.companyCurrencyCode}</Typography>
          <Typography>
            Is Percent Value: {benefitData.isPerentValue ? "Yes" : "No"}
          </Typography>
          <Typography>
            Effective Date: {benefitData.effectiveDate || "N/A"}
          </Typography>
          <Typography>ID: {benefitData.id}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};
