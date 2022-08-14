import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header_Confirm";
import Typography from '@mui/material/Typography';
import styles from '../../styles/Event.module.scss';
import { useRouter } from "next/router";

const Confirmation = (prop: any) => {
  
  const router = useRouter();
  const redirect = () => {
    router.push("/host/dashboard")
  }
  setTimeout(redirect,5000);
  useEffect(() => {
    const updatePremium = async () => {
      const result = await fetch(`api/subscription`)

    }
  }, []);
    return (
        <>
            <Header/>
            <Typography variant="h1" component="div" gutterBottom className={styles.confirmation}>
        		  Your payment has been done succesfully
      		  </Typography>
            
            <Footer/>
        </>
    );
};

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
  
export default Confirmation