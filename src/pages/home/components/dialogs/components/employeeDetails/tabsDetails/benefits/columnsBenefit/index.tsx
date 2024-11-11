// ** Types
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { HeaderDetails } from "../../../headerDetails";
import { getDateFormat } from "@/shared/utils/getDateFormat";

export const ColumnsBenefit = (): GridColDef<GridValidRowModel>[] => [
  {
    field: "name",
    headerName: "Benefit Name",
    minWidth: 250,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Benefit Name" />,
  },
  {
    field: "id",
    headerName: "ID",
    minWidth: 250,
    flex: 1,
    renderHeader: () => <HeaderDetails title="ID" />,
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
    field: "companyValue",
    headerName: "Company Value",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Company Value" />,
  },
  {
    field: "companyCurrencyCode",
    headerName: "Company Currency Code",
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Company Currency Code" />,
  },
  {
    field: "isPerentValue",
    headerName: "Is Percent Value",
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title="Is Percent Value" />,

  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 115,
    flex: 1,
    type: "date",
    renderHeader: () => <HeaderDetails title="Effective Date" />,
    renderCell: (params) => {
      const date = params.value;
      return date ? getDateFormat(new Date(date)) : "";
    },
  },
];
