import React from "react";
import Box from "@mui/system/Box";
import styles from '../../styles/Session.module.scss';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import DetailBannerSession from "../../components/DetailBannerSession";
import DetailContentSession from '../../components/DetailContentSession';
const Session = () => {
    return (
        <>
            <Box className={styles.background__wrap}>
                <Box className={styles.dot__1}></Box>
                <Header />
                <DetailBannerSession />
                <DetailContentSession/>
            </Box>
            <Footer/>
        </>
    );
}



export default Session