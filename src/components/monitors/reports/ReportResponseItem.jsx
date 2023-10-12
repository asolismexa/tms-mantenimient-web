import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export function ReportResponseItem({ id, error }) {
  return (
    <Stack key={id} direction="row" alignItems="center" gap={2}>
      {error ? (
        <HighlightOffIcon color="error" />
      ) : (
        <CheckCircleIcon color="success" />
      )}
      <Typography sx={{ my: 1 }} fontWeight="bold">
        #{id}
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Typography color="success">SE ASIGNO CORRECTAMENTE</Typography>
      )}
    </Stack>
  )
}
