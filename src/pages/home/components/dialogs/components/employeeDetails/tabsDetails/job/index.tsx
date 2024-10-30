// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IJobInfo } from "@/const/types";

export const JobInfoTab: React.FC = () => {
  const { dataForDialog } = useModal();
  const jobInfoData = dataForDialog as IJobInfo;

  return (
    <Box>
      {jobInfoData ? (
        <Box sx={{ width: "100%", padding: 2, border: '1px solid #ccc' }}>
          <Typography>Custom Bamboo Table Row ID: {jobInfoData.customBambooTalbeRowId}</Typography>
          <Typography>Effective Date: {jobInfoData.effectiveDate}</Typography>
          <Typography>Job Title: {jobInfoData.jobTitle}</Typography>
          <Typography>Department: {jobInfoData.department || "N/A"}</Typography>
          <Typography>Location: {jobInfoData.location || "N/A"}</Typography>
          <Typography>Division: {jobInfoData.division || "N/A"}</Typography>
          <Typography>Reports To: {jobInfoData.reportsTo || "N/A"}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};
