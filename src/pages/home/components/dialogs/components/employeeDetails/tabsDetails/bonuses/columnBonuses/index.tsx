import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";

export const ColumnsBonuses = (): GridColDef<GridValidRowModel>[] => [
  {
    field: "customBambooTalbeRowId",
    headerName: "Custom Bamboo Table Row ID",
    minWidth: 250,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Custom Bamboo Table Row ID" />,
  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 115,
    flex: 1,
    type: "date",
    renderHeader: () => <HeaderDetails title="Effective Date" />,
  },
  {
    field: "amount",
    headerName: "Amount",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Amount" />,
  },
  {
    field: "currencyCode",
    headerName: "Currency Code",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Currency Code" />,
  },
  {
    field: "reason",
    headerName: "Reason",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Reason" />,
  },
  {
    field: "comment",
    headerName: "Comment",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Comment" />,
  },
];
