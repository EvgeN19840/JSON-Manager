import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { IReimbursement } from "@/const/types";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const ColumnsReimbursements = (
  _handleEditClick: (data: IReimbursement) => void,
  callbacks: ContextMenuItemsCallbacks<IReimbursement>
): GridColDef<IReimbursement>[] => [
 
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Name" />,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Start Date" />,
    renderCell: (params) => getDateFormat(params.row?.startDate),
  },
  {
    field: "endDate",
    headerName: "End Date",
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title="End Date" />,
    renderCell: (params) => getDateFormat(params.row?.endDate),
  },
  {
    field: "payrollOperationFrequency",
    headerName: "Payroll Operation Frequency",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Payroll Operation Frequency" />,
  },

  {
    field: "value",
    headerName: "Value",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Value" />,
  },
  {
    field: "currencyCode",
    headerName: "Currency Code",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Currency Code" />,
  },
  {
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IReimbursement>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];
