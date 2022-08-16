import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Combo__2 from '../components/Combo__2'
import DetailBanner from '../components/DetailBanner'
import DetailContent from '../components/DetailContent'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PurchaseModal from '../components/PurchaseModal'
import TicketList_SearchResult from '../components/TicketList__SearchResult'
import SearchResult from './search-result'
import styles from '../styles/Event.module.scss'

const Test = () => {
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(!open)
		// check cookie hiện tại xem người dùng đã đăng nhập chưa, nếu chưa thì redirect
    }
    return (
        <>
            <>
                <Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
                    <Box className={styles.dot__1}></Box>
                    <Header />
                    <DetailBanner data={undefined} handleToggle={handleToggle} />
                    <DetailContent data={undefined} />
                    {/* <DetailBanner data={ticketList.data}/>
					<DetailContent data={ticketList.data}/> */}
                </Box>
                <Footer />
            </>
          {open && <PurchaseModal handleToggle={handleToggle} />}
         
        </>
    )
}

export default Test
