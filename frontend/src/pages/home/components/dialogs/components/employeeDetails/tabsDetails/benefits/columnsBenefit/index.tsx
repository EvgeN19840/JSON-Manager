// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Types
import { IEmployeeBenefit } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

// ** Utils
import { getDateFormat } from '@/shared/utils/getDateFormat'

// ** Components
import { MyContextMenu, actionMenu } from '@/shared/components'
import { HeaderDetails } from '@/pages/home/components/dialogs/components/employeeDetails/headerDetails'




export const ColumnsBenefit = (
  _handleEditClick: (data: IEmployeeBenefit) => void,
  callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit>
): GridColDef<IEmployeeBenefit>[] => [
  {
    field: 'name',
    headerName: 'Benefit Name',
    minWidth: 300,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Benefit Name' />
  },

  {
    field: 'value',
    headerName: 'Value',
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Value' />
  },
  {
    field: 'currencyCode',
    headerName: 'Currency Code',
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Currency Code' />
  },
  {
    field: 'companyValue',
    headerName: 'Company Value',
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Company Value' />
  },
  {
    field: 'companyCurrencyCode',
    headerName: 'Company Currency Code',
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Company Currency Code' />
  },
  {
    field: 'isPerentValue',
    headerName: 'Is Percent Value',
    minWidth: 120,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Is Percent Value' />
  },
  {
    field: 'effectiveDate',
    headerName: 'Effective Date',
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Effective Date' />,
    renderCell: params => getDateFormat(params.row?.effectiveDate)
  },
  {
    field: 'Actions',
    width: 50,
    align: 'center',
    renderHeader: () => '',
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IEmployeeBenefit>) => {
      return <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
    }
  }
]
