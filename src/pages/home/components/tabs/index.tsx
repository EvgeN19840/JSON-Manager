import { useState } from "react";

// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

export const TabsComponent2 = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <TabList
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="employee-benefit-tabs"
          sx={{ mb: 2 }}
        >
          <Tab label="Employee" value="1" />
          <Tab label="Benefit" value="2" />
        </TabList>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <TabPanel value="1" sx={{ width: "100%" }}>
            <div>Employee Content</div>
          </TabPanel>
          <TabPanel value="2" sx={{ width: "100%" }}>
            <div>Benefit Content</div>
          </TabPanel>
        </Grid>
      </Box>
    </TabContext>
  );
};

