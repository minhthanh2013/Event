import { Card, CardMedia, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import styles from '../styles/PurchaseModal.module.scss'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
const PurchaseModal = () => {
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.leftWrap}>
					<Box className={styles.leftWrap__top}>
						<Typography component='h3'>British Boarding Schools Show, Ho Chi Minh</Typography>
						<Typography component='h4'>Tue, Apr 19, 2022 1:00 AM - 2:00 AM +07</Typography>
						<Divider variant='middle' />
					</Box>
					<Box className={styles.leftWrap__body}>
						<TicketInModal />
					</Box>
					<Box className={styles.leftWrap__bottom}>
						<Typography>Total</Typography>
						<Typography>
							<AttachMoneyIcon />
							50.00
						</Typography>
					</Box>
				</Box>
				<Box className={styles.rightWrap}></Box>
			</Box>
		</>
	)
}

export const TicketInModal = () => {
	return (
		<>
			<Box className={styles.ticketContainer}>
				<Card elevation={0} className={styles.ticketWrap}>
					<CardMedia
						component='img'
						sx={{ width: 151, mt: '1rem', boxShadow: '0px' }}
						image='https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Live from space album cover'
					/>
					<Box>
						<Typography></Typography>
					</Box>
				</Card>
			</Box>
		</>
	)
}

export default PurchaseModal
