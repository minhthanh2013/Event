import React, { useEffect, useState } from 'react'
import styles from '../styles/TicketList.module.scss'
import Ticket from './Ticket'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'

interface TicketProps {
    status: boolean
    data: TicketProp[]
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

const TicketList = (props: any) => {
    const [ticketList, setTicketList] = useState<TicketProps>()
    // 'conference-1-avatar '
    useEffect(() => {
        let isCancelled = true
        const fetchTicketList = async () => {
            const dataResult = await fetch('/api/conference/get-latest-x')
            const cateResult = await dataResult.json()
            if (isCancelled) {
                setTicketList(cateResult)
            }
        }
        fetchTicketList()
        return () => {
            isCancelled = false
        }
    }, [])
    return (
        <>
            <div className={styles.productWrap}>
                <div className={styles.productContainer}>
                    <Box className={styles.control__wrap}>
                        <Typography className={styles.list__title}>Conference</Typography>
                        <a className={styles.see__all}>See all</a>
                    </Box>
                    <Grid container rowSpacing={8} columnSpacing={8} marginTop={0} sx={{ position: 'relative' }}>
                        {ticketList?.data?.map((dataItem) => (
                            <Grid item lg={4} md={6} sm={12} key={dataItem.conference_id}>
                                <Link href={'/event/' + dataItem.conference_id}>
                                    <Ticket data={dataItem} props={props} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default TicketList
