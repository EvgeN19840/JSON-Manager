// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'

// ** Types and Columns
import { IDepositAccounts } from '@/types/json'
import { ColumnsAccounts } from './columnsAccounts'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { CustomFooter } from '@/shared/components/customFooter'

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
