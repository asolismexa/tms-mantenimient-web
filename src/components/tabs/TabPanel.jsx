import Box from '@mui/material/Box'

export function TabPanel ({ index, value, children }) {
  return (
    <div hidden={index !== value} >
      <Box>
        {children}
      </Box>
    </div>
  )
}
