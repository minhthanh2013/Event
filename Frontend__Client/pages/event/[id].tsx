import React, { useEffect, useState } from 'react'
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

interface TicketProp {
	conference_id: number
	description: string
	price: number
	conference_name: number
	date_start_conference: Date
	address: string
	// conferenceOrganizer: string;
}

interface TicketProps {
	data: TicketProp
	// conferenceOrganizer: string;
}

const Event = (props: any) => {
	const router = useRouter()
	const { id } = router.query
	const [ticketList, setTicketList] = useState<TicketProps>()
	useEffect(() => {
		const fetchTicketList = async () => {
			const dataResult = await fetch(`/api/conference/${id}`)
			const cateResult = await dataResult.json()
			setTicketList(cateResult)
		}
		fetchTicketList().catch(() => {
			//
		})
	}, [id])

	return (
		<>
			<Box className={styles.background__wrap}>
				<Box className={styles.dot__1}></Box>
				<Header {...props} />
				{ticketList?.data && <DetailBanner data={ticketList.data} />}
				{ticketList?.data && <DetailContent data={ticketList.data} />}
				{/* <DetailBanner data={ticketList.data}/>
                <DetailContent data={ticketList.data}/> */}
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
		raw = ctx.req.headers.cookie.toString()
	} catch (e) {
		return { props: {} }
	}
	if (raw.includes(';')) {
		let rawCookie = raw.split(';')
		for (let i = 0; i < rawCookie.length; i++) {
			if (rawCookie[i].includes('OursiteJWT')) {
				let cookies = rawCookie[i]
				let token = cookies.split('=')[0]
				let value = cookies.split('=')[1]
				let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
				return { props: { token, value, tempDecode } }
			}
		}
	}
	return { props: {} }
}
export default Event
