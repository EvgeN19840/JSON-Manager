import { Box, Button, TextField, Typography, Snackbar } from "@mui/material";
import { useState } from "react";
import { ITypeJSON } from "../../../const/types";
import { CloseButton } from "../../buttons/closeButton";
import { ImportButton } from "../../buttons/importButton";

interface IImportDataComponentProps {
  setData: (value: ITypeJSON) => void;
  onClose: () => void;
}

export const ImportDataComponent: React.FC<IImportDataComponentProps> = ({
  setData,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      onClose();
      setInputValue("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setErrorMessage("Invalid JSON data. Please correct and try again.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const action = errorMessage && (
    <Button color="inherit" size="small" onClick={() => setErrorMessage(null)}>
      Close
    </Button>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Import Data
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <CloseButton onClick={onClose} />
        <ImportButton onClick={handleImport} />
      </Box>
      <TextField
        multiline
        rows={20}
        sx={{ width: "100%" }}
        placeholder="Paste your JSON data here"
        onChange={handleInputChange}
        value={inputValue || ""}
      />
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={1000}
          onClose={() => setErrorMessage(null)}
          message={errorMessage}
          action={action}
        />
      )}
    </Box>
  );
};
