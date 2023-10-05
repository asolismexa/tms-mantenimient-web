import { GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid'

function CustomExportToolbar({ children }) {
  return (
    <GridToolbarContainer sx={{ mb: 1 }}>
      {children}
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default CustomExportToolbar
