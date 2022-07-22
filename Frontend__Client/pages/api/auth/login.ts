/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";
import axios from 'axios';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const user = await axios.post("http://"+"localhost"+":"+"3000"+"/user/signin", req.body);
  if (user) {
    const token = user.data.access_token;

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}