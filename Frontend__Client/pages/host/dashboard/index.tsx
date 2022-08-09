import React, { useState, ChangeEvent, useEffect } from "react";
import Header from "../../../components/Header";
import Box from "@mui/material/Box";
import Footer from "../../../components/Footer";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/EventDashboard.module.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventIcon from "@mui/icons-material/Event";
import SessionsIcon from "@mui/icons-material/EmojiEvents";
import SubscriptionsIcon from "@mui/icons-material/ShopTwo";
import { BasicInfo, Speakers, Date } from "../../CreateEvent/CreateEventForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Subcriptions } from "./Subcriptions";
import { EventList } from "./EventList";
import { Sessions } from "./SessionList";

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

interface ConferenceProp {
	conference_id: number;
	description: string;
	price: number;
	conference_name: number;
	date_start_conference: Date;
	address: string;
  ticket_quantity: number;
  current_quantity: number;
  status_ticket: string;
	// conferenceOrganizer: string;
}

interface ConferenceProps {
  status: boolean;
  data: ConferenceProp[];
}

// Session props
interface SessionListProps {
	status: boolean;
	data: SessionListProp[];
}
interface SessionListProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: TicketProp[];
}

interface TicketProp {
	conference_id: number;
	description: string;
	price: string;
	conference_name: number;
	date_start_conference: Date;
	address: string;
  ticket_quantity: string;
  current_quantity: string;
  status_ticket: string;
}
//
const EventCreate = (propss: any) => {
  const [conferences, setConferences] = useState<ConferenceProps>();
  const [sessions, setSessions] = useState<SessionListProps>();
  const [value, setValue] = React.useState(0);

	useEffect(() => {
		const fetchConferences = async () => {
		  const dataResult = await fetch('/api/conference/get-conference-by-host-id/1');
		  const cateResult = await dataResult.json();
		  setConferences(cateResult)
		}
    
    const fetchSessions = async () => {
		  const dataResult = await fetch('/api/combo/get-by-host/1');
		  const cateResult = await dataResult.json();
		  setSessions(cateResult)
		}
		fetchConferences();
    fetchSessions();
	  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          background: "#F1EFEF",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          marginBottom: "10rem",
        }}
      >
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <Header {...propss}/>

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
          <Grid item xs={10} md={10}>
            <TabPanel value={value} index={0}>
              <Box sx={{ marginLeft: "3rem" }}>
                <EventList data={conferences?.data} propss={propss}/>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ marginLeft: "3rem" }}>
                <Sessions data={sessions?.data} propss={propss}/>
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

export async function getServerSideProps(ctx: any) {
  // Fetch data from external API
  // Pass data to the page via props
    let raw = null;
    try{
      raw = ctx.req.headers.cookie.toString();
    } catch(e) {
      return { props: {} }
    }
    if(raw.includes(";")) {
      let rawCookie = raw.split(";")
      for(let i = 0; i < rawCookie.length; i++) {
        if(rawCookie[i].includes("OursiteJWT")) {
          let cookies = rawCookie[i];
          let token = cookies.split("=")[0];
          let value = cookies.split("=")[1];
          let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
          return {
            props : {
            token, value,
            tempDecode
          }
          };
        }
      }
    }
  return { props: {} }
}

export default EventCreate;
