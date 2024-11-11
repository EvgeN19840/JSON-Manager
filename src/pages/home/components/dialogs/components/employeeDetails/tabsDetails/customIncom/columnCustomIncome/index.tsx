// ** Types
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";

export const ColumnsReimbursements = (): GridColDef<GridValidRowModel>[] => [
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
    type: "date",
    renderHeader: () => <HeaderDetails title="Start Date" />,
    renderCell: (params) => {
      const date = params.value;
      return date ? getDateFormat(date) : "N/A";
    },
  },
  {
    field: "endDate",
    headerName: "End Date",
    minWidth: 115,
    flex: 1,
    type: "date",
    renderHeader: () => <HeaderDetails title="End Date" />,
    renderCell: (params) => {
      const date = params.value;
      return date ? getDateFormat(date) : "N/A";
    },
  },
  {
    field: "payrollOperationFrequency",
    headerName: "Payroll Operation Frequency",
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Payroll Operation Frequency" />,
  },
  {
    field: "customBambooTableRowId",
    headerName: "Custom Bamboo Table Row ID",
    minWidth: 180,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Custom Bamboo Table Row ID" />,
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
];
