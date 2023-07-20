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
  exclude = [-1],
  idOrdering = [],
  extendOptions = [],
}) {
  const [inputValue, setInputValue] = useState('')
  const { options, loading, setOpen, open } = useFetchOptions(url)

  const handleChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  const filterOptions = (options = []) =>
    options.filter((option) => !exclude.includes(option.id))

  const orderOptions = (options = []) => {
    if (idOrdering.length === 0) return options
    return options.sort((a, b) => {
      return idOrdering.indexOf(a.id) - idOrdering.indexOf(b.id)
    })
  }

  const extend = (options = []) => {
    if (extendOptions.length === 0) return options
    return [...options, ...extendOptions]
  }

  return (
    <Autocomplete
      sx={{ width: width ? width : 300 }}
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
      options={orderOptions(filterOptions(extend(options)))}
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
