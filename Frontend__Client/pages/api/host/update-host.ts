/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': req.headers.authorization,
		},
	}
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/host/${id}`; 
		// const request = `http://localhost:3000/user/${id}`;
		const response = await axios.put(request, req.body, config);
		if(response.data.status === false) {
			res.status(409).json({
				message: response.data.data,
			});
		}
        res.status(200).json(response.data);
	} catch (error) {
        console.log(error)
		res.status(404).json({
			message: error.message,
		});
	}
}
