import AutoCompleteAsync from './AutoCompleteAsync'

function AutoCompleteDrivers({ onChange = null, value = null }) {
  return (
    <AutoCompleteAsync
      margin="normal"
      url={'/api/drivers'}
      label="Operador"
      value={value}
      onChange={onChange}
    />
  )
}

export default AutoCompleteDrivers
