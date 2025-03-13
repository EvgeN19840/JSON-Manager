// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { useDefaultEmployeeBenefit } from '@/pages/home/hooks/useDefaultData'

// ** Types
import { IEmployeeBenefit } from '@/types/json'

// ** Const
import { ColumnsBenefit } from './columnsBenefit'

// ** Components
import { CustomFooter } from '@/shared/components/customFooter'

// ** Context
import { IEmployeeDataForDialog } from '@/pages/home/context/modal/types'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog, setTypeModalDetailsEdit, dataForDialog } = useModal()
  const dialogData = dataForDialog as { eId: number } | null
  const { data } = useDataStateContext()
  const defaultValues = useDefaultEmployeeBenefit()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()

  const getBenefitRows = (): IEmployeeBenefit[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.benefits || []
    }
    return []
  }

  const handleEditClick = (data: IEmployeeBenefit) => {
    handleClickOpenDialog('Edit Details', data)
    setTypeModalDetailsEdit('Edit benefits details')
  }

  const addItem = (benefit: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleAddItem({
        item: benefit,
        type: 'item',
        eId: dialogData.eId,
        nestedType: 'benefits'
      })
    }
  }
  const deleteItem = (item: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleDeleteItem({
        id: item.id,
        type: 'item',
        eId: (dataForDialog as IEmployeeDataForDialog).eId,
        nestedType: 'benefits'
      })
    }
  }

  const callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit> = {
    openForm: data => handleEditClick(data),
    addItem: data => addItem(data),
    deleteItem: data => deleteItem(data)
  }

  const columns = ColumnsBenefit(benefit => handleEditClick(benefit), callbacks)
  const addNewRow = () => {
    handleClickOpenDialog('Edit Details', defaultValues)
    setTypeModalDetailsEdit('Edit benefits details')
  }
  return (
    <Box>
      <DataGrid<IEmployeeBenefit>
        onRowDoubleClick={params => handleEditClick(params.row)}
        rows={getBenefitRows()}
        columns={columns}
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
