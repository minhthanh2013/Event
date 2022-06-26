
import { Box } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import React from 'react'
import styles from '../../styles/Login.module.scss'
import * as yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field, useFormik } from 'formik';
import { margin, padding } from '@mui/system'
import Firework from '../../components/Firework'

const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').required('Password is required')
})

const Login = (props: Props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        obSubmit: (values: any) => {
            alert(JSON.stringify(values, null, 2));
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
                        <Box className={styles.form__section}>
                            <form onSubmit={formik.handleSubmit} className={styles.mainForm}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email} />
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.email} 
                                    sx={{ my: "2rem", "& .MuiInputBase-input": {paddingLeft:"1rem"}}}
                                    />
                                <Button variant="contained" size='medium' type="submit">Sign in</Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.right}>
                    <Firework/>
                    <Box className={styles.redirect}>
                        <Typography component="h3">Hello, Friend!</Typography>
                        <Typography component="h4">Enter your personal details and start your journey with us.</Typography>
                        <Button variant='contained' size='medium' type="button">Sign up</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default Login

