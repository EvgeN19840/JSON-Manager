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
import { IModalType } from "@/context/modal/types";

export const ExportDataComponent: React.FC = () => {
  const { showNotification } = useNotification();
  const { setDialogOpen, dataForDialog } = useModal();
  const [inputNameFile, setInputNameFile] = useState("");

  const removeTopLevelComment = (data: string) => {
    try {
      const jsonData: ITypeJSON = JSON.parse(data);
      const cleanedData = { ...jsonData };

      if (Array.isArray(cleanedData.employees)) {
        cleanedData.employees = cleanedData.employees.map((employee) => {
          const cleanedEmployee = { ...employee };
          delete cleanedEmployee.comment; 
          return cleanedEmployee;
        });
      }

      return JSON.stringify(cleanedData, null, 2);
    } catch (e) {
      console.log("Error parsing JSON:", e);
      return data;
    }
  };

  const cleanedData = dataForDialog ? removeTopLevelComment(dataForDialog as string) : "No data available.";

  const downloadFile = () => {
    if (inputNameFile && typeof dataForDialog === "string") {
      try {
        const cleanedDataForDownload = JSON.parse(cleanedData);
        downloadJSONFileAsTXT(inputNameFile, cleanedDataForDownload);
        setInputNameFile("");
        setDialogOpen(false);
      } catch (e) {
        console.log(e);
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
        sx={{ px: "1rem", display: "flex", height: "40px", mb: 1 }}
      />

      <Box sx={{ mt: 3, mb: 1, pr: "1rem", pl: "1rem", position: "relative", maxWidth: "100%" }}>
        <InputField
          value={cleanedData} 
          onChange={() => {}}
          rows={20}
          multiline
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <Box sx={{ position: "absolute", top: 9, right: 8, zIndex: 1, pr: 6 }}>
          <CopyButton textToCopy={cleanedData as IModalType} /> 
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
