import styles from '../styles/DetailBanner.module.scss'
import { Box, Link, Typography} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { splitNum } from '../GlobalFunction/SplitNumber';
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

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
	dateStartSell: Date
	dateStartConference: Date
	dateEndSell: Date;
	isRecorded?: boolean;
	isValidated?: boolean;
	// conferenceOrganizer: string;
}

interface TicketProps {
	data: TicketProp;
	// conferenceOrganizer: string;
	handleToggle: any
	userId?: string
}
export interface UserToVerify {
	user_id: number;
	conference_id: number;
  }

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const DetailBanner = (props: TicketProps) => {
    const [imageProp, setImageProp] = useState<string>()
	const [year, setYear] = useState<string>()
	const [month,  ] = useState<string>()
	const [monthString, setMonthString] = useState<string>()
	const [day, setDay] = useState<string>()
	const [hour, setHour] = useState<string>()
	const [min, setMin] = useState<string>()
	const [weekDay, setWeekDay] = useState<string>()
	const [timePeriod, setTimePeriod] = useState<string>()
	const [hideBuyButton, setHideBuyButton] = useState(true)
	useEffect(() => {
		const parseDate = () => {
			const date = new Date(props.data?.dateStartConference)
			setYear(date.getFullYear().toString())
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
		const getUserDetails = async () => {
			const user = {} as UserToVerify 
			user.user_id = +props.userId
			user.conference_id = props.data.conference_id
			const response = await fetch(`/api/ticket/verify-user-buy-ticket`, {
				method: 'POST',
				body: JSON.stringify(user)
			})
			const data = await response.json()
			if(data.status === true) {
				setHideBuyButton(true)
			}
		}
		parseDate();
		if(props.userId !== undefined) {
			getUserDetails()
		}
	}, [])

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{backgroundImage:imageURL}}>
                    <Box component="div">
                        <Link href="/" sx={{textDecoration: 'none !important'}}>
                            <IconButton >
                                <KeyboardBackspaceIcon />
                                <Typography>Back</Typography>
                            </IconButton>
                        </Link>
                        <Box>
                            <Box>
                                <Typography component="h2">{props.data?.conferenceName || 'conferenceName'}</Typography>
                                <Typography component="h3">At {props.data?.organizerName || 'HCMUS'}</Typography>
                                <Typography component="h4">{props.data?.address}</Typography>
                            </Box>
                            <Box>
                                <Typography component="h2">Date & Time</Typography>
                                <Typography component="h3">{weekDay}, {monthString} {day}, {year} at {hour}:{min} {timePeriod}</Typography>
                                <Button variant="text" className={styles.button__1}><AddIcon/>Add to calendar</Button>
								{!hideBuyButton ? (
									<>
										{new Date() < new Date(props.data.dateStartSell) &&
											(`Conference begin to sell at ${props.data.dateStartSell}`)
										}
										{new Date(props.data.dateStartSell) < new Date() && new Date() < new Date(props.data.dateStartConference) &&
											(<Button variant="contained" className={styles.button__2} onClick={props.handleToggle}>Buy ticket ({`${splitNum(props.data?.conferencePrice)} VNĐ`})</Button>)
										}
										{new Date() > new Date(props.data.dateStartConference) &&
											(<Button variant="contained" className={styles.button__2} onClick={props.handleToggle}>Buy record ({`${splitNum(props.data?.conferencePrice)} VNĐ`})</Button>)
										}
									</>
								) : (
									<Typography component="h3">You have already bought this ticket</Typography>
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

export default DetailBanner;