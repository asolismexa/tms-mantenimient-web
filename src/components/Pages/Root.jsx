import MainFooter from '@components/Core/MainFooter'
import AppBar from '@components/Core/AppBar'
import MainContainer from '@components/Core/MainContainer'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import LoginDialog from '@/components/Core/LoginDialog'
import { store } from '@/store'

function Root() {
  return (
    <Provider store={store}>
      <AppBar />
      <LoginDialog />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <MainFooter />
    </Provider>
  )
}

export default Root
