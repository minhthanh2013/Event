import styles from '../styles/DetailBannerSession.module.scss'
import { Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
const DetailBannerSession = () => {

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{ backgroundImage: imageURL }}>
                    <Box component="div">
                        <IconButton>
                            <KeyboardBackspaceIcon />
                            <Typography>Back</Typography>
                        </IconButton>
                        <Box>
                            <Box>
                                <Typography component="h2">SR Fashion Business Talk Ep.15: Metaverse & NFT in Fashion</Typography>
                                <Typography component="h3">By Style-Republik</Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                </Box>
                <img src="/purpleDot.svg" alt="purple dot" />

            </Box>
        </>
    )
}

export default DetailBannerSession;