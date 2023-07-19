import { Stack, Typography } from '@mui/material'

function LabelValue({ label = '', value = '' }) {
  return (
    <Stack sx={{ my: 2 }} spacing={1}>
      <Typography fontWeight="bold" variant="body2" noWrap>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  )
}

export default LabelValue
