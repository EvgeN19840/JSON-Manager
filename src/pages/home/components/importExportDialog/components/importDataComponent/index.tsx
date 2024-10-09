import { useState } from "react";
import { ITypeJSON } from "../../../../../../const/types";


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
