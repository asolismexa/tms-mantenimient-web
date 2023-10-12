import { Box, Stack, Typography } from '@mui/material'
import tmsLogo from '../../assets/icons/tmsLOGSYS.png'

function TmsLogo() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.4}>
        <img width={50} height={50} src={tmsLogo} alt="Logo de TMS" />
        <Typography variant="h6" color="primary">
          tmsLOGSYS
        </Typography>
      </Stack>
    </Box>
  )
}

export default TmsLogo
