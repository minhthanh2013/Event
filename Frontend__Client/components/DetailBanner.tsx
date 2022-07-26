import styles from '../styles/DetailBanner.module.scss'
import { Box, Typography} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Image from 'next/image';
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
const DetailBanner = () => {

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{backgroundImage:imageURL}}>
                    <Box component="div">
                        <IconButton>
                            <KeyboardBackspaceIcon />
                            <Typography>Back</Typography>
                        </IconButton>
                        <Box>
                            <Box>
                                <Typography component="h2">SR Fashion Business Talk Ep.15: Metaverse & NFT in Fashion</Typography>
                                <Typography component="h3">By Style-Republik</Typography>
                                <Typography component="h4">Auditorium 2.1.004, RMIT University Saigon South Campus 702 Nguyen Van Linh, District 7, Ho Chi Minh City</Typography>
                            </Box>
                            <Box>
                                <Typography component="h2">Date & Time</Typography>
                                <Typography component="h3">Sunday, Apr 24, 2022 at 9:30 AM</Typography>
                                <Button variant="text" className={styles.button__1}><AddIcon/>Add to calendar</Button>
                                <Button variant="contained" className={styles.button__2}>Buy ticket ($10.00)</Button>
                                <Button variant="outlined" className={styles.button__3} disabled>Buy record ($ 5.00)</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Image src="/purpleDot.svg" alt="purple dot" />
                
            </Box>
        </>
    )
}

export default DetailBanner;