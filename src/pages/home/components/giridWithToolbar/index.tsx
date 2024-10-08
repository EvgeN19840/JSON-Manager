import { Box } from "@mui/material";

import { ITypeJSON } from "../../const/types";
import { MyGrid, ToolbarWithExportAndImport } from "../grid/";

interface IGridWithToolbarProps {
  data: ITypeJSON | null;
  handleClickOpenFromGrid: (actionType: string) => void;
}

export const GridWithToolbar: React.FC<IGridWithToolbarProps> = ({
  data,
  handleClickOpenFromGrid,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyGrid 
        data={data} 
        slots={{
          toolbar: handleClickOpenFromGrid
            ? () => (
                <ToolbarWithExportAndImport
                  handleClickOpenFromGrid={handleClickOpenFromGrid}
                  hasData={!!data}
                />
              )
            : null,
        }}
      />
    </Box>
  );
};
