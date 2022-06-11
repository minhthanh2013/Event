import React from "react";
import styles from "../styles/SessionList.module.scss";
import TicketSession from "./TicketSession";
import Grid from '@mui/material/Grid';
import { Typography, Box } from "@mui/material";
import Link from '@mui/material/Link';
interface SessionListProps {}


const SessionList = (props: SessionListProps) => {
  return (
    <>
      <div className={styles.productWrap}>
        <div className={styles.productContainer}>
            <Box className={styles.control__wrap}>
              <Typography className={styles.list__title}>Combo Sessions</Typography>
              <a className={styles.see__all}>See all</a>
            </Box>
            <Grid container rowSpacing={8} columnSpacing={8} marginTop={0}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item lg={4} md={6} sm={12} key={index}>
                  <TicketSession/>
                </Grid>
              ))}
            </Grid>
        </div>
      </div>
    </>
  )
};

export default SessionList;
