
import { Box, Typography } from "@mui/material"
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
                        <Typography component="h3">Event List</Typography>
                        <Grid container rowSpacing={8}  marginTop={0}>
                            {props?.data?.conferenceList?.map((dataItem) => (
                                // eslint-disable-next-line react/jsx-key
                                <Grid item sm={12}>
                                    <Ticket__2 data={dataItem}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box className={styles.info__section}>
                        <Typography component="h3">How can I contact the organizer with any question?</Typography>
                        <Typography component="p">Please visit <a href="#">https://www.rmit.edu.vn/</a> and refer to the FAQ section for all questions and contact information. </Typography>
                    </Box>
                </Box>

            </Box>
        </>
    )
}


export default DetailContentSession