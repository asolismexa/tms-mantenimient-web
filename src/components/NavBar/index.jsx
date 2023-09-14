import { Box, Grid, Typography } from '@mui/material'
import TmsLogo from '../Core/TmsLogo'
import NavMenu from './NavMenu'
import { monitorPaths, queryPaths } from '@/routes'

function NavBar() {
  return (
    <Grid container>
      <Grid
        sx={{
          padding: '0.5rem',
        }}
        xs={2}
        item
      >
        <TmsLogo />
      </Grid>
      <Grid xs={8} item>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f7f7f7',
            border: '1px solid #7eabcd',
            gap: '0.5rem',
          }}
        >
          <NavMenu label="MONITOR" items={monitorPaths} />
          <NavMenu label="CONSULTA" items={queryPaths} />
        </Box>
      </Grid>
      <Grid
        sx={{
          padding: '0.5rem',
        }}
        xs={2}
        item
      >
        <Typography>
          Bienvenid&#64; {window?.App?.descriptor ?? 'Desconocido'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NavBar
