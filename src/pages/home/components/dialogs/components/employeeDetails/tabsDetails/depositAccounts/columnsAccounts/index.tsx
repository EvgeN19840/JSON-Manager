// ** Types
import {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { IDepositAccounts } from "@/const/types";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const ColumnsAccounts = (
  _handleEditClick: (data: IDepositAccounts) => void,
  callbacks: ContextMenuItemsCallbacks<IDepositAccounts>
): GridColDef<IDepositAccounts>[] => [
  {
    field: "customBambooTableRowId",
    headerName: "Custom Bamboo Table Row ID",
    minWidth: 180,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Custom Bamboo Table Row ID" />,
  },
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
    field: "isPercentValue",
    headerName: "Is Percent Value",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Is Percent Value" />,
  },
  {
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IDepositAccounts>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];
