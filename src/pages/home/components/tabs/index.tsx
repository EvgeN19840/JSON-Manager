// ** MUI Components
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

// ** Hooks
import { useTabs } from "@/hooks/useTabs";

export const TabsComponent = () => {
  const { activeTab, handleTabChange } = useTabs();

  return (
    <TabContext value={activeTab}>
      <TabList
        sx={{
          mb: "1rem",
          "& .MuiTabs-flexContainer": {
            gap: '1rem'
          }
        }}
        onChange={handleTabChange}
        variant="fullWidth"
        aria-label="employee-benefit-tabs"
      >
        <Tab label="Employees" value="1" />
        <Tab label="Benefits" value="2" />
        <Tab label="Templates Employees" value="3" />
      </TabList>
    </TabContext>
  );
};
