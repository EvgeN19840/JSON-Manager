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

export const Home: FC = () => {
  return (
    <DataStateProvider>
      <ModalProvider>
        <TabsProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              pl:'1rem',
            }}
          >
            <TabsComponent />

            <ImportExportButtons />

            <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
              <Grids />
            </Box>
            <Dialogs />
          </Box>
        </TabsProvider>
      </ModalProvider>
    </DataStateProvider>
  )
}
