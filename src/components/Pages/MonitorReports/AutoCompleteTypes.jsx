import { reportTypeBaseUrl } from '@/services/reportTypes'
import AutoCompleteAsync from '../../Core/AutoCompleteAsync'

function AutoCompleteTypes({ onChange = null, value = null, ...props }) {
  return (
    <AutoCompleteAsync
      margin="normal"
      url={reportTypeBaseUrl}
      label="TIPO DE FALLA"
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default AutoCompleteTypes
