import { Backdrop } from '@mui/material'
import { useDispatch } from 'react-redux'
import { closeImageViewer } from '@/reducers/uiSlice'

function ImageViewer({ open = false, src = '' }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeImageViewer())
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={open}
      onClick={handleClose}
    >
      <img
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'contain',
        }}
        src={src}
      />
    </Backdrop>
  )
}

export default ImageViewer
