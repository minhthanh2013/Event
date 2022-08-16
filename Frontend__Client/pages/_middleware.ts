import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const hostSecret = process.env.HOST_JWT_SECRET as string;
const adminSecret = process.env.ADMIN_JWT_SECRET as string;
const userSecret = process.env.USER_JWT_SECRET as string;

export default async function middleware(req: NextRequest) {
    const param = req.nextUrl.searchParams;
    const jwt = req.cookies.OursiteJWT;
    const {pathname} = req.nextUrl;
    console.log(pathname)
    // USER
    if (pathname === "/user/login") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, userSecret);
          req.nextUrl.pathname = "/";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }
      if (pathname === "/user/register") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, userSecret);
          req.nextUrl.pathname = "/";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }

      if (pathname.startsWith("/user/") && (pathname !== "/user/login")) {
        if (jwt === undefined) {
            req.nextUrl.pathname = "/user/login";
            return NextResponse.redirect(req.nextUrl);
        }
        try {
          verify(jwt, userSecret);
          req.nextUrl.pathname = "/";
          return NextResponse.next();
        } catch (error) {
            req.nextUrl.pathname = "/user/login";
            return NextResponse.redirect(req.nextUrl);
        }
      }

      // HOST
      if (pathname === "/host") {
        if (jwt === undefined) {
          req.nextUrl.pathname = "/host/login";
          return NextResponse.redirect(req.nextUrl);
        }
        try {
          verify(jwt, adminSecret);
          req.nextUrl.pathname = "/host/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }
      if (pathname === "/host/login") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, hostSecret);
          req.nextUrl.pathname = "/host/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }
      if (pathname === "/host/register") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, hostSecret);
          req.nextUrl.pathname = "/host/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }

      if (pathname.startsWith("/host/") && (pathname !== "/host/login")) {
        if (jwt === undefined) {
            req.nextUrl.pathname = "/host/login";
            return NextResponse.redirect(req.nextUrl);
        }
        try {
          verify(jwt, hostSecret);
          req.nextUrl.pathname = "/host/dashboard";
          return NextResponse.next();
        } catch (error) {
            req.nextUrl.pathname = "/host/login";
            return NextResponse.redirect(req.nextUrl);
        }
      }

      // ADMIN 
      if (pathname === "/admin") {
        if (jwt === undefined) {
          req.nextUrl.pathname = "/admin/login";
          return NextResponse.redirect(req.nextUrl);
        }
        try {
          verify(jwt, adminSecret);
          req.nextUrl.pathname = "/admin/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }
      if (pathname === "/admin/login") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, adminSecret);
          req.nextUrl.pathname = "/admin/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }
      if (pathname === "/admin/register") {
        if (jwt === undefined) {
          return NextResponse.next();
        }
        try {
          verify(jwt, adminSecret);
          req.nextUrl.pathname = "/admin/dashboard";
          return NextResponse.redirect(req.nextUrl);
        } catch (error) {
            return NextResponse.next();
        }
      }

      if (pathname.startsWith("/admin/") && (pathname !== "/admin/login")) {
        if (jwt === undefined) {
            req.nextUrl.pathname = "/admin/login";
            return NextResponse.redirect(req.nextUrl);
        }
        try {
          verify(jwt, adminSecret);
          req.nextUrl.pathname = "/admin/dashboard";
          return NextResponse.next();
        } catch (error) {
            req.nextUrl.pathname = "/admin/login";
            return NextResponse.redirect(req.nextUrl);
        }
      }

      // ZOOM 
      if(param.has("id") && pathname === `/zoom/join-by-zoom-id`) {
        if (jwt === undefined) {
            req.nextUrl.pathname = "/";
            return NextResponse.redirect(req.nextUrl);
        }
        try {
            let tempDecode1 = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
            const role = tempDecode1.role;
            const userId = tempDecode1.sub;
            const meetingId = param.get('id').toString();
            let dataResult = null;
            let cateResult = null;
            if(role === 'host') {
                try {
                    verify(jwt, hostSecret);
                    let dataResult = await fetch(`http:localhost:8080/api/conference/get-conference-by-zoom-meeting-id/${meetingId}`);
                    let cateResult = await dataResult.json();
                    if(await cateResult.conference_id !== undefined) {
                        return NextResponse.next();
                    } else {
                        req.nextUrl.pathname = "/";
                        return NextResponse.redirect(req.nextUrl);
                    }
                } catch (error) {
                    req.nextUrl.pathname = "/";
                    return NextResponse.redirect(req.nextUrl);
                }
            } else if (role === "user") {
                try {
                    verify(jwt, userSecret);
                    let dataResult = await fetch(`http://localhost:8080/api/conference/get-conference-by-user-zoom-meeting-id?userId=${userId}&zoomId=${meetingId}`);
                    let cateResult = await dataResult.json();
                    if(cateResult.ticket_id !== undefined) {
                        return NextResponse.next();
                    } else {
                        req.nextUrl.pathname = "/";
                        return NextResponse.redirect(req.nextUrl);
                    }
                } catch (error) {
                    req.nextUrl.pathname = "/";
                    return NextResponse.redirect(req.nextUrl);
                }
            }
        } catch (error) {
            req.nextUrl.pathname = "/";
            return NextResponse.redirect(req.nextUrl);
         }
      }
      // req.page.params.id
      // if(req.page.params.id !== undefined && pathname === `/zoom/record/`) {
      //   if (jwt === undefined) {
      //       req.nextUrl.pathname = "/";
      //       return NextResponse.redirect(req.nextUrl);
      //   }
      //   try {
      //       let tempDecode1 = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
      //       const role = tempDecode1.role;
      //       const userId = tempDecode1.sub;
      //       const meetingId = param.get('id').toString();
      //       let dataResult = null;
      //       let cateResult = null;
      //       if(role === 'host') {
      //           try {
      //               verify(jwt, hostSecret);
      //               let dataResult = await fetch(`http:localhost:8080/api/conference/get-conference-by-zoom-meeting-id/${meetingId}`);
      //               let cateResult = await dataResult.json();
      //               if(await cateResult.conference_id !== undefined) {
      //                   return NextResponse.next();
      //               } else {
      //                   req.nextUrl.pathname = "/";
      //                   return NextResponse.redirect(req.nextUrl);
      //               }
      //           } catch (error) {
      //               req.nextUrl.pathname = "/";
      //               return NextResponse.redirect(req.nextUrl);
      //           }
      //       } else if (role === "user") {
      //           try {
      //               verify(jwt, userSecret);
      //               let dataResult = await fetch(`http://localhost:8080/api/conference/get-conference-by-user-zoom-meeting-id?userId=${userId}&zoomId=${meetingId}`);
      //               let cateResult = await dataResult.json();
      //               if(cateResult.ticket_id !== undefined) {
      //                   return NextResponse.next();
      //               } else {
      //                   req.nextUrl.pathname = "/";
      //                   return NextResponse.redirect(req.nextUrl);
      //               }
      //           } catch (error) {
      //               req.nextUrl.pathname = "/";
      //               return NextResponse.redirect(req.nextUrl);
      //           }
      //       }
      //   } catch (error) {
      //       req.nextUrl.pathname = "/";
      //       return NextResponse.redirect(req.nextUrl);
      //    }
      // }

      if(param.has("uuid") && pathname === `/zoom/join-by-zoom-id`) {
        try {
            const uuid = param.get('uuid');
            let dataResult = null;
            let cateResult = null;
            
                try {
                    let dataResult = await fetch('/api/speaker/' + uuid);
                    let cateResult = await dataResult.json();
                } catch (error) {
                    req.nextUrl.pathname = "/";
                    return NextResponse.redirect(req.nextUrl);
                }
                if(cateResult.length === 0) {
                    req.nextUrl.pathname = "/";
                    return NextResponse.redirect(req.nextUrl);
                }
            
            return NextResponse.next();
        } catch (error) {
            req.nextUrl.pathname = "/";
            return NextResponse.redirect(req.nextUrl);
         }
      }

      // Else
      return NextResponse.next();
}
export const config = {
    matcher: ['/user/:path*', '/admin/:path*', '/host/:path*', '/zoom/:path*'],
}