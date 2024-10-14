import { useState } from "react";

// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";


export const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", flexGrow:1}}>
        <TabList
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="employee-benefit-tabs"

        >
          <Tab label="Employee" value="1" />
          <Tab label="Benefit" value="2" />
        </TabList>

        {/* <TabPanel value="1">
          <div>Employee Content</div>
        </TabPanel>
        <TabPanel value="2">
          <div>Benefit Content</div>
        </TabPanel> */}
      </Box>
    </TabContext>
  );
};
