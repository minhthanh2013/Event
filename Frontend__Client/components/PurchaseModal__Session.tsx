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
interface SessionProp {
	comboSessionId: number
	comboSessionPrice: number
	comboSessionName: string
	comboSessionDescription: string
	conferenceList: TicketProp[]
	discount: number
}
interface SessionProps {
	data: SessionProp;
	setTotal: (totalPrice: number) => void;
	imageProps: string;
	total: number;
}
interface modalProps {
	handleToggle: any
	data: SessionProp;
	imageProp: string;
	userId?: number;
}
interface TicketProp {
	conferenceAddress: string
	conferenceCategory: number
	conferenceDescription: string
	conferenceName: string
	price: number
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
	sessionId: number;
	sessionPrice: number;
}

interface PaymentStripeDto {
	sessionId: number;
	sessionName: string;
	sessionDescription?: string;
	sessionPrice: number;
	userId: number;
}
const PurchaseModalSession = (props: modalProps) => {
	const [selectedValue, setSelectedValue] = useState('a')
	const [total, setTotal] = useState(0);
	const [normalizeDate, setNormalizeDate] = useState<string>()
	// Handle exception
	const [popUp, setPopUp] = useState("0");
	const [status, setStatus] = useState("0");
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	
	const router = useRouter();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value)
	}
	const calculateTotal = () => {
		let totalTemp = 0;
		for (let i = 0; i < props?.data?.conferenceList.length; i++) {
			totalTemp += parseInt(props?.data?.conferenceList[i].price.toString())
		}
		totalTemp = totalTemp - (totalTemp * props?.data?.discount) / 100
		setTotal(totalTemp);
	}
	async function handleCheckout() {
		if (props.userId === undefined) {
			router.push("/user/login")
		}
		else {
			if (selectedValue === "b") {
				const paymentStripeDto = {} as PaymentStripeDto;
				paymentStripeDto.sessionId = props.data.comboSessionId;
				paymentStripeDto.sessionName = props.data.comboSessionName;
				paymentStripeDto.sessionDescription = props.data.comboSessionDescription;
				paymentStripeDto.sessionPrice = props.data.comboSessionPrice;
				paymentStripeDto.userId = props.userId;
				const response = await fetch(`/api/payment/buy-session`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": process.env.STRIPE_TEST_KEY,
					},
					body: JSON.stringify(paymentStripeDto)
				})
				const resDataJson = await response.json();
				if (resDataJson.status === true) {
					router.push(resDataJson.data);
				}
				// if (resDataJson.status === true) {
				// 	setSuccessMessage("Buy session successfully. Your credit card will be charged " + splitNum(paymentStripeDto.sessionPrice) + " VND")
				// 	setStatus("1");
				// 	setPopUp("1");
				// 	window.location.reload();
				// } else {
				// 	setErrorMessage("Fail to buy session, your credit balance is not met the ticket price, please try again after you addup more balance")
				// 	setStatus("0");
				// 	setPopUp("1");
				// }

			} else {
				//Set Checkout cho nút Balance ở đây
				const paymentRequest = {} as PaymentBalanceDto;
				paymentRequest.userId = props.userId;
				paymentRequest.sessionId = props.data.comboSessionId;
				paymentRequest.sessionPrice = props.data.comboSessionPrice;
				// userId: number;
				// sessionId: number;
				// sessionPrice: number;
				const result = await fetch("/api/payment/buy-session-by-balance", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(paymentRequest),
				})
				const resDataJson = await result.json();
				if (resDataJson.status === true) {
					setSuccessMessage("Buy session successfully. Your balance will be charged " + splitNum(paymentRequest.sessionPrice) + " VND")
					setStatus("1");
					setPopUp("1");
					window.location.reload();
				} else {
					setErrorMessage("Fail to buy session, your balance is not met the ticket price, please try again after you addup more balance")
					setStatus("0");
					setPopUp("1");
				}
			}
		}
	}
	useEffect(() => {
		// parseDate()
		calculateTotal()
	}, [])
	return (
		<>
			<Box className={styles.container} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
				<Box className={styles.leftWrap}>
					<Box className={styles.leftWrap__top}>
						<Typography component='h3'>{props?.data?.comboSessionName}</Typography>
						<Typography component='h4'>{normalizeDate}</Typography>
						<Divider variant='middle' />
					</Box>
					<Box className={styles.leftWrap__body}>
						<TicketInModal setTotal={setTotal} imageProps={props.imageProp} data={props?.data} total={total} />
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

export const TicketInModal: React.FC<SessionProps> = ({ data, setTotal, imageProps, total }) => {
	const [age, setAge] = useState('')

	const handleChange = (event: any) => {
		const price = parseInt(event.target.value) * data.comboSessionPrice;
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
					<Box className={styles.ticketContent}>
						<Typography component='h3'>{data?.comboSessionName}</Typography>
						<Typography component='h4'>{splitNum(total)} VNĐ</Typography>
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

export default PurchaseModalSession

