// ** React
import { ReactNode, useState } from 'react'

// ** Context
import { ModalContext } from '../modalContext'

// ** Hooks
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'

// ** Types
import { IDataForDialog, IModalType, IModalTypeDetailsEdits } from '../types'
import {
  IBonuses,
  IDepositAccounts,
  IEmployee,
  IEmployeeBenefit,
  IEmploymentStatus,
  IJobInfo,
  IReimbursement,
  ISalary,
  ISystemBenefit
} from '@/types/json'
import { validateUniqueIds } from '@/shared/utils/validateUniqueIds'

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useDataStateContext()
  const [typeModal, setTypeModal] = useState<IModalType>(null)
  const [typeModalDetailsEdit, setTypeModalDetailsEdit] = useState<IModalTypeDetailsEdits>(null)
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dataForDialog, setDataForDialog] = useState<IDataForDialog | null>(null)
  const handleClickOpenDialog = (
    typeModal: IModalType,
    item?:
      | IDataForDialog
      | IEmployee
      | ISystemBenefit
      | IJobInfo
      | IEmploymentStatus
      | ISalary
      | IDepositAccounts
      | IBonuses
      | IReimbursement
  ) => {
    switch (typeModal) {
      case 'Export data':
        {
          const updatedData = validateUniqueIds(data)

          setDataForDialog(JSON.stringify(updatedData, null, 2))
        }
        break
      case 'Import data':
        setDataForDialog(null)
        break
      case 'Edit user':
        setDataForDialog(item as IEmployee)
        break
      case 'Edit benefits':
        setDataForDialog(item as ISystemBenefit[])
        break
      case 'Details':
        setDataForDialog(item as IEmployee)
        break
      case 'Edit Details':
        setDataForDialog(item as IEmployeeBenefit[])
        setTypeModalDetailsEdit(typeModalDetailsEdit)
        break
      case 'Duplicate':
        setDataForDialog(null)
    }
    setDialogOpen(true)
    setTypeModal(typeModal)
  }
  const closeDialog = () => {
    setDialogOpen(false)
    // ** Возможно, тут нужен будет UseEffect и логика для удаления таймера )))0))0)
    setTimeout(() => {
      setTypeModal(null)
      setDataForDialog(null)
    }, 500)
  }

  return (
    <ModalContext.Provider
      value={{
        typeModal,
        typeModalDetailsEdit,
        closeDialog,
        dataForDialog,
        setDataForDialog,
        setTypeModal,
        setTypeModalDetailsEdit,
        isDialogOpen,
        setDialogOpen,
        handleClickOpenDialog
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
