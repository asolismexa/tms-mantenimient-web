import { createTheme } from '@mui/material'
import validationInputBg from './assets/icons/validationInputBg.png'

const theme = createTheme({
  palette: {
    primary: {
      main: '#166ba2',
    },
    secondary: {
      main: '#e9931a',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#166ba2',
          borderRadius: '25px',
          ':hover': {
            backgroundColor: '#e9931a',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'tmsLOGSYS' && {
            padding: '7px!important',
            width: '32px!important',
            backgroundColor: '#166ba2!important',
            ':hover': {
              backgroundColor: ' #e9931a!important',
            },
          }),
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          whiteSpace: 'break-spaces!important',
          '.odd': {
            backgroundColor: '#F2F5F9!important',
          },
          '.consolidated': {
            color: 'blue!important',
            fontWeight: 'bold!important',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#A5BBD5',
            border: '1px dotted gray!important',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#eee!important',
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            'align-items': 'start',
            whiteSpace: 'break-spaces!important',
            padding: '2px!important',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold!important',
            overflow: 'hidden',
            lineHeight: '20px',
            whiteSpace: 'normal',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected && {
            backgroundColor: '#166ba2!important',
          }),
          ':hover': {
            backgroundColor: '#e9931a!important',
            color: 'white!important',
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        background: `#fff url(/assets/icons/${validationInputBg}) repeat-x top left !important`,
        root: {},
      },
    },
  },
})

export default theme
