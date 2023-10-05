import IconButton from '@mui/material/IconButton'

function CustomIconButton({ children, ...props }) {
  return (
    <IconButton
      color="primary"
      size="small"
      sx={{
        color: '#fff',
        backgroundColor: '#166ba2',
        ':hover': {
          backgroundColor: '#e9931a!important;',
        },
      }}
      {...props}
    >
      {children}
    </IconButton>
  )
}

export default CustomIconButton
