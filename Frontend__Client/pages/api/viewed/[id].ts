/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'


export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/conference/viewed/${id}`; 
		// const request = `http://localhost:3000/speaker/${id}`;
		const response = await axios.post(request);
        res.status(200).json(response.data);
	} catch (error) {
        console.log(error);
		res.status(200).json(null);
	}
}