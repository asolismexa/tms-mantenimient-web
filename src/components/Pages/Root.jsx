import MainFooter from '@components/Core/MainFooter'
import AppBar from '@components/Core/AppBar'
import MainContainer from '@components/Core/MainContainer'
import { Outlet } from 'react-router-dom'
import LoginDialog from '@/components/Core/LoginDialog'

function Root() {
  return (
    <>
      <AppBar />
      <LoginDialog />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <MainFooter />
    </>
  )
}

export default Root
