import AsyncSelectFilter from '@/components/Core/AsyncSelectFilter'
import Box from '@mui/material/Box'

export function SelectAsyncHeader({
  label,
  url,
  onChange,
  children,
  ...props
}) {
  return (
    <Box className="MuiDataGrid-columnHeaderTitle" sx={{ pr: 1 }}>
      <label style={{ display: 'block', width: '100%', textAlign: 'center' }}>
        <strong>{label}</strong>
        <AsyncSelectFilter
          url={url}
          onClick={(event) => event.stopPropagation()}
          onChange={onChange}
          {...props}
        />
      </label>
      <div style={{ color: 'blue', textAlign: 'center' }}>{children}</div>
    </Box>
  )
}
