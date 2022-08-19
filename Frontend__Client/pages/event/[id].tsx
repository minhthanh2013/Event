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
import Typography from '@mui/material/Typography'
import PurchaseModal from '../../components/PurchaseModal'
import dynamic from 'next/dynamic'


const DetailContent = dynamic (() => import('../../components/DetailContent'), { ssr: false })

interface TicketProp {
	conferenceAddress: string
	conferenceCategory: number
	conferenceDescription: string
	conferenceName: string
	conferencePrice: number
	conferenceType: number
	organizerName: string
	ticketQuantity: number
	status_ticket: string
	host_id: number
	conference_id: number
	address: string
	date_start_conference: Date

	// conferenceOrganizer: string;
}
interface TicketProps {
	data: TicketProp
	// conferenceOrganizer: string;
}

const Event = (props: any) => {
	const router = useRouter()
	const { id } = router.query
	const {isBuy} = router.query
	const [ticketList, setTicketList] = useState<TicketProps>()
	const [imageProp, setImageProp] = useState<string>()
	const userId = props.tempDecode.sub;
	let [open, setOpen] = useState(false || isBuy === 'true')
	const handleToggle = () => {
		setOpen(!open)
		// check cookie hiện tại xem người dùng đã đăng nhập chưa, nếu chưa thì redirect
	}
	useEffect(() => {
		const fetchTicketList = async () => {
			const dataResult = await fetch(`/api/conference/${id}`)
			const cateResult = await dataResult.json()
			setTicketList(cateResult)
		}
		const fetchImage = async () => {
			const dataResult = await fetch(`/api/conference/get-conference-image/${id}`)
			const cateResult = await dataResult.json()
			setImageProp(cateResult.url)
		}
		fetchTicketList().catch(() => {
			//
		})
		fetchImage();
	}, [id])

	return (
		<>
			{ticketList?.data?.status_ticket !== 'published' ? (
				props?.tempDecode?.role === 'admin' ||
				(props?.tempDecode?.sub === ticketList?.data?.host_id && props?.tempDecode?.role === 'host') ? (
					<>
						<Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
							<Box className={styles.dot__1}></Box>
							<Header {...props} />
							{ticketList?.data && <DetailBanner data={ticketList.data} handleToggle={handleToggle} />}
							{ticketList?.data && <DetailContent data={ticketList.data} />}
							{/* <DetailBanner data={ticketList.data}/>
					<DetailContent data={ticketList.data}/> */}
						</Box>
						{open && <PurchaseModal handleToggle={handleToggle} data={ticketList.data} imageProp={imageProp} userId={userId}/>}
						<Footer />
					</>
				) : (
					<>
						<Header {...props} />
						<Typography variant='h1' component='div' gutterBottom className={styles.sketchy}>
							Sorry, this conference have not been published yet.
						</Typography>
						<Footer />
					</>
				)
			) : (
				<>
					<Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
						<Box className={styles.dot__1}></Box>
						<Header {...props} />
						{ticketList?.data && <DetailBanner data={ticketList.data} handleToggle={handleToggle} />}
						{ticketList?.data && <DetailContent data={ticketList.data} />}
						{/* <DetailBanner data={ticketList.data}/>
						<DetailContent data={ticketList.data}/> */}
					</Box>
					{open && <PurchaseModal handleToggle={handleToggle} data={ticketList.data} imageProp={imageProp} userId={userId}/>}
					<Footer />
				</>
			)}
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
export default Event
