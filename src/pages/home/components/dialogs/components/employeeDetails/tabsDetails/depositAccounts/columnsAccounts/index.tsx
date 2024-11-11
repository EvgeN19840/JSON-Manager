// ** Types
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";

export const ColumnsAccounts = (): GridColDef<GridValidRowModel>[] => [
  {
    field: "orderNumber",
    headerName: "Order Number",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Order Number" />,
  },
  {
    field: "bank",
    headerName: "Bank",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Bank" />,
  },
  {
    field: "accountName",
    headerName: "Account Name",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Account Name" />,
  },
  {
    field: "accountNumber",
    headerName: "Account Number",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Account Number" />,
  },
  {
    field: "currencyCode",
    headerName: "Currency Code",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Currency Code" />,
  },
  {
    field: "accountType",
    headerName: "Account Type",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Account Type" />,
  },
  {
    field: "transitNumber",
    headerName: "Transit Number",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Transit Number" />,
  },
  {
    field: "depositAmount",
    headerName: "Deposit Amount",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Deposit Amount" />,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Description" />,
  },
  {
    field: "customBambooTalbeRowId",
    headerName: "Custom Bamboo Table Row ID",
    minWidth: 180,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Custom Bamboo Table Row ID" />,
  },
  {
    field: "isPercentValue",
    headerName: "Is Percent Value",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Is Percent Value" />,
  },
];
