import { useNavigate } from 'react-router-dom'

function NavLink({ to, children }) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    console.log(`Navigating to ${to}`)
    navigate(to)
  }

  return <div onClick={handleNavigate}>{children}</div>
}

export default NavLink
