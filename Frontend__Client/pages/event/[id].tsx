import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Box } from '@mui/system'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchBar from '../../components/SearchBar'
import TicketList from '../../components/TicketList'
import CarouselSlide from '../../components/CarouselSlide'
import SessionList from '../../components/SessionList'
import styles from '../../styles/Event.module.scss'
import DetailBanner from '../../components/DetailBanner'
import DetailContent from '../../components/DetailContent'

// export const getStaticPaths = async () => {
//     const res = await fetch('api/event')
//     const data = await res.json()
    
//     const paths = data.map((event:any) => {   
//         return {
//             params: { id: event.id.toString()}
//         }
//     })
//     return {
//         paths: paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context:any) => {
//     const id = context.params.id;
//     const res = await fetch(`api/event/${id}`)
//     const data = await res.json()
//     return {
//         props: { event: data }
//     }
// }

const Event = ({event}:any) => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            
            <Box className={styles.background__wrap}>
                <Box className={styles.dot__1}></Box>
                <Header />
                <DetailBanner/>
                <DetailContent/>
            </Box>
            <Footer/>
        </>
    )
}

export default Event