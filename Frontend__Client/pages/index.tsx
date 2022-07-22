import type { NextApiRequest, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import TicketList from '../components/TicketList'
import Link from 'next/link'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CarouselSlide from '../components/CarouselSlide'
import SessionList from '../components/SessionList'
export { default as buildStore } from '../shared/redux/buildStore';
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
        <SessionList/>
        <TicketList/>
        
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