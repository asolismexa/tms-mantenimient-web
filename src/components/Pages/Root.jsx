import MainFooter from '@components/Core/MainFooter'
import AppBar from '@components/Core/AppBar'
import MainContainer from '@components/Core/MainContainer'
import { Outlet, useSearchParams } from 'react-router-dom'

function Root() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const descriptor = searchParams.get('descriptor')

  if (window.App && window.App.token) {
    console.log('El token ya existe por lo tanto se almaceno en window')
    console.log('Token almacenado: ' + window.App.token)
    console.log('Descriptor almacenado: ' + window.App.descriptor)
  } else {
    window.App = {
      token,
      descriptor,
    }

    console.log('El token no existe y se almacena en window: ' + token)
    console.log(
      'El descriptor no existe y se almacena en window: ' + descriptor,
    )
  }

  return (
    <div>
      <AppBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <MainFooter />
    </div>
  )
}

export default Root
