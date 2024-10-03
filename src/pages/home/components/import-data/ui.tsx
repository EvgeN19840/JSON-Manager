import { Box, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ITypeJSON } from "../../const/types";
import { ImportButton } from "./buttons/importButton";
import { SaveDataButton } from "./buttons/saveData";

export const ImportData = ({
  setData,
  open,
  onClose,
  fromGrid = false,
}: {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onClose: () => void;
  fromGrid?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      onClose();
      setInputValue("");
    } catch (e) {
      console.error("Invalid JSON format", e);
      alert("Invalid JSON data. Please correct and try again.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog fullWidth sx={{ height: "80vh" }} open={open} onClose={onClose}>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {fromGrid ? "Save Data" : "Import Data"}
        </Typography>
        <TextField
          multiline
          rows={20}
          sx={{ flexGrow: 1 }}
          placeholder="Paste your JSON data here"
          onChange={handleInputChange}
          value={inputValue}
        />
        {fromGrid ? (
          <SaveDataButton onClick={handleImport} />
        ) : (
          <ImportButton onClick={handleImport} />
        )}
      </Box>
    </Dialog>
  );
};
