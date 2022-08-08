import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import CarouselSlide from '../components/CarouselSlide'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import SearchBar__SearchResult from '../components/SearchBar__SearchResult'
import SessionList from '../components/SessionList'
import TicketList from '../components/TicketList'
import styles from '../styles/Background.module.scss'

function SearchResult() {
	const [age, setAge] = useState('')

	const handleChange = (event: any) => {
		setAge(event.target.value)
	}
	return (
		<>
			<Box className={styles.background__wrap}>
				<Box className={styles.dot__1}></Box>
				<Box className={styles.dot__2}></Box>
				<Box className={styles.dot__3}></Box>
				<Header />
				<SearchBar__SearchResult />
				<Box sx={{width: '71%', mx: 'auto', display:'flex', flexDirection:'row-reverse'}}>
					<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
						<InputLabel id='demo-select-small'>Age</InputLabel>
						<Select labelId='demo-select-small' id='demo-select-small' value={age} label='Age' onChange={handleChange}>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Box>
			<Footer />
		</>
	)
}

export default SearchResult
