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
		// const request = `http://localhost:3000/host/${id}`;
		const response = await axios.get(request, config);
        const url = response.data;
        res.status(200).json(url);
	} catch (error) {
        console.log(error);
		res.status(200).json(null);
	}
}
