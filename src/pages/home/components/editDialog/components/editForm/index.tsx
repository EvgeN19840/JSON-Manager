import { Box, Button, TextField, Typography } from "@mui/material";
import { EditFormProps } from "../types";
import { useModal } from "@/hooks/useModal";
import { useTabs } from "@/hooks/useTabs";
import { useForm } from "react-hook-form";

type IFormData = {
  firstName?: string;
  lastName?: string;
  name?: string;
  id?: string;
};

export const EditForm: React.FC<EditFormProps> = ({
  employeeData,
  setEmployeeData,
  benefitData,
  setBenefitData,
  saveData,
}) => {
  const { setEditDialogOpen } = useModal();
  const { activeTab } = useTabs();
  const { register, handleSubmit } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    console.log("data:", data);
    if (activeTab === "1" && employeeData) {
      setEmployeeData({
        ...employeeData,
        firstName: data.firstName || employeeData.firstName,
        lastName: data.lastName || employeeData.lastName,
      });
    }
    if (activeTab === "2" && benefitData) {
      setBenefitData({
        ...benefitData,
        name: data.name || benefitData.name,
        id: data.id || benefitData.id,
      });
    }
    saveData();
    setEditDialogOpen(false);
  };

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
              {...register("firstName")}
              fullWidth
            />
            <TextField label="Last Name" {...register("lastName")} fullWidth />
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
            <TextField label="Benefit Name" {...register("name")} fullWidth />
            <TextField label="Benefit ID" {...register("id")} fullWidth />
          </Box>
        </>
      );
    } else {
      return <Typography>No data to edit</Typography>;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
