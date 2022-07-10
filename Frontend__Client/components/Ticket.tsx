import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "../styles/Ticket.module.scss";
import Box from "@mui/material/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
interface TicketProps {
	imageProps: string;
	
}

const Ticket = (props: TicketProps) => {
	return (
		<>
			<div>
				<Card elevation={7} className={styles.ticketWrap}>
					<CardActionArea >
						<CardMedia
							component="img" 
							height="250"
							src={ props.imageProps ||"https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}  
							alt="Event"
						/>
						<CardContent className={styles.ticketContent}>
							<Box component="div">
								<Typography gutterBottom component="h2">
									APR
								</Typography>
								<Typography gutterBottom component="p">
									23
								</Typography>
							</Box>
							<Box component="div">
								<Typography component="h2">
									Concert: Ensemble of Nature
								</Typography>
								<Typography component="h3">Sat, Apr 23, 7:00 PM</Typography>
								<Typography component="h4">
									The Art Center • Ho Chi Minh City, Vietnam
								</Typography>
								<Typography component="h5">
									By Saigon Classical Music Group
								</Typography>
							</Box>
							<Box component="div">
								<AttachMoneyIcon />
								<Typography>10.00</Typography>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</>
	);
};

export default Ticket;
