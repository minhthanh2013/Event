import { NextRequest, NextResponse} from 'next/server';
import {verify} from 'jsonwebtoken';

const hostSecret = process.env.HOST_JWT_SECRET
const adminSecret = process.env.ADMIN_JWT_SECRET
const userSecret = process.env.USER_JWT_SECRET

export default function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl

    const {cookies} = req;

    const jwt = cookies.OursiteJWT;
    
    const url = req.url;

    if(url.includes('/account/login')) {
        if (jwt) {
            console.log(jwt)
            try {
                verify(jwt, userSecret);
                return NextResponse.redirect(`${origin}/`);
            } catch (error) {
                console.log(error);
                return NextResponse.next();
             } 
         }
    }

    // if(url.includes('/')) {
    //      if (jwt === undefined) {
    //         return NextResponse.redirect("/account/login");
    //      }

    //      try {
    //         console.log(32, here);
    //         verify(jwt, userSecret);
    //         console.log(34, here);
    //         return NextResponse.next();
    //     } catch (error) {
    //         return NextResponse.redirect("/account/login");
    //      }
    // }

    return NextResponse.next();
}