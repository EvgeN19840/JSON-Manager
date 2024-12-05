import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";
import { IBonuses } from "@/const/types";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";

export const ColumnsBonuses = (
  _handleEditClick: (data: IBonuses) => void,
  callbacks: ContextMenuItemsCallbacks<IBonuses>
): GridColDef<IBonuses>[] => [
 
 
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Effective Date" />,
    renderCell: (params) => getDateFormat(params.row?.effectiveDate),
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
  {
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IBonuses>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];
