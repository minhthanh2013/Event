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
    const uuid = router.query.uuid;
    const [zoomProp, setZoomProp] = useState<ZoomProp>();
    useEffect(() => {
      const fetchZoomInfo = async () => {
        const response1 = await fetch(`/api/speaker/${uuid}`);
        const cateResult1 = await response1.json();
        console.log(36, cateResult1);
        const response = await fetch(`/api/zoom/get-meeting-details/${cateResult1.zoom_meeting_id}`);
        const cateResult = await response.json();
            let tempZoomProps = {
                meetingNumber: cateResult1.zoom_meeting_id.toString(),
                userName: cateResult1.speaker_name,
                userEmail: cateResult1.speaker_email.toString(),
                role: 1 ,
                password: cateResult.password.toString()
            };
            setZoomProp(tempZoomProps);
      }
      fetchZoomInfo();
    }, [uuid])

    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.6.0/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.6.0/css/react-select.css" />
            <DynamicComponentWithNoSSR data={zoomProp} jwtToken={props.jwtToken}/>
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