import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  IconButton,
  Alert
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

function TableCreateReports ({ children, items, onAddItem = null }) {
  return (
    <>
      {items.length === 0 && (
        <Alert severity="info">No has agregado ninguna falla</Alert>
      )}
      <TableContainer sx={{ my: 2, width: 500 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TIPO DE FALLA</TableCell>
              <TableCell align="center">OBSERVACION</TableCell>
              <TableCell align="center">EVIDENCIAS</TableCell>
              <TableCell align="center">
                <IconButton onClick={onAddItem}>
                  <AddCircleIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableCreateReports
