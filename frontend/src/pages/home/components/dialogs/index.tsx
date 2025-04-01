// ** Components
import { CustomDialog } from '@/shared/components'
import {
  ExportDataComponent,
  ImportDataComponent,
  EditBenefits,
  TabsDetails,
  TabsDetailsEdit,
  DuplicateEmployee
} from './components'

// ** Hooks
import { useModal } from '@/pages/home/hooks/useModal'

export const Dialogs: React.FC = () => {
  const { typeModal, isDialogOpen, closeDialog } = useModal()
  const renderContent = () => {
    switch (typeModal) {
      case 'Export data':
        return <ExportDataComponent />
      case 'Import data':
        return <ImportDataComponent />
      case 'Edit benefits':
        return <EditBenefits />
      case 'Details':
        return <TabsDetails />
      case 'Edit Details':
        return <TabsDetailsEdit />
      case 'Duplicate':
        return <DuplicateEmployee />

      default:
        return null
    }
  }

  const maxWidth = typeModal === 'Details' ? 'xl' : 'sm'

  return (
    <CustomDialog onClose={closeDialog} open={isDialogOpen} maxWidth={maxWidth}>
      {renderContent()}
    </CustomDialog>
  )
}
