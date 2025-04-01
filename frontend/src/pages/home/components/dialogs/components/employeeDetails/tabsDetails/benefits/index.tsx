// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Components
import { CustomFooter } from '@/shared/components'

// ** Const
import { ColumnsBenefit } from './columnsBenefit'

// ** Context
import { IEmployeeDataForDialog } from '@/pages/home/context/modal/types'

// ** Hooks
import {
  useDataStateContext,
  useDefaultEmployeeBenefit,
  useHandleAddItem,
  useHandleDeleteItem,
  useModal
} from '@/pages/home/hooks'

// ** Types
import { IEmployeeBenefit } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'


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
