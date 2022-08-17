/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/combosession/find-combo-by-host-id/${id}`; 
		// const request = `http://localhost:3000/combosession/find-combo-by-host-id/${id}`;
		console.log(request);
		const response = await axios.get(request);
		console.log(15, response)
		if(response.data.statusCode === 404) {
			res.status(404).json({
				message: 'Not Found',
				data: []
			});
		}
        res.status(200).json(response.data);
	} catch (error) {
		res.status(404).json({
			message: 'Not Found',
			data: []
		});
	}
}
