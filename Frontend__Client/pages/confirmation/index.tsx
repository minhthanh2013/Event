import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Confirmation = (prop: any) => {
    
    return (
        <>
            <Header {...prop}/>
            {console.log(prop)}
            <Footer/>
        </>
    );
};

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
            return {
              props : {
              token, value,
              tempDecode
            }
            };
          }
        }
      }
    return { props: {} }
  }
  
export default Confirmation