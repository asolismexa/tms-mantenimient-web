import { useRef, useState } from 'react'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const noop = () => {}

const FileInput = ({
  value,
  onChange = noop,
  multiple,
  label = 'Seleccionar archivos',
  maxFiles = 10,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [error, setError] = useState(null)

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
            if (e.target.files.length > maxFiles) {
              setError(`Solo se permiten ${maxFiles} archivos`)
              onChange([])
              return
            }
            setError(null)
            onChange([...e.target.files])
          }}
          accept="image/*,video/*"
        />
      </Button>
      {error && (
        <Alert sx={{ mt: 1 }} severity="error">
          {error}
        </Alert>
      )}
      <List>
        {value?.map((file) => (
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
