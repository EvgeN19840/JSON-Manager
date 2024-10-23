// ** React
import { useState } from "react";

// ** Components
import { FormFooter } from "@/shared/formFooter";

// ** Utils
import { assignMissingIds } from "@/shared/utils";

// ** Types
import { ITypeJSON } from "@/const/types";

// ** MUI
import { Box, TextField, Typography } from "@mui/material";

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

      assignMissingIds(parsedData);
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
      <TextField
        multiline
        rows={20}
        sx={{ width: "100%" }}
        placeholder="Paste your JSON data here"
        onChange={handleInputChange}
        value={inputValue || ""}
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
