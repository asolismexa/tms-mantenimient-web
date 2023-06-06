import { useNavigate } from 'react-router-dom'

function NavLink({ to, children }) {
  const navigate = useNavigate()

  return <div onClick={() => navigate(to)}>{children}</div>
}
    
export default NavLink
