/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;
	try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            },
        }
		// const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/conference/create-new"; 
        const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/admin/verify-conference/"+id;
        // const request = "http://localhost:3000/admin/verify-conference/"+id; 
        const response = await axios.post(request, req.body, config);
        res.status(200).json(response.data);
	} catch (error) {
		// console.log(error);
	}
}
