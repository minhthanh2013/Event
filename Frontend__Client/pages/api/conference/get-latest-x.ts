/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const {userId} = req.query;
	try {
		let request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/conference/get-x-conferences/6"; 
		if(userId!== undefined) {
			request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/conference/get-x-conferences/6?userId="+userId; 
		}
		// const request = 'http://localhost:3000' + "/conference/get-x-conferences/6";
		const response = await axios.get(request);
        res.status(200).json(response.data);
	} catch (error) {
		// console.log(error);
	}
}
