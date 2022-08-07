import { Button, Card, CardMedia, Checkbox, Divider, FormControl, IconButton, InputLabel, MenuItem, Radio, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import styles from '../styles/PurchaseModal.module.scss'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
const PurchaseModal = () => {
	const [selectedValue, setSelectedValue] = useState('a')
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value)
	}

	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.leftWrap}>
					<Box className={styles.leftWrap__top}>
						<Typography component='h3'>British Boarding Schools Show, Ho Chi Minh</Typography>
						<Typography component='h4'>Tue, Apr 19, 2022 1:00 AM - 2:00 AM +07</Typography>
						<Divider variant='middle' />
					</Box>
					<Box className={styles.leftWrap__body}>
						<TicketInModal />
					</Box>
					<Box className={styles.leftWrap__bottom}>
						<Typography>Total</Typography>
						<Typography>
							<AttachMoneyIcon />
							50.00
						</Typography>
					</Box>
				</Box>
				<Box className={styles.rightWrap}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<IconButton aria-label='delete'>
							<CloseIcon sx={{ color: 'white', width: '1.5em', height: '1.5em' }} onClick={() => {}} />
						</IconButton>
					</Box>
					<Box className={styles.content} sx={{ width: '80%', height: '85%', pt: '1rem', pb: '3rem', mx: 'auto' }} display='flex' flexDirection='column'>
						<Typography component='h3'>PAYMENT</Typography>
						<Box flexGrow={1}>
							<Box sx={{ width: '100%', height: '60px', backgroundColor: 'white', mt: '2rem', display: 'flex', alignContent: 'center' }}>
								<Radio sx={{ color: '#6A35F2', '&.Mui-checked': { color: '#6A35F2' } }} name='radio-buttons' checked={selectedValue === 'a'} onChange={handleChange} value='a' />
								<Typography flexGrow={1} component='h4' sx={{ my: 'auto' }}>
									Paypal
								</Typography>
								<AccountBalanceWalletIcon sx={{ my: 'auto', mr: '1rem', color: '#6A35F2' }} />
							</Box>
							<Box sx={{ width: '100%', height: '60px', backgroundColor: 'white', mt: '2rem', display: 'flex', alignContent: 'center' }}>
								<Radio sx={{ color: '#6A35F2', '&.Mui-checked': { color: '#6A35F2' } }} name='radio-buttons' checked={selectedValue === 'b'} onChange={handleChange} value='b' />
								<Typography flexGrow={1} component='h4' sx={{ my: 'auto' }}>
									Credit/Debit Card
								</Typography>
								<CreditCardIcon sx={{ my: 'auto', mr: '1rem', color: '#6A35F2' }} />
							</Box>
						</Box>
						<Box display='flex' flexDirection='row-reverse'>
							<Button variant='contained' size='large' sx={{ bgcolor: '#6A35F2' }}>
								Checkout
								<ArrowRightAltIcon />
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export const TicketInModal = () => {
	const [age, setAge] = useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	return (
		<>
			<Box className={styles.ticketContainer}>
				<Card elevation={0} className={styles.ticketWrap}>
					<CardMedia
						component='img'
						sx={{ width: 151, mt: '1rem', boxShadow: '0px' }}
						image='https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Live from space album cover'
					/>
					<Box className={styles.ticketContent}>
						<Typography component='h3'>eTicket - British Boarding School Show</Typography>
						<Typography component='h4'>$ 50.00</Typography>
						<Typography component='h5'>Sales end in 2 days</Typography>
					</Box>
					<Box>
						<FormControl variant='standard' className={styles.ticketNumber}>
							<TextField type='number' size='small' defaultValue={1} />
						</FormControl>
					</Box>
				</Card>
			</Box>
		</>
	)
}

export default PurchaseModal
