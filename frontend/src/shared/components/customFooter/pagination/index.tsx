import { Box, Pagination, Typography } from "@mui/material";
import {
  gridPageCountSelector,
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

export const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const totalRows = apiRef.current.getRowsCount();

  const startRow = paginationModel.page * paginationModel.pageSize + 1;
  const endRow = Math.min(
    (paginationModel.page + 1) * paginationModel.pageSize,
    totalRows
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
      <Typography variant="body2">{`Showing rows ${startRow}-${endRow} of ${totalRows}`}</Typography>
      <Pagination
        count={pageCount}
        page={paginationModel.page + 1}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
};
