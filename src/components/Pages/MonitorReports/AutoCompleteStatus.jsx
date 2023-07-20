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
      idOrdering={[1, 2, 5, 3, 4, 6, 8]}
      {...props}
    />
  )
}

export default AutoCompleteStatus
