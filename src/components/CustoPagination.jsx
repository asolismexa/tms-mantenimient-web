import {
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'

function CustomPagination({ pageCount }) {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  )
}
export { CustomPagination }
