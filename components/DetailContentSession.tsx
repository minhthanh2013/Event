
import { Box, Typography } from "@mui/material"
import styles from "../styles/DetailContentSession.module.scss"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Ticket from "./Ticket"
const DetailContentSession = () => {

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.content__wrap}>

                    <Box className={styles.description__section}>
                        <Typography component="h3">Description</Typography>
                        <Box>
                            <Typography component="span" >“Metaverse”- “NFT” is considered the keyword of the fashion and retail industry in 2022. As consumers spend more time using the internet, the metaverse universe becomes the “perfect launching pad” for “virtual goods.” Fashion industry leaders need to discover new ways of interacting with today’s young consumers, by experimenting with “NFT” (Non-fungible Token), virtual fashion in Brands will use the metaverse platform to engage young consumers and find new avenues for creativity, community building or new commercial models.</Typography>
                        </Box>
                    </Box>
                    <Box className={styles.eventList__section}>
                        <Typography component="h3">Event List</Typography>
                        <Grid container rowSpacing={8}  marginTop={0}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid item sm={12} key={index}>
                                    <Ticket />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box className={styles.info__section}>
                        <Typography component="h3">Hours</Typography>
                        <Typography component="p">Sunday, Apr 24, 2022 at 9:30 AM</Typography>
                        <Typography component="h3">How can I contact the organizer with any question?</Typography>
                        <Typography component="p">Please visit <a href="#">https://www.rmit.edu.vn/</a> and refer to the FAQ section for all questions and contact information. </Typography>
                    </Box>
                </Box>

            </Box>
        </>
    )
}


export default DetailContentSession