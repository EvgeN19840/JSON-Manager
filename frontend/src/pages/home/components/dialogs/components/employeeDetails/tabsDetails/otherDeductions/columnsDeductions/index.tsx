// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Components
import { MyContextMenu, actionMenu } from '@/shared/components'
import { HeaderDetails } from '../../../headerDetails'

// ** Utils
import { getDateFormat } from '@/shared/utils/getDateFormat'

// ** Types
import { IOtherDeduction } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'


export const ColumnsDeductions = (
  _handleEditClick: (data: IOtherDeduction) => void,
  callbacks: ContextMenuItemsCallbacks<IOtherDeduction>
): GridColDef<IOtherDeduction>[] => [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 150,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Name' />
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Start Date' />,
    renderCell: params => getDateFormat(params.row?.startDate)
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    minWidth: 115,
    flex: 1,
    renderHeader: () => <HeaderDetails title='End Date' />,
    renderCell: params => getDateFormat(params.row?.endDate)
  },
  {
    field: 'payrollOperationFrequency',
    headerName: 'Payroll Operation Frequency',
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Payroll Operation Frequency' />
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
    field: 'Actions',
    width: 50,
    align: 'center',
    renderHeader: () => '',
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IOtherDeduction>) => {
      return <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
    }
  }
]
