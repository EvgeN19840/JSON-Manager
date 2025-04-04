// ** MUI
import { Box, Typography } from '@mui/material'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'

// ** Types
import { IEmployee } from '@/types/json'

// ** Utils
import { currentData } from './utils'

// ** Components
import { EditButton } from '@/pages/home/components/dialogs/components/exportDataComponent/buttons/editButton'

export const PersonalTab: React.FC = () => {
  const { dataForDialog, handleClickOpenDialog } = useModal() as {
    dataForDialog: IEmployee
    handleClickOpenDialog: (dialogName: string, data?: IEmployee | null) => void
  }
  const { setTypeModalDetailsEdit } = useModal()

  const adjustedDataForDialog = {
    ...dataForDialog,
    number: dataForDialog.number === '' ? dataForDialog.eId : dataForDialog.number
  }
  const openEditDialog = () => {
    handleClickOpenDialog('Edit Details', dataForDialog)
    setTypeModalDetailsEdit('Edit Personal')
  }

  return (
    <Box
      sx={{
        padding: 1,
        border: '1px solid #ccc',
        borderRadius: 1,
        position: 'relative',
        pt: 7
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16
        }}
      >
        <EditButton onClick={openEditDialog} />
      </Box>
      {currentData(adjustedDataForDialog)
        .filter(item => item.title !== 'Employment Status')
        .map((item, index) => (
          <Box
            key={index}
            onDoubleClick={openEditDialog}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <Typography>{item.title}:</Typography>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
    </Box>
  )
}
