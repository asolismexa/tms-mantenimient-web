import { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@mui/material'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import NavLink from '@components/Core/NavLink'

function NavigationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleClick} color="primary">
        <ArrowDropDownCircleIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <NavLink to="reports">
          <MenuItem onClick={handleClose}>Reportes</MenuItem>
        </NavLink>
      </Menu>
    </div>
  )
}

export default NavigationMenu
