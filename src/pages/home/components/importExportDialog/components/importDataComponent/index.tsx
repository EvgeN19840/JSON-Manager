import { useState } from "react";
import { ITypeJSON } from "@/const/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNotification } from "@/hooks/useNotification";

interface IImportDataComponentProps {
  setData: (value: ITypeJSON) => void;
  onClose: () => void;
}

export const ImportDataComponent: React.FC<IImportDataComponentProps> = ({
  setData,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { showNotification } = useNotification();

  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData({
        employees: parsedData.employees,
        benefits: parsedData.benefits,
      });

      onClose();
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>

        {inputValue ? (
          <Button variant="contained" onClick={handleImport}>
            Import
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};
