import { Box } from "@mui/material";

import { ITypeJSON } from "../../../const/types";
import { OpenDialog } from "../../import-data/openDialog";
import { ExportButton } from "../../buttons/exportButton";

interface IToolbarWithExportAndImportProps {
  handleClickOpenFromGrid: () => void;
  setData: (data: ITypeJSON) => void;
  openDialog: boolean;
  handleClickOpenFromEmployeeData: () => void;
  handleCloseDialog: () => void;
  source: string;
  parsedData: string | null;
  hasData: boolean;
}

export const ToolbarWithExportAndImport: React.FC<
  IToolbarWithExportAndImportProps
> = ({
  handleClickOpenFromGrid,
  setData,
  openDialog,
  handleClickOpenFromEmployeeData,
  handleCloseDialog,
  source,
  parsedData,
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
        <OpenDialog
          setData={setData}
          open={openDialog}
          onOpen={handleClickOpenFromEmployeeData}
          onClose={handleCloseDialog}
          source={source}
          parsedData={parsedData}
        />
      </Box>
    </Box>
  );
};
