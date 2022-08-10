import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import styles from '../../styles/Session.module.scss';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import DetailBannerSession from "../../components/DetailBannerSession";
import DetailContentSession from '../../components/DetailContentSession';
import { useRouter } from "next/router";
interface SessionProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: TicketProp[];
}

interface TicketProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
}

interface SessionProps {
  data: SessionProp;
  props: any;
}
const Session = (props: SessionProps) => {
    const router = useRouter();
    const { id } = router.query;
    const [sessionProps, setSessionProps] = useState<SessionProps>()
    useEffect(() => {
		const fetchSessionProp = async () => {
		  const dataResult = await fetch(`/api/combo/get-by-combo/${id}`);
		  const cateResult = await dataResult.json();
		  setSessionProps(cateResult)
		}
		fetchSessionProp();
	  }, [id])
    return (
        <>
            <Box className={styles.background__wrap}>
                <Box className={styles.dot__1}></Box>
                <Header {...props}/>
                {sessionProps?.data && <DetailBannerSession nameProp={sessionProps?.data?.comboSessionName} />}
                {sessionProps?.data && <DetailContentSession data={sessionProps?.data} />}
            </Box>
            <Footer/>
        </>
    );
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
            let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
            return {props : {token, value, tempDecode}};
          }
        }
      }
    return { props: {} }
  }
export default Session