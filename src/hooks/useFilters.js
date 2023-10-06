import { useState } from 'react'

export function useFilters({ initialState }) {
  const [filters, setFilters] = useState(initialState)

  const onFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value })
  }

  return { filters, onFilterChange }
}
