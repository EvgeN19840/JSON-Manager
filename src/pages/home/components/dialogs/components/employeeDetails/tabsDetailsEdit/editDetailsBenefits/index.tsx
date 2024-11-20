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
import { useDefaultValues } from "./components/defaultValues";

export const EditDetailsBenefits = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
  };

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const defaultValues = useDefaultValues();

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
      <FormInput
        name="name"
        label="Benefit Name"
        control={control}
        errorMessage={errors.name?.message}
        rules={{ required: true }}
        disabled
      />
      <FormInput
        name="value"
        label="Value"
        type="number"
        control={control}
        errorMessage={errors.value?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="currencyCode"
        label="Currency Code"
        control={control}
        errorMessage={errors.currencyCode?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="companyValue"
        label="Company Value"
        type="number"
        control={control}
        errorMessage={errors.companyValue?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="companyCurrencyCode"
        label="Company Currency Code"
        control={control}
        errorMessage={errors.companyCurrencyCode?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="isPerentValue"
        label="Is Percent Value"
        control={control}
        errorMessage={errors.isPerentValue?.message}
      />
      <FormInput
        name="effectiveDate"
        label="Effective Date"
        control={control}
        errorMessage={errors.effectiveDate?.message}
      />
      <FormInput
        name="id"
        label="ID"
        control={control}
        errorMessage={errors.id?.message}
        rules={{ required: true }}
        disabled
      />
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source={"employeeDetails"}
      />
    </FormWrapper>
  );
};
