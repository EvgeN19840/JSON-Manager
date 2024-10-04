import { Box, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ITypeJSON } from "../../const/types";
import { ImportButton } from "./buttons/importButton";
import { DownloadButton } from "./buttons/downloadButton";
import { CopyButton } from "./buttons/copyButton";

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
  const [parsedData, setParsedData] = useState<string | null>(null);
  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      setParsedData(JSON.stringify(parsedData, null, 2));
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
          placeholder={fromGrid ? "Viewing data" : "Paste your JSON data here"}
          onChange={handleInputChange}
          value={fromGrid && parsedData ? parsedData : inputValue}
          InputProps={{
            readOnly: fromGrid,
          }}
        />
        {fromGrid ? (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DownloadButton onClick={handleImport} />
            <CopyButton textToCopy={parsedData} />
          </Box>
        ) : (
          <ImportButton onClick={handleImport} />
        )}
      </Box>
    </Dialog>
  );
};
