import type { NextPage } from 'next'
import HomeDashboard from './HomeDashBoard'
export { default as buildStore } from '../shared/redux/buildStore';
const Home: NextPage = props  => {
  return (
    <>
      {/* <Box className={styles.background__wrap}>
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>


        <Header {...props}/>
        <CarouselSlide/>
        <SearchBar/>
        <SessionList/>
        <TicketList/>
        
      </Box>
      <Footer/> */}
      <HomeDashboard />
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
      return null;
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
// if(Home.getInitialProps !== undefined) {
  // Home.getInitialProps = async (ctx) => {
  //   let raw = null;
  //   try{
  //     raw = ctx.req.headers.cookie.toString();
  //   } catch(e) {
  //     return null;
  //   }
  //   if(raw.includes(";")) {
  //     let rawCookie = raw.split(";")
  //     for(let i = 0; i < rawCookie.length; i++) {
  //       if(rawCookie[i].includes("OursiteJWT")) {
  //         let cookies = rawCookie[i];
  //         let key = cookies.split("=")[0];
  //         let value = cookies.split("=")[1];
  //         return {token : {key, value}};
  //       }
  //     }
  //   }
  //   return null;
  // }
// } 
// else {
// }
export default Home