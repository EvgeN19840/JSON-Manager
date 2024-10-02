 import Dialog from "@mui/material/Dialog";
  import DialogTitle from "@mui/material/DialogTitle";
import { MyGrid } from "../../grid";
import { ITypeJSON } from "../../../const/types";
import { useState } from "react";


export interface DialogContentProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const SetDataJSON = (props: DialogContentProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<ITypeJSON | null>(null);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Title</DialogTitle>
      <MyGrid data={data} />
    
    </Dialog>
  );
};



// import Avatar from "@mui/material/Avatar";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";

// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
// import { blue } from "@mui/material/colors";

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List> */}