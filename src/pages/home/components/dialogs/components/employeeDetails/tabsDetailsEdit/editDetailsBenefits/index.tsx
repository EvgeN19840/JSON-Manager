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

export const EditDetailsBenefits = () => {
  const { dataForDialog, closeDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null;
    closeDialog: () => void;
  };
  const { handleSaveData } = useDataStateContext();

  const defaultValues: IEmployeeBenefit = {
    name: dataForDialog?.name || '',
    value: dataForDialog?.value || 0,
    currencyCode: dataForDialog?.currencyCode || '',
    companyValue: dataForDialog?.companyValue || 0,
    companyCurrencyCode: dataForDialog?.companyCurrencyCode || '',
    isPerentValue: dataForDialog?.isPerentValue || false,
    effectiveDate: dataForDialog?.effectiveDate || "",
    id: dataForDialog?.id || '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IEmployeeBenefit>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IEmployeeBenefit) => {
    handleSaveData(
      {
        ...dataForDialog,
        ...data,
      } as IEmployeeBenefit,
      "employeeBenefit" 
    );
    closeDialog();
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="name"
        label="Benefit Name"
        control={control}
        errorMessage={errors.name?.message}
        rules={{ required: true }}
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
      />
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
      />
    </FormWrapper>
  );
};
