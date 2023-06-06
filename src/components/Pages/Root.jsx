import MainFooter from '@components/Core/MainFooter'
import AppBar from '@components/Core/AppBar'
import MainContainer from '@components/Core/MainContainer'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
      <AppBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <MainFooter />
    </>
  )
}

export default Root
