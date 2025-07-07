import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// Components
import { CustomFooter } from '@/shared/components'

// Const
import { ColumnsBenefit } from './columnsBenefit'

// Hooks
import {
  useDataStateContext,
  useDefaultEmployeeBenefit,
  useHandleAddItem,
  useHandleDeleteItem,
  useModal
} from '@/pages/home/hooks'

// Types
import { IEmployeeBenefit } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog, setTypeModalDetailsEdit, dataForDialog } = useModal()
  const dialogData = dataForDialog as { eId: number } | null
  const { data } = useDataStateContext()
  const defaultValues = useDefaultEmployeeBenefit()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()

  const getBenefits = (): IEmployeeBenefit[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.benefits || []
    }
    return []
  }

  const renderSection = (
    label: string,
    keyword: string,
    editType: 'Edit pension benefits details' | 'Edit life benefits details' | 'Edit health benefits details',
    handleEdit: (data: IEmployeeBenefit) => void
  ) => {
    const benefits = getBenefits().filter(b => b.name?.toLowerCase().includes(keyword.toLowerCase()))

    const callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit> = {
      openForm: data => handleEdit(data),
      addItem: data =>
        dialogData &&
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'benefits'
        }),
      deleteItem: data =>
        dialogData &&
        handleDeleteItem({
          id: data.id,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'benefits'
        })
    }

    const columns = ColumnsBenefit(handleEdit, callbacks)

    return (
      <Box>
        <Typography
          sx={{ textAlign: 'center', mb: 1, mt: 2, fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}
        >
          {label}
        </Typography>
        <DataGrid<IEmployeeBenefit>
          onRowDoubleClick={params => handleEdit(params.row)}
          rows={benefits}
          columns={columns}
          pagination
          slots={{
            footer: () => (
              <CustomFooter
                onAddEmptyRow={() => {
                  handleClickOpenDialog('Edit Details', defaultValues)
                  setTypeModalDetailsEdit(editType)
                }}
              />
            )
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

  const handleEditPension = (data: IEmployeeBenefit) => {
    handleClickOpenDialog('Edit Details', data)
    setTypeModalDetailsEdit('Edit pension benefits details')
  }

  const handleEditLife = (data: IEmployeeBenefit) => {
    handleClickOpenDialog('Edit Details', data)
    setTypeModalDetailsEdit('Edit life benefits details')
  }

  const handleEditHealth = (data: IEmployeeBenefit) => {
    handleClickOpenDialog('Edit Details', data)
    setTypeModalDetailsEdit('Edit health benefits details')
  }

  return (
    <Box>
      {renderSection('Pension', 'pension', 'Edit pension benefits details', handleEditPension)}
      {renderSection('Life Insurance', 'life', 'Edit life benefits details', handleEditLife)}
      {renderSection('Health Insurance', 'health', 'Edit health benefits details', handleEditHealth)}
    </Box>
  )
}
