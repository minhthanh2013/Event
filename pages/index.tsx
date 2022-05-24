import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Background from '../components/Background'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import TicketList from '../components/HomePageControl'
import Link from 'next/link'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Home: NextPage = () => {
  return (
    <>
      <Background/>
      
      <Footer/>
      
    </>
  )
}

export default Home
