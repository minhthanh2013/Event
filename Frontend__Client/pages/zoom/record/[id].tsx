import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import styles from '../../../styles/Background.module.scss';

const ZoomRecord = (props) => {
  const [record, setRecord] = useState<string>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchVideoRecord = async () => {
      // const response = await fetch(`/api/conference/get-conference-record/${id}`);
      const response = await fetch(`/api/conference/get-conference-record/83133508657`);
      const cateResult = await response.text();
      // console.log(16, cateResult);
      setRecord(cateResult);
    }
    fetchVideoRecord();
}, [])
  return (
    <>
      <Box className={styles.background__wrap}>
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <Header {...props}/>
        {/* <Container> */}
        {/* <body data-new-gr-c-s-check-loaded="14.1073.0" data-gr-ext-installed="">
            <video controls>
                <source src="https://res.cloudinary.com/dv7air4el/video/upload/conference-83133508657-record.mp4" type="video/mp4"/>
            </video>
        </body> */}
        <video controls src={record} />
      
    {/* </Container> */}
        
      </Box>
      <Footer/> 
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
export default ZoomRecord