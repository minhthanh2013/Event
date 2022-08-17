/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const param = req.query.id || ''
	console.log(param)
	try {
		let request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/combosession/latest-x-combos/6"; 
		// let request = 'http://localhost:3000' + "/combosession/latest-x-combos/6";
		if(param !== '') {
			request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/combosession/latest-x-combos/${param}`; 
			// request = `http://localhost:3000/combosession/latest-x-combos/${param}`;
		}
		const response = await axios.get(request);
        res.status(200).json(response.data);
	} catch (error) {
		res.status(404).json({
			message: 'Not Found',
			data: []
		});
	}
}
