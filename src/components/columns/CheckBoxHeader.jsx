import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'

export function CheckBoxHeader({ label, children, onChange }) {
  return (
    <Box className="MuiDataGrid-columnHeaderTitle" sx={{ pr: 1 }}>
      <label style={{ display: 'block', width: '100%', textAlign: 'center' }}>
        <strong>{label}</strong>
        <Checkbox
          onClick={(event) => event.stopPropagation()}
          onChange={onChange}
          size="small"
          sx={{
            width: '100%',
            padding: 0,
          }}
        />
      </label>
      <div style={{ color: 'blue', textAlign: 'center' }}>{children}</div>
    </Box>
  )
}
