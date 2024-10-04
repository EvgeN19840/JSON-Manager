import { ITypeJSON } from "../../../const/types";
import { ImportData } from "../ui";

interface OpendialogProps {
  open: boolean;
  onClose: () => void;
  fromGrid?: boolean;
  setData: (value: ITypeJSON) => void;
}

export const Opendialog: React.FC<OpendialogProps> = ({
  open,
  onClose,
  fromGrid = false,
  setData,
}) => {
  return (
    <>
      <ImportData
        open={open}
        onClose={onClose}
        fromGrid={fromGrid}
        setData={setData}
      />
    </>
  );
};
