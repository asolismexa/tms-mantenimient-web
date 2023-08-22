import { Box } from '@mui/material'
import NavBar from '../NavBar'

export default function MenuAppBar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: '1000',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderBottom: '1px solid #7eabcd',
      }}
    >
      <NavBar />
    </Box>
  )
}
