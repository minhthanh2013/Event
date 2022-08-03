/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse) {
	let user = null
	try {
		console.log(process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + '/user/signin')
		user = await axios.post(process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + '/user/signin', req.body)
	} catch (error) {
		// console.log(error);
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
