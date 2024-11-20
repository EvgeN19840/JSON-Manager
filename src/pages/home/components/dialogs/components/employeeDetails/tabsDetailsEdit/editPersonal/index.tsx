// ** MUI
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
import { IEmployeeBasicInfo } from "@/const/types";

// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { useDefaultValues } from "./components/defaultValues";

export const EditPersonalTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBasicInfo | null;
  };

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const defaultValues = useDefaultValues();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IEmployeeBasicInfo>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: IEmployeeBasicInfo) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IEmployeeBasicInfo,
      "personal"
    );
    const updatedEmployees = data.employees.map((employee) =>
      employee.eId === eIdSetectedEmploee
        ? { ...employee, ...formData }
        : employee
    );

    const updatedEmployee = updatedEmployees.find(
      (employee) => employee.eId === eIdSetectedEmploee
    );
    handleClickOpenDialog("Details", updatedEmployee);


  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(defaultValues).map((key) => (
        <Box key={key}>
          <FormInput
            name={key as keyof IEmployeeBasicInfo}
            label={key.replace(/([A-Z])/g, " $1")}
            control={control}
            errorMessage={errors[key as keyof IEmployeeBasicInfo]?.message}
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
