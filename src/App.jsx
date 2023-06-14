import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { router } from './routes'
import { store } from '@/store'
import LoginDialog from '@/components/Core/LoginDialog'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LoginDialog />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}
