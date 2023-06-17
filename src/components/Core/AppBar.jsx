import { Box, Typography, Avatar, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import TmsLogo from '@components/Core/TmsLogo'
import NavigationMenu from '@components/Core/NavigationMenu'
import { useSelector } from 'react-redux'
import { selectUser } from '@/reducers/authSlice'

export default function AppBar() {
  const user = useSelector(selectUser)

  return (
    <Box
      sx={{
        px: '1rem',
      }}
    >
      <Grid justifyContent="center" alignItems="center" container spacing={2.0}>
        {user && (
          <Box
            sx={{
              position: 'absolute',
              left: '2rem',
              top: '2rem',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar>{user.username.charAt(0)}</Avatar>
              <Typography variant="body1">{user.username}</Typography>
            </Stack>
          </Box>
        )}
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <TmsLogo />
          <NavigationMenu />
        </Grid>
      </Grid>
    </Box>
  )
}
