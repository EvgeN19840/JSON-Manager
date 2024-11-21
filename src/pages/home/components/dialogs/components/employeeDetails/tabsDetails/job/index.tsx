// ** React
import { useEffect, useState } from "react";

// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Types
import { IEmployee, IEmploymentStatus, IJobInfo, ISalary } from "@/const/types";
import { IModalTypeContext } from "@/context/modal/types";

// ** Context
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { ColumnsJobInfo } from "./columnsJob/jobInfo";
import { ColumnsSalary } from "./columnsJob/salaryInfo";
import { ColumnsEmploymentStatus } from "./columnsJob/statusInfo";

export const JobInfoTab: React.FC = () => {
  const { handleClickOpenDialog, setTypeModalDetailsEdit } =
    useModal() as IModalTypeContext;
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployee | null;
  };
  const { handleDeleteItem, handleAddItem } = useDataStateContext();

  const [jobInfoRows, setJobInfoRows] = useState<GridRowsProp<IJobInfo>>([]);
  const [employmentStatusRows, setEmploymentStatusRows] = useState<
    GridRowsProp<IEmploymentStatus>
  >([]);
  const [salaryRows, setSalaryRows] = useState<GridRowsProp<ISalary>>([]);

  // Populate rows based on `dataForDialog`
  useEffect(() => {
    if (dataForDialog) {
      setJobInfoRows(dataForDialog.jobInfo || []);
      setEmploymentStatusRows(dataForDialog.employmentStatus || []);
      setSalaryRows(dataForDialog.salary || []);
    }
  }, [dataForDialog]);

  // JobInfo callbacks
  const handleEditJobInfo = (data: IJobInfo) => {
    console.log("IJobInfo");
    // handleClickOpenDialog("Edit Details", data);
    // setTypeModalDetailsEdit("Edit job info details");
  };

  const addJobInfoItem = (item: IJobInfo) => {
    if (item.id && dataForDialog?.eId) {
      handleAddItem(item, "jobInfo", dataForDialog.eId);
      setJobInfoRows((prev) => [...prev, item]);
    }
  };

  const deleteJobInfoItem = (item: IJobInfo) => {
    if (item.customBambooTalbeRowId && dataForDialog?.eId) {
      handleDeleteItem(item.customBambooTalbeRowId, "item", dataForDialog.eId, "jobInfo");
      setJobInfoRows((prev) =>
        prev.filter(
          (row) => row.customBambooTalbeRowId !== item.customBambooTalbeRowId
        )
      );
    }
  };

  const jobInfoCallbacks: ContextMenuItemsCallbacks<IJobInfo> = {
    openForm: (data) => handleEditJobInfo(data),
    addItem: (data) => addJobInfoItem(data),
    deleteItem: (data) => deleteJobInfoItem(data),
  };

  const jobInfoColumns = ColumnsJobInfo(handleEditJobInfo, jobInfoCallbacks);

  const employmentStatusColumns = ColumnsEmploymentStatus(() => {},
  {} as ContextMenuItemsCallbacks<IEmploymentStatus>);

  const salaryColumns = ColumnsSalary(() => {},
  {} as ContextMenuItemsCallbacks<ISalary>);

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            mt: 1,
          }}
        >
          Employment Status
        </Typography>
        {employmentStatusRows.length ? (
          <DataGrid<IEmploymentStatus>
            rows={employmentStatusRows}
            columns={employmentStatusColumns}
            getRowId={(row) => row.customBambooTalbeRowId}
          />
        ) : (
          <DataGrid<IEmploymentStatus> columns={employmentStatusColumns} />
        )}
      </Box>

      <Box>
        <Typography
          sx={{
            textAlign: "center",
            mt: 1,
          }}
        >
          Salary Information
        </Typography>
        {salaryRows.length > 0 && (
          <DataGrid<ISalary>
            rows={salaryRows}
            columns={salaryColumns}
            getRowId={(row) => row.customBambooTalbeRowId}
          />
        )}
      </Box>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            mt: 1,
          }}
        >
          Job Information
        </Typography>
        {jobInfoRows.length ? (
          <DataGrid<IJobInfo>
            rows={jobInfoRows}
            columns={jobInfoColumns}
            getRowId={(row) => row.customBambooTalbeRowId}
          />
        ) : (
          <DataGrid<IJobInfo> columns={jobInfoColumns} />
        )}
      </Box>
    </Box>
  );
};
