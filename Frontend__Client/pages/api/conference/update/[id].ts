/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/conference/${id}`; 
        // const request = `http://localhost:3000/conference/${id}`; 
		console.log(12, req.body);
        const response = await axios.patch(request, req.body);
        res.status(200).json(response.data);
	} catch (error) {
		// console.log(error);
	}
}
