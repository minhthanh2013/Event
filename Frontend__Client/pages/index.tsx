import { Box } from '@mui/material';
import type { NextPage } from 'next'
import CarouselSlide from '../components/CarouselSlide';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SessionList from '../components/SessionList';
import TicketList from '../components/TicketList';
import HomeDashboard from './HomeDashBoard'
import styles from '../styles/Background.module.scss';
export { default as buildStore } from '../shared/redux/buildStore';

interface ConferenceProps {
  status: boolean;
  data: ConferenceProps[];
}

const Home: NextPage = props  => {
  return (
    <>
      <Box className={styles.background__wrap}>
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <Header {...props}/>
        <CarouselSlide/>
        <SearchBar/>
        <SessionList {...props}/>
        <TicketList {...props}/>
        
      </Box>
      <Footer/> 
      {/* <HomeDashboard /> */}
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
export default Home