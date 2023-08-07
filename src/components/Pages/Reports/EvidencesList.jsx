import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openImageViewer } from '@/reducers/uiSlice'
import { isVideo } from '@/utils/media'
import videoLogo from '/video_icon.png'

export default function EvidencesList({ evidences }) {
  const dispatch = useDispatch()
  const handleOpenViewer = (src = '', name = '') => {
    dispatch(openImageViewer({ src, name }))
  }

  return (
    <ImageList sx={{ width: '100%', height: 450 }} rowHeight={164}>
      {evidences.map((item) => (
        <ImageListItem
          sx={{
            cursor: 'pointer',
          }}
          key={item.id}
          onClick={() => handleOpenViewer(item?.mediaLink, item?.objectName)}
        >
          <img
            style={{
              height: '100%',
              objectFit: 'contain',
            }}
            src={isVideo(item.objectName) ? videoLogo : `${item.mediaLink}`}
            loading="lazy"
          />
          <ImageListItemBar
            title={isVideo(item.objectName) ? 'VIDEO' : 'IMAGEN'}
            actionIcon={
              <IconButton aria-label={`info about ${item.title}`}>
                <Link href={item.mediaLink} download>
                  <DownloadForOfflineIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                </Link>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
