// ** Types
import { IJobInfo } from "@/constants/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const ColumnsJobInfo = (
  _handleEditClick: (data: IJobInfo) => void,
  callbacks: ContextMenuItemsCallbacks<IJobInfo>
): GridColDef<IJobInfo>[] => [
 
  {
    field: "jobTitle",
    headerName: "Job Title",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Job Title" />,
  },
  {
    field: "department",
    headerName: "Department",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Department" />,
  },
  {
    field: "location",
    headerName: "Location",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Location" />,
  },
  {
    field: "division",
    headerName: "Division",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Division" />,
  },
  {
    field: "reportsTo",
    headerName: "Reports To",
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Reports To" />,
  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Effective Date" />,
    renderCell: (params) => getDateFormat(params.row?.effectiveDate),
  },
  {
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IJobInfo>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];
