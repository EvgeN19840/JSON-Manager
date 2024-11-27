// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";

// ** Forms Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Schema
import { schema } from "./schema";

// ** Types
import { IEmployeeBenefit } from "@/const/types";
import { Box } from "@mui/material";
import { useDefaultEmployeeBenefit } from "@/hooks/useDefaultData";


export const EditDetailsBenefits = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
  };

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const defaultValues = useDefaultEmployeeBenefit();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IEmployeeBenefit>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: IEmployeeBenefit) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IEmployeeBenefit,
      "employeeBenefit"
    );
    const updatedEmployees = data.employees.map((employee) => {
      if (employee.eId === eIdSetectedEmploee) {
        const updatedBenefits = employee.benefits.map((benefit) =>
          benefit.id === formData.id ? { ...benefit, ...formData } : benefit
        );
        return { ...employee, benefits: updatedBenefits };
      }
      return employee;
    });

    const updatedEmployee = updatedEmployees.find(
      (employee) => employee.eId === eIdSetectedEmploee
    );
    handleClickOpenDialog("Details", updatedEmployee);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
    {Object.keys(defaultValues).map((key) => (
      <Box key={key} mb={2}>
        <FormInput
          name={key as keyof IEmployeeBenefit}
          label={key}
          control={control}
          type={
            typeof defaultValues[key as keyof IEmployeeBenefit] === "boolean"
              ? "checkbox"
              : "text"
          }
          errorMessage={errors[key as keyof IEmployeeBenefit]?.message}
        />
      </Box>
    ))}
    <FormFooter
      cancelButtonText="Cancel"
      actionButtonText="Save"
      showSecondButton={isDirty}
      buttonAction={handleSubmit(onSubmit)}
      source="employeeDetails"
    />
  </FormWrapper>
  );
};
