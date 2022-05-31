
import { AppBar } from '@material-ui/core'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import Badge from "@mui/material/Badge";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Avatar from "@mui/material/Avatar";

interface HeaderProps {}
const Header = (props: HeaderProps) => {

function stringToColor(string:any) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}
function stringAvatar(name:any) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

  return (
    <Box sx={{my:"20px"}} >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{display: "flex", gap:"20px"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,  '-webkit-user-select':'none', 'user-select': 'none', fontWeight:"700", letterSpacing:"3px"}}>
            Evenity
          </Typography>
          <Button variant='text' sx={{color:"#000000"}} >Login</Button>
          <Button variant='text' sx={{color:"#000000"}}>Sign up</Button>
          <Button variant='text' sx={{color:"#6A35F2"}}>create an event</Button>
          <IconButton>
            <Badge badgeContent={2} sx={{color:"#6A35F2", "&  span":{backgroundColor: "#6A35F2", color:"#ffffff"}}}>
              <MailOutlineIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={2} sx={{color:"#6A35F2", "&  span":{backgroundColor: "#6A35F2", color:"#ffffff"}}}>
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Avatar {...stringAvatar('Vinh Duong Quang')} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}


export default Header