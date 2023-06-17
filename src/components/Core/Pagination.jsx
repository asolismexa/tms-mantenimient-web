import { Pagination } from '@mui/material'

function CustomPagination({ page, count, onChange }) {
  return (
    <Pagination color="primary" page={page} count={count} onChange={onChange} />
  )
}

export default CustomPagination
