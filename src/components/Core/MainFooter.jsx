import { Box, Typography } from '@mui/material'

export default function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        paddingY: '2rem',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Powered by Logsys &copy; 2023 Technology Solutions
      </Typography>
    </Box>
  )
}
