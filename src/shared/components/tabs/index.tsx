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
      <Box sx={{ mb:'1rem' ,height: "100%", display: "flex", flexDirection: "column", flexGrow:1}}>
        <TabList
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="employee-benefit-tabs"
        >
          <Tab label="Employee" sx={{ mr: "1rem" }} value="1" />
          <Tab label="Benefit" sx={{ ml: "1rem" }} value="2" />
        </TabList>
      </Box>
    </TabContext>
  );
};
