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

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
      <Typography variant="body2">{`Showing ${paginationModel.pageSize} of ${totalRows} rows`}</Typography>
      <Pagination
        count={pageCount}
        page={paginationModel.page + 1}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
};
