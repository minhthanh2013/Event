import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "../styles/Ticket.module.scss";
import Box from "@mui/material/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { splitNum } from "../GlobalFunction/SplitNumber";
import Image from 'next/image'

interface TicketProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
	organizer_name: string;
}

interface TicketProps {
	// imageProps: string;
	data: TicketProp;
	props: any;
}
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const Ticket = (props: TicketProps) => {
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
			const dataResult = await fetch(`/api/conference/get-conference-image/${props.data.conference_id}`);
			const cateResult = await dataResult.json();
			setImageProp(cateResult.url);
		}
		const parseDate = () => {
			const date = new Date(props.data.date_start_conference)
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
		fetchImage();
		parseDate();
	}
	, [])
	return (
		<>
			<div>
				<Card elevation={7} className={styles.ticketWrap}>
					<CardActionArea>
						<CardMedia
							component='img'
							height='250'
							src={
								imageProp ||
								'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
							}
							alt='Event'
						/>		
						<CardContent className={styles.ticketContent}>
							<Box component='div'>
								<Typography gutterBottom component='h2'>
									{monthString?.toUpperCase()}
								</Typography>
								<Typography gutterBottom component='p'>
									{day}
								</Typography>
							</Box>
							<Box component='div'>
								<Typography component='h2'>{props.data.conference_name}</Typography>
								<Typography component='h3'>
									{weekDay}, {monthString} {day}, {hour}:{min} {timePeriod?.toUpperCase()}
								</Typography>
								<Typography component='h4'>{props.data.address != undefined ? props.data.address : 'Zoom'}</Typography>
								<Typography component='h5'>By {props.data?.organizer_name || 'Zoom'}</Typography>
							</Box>
							<Box component='div'>
								{/* <AttachMoneyIcon /> */}
								<Typography>{`${splitNum(props.data.price)} VNĐ`}</Typography>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</>
	)
};

export default Ticket;
