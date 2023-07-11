import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import useFetchOptions from '@/hooks/fetchOptions'

export default function AutoCompleteAsync({
  url,
  label,
  onChange,
  value,
  nameKey,
  disabled,
  inputProps,
  width,
}) {
  const [inputValue, setInputValue] = useState('')
  const { options, loading, setOpen, open } = useFetchOptions(url)

  const handleChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  return (
    <Autocomplete
      sx={{ width: width? width : 300 }}
      disabled={disabled}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={onChange}
      value={value}
      onInputChange={handleChange}
      inputValue={inputValue}
      options={options}
      loading={loading}
      getOptionLabel={(option) => {
        return option.name ? option.name : option[nameKey]
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`${option.id}${option.name}`}>
            {option.name ? option.name : option[nameKey]}
          </li>
        )
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          label={label}
          placeholder="TODOS"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}
