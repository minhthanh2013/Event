import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar__SearchResult from '../components/SearchBar__SearchResult'
import styles from '../styles/Background.module.scss'
import FilterListIcon from '@mui/icons-material/FilterList'
import axios from 'axios'
import SessionList_SearchResult from '../components/SessionList_SearchResult'
import TicketList_SearchResult from '../components/TicketList__SearchResult'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'

interface tempProps {
	items: TicketProp[]
	meta: any
	links: any
}

interface TicketProp {
	conference_id: number
	description: string
	price: number
	conference_name: number
	date_start_conference: Date
	address: string
	// conferenceOrganizer: string;
}

function SearchResult(props: any) {
	const router = useRouter()
	const temp = 'Vinh Duong Quang'
	const [filter, setFilter] = useState('');

	const typeRef = useRef(null)

	// inside SearchBar__SearchResult
	const [inputSearch, setInputSearch] = useState(router?.query?.search?.toString() || '')
	const [inputSearchTemp, setInputSearchTemp] = useState('')
	const [type, setType] = useState(router?.query?.type?.toString()  || '0')
	const [typeTemp, setTypeTemp] = useState(router?.query?.type?.toString() || '0')

	const [number, setNumber] = useState(-1)
	const [data, setData] = useState({})
	const [tempProps, setTempProps] = useState<tempProps>()
	const [page, setPage] = useState(1)
	const [category, setCategory] = useState([])

	
	
	useEffect (() => {
		const fetchDataCate = async () => {
			const dataResult = await fetch('/api/conference-category/get-all')
			const cateResult = await dataResult.json()
			// console.log(cateResult.data, 'meow')
			setCategory(cateResult.data)
		}
		fetchDataCate()
	}, [])

	const handleChange = (event: any) => {
		setFilter(event.target.value)
		// alert(event.target.value)
	}

	const handlePaginationChange = async (event, value) => {
		setPage(value)
	}
	const fetchTicket = async () => {
		try {
			let request = `/api/conference/filter?page=${page}`
			if (inputSearch !== '') {
				request = `/api/conference/filter?page=${page}&search=${inputSearch}`
			}
			const response = await fetch(request)
			const setTemp = await response.json()

			setTempProps(setTemp)
			setNumber(setTemp.meta.totalItems)
		} catch (error) {
			console.log(error)
		}
	}
	const fetchSession = async () => {
		try {
			const response = await axios.get(`/api/combo/get-latest-x?id=0`)
			setData(response)
			console.log(response.data.data.length)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
			if (type == '0') {
				fetchTicket()
			} else fetchSession()
		
	
	}, [page, inputSearch, type, filter])

	return (
		<>
			{/* #6A35F2 */}
			<Box className={styles.background__wrap} display='flex' flexDirection='column'>
				<Box className={styles.dot__1}></Box>
				<Box className={styles.dot__2}></Box>
				<Box className={styles.dot__3}></Box>
				<Header {...props} />
				<SearchBar__SearchResult
					inputSearch={inputSearch}
					setInputSearch={setInputSearch}
					type={type}
					setType={setType}
					setTypeTemp={setTypeTemp}
					setInputSearchTemp={setInputSearchTemp}
					typeTemp={typeTemp}
					inputSearchTemp={inputSearchTemp}
					typeRef={typeRef}
				/>
				<Box sx={{ width: '71%', mx: 'auto', display: 'flex', flexDirection: 'row-reverse' }}>
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
							{category.map((item, i) => (
								<MenuItem key={i} value={item.category_id} sx={{ display: 'flex', gap: '1rem' }}>
									{item.category_name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: '85%', mx: 'auto', mt: 5 }}>
					{type == '0' && inputSearch !== '' && (
						<Typography component='h3' sx={{ lineHeight: '3.4rem', fontWeight: '600', fontSize: '1.6rem' }}>
							“{inputSearch}” tickets
						</Typography>
					)}
					{type == '0' && number !== -1 && number != undefined && (
						<Typography component='h4' sx={{ fontWeight: '500', lineHeight: '2rem', fontSize: '1rem' }}>
							{tempProps?.meta.totalItems} results on Evenity
						</Typography>
					)}
					{type == '1' && inputSearch !== '' && (
						<Typography component='h3' sx={{ lineHeight: '3.4rem', fontWeight: '600', fontSize: '1.6rem' }}>
							“{inputSearch}” tickets
						</Typography>
					)}
					{type == '1' && (
						<Typography component='h4' sx={{ fontWeight: '500', lineHeight: '2rem', fontSize: '1rem' }}>
							{data?.data?.data?.length} results on Evenity
						</Typography>
					)}
				</Box>
				<Box sx={{ width: '85%', mx: 'auto' }} flexGrow={1}>
					{type == '0' && <TicketList_SearchResult data={tempProps?.items}></TicketList_SearchResult>}
					{type == '1' && <SessionList_SearchResult data={data}></SessionList_SearchResult>}
				</Box>
				<Box sx={{ width: '85%', mx: 'auto', mb: 5 }}>
					<Stack spacing={2}>
						<Pagination
							count={tempProps?.meta?.totalPages}
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
			<Footer />
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
export default SearchResult
