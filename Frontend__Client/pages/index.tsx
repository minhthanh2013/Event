import { Box } from '@mui/material'
import type { NextPage } from 'next'
import CarouselSlide from '../components/CarouselSlide'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import SessionList from '../components/SessionList'
import TicketList from '../components/TicketList'
import HomeDashboard from './host/dashboard'
import styles from '../styles/Background.module.scss'
import { useState } from 'react'
import PurchaseModal from '../components/PurchaseModal'
export { default as buildStore } from '../shared/redux/buildStore'

interface ConferenceProps {
	status: boolean
	data: ConferenceProps[]
}

const Home: NextPage = (props) => {
	const [open, setOpen] = useState(false)

	const handleToggle = () => {
		setOpen(!open)
		// check cookie hiện tại xem người dùng đã đăng nhập chưa, nếu chưa thì redirect
	}
	return (
		<Box>
			<Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
				<Box className={styles.dot__1}></Box>
				<Box className={styles.dot__2}></Box>
				<Box className={styles.dot__3}></Box>
				<Header {...props} />
				<CarouselSlide {...props} handleToggle={handleToggle} />

				<SearchBar />
				<SessionList {...props} />
				<TicketList {...props} />
			</Box>
			<Footer />
			{/* <HomeDashboard /> */}
			<Box sx={{ position: 'fixed', top: '40%', left: '50%', zIndex: '4' }}>
				{open && <PurchaseModal handleToggle={handleToggle} data={undefined} />}
			</Box>
		</Box>
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
export default Home
