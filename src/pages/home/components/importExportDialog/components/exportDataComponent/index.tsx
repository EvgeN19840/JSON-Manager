import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CopyButton } from "./buttons";
import { useSnackbar } from "@/context";
import { DownloadJSONFileAsTXT } from "@/shared/utils";
import { ITypeJSON } from "@/const/types";

interface IExportDataComponentProps {
  parsedData: string | null;
  onClose: () => void;
}

export const ExportDataComponent: React.FC<IExportDataComponentProps> = ({
  parsedData,
  onClose,
}) => {
  const [inputNameFile, setInputNameFile] = useState("");
  const { showSnackbar } = useSnackbar();

  const downloadFile = () => {
    if (inputNameFile && parsedData) {
      try {
        const jsonData: ITypeJSON = JSON.parse(parsedData);
        DownloadJSONFileAsTXT(inputNameFile, jsonData);
        setInputNameFile("");
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        showSnackbar("Failed to parse the data for download.", 'error');
      }
    } else {
      showSnackbar("Please enter a valid file name.", 'error');
    }
  };

  const handleNameFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameFile(event.target.value);
  };

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
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" onClick={downloadFile}>
          Download
        </Button>
      </Box>
      <TextField
        value={inputNameFile}
        placeholder="Enter file name"
        onChange={handleNameFileChange}
        sx={{ display: "flex", mb: 1 }}
      />
      <Box sx={{ position: "relative", width: "100%" }}>
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
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, pr: 4 }}>
          <CopyButton textToCopy={parsedData} />
        </Box>
      </Box>
    </Box>
  );
};
