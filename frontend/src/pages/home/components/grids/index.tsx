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

// ** Components
import { MyGrid } from '@/shared/components/grid'
import { useHandleAddItem } from '@/pages/home/hooks/useAddItem'
import { useHandleDeleteItem } from '@/pages/home/hooks/useDelete'
import { saveEmployeeToLocalStorage, removeEmployeesFromLocalStorage } from '@/services/storageService'
import { useNotification } from '@/pages/home/hooks/useNotification'

// ** Utils
import { listTemplate } from '@/shared/utils/listTemplate'

export const Grids: FC = () => {
  const { data, setData, seteIdSelectedEmployee } = useDataStateContext()
  const { handleClickOpenDialog, setDialogOpen } = useModal()
  const handleAddItem = useHandleAddItem()
  const handleDeleteItem = useHandleDeleteItem()
  const { showNotification } = useNotification()
  const { activeTab } = useTabs()

  const originalEmployees = useRef<IEmployee[] | null>(null)

  useEffect(() => {
    if (activeTab === '3' && originalEmployees.current === null) {
      originalEmployees.current = [...data.employees]
    }
  }, [activeTab, data.employees])

  useEffect(() => {
    setData((prev: ITypeJSON) => {
      if (activeTab === '3') {
        return {
          ...prev,
          employees: listTemplate().employees,
          benefits: prev.benefits
        }
      } else if (activeTab === '1' && originalEmployees.current) {
        const restoredEmployees = [...(originalEmployees.current ?? [])]
        originalEmployees.current = null
        return {
          ...prev,
          employees: restoredEmployees,
          benefits: prev.benefits
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
      handleAddItem({ item: item, type: 'employees' })
    } else {
      handleAddItem({ item: item, type: 'benefits' })
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
          <MyGrid<IEmployee> data={gridData} columns={gridColumns} onRowDoubleClick={handleRowDoubleClickOpenDetails} />
        )
      }
      case '2': {
        const gridData = data.benefits
        const gridColumns = ColumnsBenefit(handleEditDialogOpen, {
          openForm: handleEditDialogOpen,
          deleteItem,
          addItem
        })

        return <MyGrid<ISystemBenefit> data={gridData} columns={gridColumns} onRowDoubleClick={() => {}} />
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
          <MyGrid<IEmployee> data={gridData} columns={gridColumns} onRowDoubleClick={handleRowDoubleClickOpenDetails} />
        )
      }
      default:
        return null
    }
  }

  return renderGrid()
}
