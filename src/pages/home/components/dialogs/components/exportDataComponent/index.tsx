// ** React
import { useState } from "react";

// ** MUI
import { Box, Typography } from "@mui/material";

// ** Components
import { CopyButton } from "./buttons";
import { FormFooter } from "@/shared/formElements/formFooter";
import { InputField } from "@/shared/inputField";

// ** Hooks
import { useNotification } from "@/hooks/useNotification";
import { useModal } from "@/hooks/useModal";

// ** Utils
import { downloadJSONFileAsTXT } from "@/shared/utils";

// ** Types
import { ITypeJSON } from "@/const/types";

export const ExportDataComponent: React.FC = () => {
  const { showNotification } = useNotification();
  const { setDialogOpen, dataForDialog } = useModal();
  const [inputNameFile, setInputNameFile] = useState("");

  const downloadFile = () => {
    if (inputNameFile && dataForDialog) {
      try {
        const jsonData: ITypeJSON = JSON.parse(dataForDialog as string);
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
        <InputField
          value={inputNameFile}
          placeholder="Enter file name"
          onChange={handleNameFileChange}  
          sx={{  display: "flex",  height: "40px", mb: 1 }}
        />

      <Box  maxWidth="xs"  sx={{ mt:3, mb:1, position: "relative", width: "100%" }}>
        <InputField
          value={dataForDialog || "No data available."}
          onChange={() => {}}
          rows={20}
          multiline
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
      <FormFooter
        cancelButtonText={"Close"}
        actionButtonText={"Download"}
        showSecondButton={true}
        buttonAction={downloadFile}
        source={"general"}
      />
    </Box>
  );
};
