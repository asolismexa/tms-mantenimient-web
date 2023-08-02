function SelectFilter({
  onClick,
  onChange,
  options,
  includeAllOption = true,
  defaultValue = 0,
}) {
  return (
    <select
      onClick={(e) => {
        onClick(e)
      }}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {includeAllOption && <option value={0}>[TODOS]</option>}
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  )
}

export default SelectFilter
