import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  IconButton,
  TableRow,
  TableBody,
  Paper,
  Box
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useCreateReportsStore } from '@/store/createReports'
import { NewReportsItem } from '@/components/Pages/ReportsMonitor/NewReportsItem'
import { AddNewReportItemDialog } from '@/components/Pages/ReportsMonitor/AddNewReportItemDialog'

export function NewReportsTable () {
  const newReports = useCreateReportsStore(state => state.newReports)
  const isOpen = useCreateReportsStore(state => state.isDialogAddNewReportItemOpen)
  const openDialog = useCreateReportsStore(state => state.openNewReportItemDialog)
  const closeDialog = useCreateReportsStore(state => state.closeNewReportItemDialog)
  const addItem = useCreateReportsStore(state => state.addNewReportItem)
  const removeItem = useCreateReportsStore(state => state.removeNewReportItem)

  const handleAddItem = (newItem) => {
    addItem(newItem)
    closeDialog()
  }

  const createHandleDeleteItem = (itemId) => () => {
    removeItem(itemId)
  }

  return (
    <Box>
      <TableContainer sx={{ my: 2, width: 500 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TIPO DE FALLA</TableCell>
              <TableCell align="center">OBSERVACION</TableCell>
              <TableCell align="center">EVIDENCIAS</TableCell>
              <TableCell align="center">
                <IconButton onClick={openDialog}>
                  <AddCircleIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newReports.map((reportItem) => (
              <NewReportsItem
                key={reportItem.id}
                report={reportItem}
                onRemove={createHandleDeleteItem(reportItem.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddNewReportItemDialog
        open={isOpen}
        onClose={closeDialog}
        onAdd={handleAddItem}
      />
    </Box>
  )
}
