import { Button, Card, CardMedia, Checkbox, Divider, FormControl, IconButton, InputLabel, MenuItem, Radio, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import styles from '../styles/PurchaseModal.module.scss'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { splitNum } from '../GlobalFunction/SplitNumber'
import { useRouter } from 'next/router'
import { PopUp } from './AlertPop-up'

interface modalProps {
	handleToggle: any
	data: TicketProp;
	imageProp: string;
	userId?: number;
}
interface TicketProps {
	data: TicketProp;
	setTotal: (props: number) => void;
	imageProps: string;
}
interface TicketProp {
	conferenceAddress: string
	conferenceCategory: number
	conferenceDescription: string
	conferenceName: string
	conferencePrice: number
	conferenceType: number
	organizerName: string
	ticketQuantity: number
	status_ticket: string
	host_id: number
	conference_id: number
	address: string
	date_start_conference: Date

	// conferenceOrganizer: string;
}

interface PaymentDto {
	userId: number;
	conferenceId: number;
	ticketPrice: number;
	ticketName: string;
	ticketQuantity: number;
	description?: string;
}

interface PaymentBalanceDto {
	userId: number;
	conferenceId: number;
	ticketPrice: number;
}

const PurchaseModal = (props: modalProps) => {
	const router = useRouter();
	// CALL API DI CHECKOUT
	const [selectedValue, setSelectedValue] = useState('a')
	const [total, setTotal] = useState(parseInt(props?.data?.conferencePrice?.toString()));
	const [normalizeDate, setNormalizeDate] = useState<string>()
		// Handle exception
	const [popUp, setPopUp] = useState("0");
	const [status, setStatus] = useState("0");
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value)
	}
	const parseDate = () => {
		const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		const date = new Date(props?.data?.date_start_conference)
		let monthString = date.toLocaleString('en-us', { month: 'short' })
		let day = date.getDate().toString()
		let hours = date.getHours()
		let minutes = date.getMinutes()
		let ampm = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12
		hours = hours ? hours : 12 // the hour '0' should be '12'
		let minuteString = minutes < 10 ? '0' + minutes : minutes
		let timePeriod = ampm
		let hour = hours.toString()
		let min = minuteString.toString()
		let weekDay = weekday[date.getDay()]
		// {weekDay || 'Fri'}, {monthString || 'Dec'} {day || '2'}, {hour || '11'}:{min || '11'}{' '}
		// {timePeriod?.toUpperCase() || 'AM'}
		setNormalizeDate(`${weekDay || 'Fri'}, ${monthString || 'Dec'} ${day || '2'}, ${hour || '11'}:${min || '11'} ${timePeriod?.toUpperCase() || 'AM'}`)
	}
	async function handleCheckout() {
		if (props.userId === undefined) {
			router.push("/user/login")
		}
		else {
			if (selectedValue === "b") {
				const paymentRequest = {} as PaymentDto;
				paymentRequest.userId = props.userId;
				paymentRequest.conferenceId = props.data.conference_id;
				paymentRequest.ticketPrice = props.data.conferencePrice;
				paymentRequest.ticketQuantity = 1;
				paymentRequest.ticketName = props.data.conferenceName;

				const result = await fetch("/api/payment/buy-ticket", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": process.env.STRIPE_TEST_KEY,
					},
					body: JSON.stringify(paymentRequest),
				})
				const resDataJson = await result.json();
				if (resDataJson.status === true) {
					router.push(resDataJson.data);
				}
			} else {
				const paymentRequest = {} as PaymentBalanceDto;
				paymentRequest.userId = props.userId;
				paymentRequest.conferenceId = props.data.conference_id;
				paymentRequest.ticketPrice = props.data.conferencePrice;
				const result = await fetch("/api/payment/buy-ticket-by-balance", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(paymentRequest),
				})
				const resDataJson = await result.json();
				if (resDataJson.status === true) {
					setSuccessMessage("Buy ticket successfully. Your balance will be charged " + splitNum(paymentRequest.ticketPrice) + " VND")
					setStatus("1");
					setPopUp("1");
					window.location.reload();
				} else {
					setErrorMessage("Fail to buy ticket, your balance is not met the ticket price, please try again after you addup more balance")
					setStatus("0");
					setPopUp("1");
				}
			}
		}
	}

	useEffect(() => {
		parseDate()
	}, [])
	return (
		<>
			<Box className={styles.container} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
			<PopUp status={status} popUp={popUp} errorMessage={errorMessage} successMessage={successMessage} onClick={() => setPopUp("0")} />
				<Box className={styles.leftWrap}>
					<Box className={styles.leftWrap__top}> 
						<Typography component='h3'>{props?.data?.conferenceName}</Typography>
						<Typography component='h4'>{normalizeDate}</Typography>
						<Divider variant='middle' />
					</Box>
					<Box className={styles.leftWrap__body}>
						<TicketInModal data={props?.data} setTotal={setTotal} imageProps={props.imageProp} />
					</Box>
					<Box className={styles.leftWrap__bottom}>
						<Typography>Total</Typography>
						<Typography>
							{splitNum(total)} VNĐ
						</Typography>
					</Box>
				</Box>
				<Box className={styles.rightWrap}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<IconButton aria-label='delete'>
							<CloseIcon sx={{ color: 'white', width: '1.5em', height: '1.5em' }} onClick={props.handleToggle} />
						</IconButton>
					</Box>
					<Box className={styles.content} sx={{ width: '80%', height: '85%', pt: '1rem', pb: '3rem', mx: 'auto' }} display='flex' flexDirection='column'>
						<Typography component='h3'>PAYMENT</Typography>
						<Box flexGrow={1}>
							<Box sx={{ width: '100%', height: '60px', backgroundColor: 'white', mt: '2rem', display: 'flex', alignContent: 'center' }}>
								<Radio sx={{ color: '#6A35F2', '&.Mui-checked': { color: '#6A35F2' } }} name='radio-buttons' checked={selectedValue === 'a'} onChange={handleChange} value='a' />
								<Typography flexGrow={1} component='h4' sx={{ my: 'auto' }}>
									Balance
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
							<Button variant='contained' size='large' sx={{ bgcolor: '#6A35F2' }} onClick={handleCheckout}>
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

export const TicketInModal: React.FC<TicketProps> = ({ data, setTotal, imageProps }) => {
	const [age, setAge] = useState('')

	const handleChange = (event: any) => {
		const price = parseInt(event.target.value) * data.conferencePrice;
		setTotal(price);
	}

	return (
		<>
			<Box className={styles.ticketContainer}>
				<Card elevation={0} className={styles.ticketWrap}>
					<CardMedia
						component='img'
						sx={{ width: 151, mt: '1rem', boxShadow: '0px' }}
						image={imageProps || 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
						alt='Live from space album cover'
					/>
					<Box className={styles.ticketContent} sx={{width: '500px'}}>
						<Typography component='h3' sx={{height: 'auto'}}>{data?.conferenceName}</Typography>
						<Typography component='h4'>{splitNum(data?.conferencePrice)} VNĐ</Typography>
					</Box>
					<Box>
						<FormControl variant='standard' className={styles.ticketNumber}>
							<TextField type='number' disabled size='small' defaultValue={1} onChange={(event) => handleChange(event)}
								InputProps={{ inputProps: { min: 1, max: 10 } }} />
						</FormControl>
					</Box>
				</Card>
			</Box>
		</>
	)
}

export default PurchaseModal

