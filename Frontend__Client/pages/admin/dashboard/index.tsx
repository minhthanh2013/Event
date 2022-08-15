import React, { useState, ChangeEvent, useEffect } from "react";
import Box from "@mui/material/Box";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EventList } from "./EventList";
import { Sessions } from "./SessionList";
import FilterList from "@mui/icons-material/FilterList";
import HeaderHost from "../../../components/Header__Host";
import Footer from "../../../components/Footer";

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
    date_start_conference: string;
    address: string;
    ticket_quantity: number;
    current_quantity: number;
    status_ticket: string;
    conference_type: string;
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
}

//
const EventCreate = (props: any) => {
    const [conferences, setConferences] = useState<ConferenceProps>();
    const [conferencesAfterFilter, setConferencesAfterFilter] = useState<ConferenceProps>();
    const [sessionsAfterFilter, setSessionsAfterFilter] = useState<SessionListProps>();
    const [sessions, setSessions] = useState<SessionListProps>();
    const [value, setValue] = React.useState(0);
    
    useEffect(() => {
        console.log(props);
        const fetchConferencesData = async () => {
            const response = await fetch("http://localhost:8080/api/conference/get-all");
            const data = await response.json();
            setConferences(data);
            setConferencesAfterFilter(data);
        }
        const fetchCombosData = async () => {
            const response = await fetch("http://localhost:8080/api/combo/get-latest-x?id=0");
            const data = await response.json();

            setSessions(data);
            setSessionsAfterFilter(data);
        }
        fetchConferencesData();
        fetchCombosData();

        // Ở đây chưa có state [users, setUsers] = ... cũng như UserProps vì t không biết field của Users
        // Tạo interface như trên nhưng dành cho Users => state [users, setUsers] = useState<UserProps>();
        // Nhớ tạo state usersAfterFilter rồi copy 2 cái t làm sẵn cho m, hiện tại nó là fe của Subcriptions
    }, []);

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

    const filterSessions = (props: string) => {
        if (props === 'all') {
            setConferencesAfterFilter(conferences)
        } else {
            setConferencesAfterFilter({ status: true, data: conferences?.data?.filter(data => data.status_ticket === props) });
        }
    };

    //chỉnh field status_ticket thành field lưu trữ type người dùng là host hay admin
    const filterUsers = (props: string) => {
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
                                                    alignItems: "start",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    marginLeft: "20px",
                                                }}
                                            >
                                                <EventIcon sx={{ marginRight: "0.5rem" }} />
                                                <Typography sx={{ fontWeight: "bold" }}>
                                                    Conference
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
                                                    alignItems: "start",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    marginLeft: "20px",
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
                            </Tabs>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <TabPanel value={value} index={0}>
                            <Box sx={{ marginLeft: "3rem" }}>
                                <EventList data={conferencesAfterFilter?.data} propss={props} filter={filterConferences} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box sx={{ marginLeft: "3rem" }}>
                                <Sessions data={sessionsAfterFilter?.data} propss={props} filter={filterSessions} />
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
