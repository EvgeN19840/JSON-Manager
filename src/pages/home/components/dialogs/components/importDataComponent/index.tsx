// ** React
import { useState } from "react";

// ** Components
import { FormFooter } from "@/shared/formElements/formFooter";
import { InputField } from "@/shared/inputField";

// ** Utils
import { assignMissingIds } from "@/shared/utils";

// ** Types
import { ITypeJSON } from "@/const/types";

// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";
import { useDataStateContext } from "@/hooks/useDataStateContext";

export const ImportDataComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { showNotification } = useNotification();
  const { setData } = useDataStateContext();
  const { setDialogOpen } = useModal();
  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
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

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Import Data
      </Typography>
      <InputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Paste your JSON data here"
        rows={20}
      />
      <FormFooter
        cancelButtonText={"Close"}
        actionButtonText={"Import"}
        showSecondButton={!!inputValue}
        buttonAction={handleImport}
      />
    </Box>
  );
};
