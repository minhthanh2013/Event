import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import HomeDashboard from './host/dashboard'
import styles from '../styles/Background.module.scss'
import { useEffect, useState } from 'react'
import PurchaseModal from '../components/PurchaseModal'
export { default as buildStore } from '../shared/redux/buildStore'
import dynamic from 'next/dynamic'



const CarouselSlide = dynamic(() => import('../components/CarouselSlide'), { ssr: false })
const SessionList = dynamic(() => import('../components/SessionList'), { ssr: false })
const TicketList = dynamic(() => import('../components/TicketList'), { ssr: false })
const Header = dynamic(() => import('../components/Header'), { ssr: false })

const Home: NextPage = (props) => {
	console.log(20, props)
	// const [cookies, setCookie] = useCookies(['OursiteJWT'])
	// const [result, setResult] = useState({
	// 	token: '',
	// 	value: '',
	// 	tempDecode: '',
	// })
	// useEffect(() => {
	// 	if(cookies.OursiteJWT !== undefined) {
	// 		let token = 'OursiteJWT'
	// 		let value = cookies?.OursiteJWT;
	// 		let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString())
	// 		setResult({token: token , value: value, tempDecode:tempDecode})
	// 	}
	// },[cookies.OursiteJWT])
	
	// const pageProps = props.pageProps;
	// const result = pageProps.props;
	// console.log(result);
	console.log(40, props)

	const [open, setOpen] = useState(false)
	return (
		<>
		<Box>
			<Box className={styles.background__wrap} sx={{ filter: open ? 'blur(10px) ' : 'none' }}>
				<Box className={styles.dot__1}></Box>
				<Box className={styles.dot__2}></Box>
				<Box className={styles.dot__3}></Box>
				<Header {...props} />
				<CarouselSlide {...props}  />
				<SearchBar />
				<SessionList {...props}  />
				<TicketList {...props}  />
			</Box>
			<Footer />
		</Box>
		</>		
	)
}

export async function getServerSideProps(ctx: any) {
	// Fetch data from external API
	// Pass data to the page via props
	let raw = null
	try {
		raw = ctx.req.cookies
		console.log(67, raw)
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
