// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IJobInfo } from "@/const/types";
import { getDateFormat } from "@/shared/utils/getDateFormat";

export const JobInfoTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: { jobInfo?: IJobInfo[] } | null;
  };
  const jobInfoData = dataForDialog?.jobInfo?.[0] || null;

  return (
    <Box>
      {jobInfoData ? (
        <Box
          sx={{
            padding: 2,
            border: "1px solid #ccc",
            marginBottom: 2,
          }}
        >
          <Typography>
            Custom Bamboo Table Row ID: {jobInfoData.customBambooTalbeRowId}
          </Typography>
          <Typography>Effective Date: {getDateFormat(jobInfoData.effectiveDate)}</Typography>
          <Typography>Job Title: {jobInfoData.jobTitle}</Typography>
          <Typography>Department: {jobInfoData.department || "N/A"}</Typography>
          <Typography>Location: {jobInfoData.location || "N/A"}</Typography>
          <Typography>Division: {jobInfoData.division || "N/A"}</Typography>
          <Typography>Reports To: {jobInfoData.reportsTo || "N/A"}</Typography>
        </Box>
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
          <Typography>No job info data available.</Typography>
        </Box>
      )}
    </Box>
  );
};
