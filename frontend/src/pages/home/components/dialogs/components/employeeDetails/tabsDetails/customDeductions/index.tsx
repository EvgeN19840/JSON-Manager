// ** MUI
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'

// ** Types
import { IOtherDeduction, ILoanOrSalaryAdvance } from '@/types/json'

// ** Columns
import { ColumnsDeductions } from './columnsDeductions/otherDeduction'
import { ColumnsLoansOrAdvances } from './columnsDeductions/loanOrSalaryAdvance'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'
import { CustomFooter } from '@/shared/components/customFooter'

export const DeductionsAndLoansTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal()
  const dialogData = dataForDialog as { eId: number } | null
  const { data } = useDataStateContext()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()

  const getDeductionRows = (): IOtherDeduction[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.otherDeductions || []
    }
    return []
  }

  const getLoanRows = (): ILoanOrSalaryAdvance[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.loansAndSalaryAdvances || []
    }
    return []
  }

  const deductionCallbacks: ContextMenuItemsCallbacks<IOtherDeduction> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit deductions')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({ item: data, type: 'item', eId: dialogData.eId, nestedType: 'otherDeductions' })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'otherDeductions'
        })
      }
    }
  }

  const loanCallbacks: ContextMenuItemsCallbacks<ILoanOrSalaryAdvance> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit loanOrAdvance')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({ item: data, type: 'item', eId: dialogData.eId, nestedType: 'loansAndSalaryAdvances' })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'loansAndSalaryAdvances'
        })
      }
    }
  }

  const deductionsColumns = ColumnsDeductions(deductionCallbacks.openForm, deductionCallbacks)
  const loansColumns = ColumnsLoansOrAdvances(loanCallbacks.openForm, loanCallbacks)

  const addNewRow = (type: 'deductions' | 'loans') => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit(type === 'deductions' ? 'Edit deductions' : 'Edit loanOrAdvance')
  }

  return (
    <Box>
      <Box>
        <Typography sx={{ textAlign: 'center', mt: 1 }}>Loans or Salary Advances</Typography>
        <DataGrid<ILoanOrSalaryAdvance>
          onRowDoubleClick={params => loanCallbacks.openForm(params.row)}
          rows={getLoanRows()}
          getRowId={row => row.customBambooTableRowId}
          columns={loansColumns}
          pagination
          slots={{ footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('loans')} /> }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        />
      </Box>
      <Box>
        <Typography sx={{ textAlign: 'center', mt: 1 }}>Other Deductions</Typography>
        <DataGrid<IOtherDeduction>
          onRowDoubleClick={params => deductionCallbacks.openForm(params.row)}
          rows={getDeductionRows()}
          getRowId={row => row.customBambooTableRowId}
          columns={deductionsColumns}
          pagination
          slots={{ footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('deductions')} /> }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        />
      </Box>
    </Box>
  )
}
