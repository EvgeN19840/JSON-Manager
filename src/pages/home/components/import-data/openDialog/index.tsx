import { Button } from "@mui/material";
import { ITypeJSON } from "../../../const/types";
import { ImportData } from "../ui";

interface IOpenDialog {
  setData: (value: ITypeJSON) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  source: string;
  parsedData: string | null;
}

export const OpenDialog: React.FC<IOpenDialog> = ({
  setData,
  open,
  onOpen,
  onClose,
  source,
  parsedData,
}) => {
  return (
    <>
      <Button variant="contained" onClick={onOpen} >
        Import Employee Data
      </Button>
      {open && (
        <ImportData
          open={open}
          onClose={onClose}
          setData={setData}
          source={source}
          parsedData={parsedData}  
        />
      )}
    </>
  );
};
