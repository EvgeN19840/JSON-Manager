import {
  Box,
  Button,
  Dialog,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ITypeJSON } from "../../const/types";
import { ImportButton } from "../buttons/importButton";
import { DownloadButton } from "../buttons/downloadButton";
import { CopyButton } from "../buttons/copyButton";
import { CloseButton } from "../buttons/closeButton";
import { DownloadJSONFileAsTXT } from "../download-data";

interface IImportDataProps {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onClose: () => void;
  source: string;
  parsedData: string | null;
}

export const ImportData: React.FC<IImportDataProps> = ({
  setData,
  open,
  onClose,
  source,
  parsedData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputNameFile, setInputNameFile] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const downloadFile = () => {
    if (inputNameFile && parsedData) {
      const jsonData: ITypeJSON = JSON.parse(parsedData);
      DownloadJSONFileAsTXT(inputNameFile, jsonData);
      setInputNameFile("");
      onClose();
    } else {
      setErrorMessage("Please enter a file name.");
    }
  };

  const handleImport = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      onClose();
      setInputValue("");
    } catch (e) {
      console.error("Invalid JSON format", e);
      setErrorMessage("Invalid JSON data. Please correct and try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setInputValue("");
    setInputNameFile("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNameFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameFile(event.target.value);
  };

  const action = errorMessage && (
    <Button color="inherit" size="small" onClick={() => setErrorMessage(null)}>
      Close
    </Button>
  );

  return (
    <Dialog fullWidth sx={{ height: "90vh" }} open={open} onClose={onClose}>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {source === "Import data" && (
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
              <Box>
                <CloseButton onClick={handleClose} />
              </Box>
              <Box>
                <ImportButton onClick={handleImport} />
              </Box>
            </Box>
            <TextField
              multiline
              rows={20}
              sx={{ width: "100%" }}
              placeholder="Paste your JSON data here"
              onChange={handleInputChange}
              value={inputValue || ""}
            />
          </Box>
        )}
        {source === "Export data" && (
          <Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Export Data
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box>
                  <CloseButton onClick={handleClose} />
                </Box>
                <Box>
                  <DownloadButton onClick={downloadFile} />
                </Box>
              </Box>

              <TextField
                value={inputNameFile}
                placeholder="Enter file name"
                onChange={handleNameFileChange}
                sx={{ display: "flex", mb: 1 }}
              />
            </Box>
            <CopyButton textToCopy={parsedData} />
            <TextField
              multiline
              rows={20}
              sx={{ width: "100%" }}
              placeholder="Viewing data"
              value={parsedData || ""}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
           
          </Box>
        )}
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
    </Dialog>
  );
};
