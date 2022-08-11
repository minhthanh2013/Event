import React, { useEffect, useState } from 'react'
import styles from '../styles/TicketList.module.scss'
import Ticket from './Ticket'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import Link from '@mui/material/Link'

interface TicketProps {
    // status: boolean
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

const TicketList_SearchResult = (props: TicketProps) => {
    return (
        <>
            <div className={styles.productWrap}>
                <div className={styles.productContainer}>
                    <Grid container rowSpacing={8} columnSpacing={8} marginTop={0} sx={{ position: 'relative' }}>
                        {props?.data?.map((dataItem) => (
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

export default TicketList_SearchResult
