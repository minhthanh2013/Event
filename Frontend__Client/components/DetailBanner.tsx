import styles from '../styles/DetailBanner.module.scss'
import { Box, Link, Typography} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { splitNum } from '../GlobalFunction/SplitNumber';
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

interface TicketProp {
	conference_id: number;
    description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
	host_id: number;
	organizerName: string;
	// conferenceOrganizer: string;
}

interface TicketProps {
	data: TicketProp;
	// conferenceOrganizer: string;
}

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const DetailBanner = (props: TicketProps) => {

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
		parseDate();
	}, [])
    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{backgroundImage:imageURL}}>
                    <Box component="div">
                        <Link href="/">
                            <IconButton >
                                <KeyboardBackspaceIcon />
                                <Typography>Back</Typography>
                            </IconButton>
                        </Link>
                        <Box>
                            <Box>
                                <Typography component="h2">{props.data.conference_name}</Typography>
                                <Typography component="h3">By {props.data.organizerName}</Typography>
                                <Typography component="h4">{props.data.address}</Typography>
                            </Box>
                            <Box>
                                <Typography component="h2">Date & Time</Typography>
                                <Typography component="h3">{weekDay}, {monthString} {day}, {year} at {hour}:{min} {timePeriod}</Typography>
                                <Button variant="text" className={styles.button__1}><AddIcon/>Add to calendar</Button>
                                <Button variant="contained" className={styles.button__2}>Buy ticket ({`${splitNum(props.data.price)} VNĐ`})</Button>
                                <Button variant="outlined" className={styles.button__3} disabled>Buy record ($ 5.00)</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* <Image src="/purpleDot.svg" alt="purple dot" /> */}
                
            </Box>
        </>
    )
}

export default DetailBanner;