// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Components
import { CustomFooter } from '@/shared/components'

// ** Hooks
import {
  useDataStateContext,
  useHandleAddItem,
  useHandleDeleteItem,
  useModal
} from '@/pages/home/hooks'

// ** Types
import { IDepositAccounts } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

// ** Columns
import { ColumnsAccounts } from './columnsAccounts'


export const DepositAccountTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal()
  const dialogData = dataForDialog as { eId: number } | null
  const { data } = useDataStateContext()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()
  const getDepostAccountRows = (): IDepositAccounts[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.depositAccounts || []
    }
    return []
  }
  const depositAccountCallbacks: ContextMenuItemsCallbacks<IDepositAccounts> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit deposit accounts')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'depositAccounts'
        })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'depositAccounts'
        })
      }
    }
  }
  const employmentStatusColumns = ColumnsAccounts(depositAccountCallbacks.openForm, depositAccountCallbacks)
  const addNewRow = () => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit('Edit deposit accounts')
  }
  return (
    <Box>
      <DataGrid<IDepositAccounts>
        onRowDoubleClick={params => depositAccountCallbacks.openForm(params.row)}
        rows={getDepostAccountRows()}
        getRowId={row => row.customBambooTableRowId}
        columns={employmentStatusColumns}
        pagination
        slots={{
          footer: () => <CustomFooter onAddEmptyRow={addNewRow} />
        }}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 }
          }
        }}
      />
    </Box>
  )
}
