import { MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function NavMenuItem({ path = '', label = '', onClick = () => {} }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    onClick(e)
    navigate(path)
  }

  return <MenuItem onClick={handleClick}>{label}</MenuItem>
}

export default NavMenuItem
