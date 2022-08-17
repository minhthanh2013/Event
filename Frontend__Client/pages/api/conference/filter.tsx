/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { page, search } = req.query;
	let sParameter = '';
	if(search !== undefined && search !== '') {
		sParameter = encodeURIComponent(search?.toString().trim())
	}
	try {
		// let request = `http://localhost:3000/conference/filter?page=${page}&onlyPublish=true`;
		let request = `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/conference/filter?page=${page}&onlyPublish=true`;
		if (sParameter !== '') {
			request = `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/conference/filter?page=${page}&search=${sParameter}&onlyPublish=true`;
			// request = `http://localhost:3000/conference/filter?page=${page}&search=${sParameter}&onlyPublish=true`;
		}
		const response = await axios.get(request);
        res.status(200).json( response.data);
	} catch (error) {
        console.log(error);
		res.status(200).json(null);
	}
}
