/* eslint-disable @next/next/link-passhref */
import { AppBar } from '@material-ui/core'
import { Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import Divider from '@mui/material/Divider'
import styles from '../styles/Header.module.scss'
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'

interface HeaderProps {
	props: any
}
interface TicketProps {
	data: TicketProp[]
	// conferenceOrganizer: string;
}
interface TicketProp {
	conference_id: number
	description: string
	price: number
	conference_name: number
	date_start_conference: Date
	address: string
	// conferenceOrganizer: string;
}
const Header = (props: any) => {
	const [ticketList, setTicketList] = useState<TicketProps>()
	const pages = ['Products', 'Pricing', 'Blog']
	const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout']

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
	// 12:00 am - Thu, Jul 1
	function parseDate(date: Date) {
		date = new Date(date)
		const day = date.getDate()
		const month = date.getMonth()
		const year = date.getFullYear()
		const hour = date.getHours()
		const min = date.getMinutes()
		let ampm = hour >= 12 ? 'pm' : 'am'
		const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		let weekDayString = weekday[date.getDay()]
		let monthString = date.toLocaleString('en-us', { month: 'short' })
		const dateString = `${hour}:${min} ${ampm} - ${weekDayString}, ${monthString} ${day}`
		return dateString
	}
	useEffect(() => {
		if (props?.tempDecode?.role === 'user') {
			const fetchTicketList = async () => {
				const dataResult = await fetch(`/api/conference/get-conference-by-user-id/${props?.tempDecode?.sub}`)
				const cateResult = await dataResult.json()
				setTicketList(cateResult)
			}
			fetchTicketList()
		}
	}, [props?.tempDecode?.role, props?.tempDecode?.sub])

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
	if (props?.token !== undefined) {
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
					{isLogin ? (
						<>
							<IconButton onClick={handleOpenUserMenu}>
								<Badge
									badgeContent={ticketList?.data?.length}
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
								{ticketList?.data.length === 0 ||
									(ticketList === undefined && (
										<>
											<MenuItem key={0} onClick={handleCloseUserMenu} sx={{ mb: '0.5rem', userSelect: 'none' }}>
												<Box
													sx={{
														width: '400px',
														height: '75px',
														display: 'flex',
														gap: '2rem',
														alignItems: 'center',
													}}
												>
													<Typography component='h3'>You dont have any tickets</Typography>
												</Box>
											</MenuItem>
											<Divider variant='inset' component='li' sx={{ width: '100%', mx: '0 !important' }} />
										</>
									))}

								{ticketList?.data?.map((ticket) => (
									<>
										{' '}
										<MenuItem
											key={ticket?.conference_id}
											onClick={handleCloseUserMenu}
											sx={{ mb: '0.5rem', userSelect: 'none' }}
										>
											<Box sx={{ width: '450px', height: '90px', display: 'flex', gap: '0.5rem' }}>
												<img
													width='25%'
													height='100%'
													src={
														'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
													}
												/>

												<Box
													className={styles.notification_Content}
													sx={{
														width: '50%',
														height: '100%',
														display: 'flex',
														alignContent: 'center',
														flexDirection: 'column ',
														justifyContent: 'center',
														gap: '0.5rem',
													}}
												>
													<Typography component='h3'>{ticket?.conference_name}</Typography>
													<Typography component='h4'>{parseDate(ticket?.date_start_conference)}</Typography>
												</Box>
												<Box display='flex' flexDirection='column' sx={{ width: '25%', alignItems: 'flex-start' }}>
													<IconButton sx={{ display: 'flex', gap: '0.5rem', color: '#C64EFF' }}>
														<PlayCircleOutlineOutlinedIcon />
														<Typography>Join</Typography>
													</IconButton>
													<IconButton sx={{ display: 'flex', gap: '0.5rem', color: '#C64EFF' }}>
														<ReplayOutlinedIcon />
														<Typography>Record</Typography>
													</IconButton>
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
