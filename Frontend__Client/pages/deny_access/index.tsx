import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header_Confirm";
import Typography from '@mui/material/Typography';
import styles from '../../styles/Event.module.scss';
import { useRouter } from "next/router";

const DenyAccess = (props: any) => {
  const router = useRouter();

  const redirect = () => {
    router.push("/")
  }
  setTimeout(redirect, 1000);

  return (
    <>
      <Header />
      <Typography variant="h1" component="div" gutterBottom className={styles.confirmation}>
        Please buy ticket or record of this conference first!
      </Typography>

      <Footer />
    </>
  );
};

export default DenyAccess