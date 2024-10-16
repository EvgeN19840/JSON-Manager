import { Box, Button, TextField, Typography } from "@mui/material";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { useTabs } from "@/hooks/useTabs";

export const EditForm: React.FC = () => {
  const {
    firstName,
    lastName,
    benefitName,
    benefitID,
    setFirstName,
    setLastName,
    setBenefitName,
    setBenefitID,
    handleSaveEmployee,
    handleSaveBenefit,
  } = useDataStateContext();

  const { setEditDialogOpen } = useModal();
  const { activeTab } = useTabs();

  const saveData = () => {
    if (activeTab === "1") {
      handleSaveEmployee();
    } else {
      handleSaveBenefit();
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
