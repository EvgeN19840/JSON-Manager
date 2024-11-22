// ** MUI
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleDeleteItem } from "@/hooks/useDelete";
import { useHandleAddItem } from "@/hooks/useAddItem";

// ** Types
import { IEmploymentStatus, IJobInfo, ISalary } from "@/const/types";

// ** Context
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { ColumnsJobInfo } from "./columnsJob/jobInfo";
import { ColumnsSalary } from "./columnsJob/salaryInfo";
import { ColumnsEmploymentStatus } from "./columnsJob/statusInfo";

export const JobInfoTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } = useModal();

const dialogData = dataForDialog as { eId: number } | null;
  const { data } = useDataStateContext();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();

  const getJobInfoRows = (): IJobInfo[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(
        (emp) => emp.eId === dialogData.eId
      );
      return employee?.jobInfo || [];
    }
    return [];
  };

  const getEmploymentStatusRows = (): IEmploymentStatus[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(
        (emp) => emp.eId === dialogData.eId
      );
      return employee?.employmentStatus || [];
    }
    return [];
  };

  const getSalaryRows = (): ISalary[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find(
        (emp) => emp.eId === dialogData.eId
      );
      return employee?.salary || [];
    }
    return [];
  };

  const jobInfoCallbacks: ContextMenuItemsCallbacks<IJobInfo> = {
    openForm: (data) => {
      handleClickOpenDialog("Edit Details", data);
    setTypeModalDetailsEdit("Edit benefits details");
    },
    addItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: "item",
          eId: dialogData.eId,
          nestedType: "jobInfo",
        });
      }
    },

    deleteItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTalbeRowId,
          type: "item",
          eId: dialogData.eId,
          nestedType: "jobInfo",
        });
      }
    },
  };

  const employmentStatusCallbacks: ContextMenuItemsCallbacks<IEmploymentStatus> =
    {
      openForm: (data) => {
        handleClickOpenDialog("Edit Details", data);
      },
      addItem: (data) => {
        if (dataForDialog && dialogData?.eId) {
          handleAddItem({
            item: data,
            type: "item",
            eId: dialogData.eId,
            nestedType: "employmentStatus",
          });
        }
      },
      deleteItem: (data) => {
        if (dataForDialog && dialogData?.eId) {
          handleDeleteItem({
            id: data.customBambooTalbeRowId,
            type: "item",
            eId: dialogData.eId,
            nestedType: "employmentStatus",
          });
        }
      },
    };

  const salaryCallbacks: ContextMenuItemsCallbacks<ISalary> = {
    openForm: (data) => {
      handleClickOpenDialog("Edit Details", data);
    },
    addItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: "item",
          eId: dialogData.eId,
          nestedType: "salary",
        });
      }
    },
    deleteItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTalbeRowId,
          type: "item",
          eId: dialogData.eId,
          nestedType: "salary",
        });
      }
    },
  };

  // Columns
  const jobInfoColumns = ColumnsJobInfo(
    jobInfoCallbacks.openForm,
    jobInfoCallbacks
  );
  const employmentStatusColumns = ColumnsEmploymentStatus(
    employmentStatusCallbacks.openForm,
    employmentStatusCallbacks
  );
  const salaryColumns = ColumnsSalary(
    salaryCallbacks.openForm,
    salaryCallbacks
  );

  return (
    <Box>
      <Box>
        <Typography sx={{ textAlign: "center", mt: 1 }}>
          Employment Status
        </Typography>
        <DataGrid<IEmploymentStatus>
          rows={getEmploymentStatusRows()}
          columns={employmentStatusColumns}
          getRowId={(row) => row.customBambooTalbeRowId}
        />
      </Box>

      <Box>
        <Typography sx={{ textAlign: "center", mt: 1 }}>
          Salary Information
        </Typography>
        <DataGrid<ISalary>
          rows={getSalaryRows()}
          columns={salaryColumns}
          getRowId={(row) => row.customBambooTalbeRowId}
        />
      </Box>

      <Box>
        <Typography sx={{ textAlign: "center", mt: 1 }}>
          Job Information
        </Typography>
        <DataGrid<IJobInfo>
          rows={getJobInfoRows()}
          columns={jobInfoColumns}
          getRowId={(row) => row.customBambooTalbeRowId}
        />
      </Box>
    </Box>
  );
};
