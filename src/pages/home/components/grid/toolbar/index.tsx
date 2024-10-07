import { Box, Button } from "@mui/material";

interface IToolbarWithExportAndImportProps {
  handleClickOpenFromGrid: (actionType: string) => void;
  hasData: boolean;
}

export const ToolbarWithExportAndImport: React.FC<
  IToolbarWithExportAndImportProps
> = ({ handleClickOpenFromGrid, hasData }) => {
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
      <Button
        variant="contained"
        onClick={() => handleClickOpenFromGrid("import")}
      >
        Import Employee Data
      </Button>
      {hasData && (
        <Button
          variant="contained"
          onClick={() => handleClickOpenFromGrid("export")}
        >
          Export
        </Button>
      )}
    </Box>
  );
};
