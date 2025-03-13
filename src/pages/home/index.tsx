// ** React
import { FC } from 'react'

// ** MUI
import { Box } from '@mui/material'

// ** Components
import { Dialogs, Grids, ImportExportButtons, TabsComponent } from './components'

// ** Context
import { TabsProvider } from './context/tabs/provider'
import { ModalProvider } from './context/modal/provider'
import { DataStateProvider } from './context/dataState/provider'
import { NotificationProvider } from './context/snackBar/provider'

// ** Hooks
import { useTabs } from '@/hooks/useTabs'

export const Home: FC = () => {
  const { activeTab } = useTabs()
  return (
    <DataStateProvider>
      <NotificationProvider>
        <ModalProvider>
          <TabsProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 72px)',
                overflow: 'hidden',
                mt: 9
              }}
            >
              <TabsComponent />
              {activeTab !== '2' && <ImportExportButtons />}
              <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
                <Grids />
              </Box>
              <Dialogs />
            </Box>
          </TabsProvider>
        </ModalProvider>
      </NotificationProvider>
    </DataStateProvider>
  )
}
