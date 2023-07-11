import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

function CheckLogo({ checked = true }) {
  if (checked) {
    return <CheckBoxIcon color="primary" />
  }
  return <CheckBoxOutlineBlankIcon color="disabled" />
}

export default CheckLogo
