import Box from '@mui/material/Box'

export function CustomHeader({ title, children }) {
  return (
    <Box
      className="MuiDataGrid-columnHeaderTitle"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '200px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <strong>{title}</strong>
      </div>
      <div style={{ textAlign: 'center', color: 'blue' }}>{children}</div>
    </Box>
  )
}
