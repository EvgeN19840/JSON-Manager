// ** MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleDeleteItem } from "@/hooks/useDelete";

// ** Types
import { IEmployeeBenefit } from "@/const/types";

// ** Const
import { ColumnsBenefit } from "./columnsBenefit";

// ** Context
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { IEmployeeDataForDialog } from "@/context/modal/types";
import { CustomFooter } from "@/shared/components/customFooter";
import { useDefaultEmployeeBenefit } from "@/hooks/useDefaultData";

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog, setTypeModalDetailsEdit, dataForDialog } =
    useModal();
  const dialogData = dataForDialog as { eId: number } | null;
  const { data } = useDataStateContext();
  const defaultValues = useDefaultEmployeeBenefit();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();

  const getBenefitRows = (): IEmployeeBenefit[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find((emp) => emp.eId === dialogData.eId);
      return employee?.benefits || [];
    }
    return [];
  };

  const handleEditClick = (data: IEmployeeBenefit) => {
    handleClickOpenDialog("Edit Details", data);
    setTypeModalDetailsEdit("Edit benefits details");
  };

  const addItem = (benefit: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleAddItem({
        item: benefit,
        type: "item",
        eId: dialogData.eId,
        nestedType: "benefits",
      });
    }
  };
  const deleteItem = (item: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleDeleteItem({
        id: item.id,
        type: "item",
        eId: (dataForDialog as IEmployeeDataForDialog).eId,
        nestedType: "benefits",
      });
    }
  };

  const callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit> = {
    openForm: (data) => handleEditClick(data),
    addItem: (data) => addItem(data),
    deleteItem: (data) => deleteItem(data),
  };

  const columns = ColumnsBenefit(
    (benefit) => handleEditClick(benefit),
    callbacks
  );
  const addNewRow = () => {
    handleClickOpenDialog("Edit Details", defaultValues);
    setTypeModalDetailsEdit("Edit benefits details");
  };
  return (
    <Box>
      <DataGrid<IEmployeeBenefit>
        rows={getBenefitRows()}
        columns={columns}
        pagination
        slots={{
          footer: () => <CustomFooter onAddEmptyRow={addNewRow} />,
        }}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </Box>
  );
};
