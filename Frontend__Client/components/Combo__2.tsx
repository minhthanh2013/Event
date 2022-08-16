import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import styles from '../styles/Combo__2.module.scss'
import Box from '@mui/material/Box'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

interface SessionProp {
	comboSessionId: number
	comboSessionPrice: number
	comboSessionName: string
	comboSessionDescription: string
	conferenceList: TicketProp[]
	discount: number
}
interface TicketProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
	ticket_quantity: number;
	current_quantity: number;
	status_ticket: string;
	conference_type: string;
}
interface TicketSessionProps {
	// imageProps: string;
	data: SessionProp
	props: any
}

const Combo__2 = (props: TicketSessionProps) => {
	const [imageProp, setImageProp] = useState<string>()

	useEffect(() => {
		const fetchImage = async () => {
			const dataResult = await fetch(`/api/combo/get-combo-image/${props.data.comboSessionId}`)
			const cateResult = await dataResult.json()
			setImageProp(cateResult.url)
		}
		fetchImage()
	})

	const getPrice = (session: SessionProp) => {
		// 9:00 PM – Saturday, Dec 10,{" "}
		let totalPrice = 0
		session?.conferenceList?.forEach((item) => {
			totalPrice += parseInt(item.price.toString())
		})
		return totalPrice
	}
	return (
		<>
			<div>
				<Card elevation={7} className={styles.ticketWrap}>
					<CardActionArea>
						<Box sx={{ display: 'flex', flexDirection: 'row' }}>
							         
							<CardMedia
								className={styles.ticketImage}
								component='img'
								src='https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
								alt='Event'
							/>
							<CardContent className={styles.ticketContent}>
								<Box component='div'></Box>
								<Box component='div' sx={{ display: 'flex' }}>
									<Typography mt={3} component='h2'>{props.data?.comboSessionName || 'Conference'}</Typography>
									<Typography flexGrow={6} component='h5'>
										By Saigon Classical Music Group
									</Typography>
									<Typography component='h6'>{props.data?.conferenceList?.length || '1'} events</Typography>
								</Box>
								<Box component='div'>
									<AttachMoneyIcon />
									<Typography>{getPrice(props?.data)}</Typography>
								</Box>
							</CardContent>
						</Box>
					</CardActionArea>
				</Card>
			</div>
		</>
	)
}

export default Combo__2
