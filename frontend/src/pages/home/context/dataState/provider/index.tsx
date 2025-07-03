// ** React
import { ReactNode, useState } from 'react'

// ** Context
import { DataStateContext } from '../dataStateContext'

// ** Utils
import { assignMissingIds } from '@/shared/utils'

// ** Types
import { IEmployee, IEmployeeBenefit, ISystemBenefit, ITypeJSON } from '@/types/json'

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ITypeJSON>({
    employees: [],
    benefits: []
  })
  const [countDuplicates, setCountDuplicates] = useState<string>('1')
  const [parsedData, setParsedData] = useState<string | null>(null)
  const [eIdSelectedEmployee, seteIdSelectedEmployee] = useState<number>(0)
  const handleSaveBenefit = (value: ISystemBenefit) => {
    setData(prevData => {
      const benefitIndex = prevData.benefits.findIndex(ben => ben.id === value.id)
      const updatedBenefits = [...prevData.benefits]

      if (benefitIndex !== -1) {
        updatedBenefits[benefitIndex] = value
      } else {
        updatedBenefits.push(value)
      }
      return {
        ...prevData,
        benefits: updatedBenefits
      }
    })
  }

  const handleSaveData = <
    T extends Partial<{
      id: string | number
      eId: number
      customBambooTableRowId: number | string
    }>
  >(
    value: T,
    type:
      | 'employeeBenefit'
      | 'depositAccounts'
      | 'bonuses'
      | 'personal'
      | 'jobInfo'
      | 'salary'
      | 'employmentStatus'
      | 'reimbursements'
      | 'otherDeductions'
      | 'loansAndSalaryAdvances'
      |'fees'
  ) => {
    setData(prevData => {
      return {
        ...prevData,
        employees: prevData.employees.map(employee => {
          if (employee.eId !== eIdSelectedEmployee) return employee
          if (!value.customBambooTableRowId) {
            value.customBambooTableRowId = assignMissingIds(
              prevData,
              'employees',
              employee.eId,
              type as keyof IEmployee,
              'customBambooTableRowId'
            )
          }
          const checkArray = <Field extends keyof IEmployee>(
            arrayField: Field,
            employee: IEmployee
          ): IEmployee[Field] => {
            const fieldArray = employee[arrayField] as IEmployee[Field]

            if (!Array.isArray(fieldArray)) {
              throw new Error(`Expected an array for field: ${String(arrayField)}`)
            }

            const normalizedValueId = Number(value.customBambooTableRowId)

            const updatedArray = fieldArray.map(item => {
              if (type === 'employeeBenefit' && (item as IEmployeeBenefit).id === value.id) {
                return { ...item, ...value }
              }

              if (
                type !== 'employeeBenefit' &&
                Number((item as { customBambooTableRowId: number }).customBambooTableRowId) === normalizedValueId
              ) {
                return { ...item, ...value }
              }
              return item
            })

            const itemExists = updatedArray.some(item =>
              type === 'employeeBenefit'
                ? (item as IEmployeeBenefit).id === value.id
                : Number((item as { customBambooTableRowId: number }).customBambooTableRowId) === normalizedValueId
            )

            if (!itemExists) {
              updatedArray.push(value as (typeof fieldArray)[number])
            }
            return updatedArray as IEmployee[Field]
          }

          switch (type) {
            case 'jobInfo':
              return {
                ...employee,
                jobInfo: checkArray('jobInfo', employee)
              }
            case 'salary':
              return {
                ...employee,
                salary: checkArray('salary', employee)
              }
            case 'employmentStatus':
              return {
                ...employee,
                employmentStatus: checkArray('employmentStatus', employee)
              }
            case 'personal':
              return {
                ...employee,
                ...value,
                salary: employee.salary,
                jobInfo: employee.jobInfo,
                employmentStatus: employee.employmentStatus,
                benefits: employee.benefits,
                bonuses: employee.bonuses,
                depositAccounts: employee.depositAccounts,
                reimbursements: employee.reimbursements,
                fees:employee.fees,
                otherDeductions: employee.otherDeductions,
                loansAndSalaryAdvances: employee.loansAndSalaryAdvances
              }
            case 'employeeBenefit':
              return {
                ...employee,
                benefits: checkArray('benefits', employee)
              }
            case 'bonuses':
              return {
                ...employee,
                bonuses: checkArray('bonuses', employee)
              }
            case 'depositAccounts':
              return {
                ...employee,
                depositAccounts: checkArray('depositAccounts', employee)
              }
            case 'reimbursements':
              return {
                ...employee,
                reimbursements: checkArray('reimbursements', employee)
              }
                          case 'fees':
              return {
                ...employee,
                fees: checkArray('fees', employee)
              }
            case 'otherDeductions':
              return {
                ...employee,
                otherDeductions: checkArray('otherDeductions', employee)
              }
            case 'loansAndSalaryAdvances':
              return {
                ...employee,
                loansAndSalaryAdvances: checkArray('loansAndSalaryAdvances', employee)
              }
            default:
              return employee
          }
        })
      }
    })
  }

  const hasData = !!(data?.benefits?.length || data?.employees?.length)

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        countDuplicates,
        setCountDuplicates,
        parsedData,
        eIdSelectedEmployee,
        seteIdSelectedEmployee,
        setParsedData,
        handleSaveBenefit,
        handleSaveData,
        hasData
      }}
    >
      {children}
    </DataStateContext.Provider>
  )
}
