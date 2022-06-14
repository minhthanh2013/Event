import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "../styles/TicketSession.module.scss";
import Box from "@mui/material/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
interface TicketSesstionProps {}

const TicketSession = (props: TicketSesstionProps) => {
  return (
    <>
      <div>
        <Card elevation={3} className={styles.ticketWrap}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              src="https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Event"
            />
            <CardContent className={styles.ticketContent}>
              <Box component="div">
                <Typography gutterBottom component="h2">
                  Vietnam Talent Trends 2022
                </Typography>
                <Typography gutterBottom component="h3">by FINEXPO PTE LTD.</Typography>
                <Typography gutterBottom component="p">
                  6 events
                </Typography>
              </Box>
              
              <Box component="div">
                <AttachMoneyIcon />
                <Typography>10.00</Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};

export default TicketSession;
