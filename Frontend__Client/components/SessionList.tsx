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
						{/* {Array.from(Array(6)).map((_, index) => (
                <Grid item lg={4} md={6} sm={12} key={index}>
                  <TicketSession/>
                </Grid>
              ))} */}
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.18169-9/13239476_846985882113173_2643345938272152157_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=OiQ3afCLuQ0AX_I1w0S&_nc_ht=scontent.fsgn13-3.fna&oh=00_AT_YEp4ZbUW7Heih-y8XRKIPa1AGuZZ2FA9V-sjy4YQWpQ&oe=62F08CAE' />
							</Link>
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.6435-9/46342205_1503994629745625_3317681100209258496_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=-YH55dqI-GMAX_Ew1YV&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT_9T5IphI5tonijsBguzzvmYv26Q4jt2ydlxcac0P9ygA&oe=62F12F52' />
							</Link>
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.18169-9/541386_114435868701515_716212342_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=t8PnzsRsGIAAX_pOcY_&tn=4IzJoxUnNFbKoswf&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT_moHcozCIBfcFoAh56nW-uCvrWiSHBo04HM3HcoxlUiA&oe=62EFF768' />
							</Link>
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/174746892_2387398124738600_8459505447558622768_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=IMZblgnH8hsAX_8eLgK&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT9BGo1eHSaZ9mkjqfmUNxaB8AKYTLrjXIs7pKZ5MqH-2w&oe=62F182F0' />
							</Link>
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/174630263_2387398118071934_6625420940962236725_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=sCmQN-ZynPIAX_S930t&tn=4IzJoxUnNFbKoswf&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT90D8WV3IfNyR8_6A89KFntDJ_craO3_uWtTlGaTBYCuw&oe=62EED763' />
							</Link>
						</Grid>
						<Grid item lg={4} md={6} sm={12}>
							<Link href='/event/2'>
								<TicketSession imageProps='https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.18169-9/13239476_846985882113173_2643345938272152157_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=OiQ3afCLuQ0AX_I1w0S&_nc_ht=scontent.fsgn13-3.fna&oh=00_AT_YEp4ZbUW7Heih-y8XRKIPa1AGuZZ2FA9V-sjy4YQWpQ&oe=62F08CAE' />
							</Link>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	)
}

export default SessionList
