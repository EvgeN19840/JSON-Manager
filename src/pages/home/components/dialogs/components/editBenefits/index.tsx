// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { Box } from "@mui/material";

// ** Forms Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Schema
import { schema } from "./schema";

// ** Types
import { ISystemBenefit } from "@/const/types";
import { IFormBenefitsProps } from "./types";

export const EditBenefits = () => {
  const { dataForDialog, closeDialog } = useModal() as {
    dataForDialog: ISystemBenefit | null;
    closeDialog: () => void;
  };
  const { handleSaveBenefit } = useDataStateContext();
  const defaultValues: IFormBenefitsProps = {
    name: dataForDialog?.name ?? "",
    id: dataForDialog?.id ?? "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormBenefitsProps>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormBenefitsProps) => {
    handleSaveBenefit({ ...dataForDialog, ...data } as ISystemBenefit);
    closeDialog();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <FormWrapper title="Benefit" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues).map((key) => (
          <Box key={key} mb={2}>
            <FormInput
              name={key as keyof IFormBenefitsProps}
              label={key}
              control={control}
              type="text"
              errorMessage={errors[key as keyof IFormBenefitsProps]?.message}
              disabled={key === "id"}
            />
          </Box>
        ))}
      </FormWrapper>
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source="general"
      />
    </Box>
  );
};
