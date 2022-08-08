import { Box } from "@mui/material"
import CarouselSlide from "../components/CarouselSlide"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import SessionList from "../components/SessionList"
import TicketList from "../components/TicketList"
import styles from '../styles/Background.module.scss'
export { searchResults }
function searchResults() {
    return (
        <>
            <Box className={styles.background__wrap}>
                <Box className={styles.dot__1}></Box>
                <Box className={styles.dot__2}></Box>
                <Box className={styles.dot__3}></Box>
                <Header />
                <SearchBar />
            </Box>
            <Footer />
        </>
    )
}
