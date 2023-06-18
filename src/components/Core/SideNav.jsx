import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSideBar, toggleSideBar } from '@/reducers/uiSlice'
import { Box } from '@mui/material'
import NavMenu from './NavMenu'

export default function SideNav() {
  const dispatch = useDispatch()
  const sideBar = useSelector(selectSideBar)

  return (
    <div>
      <Drawer
        anchor="left"
        open={sideBar.open}
        onClose={() => dispatch(toggleSideBar())}
      >
        <Box width={250}>
          <NavMenu />
        </Box>
      </Drawer>
    </div>
  )
}
