
import React from 'react'
import {AppBar} from '@material-ui/core'
import {makeStyles} from '@mui/styles'
import Header from './Header'
import Box from '@mui/material/Box'
import CarouselSlide from './CarouselSlide'
import SearchBar from './SearchBar'
import HomePageControl from "./HomePageControl";
import ProductList from './ProductList'
import Ticket from './Ticket'
import TicketSession from './TicketSession'
import Footer from './Footer'
interface BackgroundProps {}

const Background = (props: BackgroundProps) => {
  
  return (
  <>
    <Box sx={{background: '#F1EFEF',
        width: '100%',
        minHeight: '1920px',
        overflow: 'hidden',
        position: 'relative',
        }}>
      
      <Box sx={{position: 'absolute',
        top: '-360px',
        left: '-220px',
        width: '500px',
        height : '700px',
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(106, 53, 242, 0.77) 0%, rgba(151, 125, 219, 0.385) 50%, rgba(151, 125, 219, 0.385) 50.01%, rgba(196, 196, 196, 0) 100%)',
        borderRadius: '50%',
        }}>
        </Box>

      <Box sx={{ 
        position: 'absolute',
        top: '40%',
        right: '-320px',
        width: '500px',
        height : '700px',
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(106, 53, 242, 0.77) 0%, rgba(151, 125, 219, 0.385) 50%, rgba(151, 125, 219, 0.385) 50.01%, rgba(196, 196, 196, 0) 100%)',
        borderRadius: '50%',}}></Box>
      <Box sx={{ 
        position: 'absolute',
        left: '-340px',
        width: '833px',
        bottom: '-220px',
        height: '700px',
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(106, 53, 242, 0.77) 0%, rgba(151, 125, 219, 0.385) 50%, rgba(151, 125, 219, 0.385) 50.01%, rgba(196, 196, 196, 0) 100%)',
        borderRadius: '50%',}}></Box>
       <Header/>
       <CarouselSlide/>
       <SearchBar/>
       <HomePageControl/>
       <ProductList/>
       <Ticket/>
       <TicketSession/>
    </Box>
    <Footer />
  </>
    
  )
}

export default Background 