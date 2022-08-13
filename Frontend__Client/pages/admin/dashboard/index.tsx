import React, { useState, ChangeEvent, useEffect } from "react";
import HeaderHost from "../../components/Header__Host";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
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
import { Users } from "./UserList";
import { EventList } from "./EventList";
import { Sessions } from "./SessionList";
import FilterList from "@mui/icons-material/FilterList";

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

    console.log(props);

    const fakeDataAllConference = [
        {
            conference_id: 1,
            description: 'description',
            price: 100,
            conference_name: 1,
            date_start_conference: '11/10/2020',
            address: 'address',
            ticket_quantity: 12,
            current_quantity: 10,
            status_ticket: 'pending',
            conference_type: '1',
        },
        {
            conference_id: 2,
            description: 'description',
            price: 100,
            conference_name: 2,
            date_start_conference: '11/10/2020',
            address: 'address',
            ticket_quantity: 12,
            current_quantity: 10,
            status_ticket: 'published',
            conference_type: '1',
        },
        {
            conference_id: 3,
            description: 'description',
            price: 100,
            conference_name: 3,
            date_start_conference: '11/10/2020',
            address: 'address',
            ticket_quantity: 12,
            current_quantity: 10,
            status_ticket: 'pending',
            conference_type: '1',
        }
    ]
    const fakeDataAllSessions = [
        {
            comboSessionId: 1,
            comboSessionPrice: 20000,
            comboSessionName: "combo 1 from host 1",
            comboSessionDescription: "None",
            conferenceList: fakeDataAllConference,
            discount: 10
        },
        {
            comboSessionId: 2,
            comboSessionPrice: 20000,
            comboSessionName: "combo 2 from host 1",
            comboSessionDescription: "None",
            conferenceList: fakeDataAllConference,
            discount: 10
        },
        {
            comboSessionId: 3,
            comboSessionPrice: 20000,
            comboSessionName: "combo 3 from host 2",
            comboSessionDescription: "None",
            conferenceList: fakeDataAllConference,
            discount: 10
        }
    ]
    useEffect(() => {
        // khúc này dùng API, set API cho cả 2 state là confenences và conferencesAfterFilter, tương tự với sessions và user. Xem lại Field, xem khúc đỏ dưới dòng 306
        setConferences({
            status: false, data: fakeDataAllConference
        });
        setConferencesAfterFilter({
            status: false, data: fakeDataAllConference
        });
        setSessions({
            status: false, data: fakeDataAllSessions
        });
        setSessionsAfterFilter({
            status: false, data: fakeDataAllSessions
        });
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
                                                <SubscriptionsIcon sx={{ marginRight: "0.5rem" }} />
                                                <Typography sx={{ fontWeight: "bold" }}>
                                                    User
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
                                <EventList data={conferencesAfterFilter?.data} propss={props} filter={filterConferences} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box sx={{ marginLeft: "3rem" }}>
                                <Sessions data={sessionsAfterFilter?.data} propss={props} filter={filterSessions} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Box sx={{ marginLeft: "3rem" }}>
                                <Users data={sessions?.data} propss={props} filter={filterUsers} />
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
        raw = ctx.req.headers.cookie.toString();
    } catch (e) {
        return { props: {} }
    }
    if (raw.includes(";")) {
        let rawCookie = raw.split(";")
        for (let i = 0; i < rawCookie.length; i++) {
            if (rawCookie[i].includes("OursiteJWT")) {
                let cookies = rawCookie[i];
                let token = cookies.split("=")[0];
                let value = cookies.split("=")[1];
                let tempDecode = JSON.parse(Buffer.from(value.split('.')[1], 'base64').toString());
                return {
                    props: {
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
