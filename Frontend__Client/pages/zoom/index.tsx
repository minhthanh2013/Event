import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/ZoomV2'),
    { 
      ssr: false
    }
)

interface ZoomProps {
    data: ZoomProp;
    jwtToken: JwtToken;
}
interface JwtToken {
  token: string;
  value: string;
}
interface ZoomProp {
    meetingNumber: string;
    userName: string;
    userEmail: string;
    role: number;
    password: string;
}
const Zoom = (props: ZoomProps) => {
    const [zoomProps, setZoomProps] = useState<ZoomProps>();
    useEffect(() => {
        const fetchZoomProps = async () => {
            const tempDecode = props.jwtToken;
            let { meetingNumber, userName, userEmail, role, password } = zoomProps.data;
            // const dataResult = await fetch('/api/combo/get-by-host/1');
            meetingNumber = "1";
            userName ="1";
            userEmail="2";
            role =0;
            password="1";
            // setZoomProps(cateResult)
          }
          fetchZoomProps();
    }, [])

    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/react-select.css" />
            <DynamicComponentWithNoSSR data={props.data} jwtToken={props.jwtToken}/>
        </>
    )
}
export async function getServerSideProps(ctx: any) {
    // Fetch data from external API
    // Pass data to the page via props
      let raw = null;
      try{
        raw = ctx.req.headers.cookie.toString();
      } catch(e) {
        return {props : {}};
      }
      if(raw.includes(";")) {
        let rawCookie = raw.split(";")
        for(let i = 0; i < rawCookie.length; i++) {
          if(rawCookie[i].includes("OursiteJWT")) {
            let cookies = rawCookie[i];
            let token1 = cookies.split("=")[0].trim();
            let value1 = cookies.split("=")[1];
            return {props : {jwtToken: {token: token1, value :value1}}};
          }
        }
      }
      return {props : {}};
  }
export default Zoom