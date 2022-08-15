import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import styles from '../styles/Ticket__2.module.scss'
import Box from '@mui/material/Box'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
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
interface TicketProps {
	data: TicketProp
}
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const Ticket__2 = (props: TicketProps) => {
	const [imageProp, setImageProp] = useState<string>()
	const [year, setYear] = useState<string>()
	const [month, setMonth] = useState<string>()
	const [monthString, setMonthString] = useState<string>()
	const [day, setDay] = useState<string>()
	const [hour, setHour] = useState<string>()
	const [min, setMin] = useState<string>()
	const [weekDay, setWeekDay] = useState<string>()
	const [timePeriod, setTimePeriod] = useState<string>()

	useEffect(() => {
		// 2022-11-11T00:00:00.000Z
		const fetchImage = async () => {
			const dataResult = await fetch(`/api/conference/get-conference-image/${props.data.conference_id}`)
			const cateResult = await dataResult.json()
			setImageProp(cateResult.url)
		}
		const parseDate = () => {
			const date = new Date(props.data?.date_start_conference)
			setYear(date.getFullYear().toString())
			setMonth(date.getMonth().toString())
			setMonthString(date.toLocaleString('en-us', { month: 'short' }))
			setDay(date.getDate().toString())
			let hours = date.getHours()
			let minutes = date.getMinutes()
			let ampm = hours >= 12 ? 'pm' : 'am'
			hours = hours % 12
			hours = hours ? hours : 12 // the hour '0' should be '12'
			let minuteString = minutes < 10 ? '0' + minutes : minutes
			setTimePeriod(ampm)
			setHour(hours.toString())
			setMin(minuteString.toString())
			setWeekDay(weekday[date.getDay()])
		}
		fetchImage()
		parseDate()
	}, [])
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
								<Box component='div'>
									<Typography gutterBottom component='h2'>
										{monthString?.toUpperCase() || 'NOV'}
									</Typography>
									<Typography gutterBottom component='p'>
										{day || '11'}
									</Typography>
								</Box>
								<Box component='div'>
									<Typography component='h2'>{props.data?.conference_name || 'Conference'}</Typography>
									<Typography component='h3'>
										{weekDay || 'Fri'}, {monthString || 'Dec'} {day || '2'}, {hour || '11'}:{min || '11'}{' '}
										{timePeriod?.toUpperCase() || 'AM'}
									</Typography>
									<Typography component='h4'>
										{props.data?.address != undefined
											? props.data.address
											: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh'}
									</Typography>
									<Typography component='h5'>By Saigon Classical Music Group</Typography>
								</Box>
								<Box component='div'>
									<AttachMoneyIcon />
									<Typography>{props.data?.price || '39'}</Typography>
								</Box>
							</CardContent>
						</Box>
					</CardActionArea>
				</Card>
			</div>
		</>
	)
}

export default Ticket__2
