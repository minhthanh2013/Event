import React from 'react'
import styles from '../styles/SessionList.module.scss'
import TicketSession from './TicketSession'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'
interface SessionListProps {}

const SessionList = (props : any) => {
	return (
		<>
			<div className={styles.productWrap}>
				<div className={styles.productContainer}>
					<Box className={styles.control__wrap}>
						<Typography className={styles.list__title}>Combo</Typography>
						<a className={styles.see__all}>See all</a>
					</Box>
					<Grid container rowSpacing={8} columnSpacing={8} marginTop={0}>
						{Array.from(Array(6)).map((_, index) => (
							<Grid item lg={4} md={6} sm={12} key={index}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.18169-9/13239476_846985882113173_2643345938272152157_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=OiQ3afCLuQ0AX_I1w0S&_nc_ht=scontent.fsgn13-3.fna&oh=00_AT_YEp4ZbUW7Heih-y8XRKIPa1AGuZZ2FA9V-sjy4YQWpQ&oe=62F08CAE' />
							</Link>
							</Grid>
              			))}
					</Grid>
				</div>
			</div>
		</>
	)
}

export default SessionList
