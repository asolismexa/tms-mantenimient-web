import { Box } from '@mui/material'
import NavBar from '../NavBar'

export default function MenuAppBar () {
  return (
    <Box
      sx={{
        flex: 1,
        zIndex: '1000',
        height: '65px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #7eabcd'
      }}
    >
      <NavBar />
    </Box>
  )
}
