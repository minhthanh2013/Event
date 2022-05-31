
import {Box, Typography} from "@mui/material"
import styles from "../styles/DetailContent.module.scss"

const DetailContent = () => {
    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.content__wrap}>
                    <Box className={styles.column__section}>
                        <Box>
                            <Typography></Typography>
                            <Typography></Typography>
                        </Box>
                        <Box>
                            <Typography></Typography>
                            <Box></Box>
                            <Typography></Typography>
                            <Typography></Typography>
                        </Box>
                    </Box>
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography></Typography>
                </Box>
            </Box>
        </>
    )
}


export default DetailContent