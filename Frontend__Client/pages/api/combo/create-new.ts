/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'
import axios from 'axios'
import https from 'https';
interface ComboRequest {
    combo_name: string;
    discount: string;
    combo_description: string;
    conferenceList: any[];
    hostName: string;
}
interface ComboSendRequest {
    combo_name: string;
    discount: string;
    combo_description: string;
    listConferenceIds: number[];
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
	if(req.method === 'POST') {
        try {
            
            // console.log(23, JSON.parse(req.body.toString()).combo_name)
            // const request = process.env.BACKEND_PROTOCOL+'://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT + "/conference/create-new"; 
            const request = "http://localhost:3000/combosession/"; 
            let obj: ComboRequest = req.body;
            let buildBody = {} as ComboSendRequest;
            buildBody.combo_name = obj.combo_name;
            buildBody.discount = obj.discount;
            buildBody.combo_description = obj.combo_description;
            buildBody.listConferenceIds = obj.conferenceList.map(x => x.conference_id);
            const response = await axios.post(request, buildBody);
            res.status(200).json(response.data);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}
