import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CopyButton } from "./buttons";
import { ITypeJSON } from "@/const/types";
import { useNotification } from "@/hooks/useNotification";
import { useModal } from "@/hooks/useModal";
import { downloadJSONFileAsTXT } from "@/shared/utils";

export const ExportDataComponent: React.FC = () => {
  const { showNotification } = useNotification();
  const { setDialogOpen, dataForDialog } = useModal();
  const [inputNameFile, setInputNameFile] = useState("");

  const downloadFile = () => {
    if (inputNameFile && dataForDialog) {
      try {
        const jsonData: ITypeJSON = JSON.parse(dataForDialog as string );
        downloadJSONFileAsTXT(inputNameFile, jsonData);
        setInputNameFile("");
        setDialogOpen(false);
      } catch (e) {
        console.log(e);
        showNotification("Failed to parse the data for download.", "error");
      }
    } else {
      showNotification("Please enter a valid file name.", "error");
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
          value={dataForDialog || "No data available."}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <Box sx={{ position: "absolute", top: 9, right: 8, zIndex: 1, pr: 4 }}>
          <CopyButton textToCopy={dataForDialog as string} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Button variant="outlined" onClick={() => setDialogOpen(false)}>
          Close
        </Button>
        <Button variant="contained" onClick={downloadFile}>
          Download
        </Button>
      </Box>
    </Box>
  );
};
