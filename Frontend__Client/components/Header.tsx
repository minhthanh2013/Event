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
import ListItemIcon from '@mui/material/ListItemIcon'
import LogoutIcon from '@mui/icons-material/Logout'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { format } from 'date-fns'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'



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
	conference_type: string
	zoom_meeting_id: string
	isValiated: boolean
	// conferenceOrganizer: string;
}
interface UserDetailProp {
    firstName: string
    lastName: string
    password: string
    email: string
    showPassword: boolean
	balance: number;
}
//Balance Modal
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}
const schema = yup
	.object({
		amount: yup.number().integer().positive(),
	})
	.required()

	
const Header = (props: any) => {
	const [ticketList, setTicketList] = useState<TicketProps>()
	const [userDetails, setUserDetails] = useState<UserDetailProp>()
	const pages = ['Products', 'Pricing', 'Blog']
	const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout', 'Account', 'Dashboard', 'Logout']

	// notification
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
	//avatar
	const [anchorElAvatar, setAnchorElAvatar] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorElAvatar)

	//Balance Modal
	const [openBalanceModal, setOpenBalanceModal] = React.useState(false)
	const handleOpenBalanceModal = () => setOpenBalanceModal(true)
	const handleCloseBalanceModal = () => setOpenBalanceModal(false)
	const [valueBalance, setValueBalance] = React.useState(null)
	const handleChangeBalance = (e) => {
		setValueBalance(e.target.value)
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmitBalanceModal = ({amount}) => {
		// setValueBalance(amount)
		setValueBalance(prev => prev + Number(userDetails?.balance + amount))
		handleCloseBalanceModal()
	}
	

	// 12:00 am - Thu, Jul 1
	function parseDate(date: Date) {
		date = new Date(date)
		const day = date.getDate()
		const hour = date.getHours()
		const stringHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
		const min = date.getMinutes()
		const stringMin = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
		let ampm = hour >= 12 ? 'pm' : 'am'
		const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		let weekDayString = weekday[date.getDay()]
		let monthString = date.toLocaleString('en-us', { month: 'short' })
		const dateString = `${stringHour}:${stringMin} ${ampm} - ${weekDayString}, ${monthString} ${day}`
		return dateString
	}
	useEffect(() => {
		if (props?.tempDecode?.role === 'user') {
			const fetchTicketList = async () => {
				const dataResult = await fetch(`/api/conference/get-conference-by-user-id/${props?.tempDecode?.sub}`)
				const cateResult = await dataResult.json()
				setTicketList(cateResult)
			}
			const fetchUser = async () => {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer '+props.value.toString(),
					},
				}
				const dataResult = await fetch(`/api/user/${props.tempDecode.sub}`, config);
				const cateResult = await dataResult.json();
				setUserDetails(cateResult)
			}
			fetchTicketList()
			fetchUser()
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

	const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElAvatar(event.currentTarget)
	}
	const handleCloseAvatar = () => {
		setAnchorElAvatar(null)
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
	if (props?.token !== undefined && props?.tempDecode?.role === 'user') {
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
													{ticket?.conference_type === '2' && ticket?.zoom_meeting_id !== null && (
														<IconButton sx={{ display: 'flex', gap: '0.5rem', color: '#C64EFF' }}>
															<PlayCircleOutlineOutlinedIcon />
															<Link href={`/zoom/join-by-zoom-id?id=${ticket?.zoom_meeting_id}`} passHref>
																<Typography>Join</Typography>
															</Link>
														</IconButton>
													)}
													{ticket?.conference_type === '2' && ticket?.isValiated === false && (
														<IconButton sx={{ display: 'flex', gap: '0.5rem', color: '#C64EFF' }}>
															<ReplayOutlinedIcon />
															<Link href={`/zoom/record/${ticket?.conference_id}`} passHref>
																<Typography>Record</Typography>
															</Link>
														</IconButton>
													)}
												</Box>
											</Box>
										</MenuItem>
										<Divider variant='inset' component='li' sx={{ width: '100%', mx: '0 !important' }} />
									</>
								))}
							</Menu>

							<IconButton
								onClick={handleClickAvatar}
								size='small'
								sx={{ ml: 2 }}
								aria-controls={open ? 'account-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
							>
								<Avatar {...stringAvatar(props?.tempDecode?.username || 'No user')} />
							</IconButton>
							<Menu
								anchorEl={anchorElAvatar}
								id='account-menu'
								open={open}
								onClose={handleCloseAvatar}
								onClick={handleCloseAvatar}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: 'visible',
										filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										mt: 1.5,
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<Link passHref href={'/user/profile'}>
									<MenuItem sx={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', color: '#6A35F2' }}>
										<Avatar sx={{ color: '#6A35F2', bgcolor: 'white' }} /> Profile
									</MenuItem>
								</Link>
								<Link passHref href={'/user/ticket'}>
									<MenuItem sx={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', color: '#6A35F2' }}>
										<ConfirmationNumberIcon /> Tickets
									</MenuItem>
								</Link>
								<Link passHref href={'/user/combo'}>
									<MenuItem sx={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', color: '#6A35F2' }}>
										<LocalActivityIcon /> Combo
									</MenuItem>
								</Link>
								<Divider variant='inset' component='li' sx={{ width: '100%', mx: '0 !important' }} />
								<Link href='/'>
									<a onClick={handleOpenBalanceModal}>
										<MenuItem
											sx={{
												display: 'flex',
												gap: '0.5rem',
												color: '#6A35F2',
												height: '70px',
												flexDirection: 'column',
												justifyContent: 'flex-start',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'flex-start',
													alignItems: 'center',
													width: '100%',
													gap: '1.3rem',
												}}
											>
												<AccountBalanceWalletIcon />
											</Box>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													width: '100%',
													gap: '1.3rem',
												}}
											>
												<Typography variant='body2' sx={{ fontSize: '1rem' }}>
													{valueBalance == null ? (
														userDetails?.balance
													) : (
														valueBalance
													)}
												</Typography>

												<Typography variant='body2' sx={{ fontSize: '1rem' }}>
													VND
												</Typography>
											</Box>
										</MenuItem>
									</a>
								</Link>
								<Divider variant='inset' component='li' sx={{ width: '100%', mx: '0 !important' }} />
								<Link passHref href={'/user/logout'}>
									<MenuItem sx={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', color: '#6A35F2' }}>
										<LogoutIcon />
										Logout
									</MenuItem>
								</Link>
							</Menu>
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
							<Link href={'/host/dashboard'} passHref>
								<Button variant='text' sx={{ color: '#6A35F2' }}>
									create an event
								</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Modal
				open={openBalanceModal}
				onClose={handleCloseBalanceModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<form onSubmit={handleSubmit(onSubmitBalanceModal)}>
						<TextField
							label='Amonunt'
							{...register('amount')}
							id='outlined-start-adornment'
							sx={{ m: 1, width: '100%' }}
							InputProps={{
								startAdornment: <InputAdornment position='start'>VND</InputAdornment>,
							}}
							helperText={errors.amount && errors.amount.message as any}
						/>
						<Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-around' }}>
							<Button variant='text' sx={{ color: 'red' }} onClick={handleCloseBalanceModal}>
								Cancel
							</Button>
							<Button type='submit' variant='text' sx={{ color: '#180a3d' }}>
								Proceed
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</Box>
	)
}

export default Header



