import styles from '../styles/DetailBannerSession.module.scss'
import { Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {splitNum} from '../GlobalFunction/SplitNumber'
const imageURL = "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
interface DetailBannerSessionProps {
    nameProp: string
    comboDescription: string
    price: number;
    numberOfTicket: number;
    discount: number;
    // props: any;
}
const DetailBannerSession = (props: DetailBannerSessionProps) => {
    let discountPrice = props.price - (props.price * props.discount) / 100
    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.banner__wrap} sx={{ backgroundImage: imageURL }}>
                    <Box component="div">
                        <Link passHref href="/">
                        <IconButton sx={{color:'#969696'}}>
                            <KeyboardBackspaceIcon />
                            <Typography>Back</Typography>
                        </IconButton>
                        </Link>
                        <Box>
                            <Box>
                                <Typography component="h2">{props.nameProp}</Typography>
                                <Typography component="h3">{props?.comboDescription || 'No description'}</Typography>
                            </Box>
                            <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', width:'400px', justifyContent: 'center'}}>
                                <Typography component="h2" sx={{fontWeight:'700', color:'#6A35F2'}}>{splitNum(discountPrice)} VND</Typography>
                                <Typography component="h2" sx={{fontWeight:'700', color:'#6A35F2'}}>{splitNum(props?.price)} VND</Typography>
                                <Typography component="h3">{props.numberOfTicket} events in <em style={{fontStyle:'normal', fontWeight:'700'}}>ONE</em> session</Typography>
                                <Button className={styles.button__2} disabled={false}>Buy</Button>
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