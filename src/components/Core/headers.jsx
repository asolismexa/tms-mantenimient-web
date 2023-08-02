import { Box, Typography } from '@mui/material'
import AsyncSelectFilter from './AsyncSelectFilter'
import AsyncDataList from './AsyncDataList'

export function FilterHeader({ headerName, children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography component="span" variant="body2" fontWeight="bold" wr>
        {headerName}
      </Typography>
      {children}
    </Box>
  )
}

export function TextFilterHeader({ headerName, onClick, onChange }) {
  const handleClick = onClick ? onClick : stopEvents

  return (
    <FilterHeader headerName={headerName}>
      <input
        style={{
          display: 'block',
          width: '90%',
          zIndex: 1,
        }}
        type="text"
        onClick={handleClick}
        onChange={onChange}
      />
    </FilterHeader>
  )
}

export function AsyncSelectHeader({ headerName, url, onClick, onChange }) {
  const handleClick = onClick ? onClick : stopEvents

  return (
    <FilterHeader headerName={headerName}>
      <AsyncSelectFilter url={url} onClick={handleClick} onChange={onChange} />
    </FilterHeader>
  )
}

export function AsyncDataListHeader({
  headerName,
  url,
  onClick,
  onChange,
  optNameKey,
}) {
  const handleClick = onClick ? onClick : stopEvents

  return (
    <FilterHeader headerName={headerName}>
      <AsyncDataList
        url={url}
        onClick={handleClick}
        onChange={onChange}
        optNameKey={optNameKey}
      />
    </FilterHeader>
  )
}

export const stopEvents = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
