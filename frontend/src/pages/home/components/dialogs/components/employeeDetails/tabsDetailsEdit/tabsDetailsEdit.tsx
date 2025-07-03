// ** MUI
import { Typography } from '@mui/material'

// ** Components
import { CustomDialog } from '@/shared/components/customDialog'
import {
  EditLoanSalaryAdvance,
  EditBonuses,
  EditDepositAccounts,
  EditDetailsBenefits,
  EditDeductions,
  EditPersonalTab,
  EditReimbursementTab,
  EmploymentStatus,
  JobInfo,
  Salary
} from '.'

// ** Hooks
import { useModal } from '@/pages/home/hooks'
import { EditFeesTab } from './editIncomes/editFees'

export const TabsDetailsEdit: React.FC = () => {
  const { typeModalDetailsEdit, isDialogOpen, closeDialog } = useModal()
  const renderTabContent = () => {
    switch (typeModalDetailsEdit) {
      case 'Edit benefits details':
        return <EditDetailsBenefits />
      case 'Edit Personal':
        return <EditPersonalTab />
      case 'Edit job':
        return <JobInfo />
      case 'Edit salary':
        return <Salary />
      case 'Edit status':
        return <EmploymentStatus />
      case 'Edit bonuses':
        return <EditBonuses />
      case 'Edit deposit accounts':
        return <EditDepositAccounts />
      case 'Edit reimbursements':
        return <EditReimbursementTab />
      case 'Edit fees':
        return <EditFeesTab />
      case 'Edit deductions':
        return <EditDeductions />
      case 'Edit loanOrAdvance':
        return <EditLoanSalaryAdvance />

      default:
        return <Typography>Select a tab to view details.</Typography>
    }
  }

  return (
    <CustomDialog onClose={closeDialog} open={isDialogOpen} maxWidth='sm'>
      {renderTabContent()}
    </CustomDialog>
  )
}
