import { TableRow, TableCell, Checkbox, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function RowReportItem({ report, onDelete = null }) {
  return (
    <TableRow>
      <TableCell align="center">{report.report_type.name}</TableCell>
      <TableCell align="center">{report.observation}</TableCell>
      <TableCell align="center">
        <Checkbox disabled checked={report.evidences.length > 0} />
      </TableCell>
      <TableCell align="center">
        <Stack>
          <IconButton color="error" onClick={() => onDelete(report.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default RowReportItem
