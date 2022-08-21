/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	console.log(id);
	try {
		console.log(10)
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/combosession`; 
        // const request = `http://localhost:3000/combosession/${id}`; 
        const response = await axios.patch(request, req.body);
		if(response.data.status === true) {
			res.status(200).json(response.data);
		} else {
			res.status(404).json(response.data);
		}
        
	} catch (error) {
		console.log(error);
	}
}
