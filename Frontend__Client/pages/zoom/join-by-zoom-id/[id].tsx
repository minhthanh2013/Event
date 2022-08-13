import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router";

const DynamicComponentWithNoSSR = dynamic(
    () => import('../../../components/ZoomV2'),
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
  tempDecode: any;
}
interface ZoomProp {
    meetingNumber: string;
    userName: string;
    userEmail: string;
    role: number;
    password: string;
}
const Zoom = (props: ZoomProps) => {
    const router = useRouter();
    const { id } = router.query;
    const [zoomProp, setZoomProp] = useState<ZoomProp>();
    useEffect(() => {
        const fetchZoomProps = async () => {
            const response = await fetch(`/api/zoom/get-meeting-details/${id}`);
            const cateResult = await response.json();
            const jwt = props.jwtToken;
            let tempZoomProps = {
                meetingNumber: id.toString(),
                userName: jwt.tempDecode.username.toString(),
                userEmail: cateResult.host_email.toString(),
                role: jwt.tempDecode.role.toString() === 'host' ? 1 : 0,
                password: cateResult.password.toString()
            };
            setZoomProp(tempZoomProps);
            // const dataResult = await fetch('/api/combo/get-by-host/1');
          }
          fetchZoomProps();
    }, [id])

    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/react-select.css" />
            <DynamicComponentWithNoSSR data={zoomProp} jwtToken={props.jwtToken}/>
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
            let tempDecode1 = JSON.parse(Buffer.from(value1.split('.')[1], 'base64').toString());
            return {props : {jwtToken: {token: token1, value :value1, tempDecode: tempDecode1}}};
          }
        }
      }
      return {props : {}};
  }
export default Zoom