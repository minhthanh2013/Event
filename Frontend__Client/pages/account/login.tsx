
import { Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import React from 'react'
import styles from '../../styles/Login.module.scss'
type Props = {}

const login = (props: Props) => {
    return (
        <>
            <Box className={styles.container}>


                <Box className={styles.left}>
                    <Typography component="h2">
                        Sign in to Evenity
                    </Typography>
                    <Box className={styles.iconLogin__section}>
                        <IconButton>
                            <FcGoogle />
                        </IconButton>
                        <IconButton style={{ color: "#3C5A99" }}>
                            <BsFacebook />
                        </IconButton>
                    </Box>
                    <Box className={styles.or__section}>
                        <hr />
                        <p>or</p>
                        <hr />
                    </Box>
                    <Box className={styles.form__section}>
                        <form>
                            <Box className={styles.form__group}>
                                <label>Username</label>
                                <input type="text" placeholder="Username" />
                                <div></div>
                            </Box>
                            <Box className={styles.form__group}>
                                <label>Username</label>
                                <input type="text" placeholder="Username" />
                                <div></div>
                            </Box>
                        </form>
                    </Box>
                </Box>
                <Box className={styles.right}>

                </Box>
            </Box>
        </>
    )
}

export default login

