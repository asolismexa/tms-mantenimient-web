import Box from '@mui/material/Box'

function InputTextHeader({ label, children, onChange }) {
  return (
    <Box className="MuiDataGrid-columnHeaderTitle" sx={{ pr: 1 }}>
      <label style={{ display: 'block', width: '100%' }}>
        <strong>{label}</strong>
        <input
          type="text"
          onClick={(event) => event.stopPropagation()}
          onChange={onChange}
          style={{
            display: 'block',
            width: '100%',
            outline: 'none',
          }}
        />
      </label>
      <div style={{ color: 'blue', textAlign: 'center' }}>{children}</div>
    </Box>
  )
}

export default InputTextHeader
