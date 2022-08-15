import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, Grid, MenuItem, Select, Stack, Typography } from '@mui/material'
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
interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
	conf?: ConferenceProp[]
	comb?: SessionProp[]
	// conf: ConferenceProp[];
}
interface ConferenceProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
	ticket_quantity: number;
	current_quantity: number;
	status_ticket: string;
	conference_type: string;
	// conferenceOrganizer: string;
}

interface SessionProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: ConferenceProp[];
	discount: number;
}

interface EventListProps {
  data: ConferenceProp[];
}

interface EventListProps__2 {
	data: SessionProp[];
  }

function TabPanel__Ticket(props: TabPanelProps) {
	console.log(42, props)
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
			
					<Box flexGrow={1} sx={{ height: '1100px', width: '1000px', mx: 'auto', mb: 5 }}>
							<Grid container rowSpacing={8}>
								{props?.conf?.map((dataItem) => (
									<Grid item sm={12} key={dataItem.conference_id}>
										<Ticket__2 data={dataItem} />
									</Grid>
								))}
							</Grid>
						</Box> 
				
			)}
		</div>
	)
}
function TabPanel__Combo(props: TabPanelProps) {
	const { children, value, index, ...other } = props
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box flexGrow={1} sx={{ height: 'auto', width: '650px', mx: 'auto', mb: 5 }}>
				<Grid container rowSpacing={8}>
					{props?.comb?.map((dataItem) => (
						<Grid item sm={12} key={dataItem.comboSessionId}>
							<Combo__2 data={dataItem} props={undefined} />
						</Grid>
					))}
				</Grid>
			</Box>
			)}
		</div>
	)
}


function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	}
}

const UserTicket = (props: any) => {
	console.log(71, props)
	const [page, setPage] = useState(1)
	//Tab
	const [value, setValue] = React.useState(0)

	const [filter, setFilter] = useState('0')

	const [ticketList, setTicketList] = useState<EventListProps>()

	
	const [sessionList, setSessionList] = useState<EventListProps__2>()


	const handleChange = (event: any) => {
		setFilter(event.target.value)
	}

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handlePaginationChange = async (event, value) => {
		setPage(value)
		if(value === '0') {
			fetchConferences();
		} else {
			fetchSessions();
		}
		// fetchTicket()
	}


	const fetchConferences = async () => {
		// Fetch conference by user id
		const dataResult = await fetch(`/api/conference/get-conference-by-user-id/${props.tempDecode.sub}`);
		const cateResult = await dataResult.json();
		setTicketList(cateResult)
	}
	const fetchSessions = async () => {
		// Fetch conference by user id
		const dataResult = await fetch(`/api/combo/get-latest-x?id=0`);
		const cateResult = await dataResult.json();
		setSessionList(cateResult)
	}

	let timeOnly = false;
	useEffect(() => {
		// if(!timeOnly) {
			fetchConferences();
			// timeOnly = true;
		// }
	}, [])
	return (
		<>
			<Header />
			<Divider sx={{ borderColor: '#4F3398' }} />
			<Box sx={{ dislay: 'flex', flexDirection: 'column' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mx: 'auto', my: 6 }}>
					<Box>
						<Typography variant='h5' component='h2' sx={{ color: '#4F3398', fontWeight: '700', fontSize: '2rem' }}>
							Tickets
						</Typography>

						{/* {filter == '1' && (
							<Typography variant='h5' component='h2' sx={{ color: '#4F3398' }}>
								Combo
							</Typography>
						)} */}
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
				<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto', width: '85%', mx: 'auto' }}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChangeTab}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: 'divider', width: '10%', mr:'15%'}}
					>
						<Tab label='Ticket' {...a11yProps(0)} />
						<Tab label='Combo' {...a11yProps(1)} />
					</Tabs>
					<TabPanel__Ticket value={value} index={0} conf={ticketList?.data}>
					</TabPanel__Ticket>
					<TabPanel__Combo value={value} index={1} comb={sessionList?.data}>
					</TabPanel__Combo>
				</Box>

				<Box sx={{ width: '85%', mx: 'auto', mb: 10 }}>
					<Stack spacing={2}>
						<Pagination
							count={10}
							variant='outlined'
							onChange={handlePaginationChange}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								'& *': { borderColor: '#6A35F2 !important', color: '#6A35F2 !important' },
								'.css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
									backgroundColor: 'rgba(206, 147, 216, 0.24) !important',
								},
							}}
						/>
					</Stack>
				</Box>
			</Box>
		</>
	)
}
export async function getServerSideProps(ctx: any) {
	// Fetch data from external API
	// Pass data to the page via props
	let raw = null;
	try {
	  raw = ctx.req.cookies;
	} catch (e) {
	  return { props: {} }
	}
	try { 
	  if (raw.OursiteJWT.toString()) {
		let token = "OursiteJWT"
		let value = raw.OursiteJWT.toString();
		let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
		return {
		  props: {
			token, value,
			tempDecode
		  }
		};
	  } return { props: {} }
	} catch (error) {
	  return { props: {} }
	}
  }
export default UserTicket
