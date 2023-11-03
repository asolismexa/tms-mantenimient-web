import SelectFilter from '@/components/Core/SelectFilter'
import Box from '@mui/material/Box'

export function SelectHeader ({ label, options = [], onChange, children }) {
  return (
    <Box className="MuiDataGrid-columnHeaderTitle" sx={{ pr: 1 }}>
      <label style={{ display: 'block', width: '100%' }}>
        <strong>{label}</strong>
        <SelectFilter
          options={options}
          onClick={(event) => event.stopPropagation()}
          onChange={onChange}
        />
      </label>
      <div style={{ color: 'blue', textAlign: 'center' }}>{children}</div>
    </Box>
  )
}
