import { Stack, Typography } from '@mui/material'

function LabelValue({ label = '', value = '' }) {
  return (
    <Stack sx={{ my: 2 }} spacing={1}>
      <Typography component="span" fontWeight="bold" variant="body2" noWrap>
        {label}
      </Typography>
      <Typography component="span" variant="body1">
        {value}
      </Typography>
    </Stack>
  )
}

export default LabelValue
