// ** Types
import { ISalary } from "@/constants/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const ColumnsSalary = (
  _handleEditClick: (data: ISalary) => void,
  callbacks: ContextMenuItemsCallbacks<ISalary>
): GridColDef<ISalary>[] => [
 
  {
    field: "salaryRate",
    headerName: "Salary Rate",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Salary Rate" />,
  },
  {
    field: "salaryCurrencyCode",
    headerName: "Currency Code",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Currency Code" />,
  },
  {
    field: "salaryRatePeriod",
    headerName: "Rate Period",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Rate Period" />,
  },
  {
    field: "payPeriod",
    headerName: "Pay Period",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Pay Period" />,
  },
  {
    field: "allowOvertime",
    headerName: "Allow Overtime",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Allow Overtime" />,
    renderCell: (params) => (params.row.allowOvertime ? "Yes" : "No"),
  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Effective Date" />,
    renderCell: (params) => getDateFormat(params.row.effectiveDate),
  },
  {
    field: "changeReason",
    headerName: "Change Reason",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Change Reason" />,
  },
  {
    field: "comment",
    headerName: "Comment",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Comment" />,
  },
  {
    field: "overtimeRate",
    headerName: "Overtime Rate",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Overtime Rate" />,
    renderCell: (params) => (params.row.overtimeRate ? params.row.overtimeRate : "N/A"),
  },
  {
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<ISalary>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];
