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
const Zoom = (props: any) => {
    const router = useRouter();
    const id = router.query.id;
    const [zoomProp, setZoomProp] = useState<ZoomProp>();
    useEffect(() => {
        const fetchZoomProps = async () => {
            const response = await fetch(`/api/zoom/get-meeting-details/${id}`);
            const cateResult = await response.json();
            console.log(props)
            let tempZoomProps = {
                meetingNumber: id.toString(),
                userName: props?.tempDecode?.username,
                userEmail: cateResult.host_email.toString(),
                role: props?.tempDecode?.role.toString() === 'host' ? 1 : 0,
                password: cateResult.password.toString()
            };
            console.log(tempZoomProps)
            setZoomProp(tempZoomProps);
            // const dataResult = await fetch('/api/combo/get-by-host/1');
          }
          fetchZoomProps();
    }, [id])

    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.6.0/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.6.0/css/react-select.css" />
          <>
            <DynamicComponentWithNoSSR data={zoomProp} jwtToken={props.jwtToken}/>
          </>  
        </>
    )
}
export async function getServerSideProps(ctx: any) {
  // Fetch data from external API
  // Pass data to the page via props
  let raw = null;
  try {
    raw = ctx.req.cookies;
  } catch (e) {
    return { props: {} }
  }
  try { 
    if (raw.OursiteJWT.toString()) {
      let token = "OursiteJWT"
      let value = raw.OursiteJWT.toString();
      let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
      return {
        props: {
          token, value,
          tempDecode
        }
      };
    } return { props: {} }
  } catch (error) {
    return { props: {} }
  }
}
export default Zoom