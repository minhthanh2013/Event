/* eslint-disable @next/next/link-passhref */
import { AppBar } from '@material-ui/core'
import { Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import Badge from '@mui/material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import Divider from '@mui/material/Divider'
import styles from '../styles/Header.module.scss'
// interface HeaderProps {}
const Header = (props: any) => {
	const pages = ['Products', 'Pricing', 'Blog']
	const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout']

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

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
	let isLogin = false
	if (props.token !== undefined) {
		isLogin = true
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
						<Link href='/'>Evenity</Link>
					</Typography>
					{!isLogin ? (
						<>
							<IconButton onClick={handleOpenUserMenu}>
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
							<Menu
								sx={{ mt: '45px', height: '700px', overflow: 'hidden' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<>
										{' '}
										<MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ mb: '0.5rem' }}>
											<Box
												sx={{ width: '350px', height: '75px', display: 'flex', gap: '2rem', alignItems: 'center' }}
											>
												<Box sx={{ width: '25%', height: '100%' }}>
													<img
														width={100}
														height={75}
														src={
															'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
														}
													/>
												</Box>
												<Box
													className={styles.notification_Content}
													sx={{
														width: '75%',
														height: '100%',
														display: 'flex',
														alignContent: 'center',
														flexDirection: 'column',
														justifyContent: 'center',
													}}
												>
													<Typography component='h3'>Title</Typography>
													<Typography component='h4'>12:00 am - Thu, Jul 1</Typography>                            
												</Box>
                                                
											</Box>
										</MenuItem>
										<Divider variant='inset' component='li' sx={{ width: '100%', mx: '0 !important' }} />
									</>
								))}
							</Menu>

							<IconButton>
								<Avatar {...stringAvatar(props?.tempDecode?.username || 'No user')} />
							</IconButton>
						</>
					) : (
						<>
							<Link href={'/user/login'}>
								<Button variant='text' sx={{ color: '#000000' }}>
									Login
								</Button>
							</Link>
							<Link href={'/user/register'}>
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
