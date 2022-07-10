import React from 'react'
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

const TicketList = (props: TicketListProps) => {
	return (
		<>
			<div className={styles.productWrap}>
				<div className={styles.productContainer}>
					<Box className={styles.control__wrap}>
						<Typography className={styles.list__title}>Ticket</Typography>
						<a className={styles.see__all}>See all</a>
					</Box>
					<Grid container rowSpacing={8} columnSpacing={8} marginTop={0}>
						{/* {Array.from(Array(6)).map((_, index) => (
							<Grid item lg={4} md={6} sm={12} key={index}>
								<Ticket />
							</Grid>
						))} */}
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1657311277098-e5fb0b95d28e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1618758993113-2447833402d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1459499362902-55a20553e082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' />
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Ticket imageProps='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	)
}

export default TicketList
