import AppBar from '@components/Core/AppBar'
import MainContainer from '@components/Core/MainContainer'
import { Outlet, useSearchParams } from 'react-router-dom'
import MediaViewer from '../Core/MediaViewer'
import { useSelector } from 'react-redux'
import { selectImageViewer } from '@/reducers/uiSlice'

function Root () {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const descriptor = searchParams.get('descriptor')
  const imageViewer = useSelector(selectImageViewer)

  if (window.App && window.App.token) {
    console.log('El token ya existe por lo tanto se almaceno en window')
    console.log('Token almacenado: ' + window.App.token)
    console.log('Descriptor almacenado: ' + window.App.descriptor)
  } else {
    window.App = {
      token,
      descriptor
    }

    console.log('El token no existe y se almacena en window: ' + token)
    console.log(
      'El descriptor no existe y se almacena en window: ' + descriptor
    )
  }

  return (
    <div>
      <AppBar />
      <MediaViewer
        src={imageViewer.src}
        open={imageViewer.open}
        name={imageViewer.name}
      />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  )
}

export default Root
