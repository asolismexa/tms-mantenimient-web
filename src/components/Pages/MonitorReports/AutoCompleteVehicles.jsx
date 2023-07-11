import { baseUrl } from '@/services/vehicles'
import AutoCompleteAsync from './AutoCompleteAsync'

function AutoCompleteVehicles({ onChange, value, ...props }) {
  return (
    <AutoCompleteAsync
      margin="normal"
      url={baseUrl}
      label="UNIDAD"
      nameKey="alias"
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default AutoCompleteVehicles
