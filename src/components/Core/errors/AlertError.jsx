import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export function AlertError({ title, message }) {
  return (
    <Alert severity="error" sx={{ mb: 1 }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  )
}
