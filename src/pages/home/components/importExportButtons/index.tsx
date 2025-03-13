// ** MUI
import { Box, Button } from '@mui/material'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { useTabs } from '../../hooks/useTabs'

export const ImportExportButtons: React.FC = () => {
  const { handleClickOpenDialog } = useModal()
  const { hasData } = useDataStateContext()
  const { activeTab } = useTabs()

  return (
    <>
      {activeTab !== '2' && (
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            justifyContent: 'space-between',
            '& .MuiButtonBase-root': {
              borderRadius: 0
            }
          }}
        >
          <Button
            variant='contained'
            onClick={() => handleClickOpenDialog('Import data')}
            sx={{ width: 'calc(50% - 0.5rem)' }}
          >
            Import JSON Data
          </Button>
          {hasData && (
            <Button
              variant='contained'
              onClick={() => handleClickOpenDialog('Export data')}
              sx={{ width: 'calc(50% - 0.5rem)' }}
            >
              Export
            </Button>
          )}
        </Box>
      )}
    </>
  )
}
