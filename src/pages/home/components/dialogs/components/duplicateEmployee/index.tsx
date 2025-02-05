// ** MUI
import { FormWrapper } from "@/shared/formElements";
import { InputField } from "@/shared/inputField";
import { Box, Button, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleAddItem } from "@/hooks/useAddItem";

export const DuplicateEmployee = () => {
  const { closeDialog } = useModal() as { closeDialog: () => void };
  const { eIdSelectedEmployee, countDuplicates, data, setCountDuplicates } =
    useDataStateContext();
  const handleAddItem = useHandleAddItem();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountDuplicates(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddItem({
      type: "employees",
      item: data.employees[0],
      eId: eIdSelectedEmployee!,
    });
    closeDialog();
    setCountDuplicates('1')
  };

  return (
    <Box>
      <FormWrapper title="Duplicate" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Enter the number of duplicates:</Typography>
          <InputField
            value={countDuplicates}
            onChange={handleInputChange}
            placeholder="Enter number"
            sx={{ width: "100px", m: 2 }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Button type="submit" variant="contained">
            Duplicate
          </Button>
        </Box>
      </FormWrapper>
    </Box>
  );
};
