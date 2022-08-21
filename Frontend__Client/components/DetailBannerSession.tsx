import styles from '../styles/DetailBannerSession.module.scss'
import { Box, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { splitNum } from '../GlobalFunction/SplitNumber'
import { useEffect, useState } from 'react'
const imageURL = 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
interface DetailBannerSessionProps {
	nameProp: string
	comboDescription: string
	price: number
	numberOfTicket: number
	discount: number
	handleToggle: any
	sessionId?: string
	userId?: string
	// props: any;
}

export interface UserToVerifySession {
	user_id: number;
	session_id: number;
}

const DetailBannerSession = (props: DetailBannerSessionProps) => {
	console.log(28, props)
	const [hideBuyButton, setHideBuyButton] = useState(false)
	let discountPrice = props.price - (props.price * props.discount) / 100
	useEffect(() => {
		const getUserDetails = async () => {
			const user = {} as UserToVerifySession 
			user.user_id = +props.userId
			user.session_id = props.sessionId
			const response = await fetch(`/api/ticket/verify-user-buy-session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			})
			const data = await response.json()
			console.log(data)
			console.log(response)
			if(response.status !== 404) {
				setHideBuyButton(false)
			} else {
				setHideBuyButton(true)
			}
		}
		if(props.userId !== undefined) {
			console.log(47, "here")
			getUserDetails()
		}
		console.log(hideBuyButton)
	}, [])
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.banner__wrap} sx={{ backgroundImage: imageURL }}>
					<Box component='div'>
						<Link passHref href='/'>
							<IconButton sx={{ color: '#969696' }}>
								<KeyboardBackspaceIcon />
								<Typography>Back</Typography>
							</IconButton>
						</Link>
						<Box>
							<Box>
								<Typography component='h2'>{props.nameProp}</Typography>
								<Typography component='h3'>{props?.comboDescription || 'No description'}</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: '400px',
									justifyContent: 'center',
								}}
							>
								<Typography
									component='h2'
									sx={{
										textDecoration: props.discount != 0 ? 'line-through' : 'none',
										fontSize: props.discount != 0 ? '1.3rem !important' : '2rem',
										color: props.discount != 0 ? '#969696 !important' : '#6A35F2',
										fontWeight: props.discount != 0 ? '400 !important' : '700',
									}}
								>
									{splitNum(props?.price)} VND
								</Typography>
								{props.discount != 0 && (
									<Typography component='h2' sx={{ fontWeight: '700', color: '#6A35F2' }}>
										{splitNum(discountPrice)} VND
									</Typography>
								)}
								<Typography component='h3'>
									{props.numberOfTicket} events in <em style={{ fontStyle: 'normal', fontWeight: '700' }}>ONE</em> session
								</Typography>
								{hideBuyButton ? (
									<Button className={styles.button__2} onClick={props.handleToggle} disabled={false}>
										Buy
									</Button>
								) : (
									<Typography component="h3">You have already bought this session</Typography>
								)}

							</Box>
						</Box>
					</Box>
				</Box>
				{/* <Image src="/purpleDot.svg" alt="purple dot" /> */}
			</Box>
		</>
	)
}

export default DetailBannerSession
