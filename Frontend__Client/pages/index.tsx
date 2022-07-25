import type { NextPage } from 'next'
import HomeDashboard from './HomeDashBoard'
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
      <HomeDashboard />
    </>
  )
}

export default Home
