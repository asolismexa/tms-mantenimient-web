import AutoCompleteAsync from './AutoCompleteAsync'

function AutoCompleteTypes({ onChange = null, value = null }) {
  return (
    <AutoCompleteAsync
      margin="normal"
      url={'/api/reports/types'}
      label="TIPO DE FALLA"
      value={value}
      onChange={onChange}
    />
  )
}

export default AutoCompleteTypes
