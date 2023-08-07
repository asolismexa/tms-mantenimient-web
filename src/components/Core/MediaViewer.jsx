import { Backdrop, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { closeImageViewer } from '@/reducers/uiSlice'
import { isImage, isVideo } from '@/utils/media'
import CloseIcon from '@mui/icons-material/Close'

function MediaViewer({ open = false, src = '', name = '' }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeImageViewer())
  }

  let mediaElement = () => {
    if (isImage(name))
      return (
        <img
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
          }}
          src={src}
        />
      )

    if (isVideo(name)) return <video src={src} controls />

    return <div></div>
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={open}
    >
      <IconButton
        sx={{
          top: 20,
          right: 20,
          position: 'absolute',
        }}
        size="large"
        onClick={handleClose}
      >
        <CloseIcon
          sx={{
            color: '#fff',
          }}
        />
      </IconButton>
      {mediaElement()}
    </Backdrop>
  )
}

export default MediaViewer
