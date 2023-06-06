import { createBrowserRouter } from 'react-router-dom'
import ReportsPage from '@components/Pages/ReportsPage'
import Root from '@components/Pages/Root'
import ErrorPage from './components/Pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/reports',
        element: <ReportsPage />,
      },
    ],
  },
])
