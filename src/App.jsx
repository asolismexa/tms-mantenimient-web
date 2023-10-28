import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import theme from './theme'
import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { router } from './routes'
import { store } from '@/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es-mx'
import { SnackbarProvider } from 'notistack'
dayjs.extend(utc)

export default function App () {
  return (
    <Provider store={store}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateLibInstance={dayjs.utc}
        locale="es-mx"
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={10} autoHideDuration={3000}>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  )
}
