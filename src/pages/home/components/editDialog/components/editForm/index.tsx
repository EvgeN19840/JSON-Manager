import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

import { useDataStateContext } from "@/hooks/useDataStateContext";
import { EditFormProps } from "./types";
import { useModal } from "@/hooks/useModal";

export const EditForm: React.FC<EditFormProps> = ({ employee }) => {
  const [firstName, setFirstName] = useState(employee?.firstName || "");
  const [lastName, setLastName] = useState(employee?.lastName || "");
  const { handleSave } = useDataStateContext();
  const { setEditDialogOpen } = useModal();

  const saveEmployee = () => {
    if (employee) {
      handleSave({ ...employee, firstName, lastName });
      setEditDialogOpen(false);
    }
  };

  return (
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
        <Button onClick={saveEmployee} variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
