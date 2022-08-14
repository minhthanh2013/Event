import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, Grid, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Header from '../components/Header'
import PurchaseModal from '../components/PurchaseModal'
import TicketList_SearchResult from '../components/TicketList__SearchResult'
import SearchResult from './search-result'
import Divider from '@mui/material/Divider'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../styles/Ticket__2.module.scss'
import { min } from 'date-fns'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Ticket__2 from '../components/Ticket__2'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Combo__2 from '../components/Combo__2'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
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
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
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

const UserTicket = () => {
	const [page, setPage] = useState(1)

	//Tab
	const [value, setValue] = React.useState(0)

	const [filter, setFilter] = useState('0')

	const handleChange = (event: any) => {
		setFilter(event.target.value)
	}

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handlePaginationChange = async (event, value) => {
		setPage(value)
		// fetchTicket()
	}
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
						sx={{ borderRight: 1, borderColor: 'divider', width: '10%' }}
					>
						<Tab label='Ticket' {...a11yProps(0)} />
						<Tab label='Combo' {...a11yProps(1)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Box flexGrow={1} sx={{ height: '1100px', width: '60%', mx: 'auto', mb: 5 }}>
							<Grid container rowSpacing={8}>
								{[1, 2, 3, 4].map((dataItem) => (
									// eslint-disable-next-line react/jsx-key
									<Grid item sm={12}>
										<Ticket__2 data={undefined} />
									</Grid>
								))}
							</Grid>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Box flexGrow={1} sx={{ height: 'auto', width: '60%', mx: 'auto', mb: 5 }}>
							<Grid container rowSpacing={8}>
								{[1, 2, 3, 4].map((dataItem) => (
									// eslint-disable-next-line react/jsx-key
									<Grid item sm={12}>
										<Combo__2 data={undefined} props={undefined} />
									</Grid>
								))}
							</Grid>
						</Box>
					</TabPanel>
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

export default UserTicket
