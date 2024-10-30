// ** MUI Components
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useTabs } from "@/hooks/useTabs";
import { PersonalTab } from "./tabsDetails/personal";
import { BenefitsTab } from "./tabsDetails/benefits";
import { JobInfoTab } from "./tabsDetails/job";
import { DepositAccountTab } from "./tabsDetails/depositAccounts";

export const TabsDetails = () => {
  const { activeDetailTab, handleDetailTabChange } = useTabs();

  const renderTabContent = () => {
    switch (activeDetailTab) {
      case "1":
        return <PersonalTab />;
      case "2":
        return <BenefitsTab/>;
      case "3":
        return <JobInfoTab/>;
      case "4":
        return <DepositAccountTab/>;
      case "5":
        return "Custom income";
      case "6":
        return "Custom deductions";
      case "7":
        return "Bonus";
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
          <Tab label="Deposit Accounts" value="4" />
          <Tab label="Custom income" value="5" />
          <Tab label="Custom deductions" value="6" />
          <Tab label="Bonus" value="7" />
        </TabList>
      </TabContext>
      {renderTabContent()}
    </Box>
  );
};
