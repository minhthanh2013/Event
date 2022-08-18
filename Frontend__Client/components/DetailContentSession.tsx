
import { Box, Link, Typography } from "@mui/material"
import styles from "../styles/DetailContentSession.module.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Ticket__2 from "./Ticket__2"
interface SessionProp {
	comboSessionId: number;
	comboSessionPrice: number;
	comboSessionName: string;
	comboSessionDescription: string;
	conferenceList: TicketProp[];
}

interface TicketProp {
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
	organizer_name: string;
}

interface DetailContentSessionProp {
    data: SessionProp;
    // props: any;
}
const DetailContentSession = (props: DetailContentSessionProp) => {
    console.log(props.data)
    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.content__wrap}>

                    <Box className={styles.description__section}>
                        <Typography component="h3">Description</Typography>
                        <Box>
                            <Typography component="span" >{props?.data?.comboSessionDescription}</Typography>
                        </Box>
                    </Box>
                    <Box className={styles.eventList__section}>
                    <Typography component="h3">Event list</Typography>
                        <Grid container rowSpacing={8}  marginTop={0}>
                            {props?.data?.conferenceList?.map((dataItem) => (
                                // eslint-disable-next-line react/jsx-key
                                <Grid item sm={12}>
                                    <Link href={`/event/${dataItem.conference_id}`}>
                                        <Ticket__2 data={dataItem}/>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

            </Box>
        </>
    )
}


export default DetailContentSession