import { Box } from "@mui/material";


import { ExportButton } from "../../buttons/exportButton";

interface IToolbarWithExportAndImportProps {
  handleClickOpenFromGrid: () => void;
  hasData: boolean;
}

export const ToolbarWithExportAndImport: React.FC<
  IToolbarWithExportAndImportProps
> = ({
  handleClickOpenFromGrid,
  hasData,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        {hasData && <ExportButton onClick={handleClickOpenFromGrid} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    
      </Box>
    </Box>
  );
};
