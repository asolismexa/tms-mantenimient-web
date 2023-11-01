import { List, Divider } from '@mui/material'
import ObservationItem from './ObservationItem'

function ObservationsList ({ observations }) {
  return (
    <List>
      {observations.map((observation) => (
        <div key={observation.id}>
          <ObservationItem observation={observation} />
          <Divider />
        </div>
      ))}
    </List>
  )
}

export default ObservationsList
