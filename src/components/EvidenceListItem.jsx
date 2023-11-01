import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { formatDate } from '@/utils/dates'

export function EvidenceListItem ({ src, date, onClick }) {
  return (
    <Box width={250} height={200}>
      <img
        onClick={onClick}
        src={src}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          borderRadius: '.2rem',
          cursor: 'pointer'
        }} />
      <Typography variant='caption'>{formatDate(date)}</Typography>
    </Box>
  )
}
