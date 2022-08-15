import styles from '../styles/DetailBannerSession.module.scss'
import { Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Link from 'next/link';
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
interface DetailBannerSessionProps {
    nameProp: string
    comboDescription: string
    // props: any;
}
const DetailBannerSession = (props: DetailBannerSessionProps) => {
    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{ backgroundImage: imageURL }}>
                    <Box component="div">
                        <Link href={"/"}>
                        <IconButton>
                            <KeyboardBackspaceIcon />
                            <Typography>Back</Typography>
                        </IconButton>
                        </Link>
                        <Box>
                            <Box>
                                <Typography component="h2">{props.nameProp}</Typography>
                                <Typography component="h3">{props?.comboDescription || 'No description'}</Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                </Box>
                {/* <Image src="/purpleDot.svg" alt="purple dot" /> */}

            </Box>
        </>
    )
}

export default DetailBannerSession;