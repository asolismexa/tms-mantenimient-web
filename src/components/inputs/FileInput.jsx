import { useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export function FileInput ({ children, buttonProps, onChange, value, multiple }) {
  const inputRef = useRef(null)
  const count = value?.length
  const handleClick = () => inputRef.current?.click()
  const handleChange = ({ target }) => {
    onChange(target.files || [])
  }

  return (
    <Box display='flex' alignItems='center' gap={1} margin={1}>
      <Button onClick={handleClick} {...buttonProps}>
       {children}
      </Button>
      { count && <Typography> x {count} </Typography> }
      <input ref={inputRef} type='file' multiple={multiple} onChange={handleChange} hidden />
    </Box>
  )
}
