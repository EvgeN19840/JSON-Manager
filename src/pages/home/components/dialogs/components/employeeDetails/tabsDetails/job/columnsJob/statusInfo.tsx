// ** Types
import { IEmploymentStatus } from '@/types/json'

// ** MUI
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Components
import { MyContextMenu } from '@/shared/components/myContextMenu'
import { actionMenu } from '@/shared/components/myContextMenu/actionMenu'
import { HeaderDetails } from '../../../headerDetails'
import { getDateFormat } from '@/shared/utils/getDateFormat'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'

export const ColumnsEmploymentStatus = (
  _handleEditClick: (data: IEmploymentStatus) => void,
  callbacks: ContextMenuItemsCallbacks<IEmploymentStatus>
): GridColDef<IEmploymentStatus>[] => [
  {
    field: 'employmentStatus',
    headerName: 'Employment Status',
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Employment Status' />
  },
  {
    field: 'effectiveDate',
    headerName: 'Effective Date',
    minWidth: 100,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Effective Date' />,
    renderCell: params => getDateFormat(params.row?.effectiveDate)
  },
  {
    field: 'comment',
    headerName: 'Comment',
    minWidth: 200,
    flex: 1,
    renderHeader: () => <HeaderDetails title='Comment' />
  },
  {
    field: 'Actions',
    width: 50,
    align: 'center',
    renderHeader: () => '',
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IEmploymentStatus>) => {
      return <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
    }
  }
]
