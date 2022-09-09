/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	try {
		const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/ticket/verify-user-buy-session`; 
		// const request = `http://localhost:3000/user/${id}`;
		const response = await axios.post(request, req.body, config);
		if(response.data.status !== true) {
			res.status(404).json({
				message: 'User havent bought this session yet',
			});
		}
        res.status(200).json(response.data);
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
}
