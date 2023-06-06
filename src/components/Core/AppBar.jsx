import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import TmsLogo from '@components/Core/TmsLogo'
import NavigationMenu from '@components/Core/NavigationMenu'

export default function AppBar() {
  return (
    <Box
      sx={{
        padding: '1rem',
      }}
    >
      <Grid
        justifyContent="center"
        alignContent="center"
        container
        spacing={2.0}
      >
        <TmsLogo />
        <Grid>
          <NavigationMenu />
        </Grid>
      </Grid>
    </Box>
  )
}
