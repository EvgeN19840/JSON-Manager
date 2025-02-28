// ** React
import { useState } from "react";

// ** Components
import { FormFooter } from "@/shared/formElements/formFooter";
import { InputField } from "@/shared/inputField";

// ** Utils
import { assignMissingIds } from "@/shared/utils";
import { findEmployeeByName } from "@/shared/utils/findEmployeeByName";

// ** Types
import {  ITypeJSON } from "@/const/types";

// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";
import { useDataStateContext } from "@/hooks/useDataStateContext";

const normalizeToJson = (input: string): string => {
  return input
    .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') 
    .replace(/'/g, '"') 
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');
};

const isValidJson = (input: string): boolean => {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};

export const ImportDataComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { showNotification } = useNotification();
  const { setData } = useDataStateContext();
  const { setDialogOpen } = useModal();
  const handleImport = () => {
    const normalizedInput = normalizeToJson(inputValue);

    if (!isValidJson(normalizedInput)) {
      showNotification("Invalid data format. Please correct and try again.", "error");
      return;
    }

    try {
      const parsedData = JSON.parse(normalizedInput) as ITypeJSON;
      assignMissingIds(parsedData, "benefits");
      setData({
        employees: parsedData.employees,
        benefits: parsedData.benefits,
      });
      setDialogOpen(false);
      setInputValue("");
    } catch (e) {
      console.log(e);
      showNotification(
        "Invalid JSON data. Please correct and try again.",
        "error"
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addBaseEmployee = (selectedName: string) => {
    try {
      const selectedEmp = findEmployeeByName(selectedName);
  
      setData((prev: ITypeJSON) => ({
        employees: prev.employees ? [...prev.employees, selectedEmp] : [selectedEmp],
        benefits: prev.benefits || [],
      }));
  
      setDialogOpen(false);
      setInputValue("");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };
  
  
  
  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Import Data
      </Typography>
      <Box sx={{ px: "1rem" }}>
      <InputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Paste your JSON data here"
        rows={20}
      />
      </Box>
      <Box sx={{ mt: 1 }}>
        <FormFooter
          cancelButtonText={"Close"}
          actionButtonText={"Import"}
          showSecondButton={!!inputValue}
          canAddBaseEmployee={true}
          buttonAction={handleImport}
          addBaseEmployee={addBaseEmployee}
          source={"general"}
        />
      </Box>
    </Box>
  );
};
