import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const hostSecret = process.env.HOST_JWT_SECRET as string;
const adminSecret = process.env.ADMIN_JWT_SECRET as string;
const userSecret = process.env.USER_JWT_SECRET as string;

// TODO: 18/8
const isGuestRoute = (pathname: string) => {
  return pathname.startsWith('/api/');
}
const isLoginRoutes = (pathname: string) => {
  return pathname.startsWith('/api/auth');
}
export default async function middleware(req: NextRequest) {
    const param = req.nextUrl.searchParams;
    const jwt = req.cookies.OursiteJWT;
    const {pathname} = req.nextUrl;
    if(!isLoginRoutes) {
      if (isGuestRoute(pathname)) {
        if (!jwt || jwt === undefined) {
          return {
            status: 401,
            body: {
              message: 'Unauthorized'
            }
          }
        }
        return NextResponse.redirect(new URL('/'));
      }
    }

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
        console.log("184")
        if (jwt === undefined) {
            req.nextUrl.pathname = "/";
            return NextResponse.redirect(req.nextUrl);
        }
        console.log(189)
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
                    // const request = `http://localhost:8080/api/conference/get-conference-by-zoom-meeting-id/${meetingId}`
                    const request = `http://localhost:8080/api/conference/get-conference-by-zoom-meeting-id/${meetingId}`
                    let dataResult = await fetch(request);
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
                    // const request = `http://localhost:8080/api/conference/get-conference-by-user-zoom-meeting-id?userId=${userId}&zoomId=${meetingId}`
                    const request = `http://localhost:8080/api/conference/get-conference-by-user-zoom-meeting-id?userId=${userId}&zoomId=${meetingId}`
                    let dataResult = await fetch(request);
                    let cateResult = await dataResult.json();
                    console.log(221, cateResult)
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
      if(pathname.startsWith(`/zoom/record`) && param.has("conferenceId") ){
        if (jwt === undefined) {
            req.nextUrl.pathname = "/";
            return NextResponse.redirect(req.nextUrl);
        }
        try {
            let tempDecode1 = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
            const role = tempDecode1.role;
            const userId = tempDecode1.sub;
            const conferenceId = param.get('conferenceId').toString();
            let dataResult = null;
            let cateResult = null;
             if (role === "user") {
                try {
                    verify(jwt, userSecret);
                    const data = new URLSearchParams();
                    data.append('user_id', `${userId}`);
                    data.append('conference_id', `${conferenceId}`);
                    let dataResult = await fetch(`http://localhost:8080/api/record/get-by-conference-id`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      body: data,
                    });
                    let cateResult = await dataResult.json();
                    if(cateResult.status !== undefined && cateResult.status === true) {
                        return NextResponse.next();
                    } else {
                        req.nextUrl.pathname = "/";
                        return NextResponse.redirect(req.nextUrl);
                    }
                } catch (error) {
                    req.nextUrl.pathname = "/";
                    return NextResponse.redirect(req.nextUrl);
                }
            } else {
             // HOST
             try {
              verify(jwt, hostSecret);
              const data = new URLSearchParams();
              data.append('host_id', `${userId}`);
              data.append('conference_id', `${conferenceId}`);
              let dataResult = await fetch(`http://localhost:8080/api/record/get-host-own-record`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
              });
              let cateResult = await dataResult.json();
              if(cateResult.status !== undefined && cateResult.status === true) {
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

      if(param.has("uuid") && pathname === `/zoom/join-by-uuid`) {
        try {
            const uuid = param.get('uuid');
            let dataResult = null;
            let cateResult = null;
            
                try {
                    let dataResult = await fetch('http://localhost:8080/api/speaker/' + uuid);
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