import { useState } from 'react'
import { Menu, Typography, Box } from '@mui/material'
import NavMenuItem from './NavMenuItem'

const none = () => {}
function NavMenu({ label, onClick = none, items = [] }) {
  const [anchoreEl, setAnchoreEl] = useState(null)
  const open = Boolean(anchoreEl)

  const handleClick = (event) => {
    setAnchoreEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchoreEl(null)
  }

  return (
    <>
      <Box
        component={'span'}
        sx={{
          cursor: 'pointer',
          padding: '0.2rem',
          '&:hover': {
            backgroundColor: '#166ba2',
            color: '#fff',
          },
          backgroundColor: open ? '#166ba2' : '#f7f7f7',
          color: open ? '#fff' : '#000',
        }}
        onClick={(e) => {
          handleClick(e)
          onClick(e)
        }}
      >
        <Typography variant="body1">{label}</Typography>
      </Box>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            padding: '0',
            borderRadius: '0',
            border: '1px solid #7eabcd',
            '& .MuiList-root': {
              padding: '0',
            },
          },
          '& .MuiMenuItem-root': {
            padding: '0.1rem',
            '&:hover': {
              backgroundColor: '#166ba2',
              color: '#fff',
            },
          },
        }}
        anchorEl={anchoreEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <NavMenuItem
            key={index}
            path={item.path}
            label={item.label}
            onClick={handleClose}
          />
        ))}
      </Menu>
    </>
  )
}

export default NavMenu
