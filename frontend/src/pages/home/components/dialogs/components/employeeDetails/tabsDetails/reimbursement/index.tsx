// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal, useDataStateContext, useHandleDeleteItem, useHandleAddItem } from '@/pages/home/hooks'

// ** Types
import { IReimbursement } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

// ** Columns
import { ColumnsReimbursements } from './columnsReimbursements'

// ** Components
import { CustomFooter } from '@/shared/components'

export const Reimbursements: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal()
  const { data } = useDataStateContext()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()
  const dialogData = dataForDialog as { eId: number } | null
  const getReimbursementsRows = (): IReimbursement[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.reimbursements || []
    }
    return []
  }
  const customIncomeCallbacks: ContextMenuItemsCallbacks<IReimbursement> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit reimbursements')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'reimbursements'
        })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'reimbursements'
        })
      }
    }
  }

  const CustomIncomeColumns = ColumnsReimbursements(customIncomeCallbacks.openForm, customIncomeCallbacks)
  const addNewRow = () => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit('Edit reimbursements')
  }
  return (
    <Box>
      <DataGrid<IReimbursement>
        onRowDoubleClick={params => customIncomeCallbacks.openForm(params.row)}
        rows={getReimbursementsRows()}
        getRowId={row => row.customBambooTableRowId}
        columns={CustomIncomeColumns}
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
