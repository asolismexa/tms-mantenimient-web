import useFetchOptions from '@/hooks/fetchOptions'

function AsyncSelectFilter({
  url = '',
  onClick,
  onChange,
  optNameKey = 'name',
  idOrdering = [],
  exclude = [],
}) {
  const { options, setOpen, loading } = useFetchOptions(url)

  const filterOptions = (options = []) =>
    options.filter((option) => !exclude.includes(option.id))

  const orderOptions = (options = []) => {
    if (idOrdering.length === 0) return options
    return options.sort((a, b) => {
      return idOrdering.indexOf(a.id) - idOrdering.indexOf(b.id)
    })
  }

  return (
    <select
      onClick={(e) => {
        setOpen(true)
        onClick(e)
      }}
      onChange={onChange}
      defaultValue={0}
      style={{
        display: 'block',
        width: '100%',
        outline: 'none',
      }}
    >
      <option value={0}>[TODOS]</option>
      {loading && '...'}
      {orderOptions(filterOptions(options)).map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt[optNameKey]}
        </option>
      ))}
    </select>
  )
}

export default AsyncSelectFilter
