import { Divider, ListItem, ListItemText, Typography } from '@mui/material'
import { formatDate } from '@/utils/dates'

export function ObservationListItem ({ observation }) {
  return (
    <ListItem>
      <ListItemText>
        <div
          dangerouslySetInnerHTML={{
            __html: observation.observationText
          }}
        ></div>
        <Typography textAlign="end" sx={{ display: 'block' }} variant="caption">
          {observation.user}
        </Typography>
        <Typography textAlign="end" sx={{ display: 'block' }} variant="caption">
          {formatDate(observation.createdAt)}
        </Typography>
        <Divider sx={{ my: 1 }} />
      </ListItemText>
    </ListItem>
  )
}
