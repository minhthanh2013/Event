import React, { useState, useEffect } from "react";
import HeaderHost from "../../../components/Header__Host";
import Box from "@mui/material/Box";
import Footer from "../../../components/Footer";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/EventDashboard.module.scss";
import Grid from "@material-ui/core/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventIcon from "@mui/icons-material/Event";
import SessionsIcon from "@mui/icons-material/EmojiEvents";
import SubscriptionsIcon from "@mui/icons-material/ShopTwo";
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
  conference_type: string;
  isValidated: boolean;
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
  conferenceList: ConferenceProp[];
  discount: number;
  totalPrice: number;
  totalComboSell: number;
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
  conference_type: string;
  viewed: number;
  popularity: number;
  // conferenceOrganizer: string;
}
interface HostDetailsProps {
  email: string;
  firstName: string
  host_id: string
  host_type: string
  lastName: string
  update_at: Date
  user_name: string
}
//
const EventCreate = (props: any) => {
  const [conferences, setConferences] = useState<ConferenceProps>();
  const [conferencesAfterFilter, setConferencesAfterFilter] = useState<ConferenceProps>();
  const [sessions, setSessions] = useState<SessionListProps>();
  const [sessionsAfterFilter, setSessionsAfterFilter] = useState<SessionListProps>();
  const [hostDetailsProps, setHostDetailsProps] = useState<HostDetailsProps>();
  const [value, setValue] = React.useState(0);
  let onlyFetchOneTime = React.useRef(true)
  useEffect(() => {
    const fetchHostDetails = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + props.value,
        },
      };
      const dataResult = await fetch(`/api/host/${props.tempDecode.sub}`, config);
      const cateResult = await dataResult.json();
      console.log(140, cateResult)
      setHostDetailsProps(cateResult);
    }
    const fetchConferences = async () => {
      const dataResult = await fetch(`/api/conference/get-conference-by-host-id/${props.tempDecode.sub}`);
      const cateResult = await dataResult.json();
      if (cateResult.status === 'false') {
        setConferences({
          status: false,
          data: [],
        });
        return;
      }
      setConferences(cateResult)
      setConferencesAfterFilter(cateResult);
    }

    const fetchSessions = async () => {
      const dataResult = await fetch(`/api/combo/get-by-host/${props.tempDecode.sub}?revenue=true`);
      const cateResult = await dataResult.json();
      setSessions(cateResult)
      setSessionsAfterFilter(cateResult);
    }
    fetchHostDetails();
    fetchConferences();
    fetchSessions();
  }, [props.tempDecode?.sub, props.value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filterConferences = (props: string) => {
    if (props === 'all') {
      setConferencesAfterFilter(conferences)
    } else {
      setConferencesAfterFilter({ status: true, data: conferences?.data?.filter(data => data.status_ticket === props) });
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          marginBottom: "10rem",
        }}
      >
        <Box className={styles.dot__1}></Box>
        <Box className={styles.dot__2}></Box>
        <Box className={styles.dot__3}></Box>
        <HeaderHost {...props} />

        <Grid container spacing={2}>
          <Grid item xs={2} md={2}>

            {hostDetailsProps && hostDetailsProps.host_type === 'premium' ? (
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
            ) : (
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
                          <SubscriptionsIcon sx={{ marginRight: "0.5rem" }} />
                          <Typography sx={{ fontWeight: "bold" }}>
                            Subcriptions
                          </Typography>
                        </Box>
                      </>
                    }
                    {...a11yProps(1)}
                  />
                </Tabs>
              </ThemeProvider>
            )}

          </Grid>
          <Grid item xs={10} md={10}>
            {hostDetailsProps && hostDetailsProps.host_type === 'premium' ? (
              <>
                <TabPanel value={value} index={0}>
                  <Box sx={{ marginLeft: "3rem" }}>
                    <EventList data={conferencesAfterFilter?.data} host_type={hostDetailsProps?.host_type} propss={props} filter={filterConferences} />
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{ marginLeft: "3rem" }}>
                    <Sessions data={sessionsAfterFilter?.data} propss={props} />
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box sx={{ marginLeft: "3rem" }}>
                    <Subcriptions host_type={hostDetailsProps?.host_type} exDate={hostDetailsProps?.update_at} hostId={props?.tempDecode?.sub} />
                  </Box>
                </TabPanel>
              </>
            ) : (
              <>
                <TabPanel value={value} index={0}>
                  <Box sx={{ marginLeft: "3rem" }}>
                    <EventList host_type={hostDetailsProps?.host_type} data={conferencesAfterFilter?.data} propss={props} filter={filterConferences} />
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{ marginLeft: "3rem" }}>
                    <Subcriptions host_type={hostDetailsProps?.host_type} exDate={hostDetailsProps?.update_at} hostId={props.tempDecode?.sub} />
                  </Box>
                </TabPanel>
              </>
            )
            }

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
  try {
    raw = ctx.req.cookies;
  } catch (e) {
    return { props: {} }
  }
  try {
    if (raw.OursiteJWT.toString()) {
      let token = "OursiteJWT"
      let value = raw.OursiteJWT.toString();
      let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
      return {
        props: {
          token, value,
          tempDecode
        }
      };
    } return { props: {} }
  } catch (error) {
    return { props: {} }
  }
}

export default EventCreate;
