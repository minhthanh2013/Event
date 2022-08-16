import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, Grid, Link, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Header from '../../components/Header'
import PurchaseModal from '../../components/PurchaseModal'
import TicketList_SearchResult from '../../components/TicketList__SearchResult'
import SearchResult from '../search-result'
import Divider from '@mui/material/Divider'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../styles/Ticket__2.module.scss'
import { min } from 'date-fns'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Ticket__2 from '../../components/Ticket__2'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Combo__2 from '../../components/Combo__2'

interface ConferenceProp {
	conference_id: number
	description: string
	price: number
	conference_name: number
	date_start_conference: Date
	address: string
	ticket_quantity: number
	current_quantity: number
	status_ticket: string
	conference_type: string
	// conferenceOrganizer: string;
}
interface SessionProp {
	comboSessionId: number
	comboSessionPrice: number
	comboSessionName: string
	comboSessionDescription: string
	conferenceList: ConferenceProp[]
	discount: number
}

interface EventListProps__2 {
	data: SessionProp[]
}

const UserCombo = (props: any) => {
	const [page, setPage] = useState(1)

	const [filter, setFilter] = useState('0')

	const [sessionList, setSessionList] = useState<EventListProps__2>()

	const handleChange = (event: any) => {
		setFilter(event.target.value)
	}

	const handlePaginationChange = async (event, value) => {
		setPage(value)
	}

	const fetchSessions = async () => {
		// Fetch conference by user id
		const dataResult = await fetch(`/api/combo/get-by-user/${props?.tempDecode?.sub}`)
		const cateResult = await dataResult.json()
		setSessionList(cateResult)
	}

	let timeOnly = false
	useEffect(() => {
		// if(!timeOnly) {
		fetchSessions()
		// timeOnly = true;
		// }
	}, [])
	return (
		<>
			<Header {...props}/>
			<Divider sx={{ borderColor: '#4F3398' }} />
			<Box sx={{ dislay: 'flex', flexDirection: 'column' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mx: 'auto', my: 6 }}>
					<Box>
						<Typography variant='h5' component='h2' sx={{ color: '#4F3398', fontWeight: '700', fontSize: '2rem' }}>
							Combos
						</Typography>
					</Box>
					<Box>
						<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
							<Select
								labelId='demo-select-small'
								id='demo-select-small'
								value={filter}
								onChange={handleChange}
								IconComponent={FilterListIcon}
								sx={{
									'& *': { borderColor: '#6A35F2 !important', color: '#6A35F2 !important' },
								}}
							>
								<MenuItem value={0} sx={{ display: 'flex', gap: '1rem' }}>
									Latest
								</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
				{/* Vertical Tab */}
				<Box flexGrow={1} sx={{ height: 'auto', width: '1000px', mx: 'auto', mb: 5 }}>
					<Grid container rowSpacing={8}>
						{sessionList?.data?.map((dataItem) => (
							<Grid item sm={12} key={dataItem.comboSessionId}>
								<Link href={'/session/' + dataItem.comboSessionId}> 
									<Combo__2 data={dataItem} props={undefined} />
								</Link>
							</Grid>
						))}
						{sessionList?.data?.length === 0 && (
							<Typography variant='h5' component='h2' sx={{ color: '#4F3398', fontWeight: '700', fontSize: '2rem' }}>
								You dont have any combo yet.
							</Typography>
						)}
					</Grid>
				</Box>
			</Box>
		</>
	)
}
export async function getServerSideProps(ctx: any) {
	// Fetch data from external API
	// Pass data to the page via props
	let raw = null
	try {
		raw = ctx.req.cookies
	} catch (e) {
		return { props: {} }
	}
	try {
		if (raw.OursiteJWT.toString()) {
			let token = 'OursiteJWT'
			let value = raw.OursiteJWT.toString()
			let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString())
			return {
				props: {
					token,
					value,
					tempDecode,
				},
			}
		}
		return { props: {} }
	} catch (error) {
		return { props: {} }
	}
}
export default UserCombo
