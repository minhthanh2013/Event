import React, { useEffect, useState } from 'react'
import styles from '../styles/TicketList.module.scss'
import Ticket from './Ticket'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'
interface TicketListProps {}

const products = [
	{
		title: 've cha 1',
		id: 1,
		listChild: [
			{ title: 've con 1', id: 2, listChild: [] },
			{ title: 've con 2', id: 3, listChild: [] },
		],
	},
	{ title: 've con 3', id: 4, listChild: [] },
	{ title: 've con 4', id: 5, listChild: [] },
	{ title: 've con 1', id: 2, listChild: [] },
	{ title: 've con 2', id: 3, listChild: [] },
]

const types = [1, 2, 2, 2, 2, 1]

interface TicketProps {
	status: boolean;
	data: TicketProp[];
}

interface TicketProp {
	conference_id: number;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
	// conferenceOrganizer: string;
}

const TicketList = (props: TicketListProps) => {
	const [ticketList, setTicketList] = useState<TicketProps>()
	// 'conference-1-avatar '
	useEffect(() => {
		const fetchTicketList = async () => {
		  const dataResult = await fetch('/api/conference/get-latest-x');
		  const cateResult = await dataResult.json();
		  setTicketList(cateResult)
		}
		fetchTicketList();
	  }, [ticketList])

	return (
		<>
			<div className={styles.productWrap}>
				<div className={styles.productContainer}>
					<Box className={styles.control__wrap}>
						<Typography className={styles.list__title}>Ticket</Typography>
						<a className={styles.see__all}>See all</a>
					</Box>
					<Grid container rowSpacing={8} columnSpacing={8} marginTop={0}>
						{ticketList?.data?.map((dataItem) => (
							// eslint-disable-next-line react/jsx-key
							<Grid item lg={4} md={6} sm={12} >
								<Ticket data={dataItem}/>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</>
	)
}

export default TicketList
