import { NextRequest, NextResponse} from 'next/server';
import {verify} from 'jsonwebtoken';

const hostSecret = process.env.HOST_JWT_SECRET as string;
const adminSecret = process.env.ADMIN_JWT_SECRET as string;
const userSecret = process.env.USER_JWT_SECRET as string;

export default function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl

    const {cookies} = req;

    const jwt = cookies.OursiteJWT;
    
    const url = req.url;

    if(url === `${origin}/account/login`) {
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

    // if(url === `${origin}/`) {
    //      if (jwt === undefined) {
    //         return NextResponse.redirect(`${origin}/account/login`);
    //      }

    //      try {
    //         verify(jwt, userSecret);
    //         return NextResponse.next();
    //     } catch (error) {
    //         return NextResponse.redirect(`${origin}/account/login`);
    //      }
    // }

//     if(url.includes("/host")) {
//         if (jwt === undefined) {
//            return NextResponse.redirect(`${origin}/host/login`);
//         }
//         try {
//            verify(jwt, hostSecret);
//            return NextResponse.next();
//        } catch (error) {
//            return NextResponse.redirect(`${origin}/host/login`);
//         }
//    }

   if(url.includes("/admin")) {
    if (jwt === undefined) {
       return NextResponse.redirect(`${origin}/admin/login`);
    }
    try {
       verify(jwt, adminSecret);
       return NextResponse.next();
   } catch (error) {
       return NextResponse.redirect(`${origin}/admin/login`);
    }
}
    return NextResponse.next();
}