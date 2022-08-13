/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        try {
            const request = "http://localhost:3000/payment/new-subscription";
            const response = await axios.post(request, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.STRIPE_TEST_KEY
                }
            })
            res.status(200).json(response.data)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    
}
