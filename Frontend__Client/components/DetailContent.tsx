import { Box, Typography } from '@mui/material'
import styles from '../styles/DetailContent.module.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useEffect, useState } from 'react';

interface TicketProp {
	conferenceAddress: string
	conferenceCategory: number
	conferenceDescription: string
	conferenceName: string
	conferencePrice: number
	conferenceType: number
	organizerName: string
	ticketQuantity: number

	status_ticket: string;
	host_id: number
	conference_id: number
	address: string;
	date_start_conference: Date
	// conferenceOrganizer: string;
}


interface TicketProps {
	data: TicketProp;
	// host: Host;
	// conferenceOrganizer: string;
}

interface Host {
	host_id: number;
	email: string;
}

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const DetailContent = (props: TicketProps) => {
	const [imageProp, setImageProp] = useState<string>()
	const [year, setYear] = useState<string>()
	const [month, setMonth] = useState<string>()
	const [monthString, setMonthString] = useState<string>()
	const [day, setDay] = useState<string>()
	const [hour, setHour] = useState<string>()
	const [min, setMin] = useState<string>()
	const [weekDay, setWeekDay] = useState<string>()
	const [timePeriod, setTimePeriod] = useState<string>()
	const [host, setHost] = useState<Host>();
	useEffect(() => {
		
		const fetchHostDetails = async () => {
			const dataResult = await fetch ('/api/conference/get-host-by-conference-id/' + props?.data?.conference_id);
			const cateResult = await dataResult.json();
			setHost(cateResult);
		}
		const parseDate = () => {
			const date = new Date(props.data?.date_start_conference)
			setYear(date.getFullYear().toString())
			setMonth(date.getMonth().toString())
			setMonthString(date.toLocaleString('en-us', { month: 'short' }))
			setDay(date.getDate().toString())
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			let minuteString = minutes < 10 ? '0'+minutes : minutes;
			setTimePeriod(ampm)
			setHour(hours.toString())
			setMin(minuteString.toString())
			setWeekDay(weekday[date.getDay()])
		}
		fetchHostDetails();
		parseDate();
	}, [])
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.content__wrap}>
					<Box className={styles.column__section}>
						<Box className={styles.column__left}>
							<Typography component='h3'>Description</Typography>
							<Box>
								<Typography component='span'>
									{props.data?.conferenceDescription || 'No description'}
								</Typography>
							</Box>
						</Box>
						<Box className={styles.column__right}>
							<Typography component='h3'>Event Location</Typography>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.9507611537924!2d106.61367654932418!3d10.78813865533503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c095286d679%3A0x730438ca8d7f26e3!2zVHLGsOG7nW5nIFRIQ1MgVHLhuqduIFF14buRYyBUb-G6o24!5e0!3m2!1svi!2s!4v1657444715111!5m2!1svi!2s'
								width='400'
								height='300'
								loading='lazy'
							></iframe>
							{/* <Box component='img' src='https://i.stack.imgur.com/HILmr.png'></Box> */}
							<Typography component='h4'>{props.data?.address ? "Zoom" : props.data?.address }</Typography>
							<Typography component='span'>{props.data?.address ? "Zoom" : props.data?.address }</Typography>
						</Box>
					</Box>
					<Box className={styles.info__section}>
						<Typography component='h3'>Hours</Typography>
						<Typography component='p'>{weekDay}, {monthString} {day}, {year} at {hour}:{min} {timePeriod}</Typography>
						<Typography component='h3'>How can I contact the organizer with any question?</Typography>
						<Typography component='p'>
							Please email <a href={"mailto:" + host?.email}>{host?.email}</a> for all questions and contact information.{' '}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default DetailContent
