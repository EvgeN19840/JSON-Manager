// ** MUI
import { FormFooter, FormWrapper } from "@/shared/formElements";
import { InputField } from "@/shared/inputField";
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { useForm } from "react-hook-form";

export const DuplicateEmployee = () => {
  const { closeDialog } = useModal() as { closeDialog: () => void };
  const { eIdSelectedEmployee, countDuplicates, data, setCountDuplicates } =
    useDataStateContext();
  const handleAddItem = useHandleAddItem();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    handleAddItem({
      type: "employees",
      item: data.employees[0],
      eId: eIdSelectedEmployee!,
    });
    closeDialog();
    setCountDuplicates("1");
  };

  return (
    <Box>
      <FormWrapper title="Duplicate" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mx: 2,
          }}
        >
          <Typography variant="h6">Enter the number of duplicates:</Typography>
          <InputField
            label="Number of duplicates"
            placeholder="Enter count"
            value={countDuplicates}
            onChange={(event) => setCountDuplicates(event.target.value)}
            sx={{ width: "150px" }}
          />
        </Box>
      </FormWrapper>
      <Box
        sx={{
          mx: 2,
        }}
      >
        <FormFooter
          cancelButtonText="Cancel"
          actionButtonText="Duplicate"
          showSecondButton={true}
          buttonAction={handleSubmit(onSubmit)}
          source="duplicate"
        />
      </Box>
    </Box>
  );
};
