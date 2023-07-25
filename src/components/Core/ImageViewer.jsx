import { Backdrop } from '@mui/material'
import { useDispatch } from 'react-redux'
import { closeImageViewer } from '@/reducers/uiSlice'
import LoadingBackdrop from './LoadingBackdrop'

function ImageViewer({ open = true, src = '' }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeImageViewer())
  }

  if (open && !src) return <LoadingBackdrop open />

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
