import { useRef } from 'react'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const noop = () => {}

const FileInput = ({ value, onChange = noop, multiple, label, ...rest }) => {
  const inputRef = useRef(null)

  return (
    <div>
      <Button
        sx={{ my: 1 }}
        variant="contained"
        color="primary"
        onClick={() => {
          inputRef.current.click()
        }}
      >
        {label}
        <input
          {...rest}
          style={{ display: 'none' }}
          type="file"
          ref={inputRef}
          multiple={multiple}
          onChange={(e) => {
            onChange([...e.target.files])
          }}
        />
      </Button>
      <List>
        {value.map((file) => (
          <ListItem key={file.name}>
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            {
              <ListItemText variant="caption" color="text.secondary">
                {file.name}
              </ListItemText>
            }
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default FileInput
