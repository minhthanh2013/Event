
import { AppBar } from '@material-ui/core'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'


interface HeaderProps {}
const Header = (props: HeaderProps) => {

  return (
    <Box sx={{flexGrow: 1}} >
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,  '-webkit-user-select':'none', 'user-select': 'none', fontWeight:"700", letterSpacing:"3px"}}>
            Evenity
          </Typography>
          <Button variant='text' sx={{color:"#000000"}}>Login</Button>
          <Button variant='text' sx={{margin:"20px auto", color:"#000000"}}>Sign up</Button>
          <Button variant='text' sx={{color:"#6A35F2"}}>create an event</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
  )
}


export default Header