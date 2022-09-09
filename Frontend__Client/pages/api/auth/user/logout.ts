/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.status(200).json({ message: "Bro you are already not logged in..." });
  } else {
    const serialised = serialize("OursiteJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}