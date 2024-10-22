// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// ** Forms Imports
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Schema
import { schema } from "./schema";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Types
import { ISystemBenefit } from "@/const/types";
import { IFormBenefitsProps } from "./types";

export const EditBenefits = () => {
  const { dataForDialog, closeDialog } = useModal();
  const { handleSaveBenefit } = useDataStateContext();
  const defaultValues = {
    name: (dataForDialog as ISystemBenefit).name,
    id: (dataForDialog as ISystemBenefit).id,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBenefitsProps>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormBenefitsProps) => {
    console.log(111, data);
    handleSaveBenefit({
      ...(dataForDialog as ISystemBenefit),
      id: data.id,
      name: data.name,
    } as ISystemBenefit);
    closeDialog();
  };

  return (
    <Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth sx={{ pl: 0 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  {...register("name")}
                  label="Benefit name"
                  value={value}
                  onBlur={onBlur}
                  type={"text"}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ pl: 0 }}>
            <Controller
              name="id"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  {...register("id")}
                  label="ID"
                  value={value}
                  onBlur={onBlur}
                  type={"text"}
                  onChange={onChange}
                  error={Boolean(errors.id)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
            {errors.id && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.id.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={closeDialog}
              id={"cansel_Modal"}
            >
              Cancel
            </Button>
            <Button variant="contained" type={"submit"} id={"save_Modal"}>
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
