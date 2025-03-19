import { Box, Button } from "@mui/material";
import { CustomPagination } from "./pagination";

interface CustomFooterProps {
  onAddEmptyRow: () => void;
}

export const CustomFooter: React.FC<CustomFooterProps> = ({
  onAddEmptyRow,
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding={1}
    sx={{
      borderTop: "1px solid #e0e0e0",
    }}
  >
    <Button variant="contained" color="primary" onClick={onAddEmptyRow}>
      Add Row
    </Button>
    <CustomPagination />
  </Box>
);
