import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const hostSecret = process.env.HOST_JWT_SECRET as string;
const adminSecret = process.env.ADMIN_JWT_SECRET as string;
const userSecret = process.env.USER_JWT_SECRET as string;

export default async function middleware(req: NextRequest) {
    // const { nextUrl: { query } } = req;
    // const param = req.nextUrl.searchParams.get('id');
    // console.log(10, req.nextUrl.searchParams)
    // const { pathname, origin } = req.nextUrl
    console.log(13, req);
    const { origin } = req.nextUrl
    const { cookies } = req;

    const jwt = cookies.OursiteJWT;

    const url = req.url;

    if (url === `${origin}/user/login`) {
        if (jwt) {
            try {
                verify(jwt, userSecret);
                return NextResponse.redirect(`${origin}/`);
            } catch (error) {
                console.log(error);
                return NextResponse.next();
            }
        }
    }

    if (url === `${origin}/host/login`) {
        if (jwt) {
            try {
                verify(jwt, hostSecret);
                return NextResponse.redirect(`${origin}/host/dashboard`);
            } catch (error) {
                return NextResponse.next();
            }
        }
    }
    if (url === `${origin}/admin/login`) {
        if (jwt) {
            try {
                verify(jwt, adminSecret);
                return NextResponse.redirect(`${origin}/admin/dashboard`);
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url === `${origin}/user/register`) {
        if (jwt) {
            try {
                verify(jwt, adminSecret);
                return NextResponse.redirect(`${origin}/`);
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url === `${origin}/host/register`) {
        if (jwt) {
            try {
                verify(jwt, adminSecret);
                return NextResponse.redirect(`${origin}/host/dashboard`);
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url === `${origin}/admin/register`) {
        if (jwt) {
            try {
                verify(jwt, adminSecret);
                return NextResponse.redirect(`${origin}/admin/dashboard`);
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url.includes("/host") && !url.includes("/host/login") && !url.includes("/host/register")) {
        if (jwt === undefined) {
            return NextResponse.redirect(`${origin}/host/login`);
        }
        try {
            verify(jwt, hostSecret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(`${origin}/host/login`);
        }
    }

    if (url.includes("/admin") && !url.includes("/admin/login") && !url.includes("/admin/register")) {
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

    // if(url === `${origin}/zoom/join-by-zoom-id?id=${param}`) {
    //     if (jwt === undefined) {
    //         return NextResponse.redirect(`${origin}/`);
    //     }
    //     try {
    //         verify(jwt, userSecret);
    //         let tempDecode1 = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    //         const role = tempDecode1.role;
    //         const id = tempDecode1.id;
    //         const meetingId = param;
    //         if(role === 'host') {
    //             const dataResult = await fetch('/api/get-conference-by-zoom-meeting-id/' + meetingId);
    //             const cateResult = await dataResult.json();


    //         }
    //         return NextResponse.next();
    //     } catch (error) {
    //         return NextResponse.redirect(`${origin}/admin/login`);
    //      }
    //     // try {
    //     //     verify(jwt, adminSecret);
    //     //     return NextResponse.next();
    //     // } catch (error) {
    //     //     return NextResponse.redirect(`${origin}/admin/login`);
    //     //  }
    // }


    return NextResponse.next();

}
export const config = {
    matcher: ['/user/:path*', '/admin/:path*', '/host/:path*', '/zoom/:path*'],
}