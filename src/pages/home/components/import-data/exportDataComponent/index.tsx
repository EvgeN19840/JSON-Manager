import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Snackbar,
  } from "@mui/material";
import { DownloadJSONFileAsTXT } from "../../download-data";
import { ITypeJSON } from "../../../const/types";
import { CloseButton } from "../../buttons/closeButton";
import { DownloadButton } from "../../buttons/downloadButton";
import { CopyButton } from "../../buttons/copyButton";

  
  interface IExportDataComponentProps {
    parsedData: string | null;
    onClose: () => void;
  }
  
  export const ExportDataComponent: React.FC<IExportDataComponentProps> = ({
    parsedData,
    onClose,
  }) => {
    const [inputNameFile, setInputNameFile] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const downloadFile = () => {
      if (inputNameFile && parsedData) {
        try {
          const jsonData: ITypeJSON = JSON.parse(parsedData);
          DownloadJSONFileAsTXT(inputNameFile, jsonData);
          setInputNameFile("");
          onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          setErrorMessage("Failed to parse the data for download.");
        }
      } else {
        setErrorMessage("Please enter a valid file name.");
      }
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
      <Box>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Export Data
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
          <DownloadButton onClick={downloadFile} />
        </Box>
        <TextField
          value={inputNameFile}
          placeholder="Enter file name"
          onChange={handleNameFileChange}
          sx={{ display: "flex", mb: 1 }}
        />
        <CopyButton textToCopy={parsedData} />
        <TextField
          multiline
          rows={20}
          sx={{ width: "100%" }}
          placeholder="Viewing data"
          value={parsedData || "No data available."}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
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
  