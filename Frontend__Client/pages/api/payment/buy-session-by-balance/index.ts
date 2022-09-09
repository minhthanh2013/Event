/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        try {
            const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/payment/payment-session-with-balance`; 
            // const request = "http://localhost:3000/payment/new-subscription";
            const response = await axios.post(request, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res.status(200).json(response.data)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    
}
