import { useState } from 'react'
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

function NavItemCollapse({ label = '', children, icon = null }) {
  const [open, setOpen] = useState(true)

  const handleClick = () => setOpen(!open)

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List
          component="div"
          disablePadding
          sx={{
            pl: 4,
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  )
}

export default NavItemCollapse
