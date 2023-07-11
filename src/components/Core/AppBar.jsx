import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Stack } from '@mui/material'
import { toggleSideBar } from '@/reducers/uiSlice'
import SideNav from './SideNav'
import { useDispatch } from 'react-redux'

export default function MenuAppBar() {
  const dispatch = useDispatch()

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
          {window.App?.descriptor && (
            <div>
              <Stack direction="row" alignItems="center">
                <Typography>{window.App?.descriptor}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Stack>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <SideNav />
    </>
  )
}
