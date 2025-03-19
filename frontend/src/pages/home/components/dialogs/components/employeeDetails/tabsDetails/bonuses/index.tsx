// ** MUI
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'

// ** Types Columns
import { IBonuses } from '@/types/json'

// ** Columns
import { ColumnsBonuses } from './columnsBonuses'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { ContextMenuItemsCallbacks } from '@/shared/components/myContextMenu/actionMenu/types'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'
import { CustomFooter } from '@/shared/components/customFooter'

export const BonusesTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal()
  const { data } = useDataStateContext()
  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()
  const dialogData = dataForDialog as { eId: number } | null
  const getBonusesRows = (): IBonuses[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.bonuses || []
    }
    return []
  }
  const bonusesCallbacks: ContextMenuItemsCallbacks<IBonuses> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit bonuses')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'bonuses'
        })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'bonuses'
        })
      }
    }
  }
  const bonusesColumns = ColumnsBonuses(bonusesCallbacks.openForm, bonusesCallbacks)
  const addNewRow = () => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit('Edit bonuses')
  }

  return (
    <Box>
      <DataGrid<IBonuses>
        onRowDoubleClick={params => bonusesCallbacks.openForm(params.row)}
        rows={getBonusesRows()}
        getRowId={row => row.customBambooTableRowId}
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
        columns={bonusesColumns}
      />
    </Box>
  )
}
