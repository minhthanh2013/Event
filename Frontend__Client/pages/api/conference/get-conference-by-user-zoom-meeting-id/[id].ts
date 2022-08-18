/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';


export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { userId, zoomId } = req.query;
	try {
		const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/conference/find-meeting-by/user-zoom-meeting-id?userId=${userId}&zoomId=${zoomId}`; 
		// const request = `http://localhost:3000/conference/find-meeting-by/user-zoom-meeting-id?userId=${userId}&zoomId=${zoomId}`;
		const response = await axios.get(request);
        res.status(200).json( response.data);
	} catch (error) {
		res.status(500).json(error);
	}
}
