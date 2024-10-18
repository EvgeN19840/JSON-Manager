import { Box, Button, TextField, Typography } from "@mui/material";
import { EditFormProps } from "../types";
import { useModal } from "@/hooks/useModal";
import { useTabs } from "@/hooks/useTabs";

export const EditForm: React.FC<EditFormProps> = ({
  employeeData,
  setEmployeeData,
  benefitData,
  setBenefitData,
  saveData,
}) => {
  const { setEditDialogOpen } = useModal();
  const { activeTab } = useTabs();

  const renderForm = () => {
    if (activeTab === "1" && employeeData) {
      return (
        <>
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
              value={employeeData.firstName || ""}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  firstName: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              label="Last Name"
              value={employeeData.lastName || ""}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, lastName: e.target.value })
              }
              fullWidth
            />
          </Box>
        </>
      );
    } else if (activeTab === "2" && benefitData) {
      return (
        <>
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
              value={benefitData.name || ""}
              onChange={(e) =>
                setBenefitData({ ...benefitData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Benefit ID"
              value={benefitData.id || ""}
              onChange={(e) =>
                setBenefitData({ ...benefitData, id: e.target.value })
              }
              fullWidth
            />
          </Box>
        </>
      );
    } else {
      return <Typography>No data to edit</Typography>;
    }
  };

  return (
    <Box>
      {renderForm()}
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
