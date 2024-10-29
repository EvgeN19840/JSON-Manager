// ** React
import React, { Fragment } from "react";

// ** MUI
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ** Types
import { MyContextMenuProps } from "./types";

export const MyContextMenu: React.FC<MyContextMenuProps> = ({
  items,
  params,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton size="small" disabled={disabled} onClick={handleContextMenu}>
        <MoreVertIcon>dots-vertical</MoreVertIcon>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.callback(params);
              handleClose();
            }}
            disabled={item.disabled ?? false}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
