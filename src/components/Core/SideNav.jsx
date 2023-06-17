import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectSideBar, toggleSideBar } from '@/reducers/uiSlice'
import { Box } from '@mui/material'

export default function SideNav() {
  const dispatch = useDispatch()
  const sideBar = useSelector(selectSideBar)
  console.log('sideBar', sideBar)
  return (
    <div>
      <Drawer
        anchor="left"
        open={sideBar.open}
        onClose={() => dispatch(toggleSideBar())}
      >
        <Box width={250}>
          <h1>SideNav</h1>
        </Box>
      </Drawer>
    </div>
  )
}
