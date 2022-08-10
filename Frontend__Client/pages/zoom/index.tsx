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
    props: any;
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
            const tempDecode = zoomProps.props.tempDecode;
            const { meetingNumber, userName, userEmail, role, password } = zoomProps.data;
            const dataResult = await fetch('/api/combo/get-by-host/1');
            const cateResult = await dataResult.json();
            setZoomProps(cateResult)
          }
          fetchZoomProps();
    }, [])

    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/react-select.css" />
            <DynamicComponentWithNoSSR props={ZoomProps}/>
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
        return { props: {} }
      }
      if(raw.includes(";")) {
        let rawCookie = raw.split(";")
        for(let i = 0; i < rawCookie.length; i++) {
          if(rawCookie[i].includes("OursiteJWT")) {
            let cookies = rawCookie[i];
            let token = cookies.split("=")[0];
            let value = cookies.split("=")[1];
            return {props : {token, value}};
          }
        }
      }
    return { props: {} }
  }
export default Zoom