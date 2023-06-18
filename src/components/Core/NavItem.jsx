import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'

function NavItem({ onClick, icon, label }) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default NavItem
