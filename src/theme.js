import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#166ba2'
    },
    secondary: {
      main: '#e9931a'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white!important',
          backgroundColor: '#166ba2!important',
          borderRadius: '25px!important',
          border: '1px solid transparent !important',
          backgroundImage: 'none!important',
          padding: '0 0.3em',
          float: 'none!important',
          verticalAlign: 'middle!important',
          ':hover': {
            backgroundColor: '#e9931a!important;'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'tmsLOGSYS' && {
            padding: '7px!important',
            width: '32px!important',
            backgroundColor: '#166ba2!important',
            ':hover': {
              backgroundColor: ' #e9931a!important'
            }
          })
        })
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '12px!important',
          borderWidth: '0!important',
          textAlign: 'left!important',
          padding: '2px!important',
          verticalAlign: 'middle!important',
          fontFamily: 'Helvetica!important',
          whiteSpace: 'break-spaces!important',
          '.odd': {
            backgroundColor: '#F2F5F9!important'
          },
          '.consolidated': {
            color: 'blue!important',
            fontWeight: 'bold!important'
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#A5BBD5!important',
            border: '1px dotted gray!important'
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#eee!important',
            alignItems: 'start'
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'break-spaces!important',
            padding: '2px!important',
            minHeight: '4em!important'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold!important',
            overflow: 'hidden',
            lineHeight: '20px',
            whiteSpace: 'normal',
            height: '100%!important'
          },
          '.MuiDataGrid-columnHeaders': {}
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected && {
            backgroundColor: '#166ba2!important'
          }),
          ':hover': {
            backgroundColor: '#e9931a!important',
            color: 'white!important'
          }
        })
      }
    }
  }
})

export default theme
