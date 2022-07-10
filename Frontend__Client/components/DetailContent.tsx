import { Box, Typography } from '@mui/material'
import styles from '../styles/DetailContent.module.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn'
const DetailContent = () => {
	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.content__wrap}>
					<Box className={styles.column__section}>
						<Box className={styles.column__left}>
							<Typography component='h3'>Description</Typography>
							<Box>
								<Typography component='span'>
									“Metaverse”- “NFT” is considered the keyword of the fashion and retail industry in 2022. As consumers spend more time using the internet, the
									metaverse universe becomes the “perfect launching pad” for “virtual goods.” Fashion industry leaders need to discover new ways of interacting
									with today’s young consumers, by experimenting with “NFT” (Non-fungible Token), virtual fashion in Brands will use the metaverse platform to
									engage young consumers and find new avenues for creativity, community building or new commercial models.
								</Typography>
							</Box>
						</Box>
						<Box className={styles.column__right}>
							<Typography component='h3'>Event Location</Typography>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.9507611537924!2d106.61367654932418!3d10.78813865533503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c095286d679%3A0x730438ca8d7f26e3!2zVHLGsOG7nW5nIFRIQ1MgVHLhuqduIFF14buRYyBUb-G6o24!5e0!3m2!1svi!2s!4v1657444715111!5m2!1svi!2s'
								width='400'
								height='300'
								loading='lazy'
							></iframe>
							{/* <Box component='img' src='https://i.stack.imgur.com/HILmr.png'></Box> */}
							<Typography component='h4'>Auditorium 2.1.004, RMIT University Saigon South Campus</Typography>
							<Typography component='span'>702 Nguyen Van Linh, District 7, Ho Chi Minh City</Typography>
						</Box>
					</Box>
					<Box className={styles.info__section}>
						<Typography component='h3'>Hours</Typography>
						<Typography component='p'>Sunday, Apr 24, 2022 at 9:30 AM</Typography>
						<Typography component='h3'>How can I contact the organizer with any question?</Typography>
						<Typography component='p'>
							Please visit <a href='#'>https://www.rmit.edu.vn/</a> and refer to the FAQ section for all questions and contact information.{' '}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default DetailContent
