import { List } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { useDispatch } from 'react-redux'
import { toggleSideBar } from '@/reducers/uiSlice'
import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'

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
    </List>
  )
}

export default NavMenu
