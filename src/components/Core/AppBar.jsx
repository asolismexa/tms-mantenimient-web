import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logOutUser } from '@/reducers/authSlice'
import { Stack } from '@mui/material'
import { toggleSideBar, closeSideBar } from '@/reducers/uiSlice'
import SideNav from './SideNav'

export default function MenuAppBar() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useSelector(selectUser)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    dispatch(closeSideBar())
    handleClose()
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleSideBar())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mantenimiento
          </Typography>
          {user && (
            <div>
              <Stack direction="row" alignItems="center">
                <Typography>{user.username}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Stack>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Salir</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <SideNav />
    </>
  )
}
