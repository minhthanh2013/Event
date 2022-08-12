/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		// const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/conference/create-new"; 
        const request = "http://localhost:3000/conference/create-new"; 
        const response = await axios.post(request, req.body);
        res.status(200).json(response.data);
	} catch (error) {
		// console.log(error);
	}
}
