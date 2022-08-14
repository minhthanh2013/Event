import { Avatar, Box, Button, FormControl, IconButton, Input, InputLabel, Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import PurchaseModal from '../../components/PurchaseModal'
import TicketList_SearchResult from '../../components/TicketList__SearchResult'
import SearchResult from '../search-result'
import Divider from '@mui/material/Divider'
const UserProfile = () => {
	function stringToColor(string: any) {
		let hash = 0
		let i
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash)
		}
		let color = '#'
		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff
			color += `00${value.toString(16)}`.slice(-2)
		}
		return color
	}
	function stringAvatar(name: any) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name.split(' ')[0][0]}`.toUpperCase(),
		}
	}
	return (
		<>
			<Header />
			<Divider sx={{ borderColor: '#4F3398' }} />
			<Box sx={{ width: '80vw', mx: 'auto' }}>
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 7 }}>
					<Typography sx={{ color: '#4F3398', fontWeight: '700', fontSize: '3rem' }}>My Profile</Typography>
				</Box>
				<Box sx={{ display: 'flex', height: 'auto' }}>
					<Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<IconButton>
							<Avatar {...stringAvatar('Vinh dương' || 'No user')} sx={{ width: 250, height: 250 }} />
						</IconButton>
					</Box>
					<Box sx={{ width: '70%' }}>
						<form>
							<Box sx={{ display: 'flex', gap: '6rem', mb: '5rem', justifyContent: 'space-evenly' }}>
								<FormControl variant='standard' sx={{ width: '400px' }}>
									<InputLabel sx={{ fontSize: '1.4rem' }}>First Name</InputLabel>
									<Input id='component-simple' sx={{ fontSize: '1.4rem' }} />
								</FormControl>
								<FormControl variant='standard' sx={{ width: '400px' }}>
									<InputLabel sx={{ fontSize: '1.4rem' }}>Last Name</InputLabel>
									<Input id='component-simple' sx={{ fontSize: '1.4rem' }} />
								</FormControl>
							</Box>

							<Box sx={{ display: 'flex', gap: '6rem', mb: '5rem', justifyContent: 'space-evenly' }}>
								<FormControl variant='standard' sx={{ width: '400px' }}>
									<InputLabel sx={{ fontSize: '1.4rem' }}>Email</InputLabel>
									<Input id='component-simple' sx={{ fontSize: '1.4rem' }} />
								</FormControl>
								<FormControl variant='standard' sx={{ width: '400px' }}>
									<InputLabel sx={{ fontSize: '1.4rem' }}>Password</InputLabel>
									<Input type='password' id='component-simple' sx={{ fontSize: '1.4rem' }} />
								</FormControl>
							</Box>

					

							<Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
								<Button variant='outlined' sx={{ color: '#4F3398', borderColor: '#4F3398', width: '130px' }} size='large'>
									Cancel
								</Button>
								<Button
									type='submit'
									variant='contained'
									size='large'
									sx={{ color: 'white', bgcolor: '#4F3398', width: '130px' }}
								>
									Save
								</Button>
							</Box>
						</form>
					</Box>
				</Box>
			</Box>
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
export default UserProfile
