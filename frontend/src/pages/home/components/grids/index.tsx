// ** React
import { FC, useEffect, useRef } from 'react'

// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON } from '@/types/json'

// ** Columns
import { ColumnsEmployee, ColumnsBenefit, ColumnsTemplate } from './consts'

// ** Context
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'

// ** Hooks
import { useTabs } from '@/pages/home/hooks/useTabs'
import { useModal } from '@/pages/home/hooks/useModal'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { useNotification } from '@/pages/home/hooks/useNotification'

// ** Components
import { MyGrid } from '@/shared/components/grid'

// ** Utils
import { listTemplate } from '@/shared/utils/listTemplate'
import {
  saveEmployeeToLocalStorage,
  removeEmployeesFromLocalStorage
} from '@/services/storageService'

const LOCAL_STORAGE_KEY = 'savedEmployeesTab1'

const saveTab1ToLocalStorage = (employees: IEmployee[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees))
}

const restoreTab1FromLocalStorage = (): IEmployee[] | null => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  return item ? JSON.parse(item) : null
}

const clearTab1FromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

export const Grids: FC = () => {
  const { data, setData, seteIdSelectedEmployee } = useDataStateContext()
  const { handleClickOpenDialog, setDialogOpen } = useModal()
  const handleAddItem = useHandleAddItem()
  const handleDeleteItem = useHandleDeleteItem()
  const { showNotification } = useNotification()
  const { activeTab } = useTabs()

  const originalEmployeesTab3 = useRef<IEmployee[] | null>(null)

  useEffect(() => {
    setData((prev: ITypeJSON) => {
      if (activeTab === '3') {
        saveTab1ToLocalStorage(prev.employees)
        if (originalEmployeesTab3.current === null) {
          originalEmployeesTab3.current = [...prev.employees]
        }
        return {
          ...prev,
          employees: listTemplate().employees,
          benefits: prev.benefits
        }
      } else if (activeTab === '1') {
        const restoredEmployees = restoreTab1FromLocalStorage()
        if (restoredEmployees) {
          clearTab1FromLocalStorage()
          return {
            ...prev,
            employees: restoredEmployees,
            benefits: prev.benefits
          }
        }
      }
      return prev
    })
  }, [activeTab, setData])

  const deleteItem = (item: IEmployee | ISystemBenefit) => {
    if ('eId' in item) {
      handleDeleteItem({ id: item.eId, type: 'employees' })
    } else {
      handleDeleteItem({ id: item.id, type: 'benefits' })
    }
  }

  const addItem = (item: IEmployee | ISystemBenefit) => {
    if ('eId' in item) {
      handleAddItem({ item, type: 'employees' })
    } else {
      handleAddItem({ item, type: 'benefits' })
    }
  }

  const handleDuplicate = (employee: IEmployee) => {
    seteIdSelectedEmployee(employee.eId)
    handleClickOpenDialog('Duplicate', employee)
    setDialogOpen(true)
  }

  const saveLocalStorage = (employee: IEmployee) => {
    const message = saveEmployeeToLocalStorage(employee)
    showNotification(message.text, message.type)
    setDialogOpen(false)
  }
  const removeLocalStore = (employee: IEmployee) => {
    const message = removeEmployeesFromLocalStorage(employee.eId)
    showNotification(message.text, message.type)
    setDialogOpen(false)
    if (employee.firstName !== 'John') {
      handleDeleteItem({ id: employee.eId, type: 'employees' })
    }
  }

  const handleRowDoubleClickOpenDetails = (item: IEmployee) => {
    seteIdSelectedEmployee(item.eId)
    handleClickOpenDialog(activeTab === '1' || activeTab === '3' ? 'Details' : null, item)
  }

  const handleEditDialogOpen = (item: IEmployee | ISystemBenefit) => {
    handleClickOpenDialog(activeTab === '1' || activeTab === '3' ? 'Details' : 'Edit benefits', item)
  }

  const renderGrid = () => {
    switch (activeTab) {
      case '1': {
        const gridData = data.employees
        const gridColumns = ColumnsEmployee(handleEditDialogOpen, {
          openForm: handleRowDoubleClickOpenDetails,
          deleteItem,
          addItem,
          onDuplicate: handleDuplicate,
          saveEmployee: saveLocalStorage,
          removeEmployee: removeLocalStore
        })
        return (
          <MyGrid<IEmployee>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={handleRowDoubleClickOpenDetails}
          />
        )
      }
      case '2': {
        const gridData = data.benefits
        const gridColumns = ColumnsBenefit(handleEditDialogOpen, {
          openForm: handleEditDialogOpen,
          deleteItem,
          addItem
        })
        return (
          <MyGrid<ISystemBenefit>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={() => {}}
          />
        )
      }
      case '3': {
        const gridData = data.employees
        const gridColumns = ColumnsTemplate(
          handleEditDialogOpen,
          {
            openForm: handleRowDoubleClickOpenDetails,
            addItem,
            onDuplicate: handleDuplicate,
            saveEmployee: saveLocalStorage,
            removeEmployee: removeLocalStore
          },
          true
        )
        return (
          <MyGrid<IEmployee>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={handleRowDoubleClickOpenDetails}
          />
        )
      }
      default:
        return null
    }
  }

  return renderGrid()
}
