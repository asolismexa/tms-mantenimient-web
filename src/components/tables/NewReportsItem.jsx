import { TableRow, TableCell, Checkbox, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export function NewReportsItem ({ report, onRemove }) {
  const hasEvidences = report?.evidences.length > 0
  return (
    <TableRow>
      <TableCell align="center">{report.type}</TableCell>
      <TableCell align="center">{report.observation}</TableCell>
      <TableCell align="center">
        <Checkbox disabled checked={hasEvidences}/>
      </TableCell>
      <TableCell align="center">
        <Stack>
          <IconButton onClick={onRemove} color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
