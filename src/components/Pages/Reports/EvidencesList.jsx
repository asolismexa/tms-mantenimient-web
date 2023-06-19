import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Link } from '@mui/material'

export default function EvidencesList({ evidences }) {
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {evidences.map((item) => (
        <ImageListItem
          key={item.id}
          sx={{
            maxHeight: '300px',
            width: '300px',
            height: '300px',
          }}
        >
          <img
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%',
            }}
            src={`${item.mediaLink}`}
            loading="lazy"
          />
          <ImageListItemBar
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <Link color="inherit" href={item.mediaLink} download>
                  <DownloadForOfflineIcon color="white" />
                </Link>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
