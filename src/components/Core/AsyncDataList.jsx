import useFetchOptions from '@/hooks/fetchOptions'

function AsyncDataList({ url = '', onClick, onChange, optNameKey = 'name' }) {
  const { options, setOpen, loading } = useFetchOptions(url)
  const inputId = `${url}-datalist`

  return (
    <div>
      <input
        list={inputId}
        onClick={(e) => {
          setOpen(true)
          onClick(e)
        }}
      />
      <datalist id={inputId} onChange={onChange}>
        <option value={0} selected>
          [TODOS]
        </option>
        {loading && '...'}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt[optNameKey]}
          </option>
        ))}
      </datalist>
    </div>
  )
}

export default AsyncDataList
