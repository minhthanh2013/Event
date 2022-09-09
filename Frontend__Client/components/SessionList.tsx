import React, { useEffect, useState } from 'react'
import styles from '../styles/SessionList.module.scss'
import TicketSession from './TicketSession'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'
interface SessionListProps {
	status: boolean;
	data: SessionListProp[];
}
interface SessionListProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: TicketProp[];
	discount: number;
}

interface TicketProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
}
const SessionList = (props : any) => {
	const [sessionList, setSessionList] = useState<SessionListProps>()
	useEffect(() => {
		const fetchSessionList = async () => {
		  const dataResult = await fetch('/api/combo/get-latest-x');
		  const cateResult = await dataResult.json();
		  setSessionList(cateResult)
		}
		fetchSessionList();
	  }, [])
	return (
		<>
			<div className={styles.productWrap}>
				<div className={styles.productContainer}>
					<Box className={styles.control__wrap}>
						<Typography className={styles.list__title}>Combo</Typography>
						
							<a className={styles.see__all} href={'/search-result?type=1'}>See all</a>
						
					</Box>
					<Grid container rowSpacing={8} columnSpacing={8} marginTop={0} sx={{ position: 'relative' }}>
						{sessionList?.data?.map((dataItem) => (
							<Grid item lg={4} md={6} sm={12} key={dataItem.comboSessionId}>
								<Link href={'/session/' + dataItem.comboSessionId} sx={{textDecoration: 'none !important'}}>
									<TicketSession data={dataItem} props={props} />
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
