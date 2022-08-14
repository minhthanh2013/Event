
import { Box } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import React, { useState } from 'react'
import styles from '../../styles/Login.module.scss'
import * as yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field, useFormik } from 'formik';
import { margin, padding } from '@mui/system'
import Firework from '../../components/Firework'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import { Props } from 'next/script'
import { useRouter } from 'next/router'

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})
const Login = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: any) => {
            let admin = null;
            try {
                admin = await axios.post("/api/auth/admin/login", values);
            } catch (error) {
                console.log(error)
            }
            // const user = await axios.post("http://"+"localhost"+":"+"3000"+"/user/signin", values);
            
            if(admin !== null && admin.status === 200) {
                router.push('/admin/dashboard');
            } else {
                setErrorMessage("Invalid username or password");
            }
            // console.log(errorMessage);
        },
    })

    return (
        <>
            <Box className={styles.container}>
                <Box className={styles.left}>
                    <Box className={styles.container__left}>
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
                        {(errorMessage !=='') && <Typography component='h4'>{errorMessage}</Typography>}
                        <Box className={styles.form__section}>
                            <form onSubmit={formik.handleSubmit} className={styles.mainForm}>
                                <TextField
                                    fullWidth
                                    sx={{"& div > input": {marginLeft: "30px"}}}
                                    id="username"
                                    name="username"
                                    label="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username} />
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.username}
                                    sx={{ my: '1.5rem', "& div > input": {marginLeft: "30px"} }}
                                />
                                <Button variant="contained" size='medium' type="submit">Sign in</Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.right}>
                    <Firework />
                    <Box className={styles.redirect}>
                        <Typography component="h3">Welcome Back!</Typography>
                        <Typography component="h4">To keep connected with us please log in with your personal info.</Typography>
                        <Link href="register" passHref>
                            <Button variant='contained' size='medium' type="button">Create New Account</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default Login

