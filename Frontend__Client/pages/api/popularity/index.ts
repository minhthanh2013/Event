/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/popularity/add-popular"; 
		// const request = "http://localhost:3000/conferencetype/get-all"; 
		const response = await axios.post(request);
        res.status(200).json(response.data);
	} catch (error) {
		return res.status(500).send(error);
	}
}