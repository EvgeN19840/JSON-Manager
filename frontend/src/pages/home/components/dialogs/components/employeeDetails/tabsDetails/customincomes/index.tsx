// ** MUI
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal, useDataStateContext, useHandleDeleteItem, useHandleAddItem } from '@/pages/home/hooks'

// ** Types
import { IFees, IReimbursement } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

// ** Columns
import { ColumnsReimbursements } from './columnsCustomIncomes/columnsReimbursements'
import { ColumnsFees } from './columnsCustomIncomes/fees'

// ** Components
import { CustomFooter } from '@/shared/components'

export const Customincomes: React.FC = () => {
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

  const getFeesRows = (): IFees[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.fees || []
    }
    return []
  }

  const reimbursementsCallbacks: ContextMenuItemsCallbacks<IReimbursement> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit reimbursements')
    },
    addItem: data => {
      if (dialogData?.eId) {
        handleAddItem({ item: data, type: 'item', eId: dialogData.eId, nestedType: 'reimbursements' })
      }
    },
    deleteItem: data => {
      if (dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'reimbursements'
        })
      }
    }
  }

  const feesCallbacks: ContextMenuItemsCallbacks<IFees> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit fees')
    },
    addItem: data => {
      if (dialogData?.eId) {
        handleAddItem({ item: data, type: 'item', eId: dialogData.eId, nestedType: 'fees' })
      }
    },
    deleteItem: data => {
      if (dialogData?.eId) {
        handleDeleteItem({ id: data.customBambooTableRowId, type: 'item', eId: dialogData.eId, nestedType: 'fees' })
      }
    }
  }

  const reimbursementColumns = ColumnsReimbursements(reimbursementsCallbacks.openForm, reimbursementsCallbacks)
  const feesColumns = ColumnsFees(feesCallbacks.openForm, feesCallbacks)

  const addNewRow = (type: 'reimbursements' | 'fees') => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit(type === 'reimbursements' ? 'Edit reimbursements' : 'Edit fees')
  }

  return (
    <Box>
      <Box>
         <Typography sx={{ textAlign: 'center', mb: 1, mt:2,  fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}>Reimbursement</Typography>
        <DataGrid<IReimbursement>
          onRowDoubleClick={params => reimbursementsCallbacks.openForm(params.row)}
          rows={getReimbursementsRows()}
          getRowId={row => row.customBambooTableRowId}
          columns={reimbursementColumns}
          pagination
          slots={{ footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('reimbursements')} /> }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        />
      </Box>
      <Box>
         <Typography sx={{ textAlign: 'center', mb: 1, mt:2,  fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}>Fees</Typography>
        <DataGrid<IFees>
          onRowDoubleClick={params => feesCallbacks.openForm(params.row)}
          rows={getFeesRows()}
          getRowId={row => row.customBambooTableRowId}
          columns={feesColumns}
          pagination
          slots={{ footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('fees')} /> }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        />
      </Box>
    </Box>
  )
}
