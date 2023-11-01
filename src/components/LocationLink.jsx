import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export function LocationLink ({ lat, lon, children }) {
  return (
    <Link
      target="_blank"
      href={`https://www.google.com/maps/search/?api=1&query=${lon}%2C${lat}`}
    >
      <Typography variant="body1">
        {children}
      </Typography>
    </Link>
  )
}
