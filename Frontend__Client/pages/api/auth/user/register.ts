/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse) {
	let user = null
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + '/user/signup';
		// const request = 'http://localhost:3000/user/signup'; 
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}
		console.log(16, req.body)
		const params = new URLSearchParams()
		params.append('user_name', req.body.user_name)
		params.append('password', req.body.password)
		params.append('email', req.body.email)
		params.append('first_name', req.body.first_name)
		params.append('last_name', req.body.last_name)  
		params.append('category', req.body.category)
		user = await axios.post(request, params, config)
	} catch (error) {
		console.log(error);
	}
	if (user !== null) {
		const token = user.data.access_token

		const serialised = serialize('OursiteJWT', token, {
			httpOnly: false,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		})

		res.setHeader('Set-Cookie', serialised)

		res.status(200).json({ message: 'Success!' })
	} else {
		res.status(403).json({ message: 'Invalid credentials!' })
	}
}
