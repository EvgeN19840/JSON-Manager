// ** MUI
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Components
import { CustomFooter } from '@/shared/components'

// ** Hooks
import { useDataStateContext, useHandleAddItem, useHandleDeleteItem, useModal } from '@/pages/home/hooks'

// ** Columns
import { ColumnsJobInfo } from './columnsJob/jobInfo'
import { ColumnsEmploymentStatus } from './columnsJob/statusInfo'
import { ColumnsSalary } from './columnsJob/salaryInfo'

// ** Types
import { IEmploymentStatus, IJobInfo, ISalary } from '@/types/json'
import { ContextMenuItemsCallbacks } from '@/shared/components/actionMenu/types'



export const JobInfoTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal()

  const dialogData = dataForDialog as { eId: number } | null
  const { data } = useDataStateContext()

  const handleDeleteItem = useHandleDeleteItem()
  const handleAddItem = useHandleAddItem()

  const getJobInfoRows = (): IJobInfo[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.jobInfo || []
    }
    return []
  }

  const getEmploymentStatusRows = (): IEmploymentStatus[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.employmentStatus || []
    }
    return []
  }

  const getSalaryRows = (): ISalary[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(emp => emp.eId === dialogData.eId)
      return employee?.salary || []
    }
    return []
  }

  const jobInfoCallbacks: ContextMenuItemsCallbacks<IJobInfo> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit job')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'jobInfo'
        })
      }
    },

    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'jobInfo'
        })
      }
    }
  }

  const employmentStatusCallbacks: ContextMenuItemsCallbacks<IEmploymentStatus> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit status')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'employmentStatus'
        })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'employmentStatus'
        })
      }
    }
  }

  const salaryCallbacks: ContextMenuItemsCallbacks<ISalary> = {
    openForm: data => {
      handleClickOpenDialog('Edit Details', data)
      setTypeModalDetailsEdit('Edit salary')
    },
    addItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'salary'
        })
      }
    },
    deleteItem: data => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: 'item',
          eId: dialogData.eId,
          nestedType: 'salary'
        })
      }
    }
  }
  const jobInfoColumns = ColumnsJobInfo(jobInfoCallbacks.openForm, jobInfoCallbacks)
  const employmentStatusColumns = ColumnsEmploymentStatus(employmentStatusCallbacks.openForm, employmentStatusCallbacks)
  const salaryColumns = ColumnsSalary(salaryCallbacks.openForm, salaryCallbacks)
  const addNewRow = (type: 'job' | 'status' | 'salary') => {
    handleClickOpenDialog('Edit Details')
    setTypeModalDetailsEdit(`Edit ${type}`)
  }
  return (
    <Box>
      <Box>
        <Typography
          sx={{ textAlign: 'center', mb: 1, mt: 2, fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}
        >
          Employment Status
        </Typography>
        <DataGrid<IEmploymentStatus>
          onRowDoubleClick={params => employmentStatusCallbacks.openForm(params.row)}
          rows={getEmploymentStatusRows()}
          columns={employmentStatusColumns}
          getRowId={row => row.customBambooTableRowId}
          pagination
          slots={{
            footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('status')} />
          }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 }
            }
          }}
        />
      </Box>

      <Box>
        <Typography
          sx={{ textAlign: 'center', mb: 1, mt: 2, fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}
        >
          Salary Information
        </Typography>
        <DataGrid<ISalary>
          onRowDoubleClick={params => salaryCallbacks.openForm(params.row)}
          rows={getSalaryRows()}
          columns={salaryColumns}
          getRowId={row => row.customBambooTableRowId}
          pagination
          slots={{
            footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('salary')} />
          }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 }
            }
          }}
        />
      </Box>

      <Box>
        <Typography
          sx={{ textAlign: 'center', mb: 1, mt: 2, fontSize: '1.1rem', fontWeight: 500, color: 'text.secondary' }}
        >
          Job Information
        </Typography>
        <DataGrid<IJobInfo>
          onRowDoubleClick={params => jobInfoCallbacks.openForm(params.row)}
          rows={getJobInfoRows()}
          columns={jobInfoColumns}
          getRowId={row => row.customBambooTableRowId}
          pagination
          slots={{
            footer: () => <CustomFooter onAddEmptyRow={() => addNewRow('job')} />
          }}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 }
            }
          }}
        />
      </Box>
    </Box>
  )
}
