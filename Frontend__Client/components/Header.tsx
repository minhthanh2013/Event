/* eslint-disable @next/next/link-passhref */
import { AppBar } from '@material-ui/core'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import Badge from '@mui/material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'

// interface HeaderProps {}
const Header = (props: any) => {
  // console.log(14, props)
  function stringToColor(string: any) {
    let hash = 0
    let i
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    return color
  }
  function stringAvatar(name: any) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`.toUpperCase(),
    }
  }
  let isLogin = false;
  if (props.token !== undefined) {
	  isLogin = true;
  }
  return (
    <Box sx={{ my: '20px' }}>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar sx={{ display: 'flex', gap: '20px' }}>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              '-webkit-user-select': 'none',
              fontWeight: '700',
              letterSpacing: '3px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            <Link href='/'>
              Evenity
            </Link>
          </Typography>
          {isLogin ? (
            <>
              <IconButton>
                <Badge
                  badgeContent={2}
                  sx={{
                    color: '#6A35F2',
                    '&  span': {
                      backgroundColor: '#6A35F2',
                      color: '#ffffff',
                    },
                  }}
                >
                  <MailOutlineIcon />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge
                  badgeContent={2}
                  sx={{
                    color: '#6A35F2',
                    '&  span': {
                      backgroundColor: '#6A35F2',
                      color: '#ffffff',
                    },
                  }}
                >
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton>
                <Avatar {...stringAvatar('duongquangvinh6@gmail.com')} />
              </IconButton>
            </>
          ) : (
            <>
              <Link href={"/account/login"}>
                <Button variant='text' sx={{ color: '#000000' }}>
                  Login
                </Button>
              </Link>
              <Link href={"/account/register"}>
                <Button variant='text' sx={{ color: '#000000' }}>
                  Sign up
                </Button>
              </Link>
              
              <Button variant='text' sx={{ color: '#6A35F2' }}>
                create an event
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
