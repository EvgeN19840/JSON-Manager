import { useState } from "react";
import { ITypeJSON } from "@/const/types";
import { useSnackbar } from "@/context";
import { Box, Button,  TextField, Typography } from "@mui/material";



interface IImportDataComponentProps {
  setData: (value: ITypeJSON) => void;
  onClose: () => void;
}

export const ImportDataComponent: React.FC<IImportDataComponentProps> = ({
  setData,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      onClose();
      setInputValue("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      showSnackbar("Invalid JSON data. Please correct and try again.", 'error');
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
        <Button variant="contained" onClick={handleImport}>
          Import
        </Button>
      </Box>
    </Box>
  );
};
