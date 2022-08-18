import React, { useEffect, useState } from 'react'
import Box from '@mui/system/Box'
import styles from '../../styles/Session.module.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DetailBannerSession from '../../components/DetailBannerSession'
import DetailContentSession from '../../components/DetailContentSession'
import { useRouter } from 'next/router'
import PurchaseModal from '../../components/PurchaseModal'

interface SessionProp {
	comboSessionId: number
	comboSessionPrice: number
	comboSessionName: string
	comboSessionDescription: string
	conferenceList: TicketProp[]
	discount: number
}

interface TicketProp {
	conference_id: number
	description: string
	price: number
	conference_name: number
	date_start_conference: Date
	address: string
	ticket_quantity: number
	current_quantity: number
	status_ticket: string
	conference_type: string
	organizer_name: string
}

interface SessionProps {
	data: SessionProp
	props: any
}
const Session = (props: SessionProps) => {
	const router = useRouter()
	const { id } = router.query
	const [sessionProps, setSessionProps] = useState<SessionProps>()

	let [open, setOpen] = useState(false)
	const handleToggle = () => {
		setOpen(!open)
		// check cookie hiện tại xem người dùng đã đăng nhập chưa, nếu chưa thì redirect
	}
	useEffect(() => {
		const fetchSessionProp = async () => {
			const dataResult = await fetch(`/api/combo/get-by-combo/${id}`)
			const cateResult = await dataResult.json()
			setSessionProps(cateResult)
		}
		fetchSessionProp()
	}, [id])
	return (
		<>
			<Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
				<Box className={styles.dot__1}></Box>
				<Header {...props} />
				{sessionProps?.data && (
					<DetailBannerSession
						handleToggle={handleToggle}
						nameProp={sessionProps?.data?.comboSessionName}
						comboDescription={sessionProps?.data?.comboSessionDescription}
						price={sessionProps?.data?.comboSessionPrice}
						numberOfTicket={sessionProps?.data?.conferenceList.length}
						discount={sessionProps?.data?.discount}
					/>
				)}
				{sessionProps?.data && <DetailContentSession data={sessionProps?.data} />}
			</Box>
			{open && <PurchaseModal handleToggle={handleToggle} data={undefined} imageProp={undefined} />}

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
export default Session
