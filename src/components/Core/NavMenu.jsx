import { List } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { useDispatch } from 'react-redux'
import { toggleSideBar } from '@/reducers/uiSlice'
import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'
import NavItemCollapse from './NavItemCollapse'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'

function NavMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <List>
      <NavItem
        label="Reportes"
        icon={<DescriptionIcon />}
        onClick={() => {
          dispatch(toggleSideBar())
          navigate('/reports')
        }}
      />
      <NavItemCollapse icon={<MonitorHeartIcon />} label="Monitores">
        <NavItem
          label="Reportes"
          icon={<DescriptionIcon />}
          onClick={() => {
            dispatch(toggleSideBar())
            navigate('/monitor/reports')
          }}
        />
      </NavItemCollapse>
    </List>
  )
}

export default NavMenu
