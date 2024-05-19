import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { OT_STATUS } from '../constants'

export default function StatusInput({ value, onChange, isLoading }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="status">ESTADO</InputLabel>
      <Select
        labelId="status"
        label="ESTADO"
        value={value}
        onChange={onChange}
        disabled={isLoading}
        endAdornment={isLoading && <CircularProgress size={20} />}
      >
        {Object.entries(OT_STATUS).map(([name, value]) => {
          return (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
