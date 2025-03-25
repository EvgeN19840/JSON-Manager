// ** Types
import { IEmployee } from '@/types/json'

// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Components
import { actionMenu } from '@/shared/components/myContextMenu/actionMenu'
import { MyContextMenu } from '@/shared/components/myContextMenu'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'

export const ColumnsEmployee = (
  _handleEditClick: (employee: IEmployee) => void,
  callbacks: ContextMenuItemsCallbacks<IEmployee>
): GridColDef<IEmployee>[] => [
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    editable: false,
    minWidth: 250
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    editable: false,
    minWidth: 250
  },
  {
    field: 'eId',
    headerName: 'eId',
    flex: 1,
    editable: false,
    minWidth: 250
  },
  {
    field: 'Actions',
    width: 50,
    align: 'center',
    renderHeader: () => '',
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IEmployee>) => {
      return (
        <MyContextMenu
          items={actionMenu(
            {
              ...callbacks,
              onDuplicate: employee => callbacks.onDuplicate?.(employee),
              saveEmployee: employee => callbacks.saveEmployee?.(employee),
              removeEmployee: employee => callbacks.removeEmployee?.(employee)
            },
            params,
            true
          )}
          params={params}
        />
      )
    }
  }
]
