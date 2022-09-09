/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log(6, "Here")
    if (req.method == 'POST') {
        try {
            const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + `/payment/buy-session`; 
            // const request = "http://localhost:3000/payment/new-subscription";
            const response = await axios.post(request, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.STRIPE_TEST_KEY
                }
            })
            console.log(16, response)
            res.status(200).json(response.data)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    
}
