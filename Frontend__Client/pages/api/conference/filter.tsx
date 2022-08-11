/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { page, search } = req.query;
    
	try {
		let request = `http://localhost:3000/conference/filter?page=${page}`;
		if (search) {
			request = `http://localhost:3000/conference/filter?page=${page}&search=${search}`;
		}
		const response = await axios.get(request);
        res.status(200).json( response.data);
	} catch (error) {
        console.log(error);
		res.status(200).json(null);
	}
}
