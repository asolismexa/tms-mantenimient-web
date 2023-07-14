import useFetchOptions from '@/hooks/fetchOptions'

function AsyncSelectFilter({
  url = '',
  onClick,
  onChange,
  optNameKey = 'name',
}) {
  const { options, setOpen, loading } = useFetchOptions(url)

  return (
    <select
      onClick={(e) => {
        setOpen(true)
        onClick(e)
      }}
      onChange={onChange}
    >
      <option value={0} selected>
        [TODOS]
      </option>
      {loading && '...'}
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt[optNameKey]}
        </option>
      ))}
    </select>
  )
}

export default AsyncSelectFilter
