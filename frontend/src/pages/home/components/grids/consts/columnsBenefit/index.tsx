// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Components
import { MyContextMenu, actionMenu } from '@/shared/components'

// ** Types
import { ISystemBenefit } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

export const ColumnsBenefit = (
  _handleEditClick: (employee: ISystemBenefit) => void,
  callbacks: ContextMenuItemsCallbacks<ISystemBenefit>
): GridColDef<ISystemBenefit>[] => [
  {
    field: 'name',
    headerName: 'Benefit Name',
    flex: 1,
    editable: false,
    minWidth: 250,
    resizable: false
  },
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    editable: false,
    resizable: false,
    minWidth: 250
  },
  {
    field: 'Actions',
    width: 50,
    align: 'center',
    renderHeader: () => '',
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<ISystemBenefit>) => {
      return <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
    }
  }
]
