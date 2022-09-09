/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}
	let host = null
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + '/host/signin'; 
		// const request = 'http://localhost:3000/host/signin'; 
		host = await axios.post(request, req.body);
	} catch (error) {
		console.log(error);
	}
	if (host !== null) {
		const token = host.data.access_token

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
