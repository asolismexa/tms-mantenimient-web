import AutoCompleteAsync from '../../Core/AutoCompleteAsync'
import { reportStatusUrl } from '@/services/reportStatus'

function AutoCompleteStatus({ onChange, value, ...props }) {
  return (
    <AutoCompleteAsync
      width="100%"
      margin="small"
      url={reportStatusUrl}
      label="ESTATUS"
      nameKey="name"
      value={value}
      onChange={onChange}
      inputProps={{
        size: 'small',
      }}
      exclude={[1, 2, 5]}
      {...props}
    />
  )
}

export default AutoCompleteStatus
