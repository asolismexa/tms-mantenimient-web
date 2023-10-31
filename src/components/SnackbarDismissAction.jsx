import IconButton from '@mui/material/IconButton'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'

export function SnackbarDismissAction ({ onClick }) {
  return (
    <IconButton color='inherit' onClick={onClick}>
      <DisabledByDefaultIcon />
    </IconButton>
  )
}
