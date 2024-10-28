// ** MUI Components
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useTabs } from "@/hooks/useTabs";
import { PersonalTab } from "./tabsDetails/personal";

export const TabsDetails = () => {
  const { activeDetailTab, handleDetailTabChange } = useTabs();

  const renderTabContent = () => {
    switch (activeDetailTab) {
      case "1":
        return <PersonalTab />;
      case "2":
        return "Benefits"
      case "3":
        return "Job"
     
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Employee Details
      </Typography>
      <TabContext value={activeDetailTab}>
        <TabList
          sx={{
            mb: "1rem",
            "& .MuiTabs-flexContainer": {
              gap: "1rem",
            },
          }}
          onChange={handleDetailTabChange}
          variant="fullWidth"
          aria-label="details-tabs"
        >
          <Tab label="Personal" value="1" />
          <Tab label="Benefits" value="2" />
          <Tab label="Job" value="3" />
        </TabList>
      </TabContext>
      {renderTabContent()}
    </Box>
  );
};
