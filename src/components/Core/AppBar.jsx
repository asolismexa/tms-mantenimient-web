import { Box } from '@mui/material'
import NavBar from '../NavBar'

export default function MenuAppBar () {
  return (
    <Box
      sx={{
        zIndex: '1000',
        height: '65px',
        borderBottom: '1px solid #7eabcd'
      }}
    >
      <NavBar />
    </Box>
  )
}
