import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import styles from '../../../styles/Background.module.scss'

const ZoomRecord = (props) => {
	const [record, setRecord] = useState<string>()
	const router = useRouter()
	const { conferenceId } = router.query
	useEffect(() => {
		const fetchVideoRecord = async () => {
			const response = await fetch(`/api/conference/get-conference-record/${conferenceId}`)
			const cateResult = await response.text()
			// console.log(16, cateResult);
			setRecord(cateResult)
		}
		fetchVideoRecord()
	}, [])
	return (
		<>
			<Box className={styles.background__wrap} sx={{ minHeight: '1100px !important' }}>
				<Box className={styles.dot__1}></Box>
				<Box className={styles.dot__2}></Box>
				<Box className={styles.dot__3}></Box>
				<Header {...props} />
				<Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
					<video controls src={record} style={{ width: '95%' }} />
				</Box>

				{/* </Container> */}
			</Box>
			<Footer />
		</>
	)
}

export async function getServerSideProps(ctx: any) {
	// Fetch data from external API
	// Pass data to the page via props
	let raw = null;
	try {
	  raw = ctx.req.cookies;
	} catch (e) {
	  return { props: {} }
	}
	try { 
	  if (raw.OursiteJWT.toString()) {
		let token = "OursiteJWT"
		let value = raw.OursiteJWT.toString();
		let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
		return {
		  props: {
			token, value,
			tempDecode
		  }
		};
	  } return { props: {} }
	} catch (error) {
	  return { props: {} }
	}
  }
export default ZoomRecord
