import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { useTabs } from "@/hooks/useTabs";
import { SystemBenefit } from "@/const/types";

export const EditForm: React.FC = () => {
  const { selectedEmployee,  selectedBenefit, handleSaveEmployee, handleSaveBenefit } = useDataStateContext();
  const [firstName, setFirstName] = useState(selectedEmployee?.firstName || "");
  const [lastName, setLastName] = useState(selectedEmployee?.lastName || "");
  const [benefitName, setBenefitName] = useState(selectedBenefit?.name || "");
  const [benefitID, setBenefitID] = useState(selectedBenefit?.id || "");

  const { setEditDialogOpen } = useModal();
  const { activeTab } = useTabs();

  const saveData = () => {
    if (activeTab === "1") {
      if (selectedEmployee?.eId) {
        handleSaveEmployee({ ...selectedEmployee, firstName, lastName });
      } else {
        console.error("Employee ID (eId) is missing.");
      }
    } else {
      const updatedBenefit: SystemBenefit = {
        ...selectedBenefit,
        name: benefitName,
        id: benefitID,
      };
      handleSaveBenefit(updatedBenefit);
    }
    setEditDialogOpen(false);
  };

  return (
    <Box>
      {activeTab === "1" ? (
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Edit Employee
          </Typography>
          <Box
            sx={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Edit Benefit
          </Typography>
          <Box
            sx={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <TextField
              label="Benefit Name"
              value={benefitName}
              onChange={(e) => setBenefitName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Benefit ID"
              value={benefitID}
              onChange={(e) => setBenefitID(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Button onClick={() => setEditDialogOpen(false)} variant="outlined">
          Close
        </Button>
        <Button onClick={saveData} variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
