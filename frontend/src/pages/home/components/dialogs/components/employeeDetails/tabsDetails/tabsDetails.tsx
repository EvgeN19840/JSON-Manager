// ** MUI Components
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { Box, Typography } from '@mui/material'

// ** Hooks
import { useModal, useTabs } from '@/pages/home/hooks'

// ** Components
import {
  PersonalTab,
  BenefitsTab,
  JobInfoTab,
  DepositAccountTab,
  DeductionsAndLoansTab,
  BonusesTab,
  Customincomes
} from './index'

// ** Types
import { IEmployee } from '@/types/json'


export const TabsDetails = () => {
  const { activeDetailTab, handleDetailTabChange } = useTabs()
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployee | null
  }

  const renderTabContent = () => {
    switch (activeDetailTab) {
      case '1':
        return <PersonalTab />
      case '2':
        return <JobInfoTab />
      case '3':
        return <DepositAccountTab />
      case '4':
        return <Customincomes />
      case '5':
        return <DeductionsAndLoansTab />
      case '6':
        return <BenefitsTab />
      case '7':
        return <BonusesTab />
    }
  }

  return (
    <Box>
      <Typography variant='h6' sx={{mt:3, textAlign: 'center' }}>
        {`Details of Employee: ${dataForDialog?.firstName || ''} ${dataForDialog?.lastName || ''}`}
      </Typography>
      <TabContext value={activeDetailTab}>
        <TabList
          sx={{
            mb: '1rem',
            '& .MuiTabs-flexContainer': {
              gap: '1rem'
            },
            '& .Mui-selected': {
              outline: 'none'
            }
          }}
          onChange={handleDetailTabChange}
          variant='fullWidth'
          aria-label='details-tabs'
        >
        <Tab label='Personal' value='1' sx={{ ml: 1 }} />
          <Tab label='Job' value='2' />
          <Tab label='Deposit accounts' value='3' />
          <Tab label='Custom incomes' value='4' />
          <Tab label='Custom deductions' value='5' />
          <Tab label='Benefits' value='6' />
          <Tab label='Bonus' value='7' sx={{ mr: 1 }}/>
        </TabList>
      </TabContext>
      <Box m={1}>{renderTabContent()}</Box>
    </Box>
  )
}
export { PersonalTab }
