import { Box, Button, Link } from '@mui/material'
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
import list from 'material-ui/svg-icons/action/list'
import { splitNum } from '../GlobalFunction/SplitNumber'
import DetailBannerSession from '../components/DetailBannerSession'
import EventCreate from './host/dashboard'

const Test = () => {
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(!open)
        // check cookie hiện tại xem người dùng đã đăng nhập chưa, nếu chưa thì redirect
    }
    return (
        <>
            <EventCreate></EventCreate>
        </>
    )
}

export default Test
