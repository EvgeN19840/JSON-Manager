// ** MyContextMenu Component
import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { GridRenderCellParams } from "@mui/x-data-grid";
import { IEmployee } from '@/const/types';

interface ContextMenuItem {
  name: string;
  callback: (params: GridRenderCellParams<IEmployee>) => void; 
  disabled?: boolean;
}

interface MyContextMenuProps {
  items: ContextMenuItem[];
  params: GridRenderCellParams<IEmployee>;
}

export const MyContextMenu: React.FC<MyContextMenuProps> = ({ items, params }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index) => {
          console.log(item.name); 

          return (
            <MenuItem
              key={index}
              onClick={() => {
                item.callback(params);
                handleClose(); 
              }}
              disabled={item.disabled}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
