import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "../styles/TicketSession.module.scss";
import Box from "@mui/material/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
interface SessionProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: TicketProp[];
}

interface TicketProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
}

interface TicketSessionProps {
	// imageProps: string;
	data: SessionProp;
	props: any;
}

const TicketSession = (props: TicketSessionProps) => {
	const getPrice = ( session: SessionProp) => {
		// 9:00 PM – Saturday, Dec 10,{" "}
		let totalPrice = 0;
		session.conferenceList.forEach((item) => {
			totalPrice += item.price;
		});
		return totalPrice;
	  }
  return (
		<>
			<div>
				<Card elevation={3} className={styles.ticketWrap}>
					<CardActionArea>
						<CardMedia
							component='img'
							height='250'
							src={'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
							alt='Event'
						/>
						<CardContent className={styles.ticketContent}>
							<Box component='div'>
								<Typography gutterBottom component='h2'>
									{props?.data?.comboSessionName}
								</Typography>
								<Typography gutterBottom component='h3'>
									by FINEXPO PTE LTD.
								</Typography>
								<Typography gutterBottom component='p'>
								{props?.data?.conferenceList.length} events
								</Typography>
							</Box>

							<Box component='div'>
								<AttachMoneyIcon />
								<Typography>{getPrice(props?.data)}</Typography>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</>
  )
};

export default TicketSession;
