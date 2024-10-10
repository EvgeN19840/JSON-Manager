import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { EditFormProps } from "../../types";


export const EditForm: React.FC<EditFormProps> = ({
  onClose,
  employee,
  onSave,
}) => {
  const [firstName, setFirstName] = useState(employee?.firstName || "");
  const [lastName, setLastName] = useState(employee?.lastName || "");

  const handleSave = () => {
    if (employee) {
      onSave({ ...employee, firstName, lastName });
      onClose();
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center"}}>
        Edit Employee
      </Typography>
      <Box
        sx={{
          gap: 1,
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
        <Button onClick={onClose} variant="contained">
          close
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
