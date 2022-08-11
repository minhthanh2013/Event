import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CarouselSlide from '../components/CarouselSlide'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import SearchBar__SearchResult from '../components/SearchBar__SearchResult'
import SessionList from '../components/SessionList'
import TicketList from '../components/TicketList'
import styles from '../styles/Background.module.scss'
import FilterListIcon from '@mui/icons-material/FilterList'
import axios, { Axios } from 'axios'
import SessionList_SearchResult from '../components/SessionList_SearchResult'
import TicketList_SearchResult from '../components/TicketList__SearchResult'
function SearchResult() {
	const temp = 'Vinh Duong Quang'
    const number = 123
    const [filter, setFilter] = useState('0')
	const  [inputSearch, setInputSearch] = useState('')
	const [type, setType] = useState('0')
    const [data, setData] = useState({})

    const handleChange = (event: any) => {
        setFilter(event.target.value)
    }
    
    const fetchTicket = async () => {
        try{
            const response = await axios.get(`put URL Ticket here`)
            console.log(response)
            setData(response)
        } catch (error){
            console.log(error)
        }
    }
    const fetchSession = async () => {
        try{
            const response = await axios.get(`put URL Seesion here`)
            console.log(response)
            setData(response)
        } catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        let isCancelled = true
        if(isCancelled){
            if(type === '0')
                fetchTicket()
            else
                fetchSession()
        }
        return ()   =>  {
            isCancelled = false
        }
    }, [])
    return (
        <>
            {/* #6A35F2 */}
            <Box className={styles.background__wrap}>
                <Box className={styles.dot__1}></Box>
                <Box className={styles.dot__2}></Box>
                <Box className={styles.dot__3}></Box>
                <Header />
                <SearchBar__SearchResult inputSearch={inputSearch} setInputSearch={setInputSearch} type={type} setType={setType} />
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
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0} sx={{ display: 'flex', gap: '1rem' }}>
                                Latest
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
				<Box sx={{width:'85%', mx: 'auto', mt:5}}>
					<Typography component='h3' sx={{lineHeight:'3.4rem', fontWeight: '600', fontSize: '1.6rem'}}>“{inputSearch}” tickets</Typography>
					<Typography component='h4' sx={{fontWeight:'500', lineHeight:'2rem', fontSize:'1rem'}}>{number} results on Evenity</Typography>
				</Box>
                <Box sx={{width:'85%', mx: 'auto'}}>
                    {type === '0' && (<TicketList_SearchResult data={data}></TicketList_SearchResult>)}
                    {type === '1' && (<SessionList_SearchResult data={data}></SessionList_SearchResult>)}
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default SearchResult
