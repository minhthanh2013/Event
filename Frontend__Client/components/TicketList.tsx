import React, { useEffect, useState } from 'react'
import styles from '../styles/TicketList.module.scss'
import Ticket from './Ticket'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'

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

const TicketList = (props: any) => {
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
								<Link href={'/event/' + dataItem.conference_id}>
									<Ticket data={dataItem} props={props}/>
								</Link>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</>
	)
}

export default TicketList
