// ** React
import { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ** Styles
import { DrawerStyled, DrawerFooter } from './style'

// ** Mui
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// ** Constants
import { PAGES_CONFIG } from '@/constants/pages'

export const Navigation: FC = () => {
  const location = useLocation()
  const [open, setOpen] = useState(true)

  const handleToggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <DrawerStyled variant='permanent' open={open}>
      <List>
        {Object.values(PAGES_CONFIG).map(page => {
          const isActive = location.pathname === page.route
          return (
            <div key={page.key}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={page.route}
                  disabled={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={page.name}
                      sx={{
                        opacity: open ? 1 : 0,
                        width: open ? 'auto' : 0
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </List>
      <DrawerFooter open={open}>
        <IconButton onClick={handleToggleDrawer}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </DrawerFooter>
    </DrawerStyled>
  )
}
