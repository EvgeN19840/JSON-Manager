import { ImportData } from "../ui";

interface OpendialogProps {
  open: boolean;
  onClose: () => void;
  fromGrid?: boolean;
}

export const Opendialog: React.FC<OpendialogProps> = ({
  open,
  onClose,
  fromGrid = false,
}) => {
  return (
    <>

      <ImportData
        open={open} 
        onClose={onClose} 
        fromGrid={fromGrid}
        setData={(data) => console.log("Data imported:", data)}
   />
    </>
  );
};
