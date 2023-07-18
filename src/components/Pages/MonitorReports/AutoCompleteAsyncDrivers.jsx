import AutoCompleteAsync from '../../Core/AutoCompleteAsync'

function AutoCompleteDrivers({ onChange = null, value = null, ...props }) {
  return (
    <AutoCompleteAsync
      margin="normal"
      url={'/api/drivers'}
      label="OPERADOR"
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default AutoCompleteDrivers
