import { ListItem, ListItemText, Typography } from '@mui/material'
import { formatDate } from '@/utils/dates'

function ObservationItem({ observation }) {
  return (
    <ListItem>
      <ListItemText>
        {observation.observation_text}
        <Typography textAlign="end" sx={{ display: 'block' }} variant="caption">
          {observation.user}
        </Typography>
        <Typography textAlign="end" sx={{ display: 'block' }} variant="caption">
          {formatDate(observation.time)}
        </Typography>
      </ListItemText>
    </ListItem>
  )
}

export default ObservationItem
