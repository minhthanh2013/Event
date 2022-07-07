import type { NextPage } from 'next'
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
import EventDashboard from '../components/EventDashboard'
import EventCreate from '../components/CreateEvent'
export { default as buildStore } from '../shared/redux/buildStore';

const Home: NextPage = () => {
  return (
    <>
      {/* <Box className={styles.background__wrap}>
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>


        <Header/>
        <CarouselSlide/>
        <SearchBar/>
        <SessionList/>
        <TicketList/>
          
      </Box>
      <Footer/> */}
      <EventCreate />
    </>
  )
}

export default Home
