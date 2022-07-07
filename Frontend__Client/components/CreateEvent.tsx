import React, { useState, ChangeEvent } from "react";
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import styles from "../styles/EventDashboard.module.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventIcon from "@mui/icons-material/Event";
import SessionsIcon from "@mui/icons-material/EmojiEvents";
import SubscriptionsIcon from "@mui/icons-material/ShopTwo";
import { BasicInfo, Speakers, Date } from "./CreateEventForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Subcriptions } from "./Subcriptions";
import { EventList } from "./EventList";
import { Sessions } from "./CreSessions";

interface EventCreate { }

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(106, 53, 242, 0.77)",
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EventCreate = (props: EventCreate) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          background: "#F1EFEF",
          width: "100%",
          minHeight: "1920px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <Header />

        <Grid container spacing={2}>
          <Grid item xs={2} md={2}>
            <ThemeProvider theme={outerTheme}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
              >
                <Tab
                  label={
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <EventIcon sx={{ marginRight: "0.5rem" }} />
                        <Typography sx={{ fontWeight: "bold" }}>
                          Events
                        </Typography>
                      </Box>
                    </>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <SessionsIcon sx={{ marginRight: "0.5rem" }} />
                        <Typography sx={{ fontWeight: "bold" }}>
                          Sessions
                        </Typography>
                      </Box>
                    </>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <SubscriptionsIcon sx={{ marginRight: "0.5rem" }} />
                        <Typography sx={{ fontWeight: "bold" }}>
                          Subcriptions
                        </Typography>
                      </Box>
                    </>
                  }
                  {...a11yProps(2)}
                />
              </Tabs>
            </ThemeProvider>
          </Grid>
          <Grid xs={10} md={10}>
            <TabPanel value={value} index={0}>
              <Box sx={{ marginLeft: "3rem" }}>
                <EventList />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ marginLeft: "3rem" }}>
                <Sessions />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box sx={{ marginLeft: "3rem" }}>
                 <Subcriptions />
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export default EventCreate;
