// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Components
import { CommentCell } from '../../commentCell'
import { MyContextMenu, actionMenu } from '@/shared/components/'
// ** Types
import { IEmployee } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'

export const ColumnsTemplate = (
  _handleEditClick: (employee: IEmployee) => void,
  callbacks: ContextMenuItemsCallbacks<IEmployee>,
  isTemplateMode: boolean
): GridColDef<IEmployee>[] => {
  return [
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
      field: 'comment',
      headerName: 'Comment',
      flex: 1,
      renderCell: params => <CommentCell params={params} />
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
              true,
              isTemplateMode
            )}
            params={params}
          />
        )
      }
    }
  ]
}
